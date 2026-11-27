// Contact form: validate a submission and store it in the contact_messages collection.

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Hidden field that people never fill in; bots that fill every field reveal themselves.
const HONEYPOT = 'website';

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * @param {any} body - parsed JSON request body
 * @returns {{ ok: true, doc: object } | { ok: true, spam: true } | { ok: false, errors: object }}
 */
const validateContact = (body) => {
    if (!body || typeof body !== 'object') return { ok: false, errors: { form: 'Invalid request' } };
    if (clean(body[HONEYPOT])) return { ok: true, spam: true };

    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const errors = {};

    if (!name) errors.name = 'Please enter your name';
    else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters`;

    if (!email) errors.email = 'Please enter your email';
    else if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = 'Please enter a valid email';

    if (!message) errors.message = 'Please write a message';
    else if (message.length > LIMITS.message) errors.message = `Please keep the message under ${LIMITS.message} characters`;

    return Object.keys(errors).length ? { ok: false, errors } : { ok: true, doc: { name, email, message } };
};

/**
 * Validates and stores a submission. Returns [statusCode, responseBody].
 * Spam is answered like a success so bots learn nothing, but it is not stored.
 * @param {any} body
 * @param {import('mongodb').Db} db
 * @returns {Promise<[number, object]>}
 */
const handleContact = async (body, db) => {
    const result = validateContact(body);
    if (!result.ok) return [400, { errors: result.errors }];
    if (!result.spam) {
        await db.collection('contact_messages').insertOne({ ...result.doc, createdAt: new Date() });
    }
    return [201, { ok: true }];
};

module.exports = { validateContact, handleContact, LIMITS, HONEYPOT };
