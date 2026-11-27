import { validateContact, handleContact, LIMITS } from '../contact';

const valid = { name: ' Ada ', email: 'ada@example.com', message: ' Missing track at Bristol ' };

const fakeDb = () => {
    const inserted = [];
    return { inserted, collection: (name) => ({ insertOne: async (doc) => inserted.push({ name, doc }) }) };
};

test('a valid message is trimmed and accepted', () => {
    expect(validateContact(valid)).toEqual({
        ok: true,
        doc: { name: 'Ada', email: 'ada@example.com', message: 'Missing track at Bristol' },
    });
});

test('missing, invalid and oversized fields are reported per field', () => {
    expect(validateContact({}).errors).toEqual({
        name: expect.any(String), email: expect.any(String), message: expect.any(String),
    });
    expect(validateContact({ ...valid, email: 'not-an-email' }).errors).toHaveProperty('email');
    expect(validateContact({ ...valid, message: 'x'.repeat(LIMITS.message + 1) }).errors).toHaveProperty('message');
    expect(validateContact({ ...valid, name: 42 }).errors).toHaveProperty('name');
    expect(validateContact(null)).toMatchObject({ ok: false });
});

test('a filled honeypot is treated as spam', () => {
    expect(validateContact({ ...valid, website: 'http://spam' })).toEqual({ ok: true, spam: true });
});

test('handleContact stores valid messages only, and answers spam like a success', async () => {
    const db = fakeDb();
    expect(await handleContact(valid, db)).toEqual([201, { ok: true }]);
    expect(db.inserted).toHaveLength(1);
    expect(db.inserted[0].name).toBe('contact_messages');
    expect(db.inserted[0].doc).toMatchObject({ name: 'Ada', email: 'ada@example.com' });
    expect(db.inserted[0].doc.createdAt).toBeInstanceOf(Date);

    expect(await handleContact({ ...valid, website: 'x' }, db)).toEqual([201, { ok: true }]);
    expect(db.inserted).toHaveLength(1);

    const [status, body] = await handleContact({ name: 'Ada' }, db);
    expect(status).toBe(400);
    expect(body.errors).toHaveProperty('email');
    expect(db.inserted).toHaveLength(1);
});
