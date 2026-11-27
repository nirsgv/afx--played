// Add a show and its tracks to MongoDB. Safe to re-run: nothing is duplicated.
//
//   node --env-file=variables.env scripts/add-show.mjs data/additions/<folder>          # dry run
//   node --env-file=variables.env scripts/add-show.mjs data/additions/<folder> --write  # apply
//
// The folder holds:
//   show.json            - the show document (SHOW_ID is the key)
//   tracks.json          - new track documents (ID is the key); existing IDs only gain the show
//   existing-tracks.json - IDs of tracks already in the database that were played at this show
//
// Writes go through the raw collections, because the mongoose schemas
// do not describe nested fields such as LINKS and would drop them.
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

const [folder, flag] = process.argv.slice(2);
if (!folder) {
    console.error('Usage: node --env-file=variables.env scripts/add-show.mjs <folder> [--write]');
    process.exit(1);
}
if (!process.env.DATABASE) {
    console.error('DATABASE is not set (run with --env-file=variables.env).');
    process.exit(1);
}
const write = flag === '--write';
const read = (file) => {
    const p = path.join(folder, file);
    return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
};

const show = read('show.json');
const tracks = read('tracks.json');
const existingIds = read('existing-tracks.json');
if (!show.SHOW_ID) throw new Error('show.json needs a SHOW_ID');
for (const t of tracks) {
    if (!t.ID || !t.ARTIST_NAME || !t.TRACK_TITLE) throw new Error(`Track missing ID/ARTIST_NAME/TRACK_TITLE: ${JSON.stringify(t)}`);
    if (!t.VENUES?.includes(show.SHOW_ID)) throw new Error(`Track ${t.ID} does not list ${show.SHOW_ID} in VENUES`);
}

await mongoose.connect(process.env.DATABASE, { serverSelectionTimeoutMS: 10000 });
const db = mongoose.connection.db;
const showsCol = db.collection('afx_played_shows');
const tracksCol = db.collection('afx_played_tracks');

const summary = { showInserted: 0, tracksInserted: 0, tracksLinked: 0, unchanged: 0, missingExisting: [] };

if (await showsCol.findOne({ SHOW_ID: show.SHOW_ID })) {
    console.log(`show ${show.SHOW_ID}: already present`);
} else {
    console.log(`show ${show.SHOW_ID}: insert "${show.SHOW_TITLE}"`);
    if (write) await showsCol.insertOne(show);
    summary.showInserted++;
}

const link = async (id) => {
    const doc = await tracksCol.findOne({ ID: id }, { projection: { VENUES: 1 } });
    if (!doc) return false;
    if (doc.VENUES?.includes(show.SHOW_ID)) { summary.unchanged++; return true; }
    console.log(`track ${id}: add ${show.SHOW_ID} to VENUES`);
    if (write) await tracksCol.updateOne({ ID: id }, { $addToSet: { VENUES: show.SHOW_ID } });
    summary.tracksLinked++;
    return true;
};

for (const t of tracks) {
    if (await link(t.ID)) continue;
    console.log(`track ${t.ID}: insert`);
    if (write) await tracksCol.insertOne(t);
    summary.tracksInserted++;
}
for (const id of existingIds) {
    if (!(await link(id))) summary.missingExisting.push(id);
}

console.log(write ? '\nApplied:' : '\nDry run (add --write to apply):', summary);
await mongoose.disconnect();
if (summary.missingExisting.length) process.exitCode = 1;
