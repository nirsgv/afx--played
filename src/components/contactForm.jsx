import React, { useState } from 'react';
import urlConstants from '../data/urlConstants';
import Spinner from './spinner';

// Keep in step with api/contact.js (the server checks the same rules).
const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { name: '', email: '', message: '', website: '' };

const validate = ({ name, email, message }) => {
    const errors = {};
    if (!name.trim()) errors.name = 'Please enter your name';
    else if (name.trim().length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters`;
    if (!email.trim()) errors.email = 'Please enter your email';
    else if (!EMAIL.test(email.trim())) errors.email = 'Please enter a valid email';
    if (!message.trim()) errors.message = 'Please write a message';
    else if (message.trim().length > LIMITS.message) errors.message = `Please keep the message under ${LIMITS.message} characters`;
    return errors;
};

function ContactForm() {
    const [ fields, setFields ] = useState(empty);
    const [ errors, setErrors ] = useState({});
    // 'idle' | 'sending' | 'sent' | 'failed'
    const [ status, setStatus ] = useState('idle');

    const onChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const found = validate(fields);
        setErrors(found);
        if (Object.keys(found).length) return;

        setStatus('sending');
        try {
            const response = await fetch(urlConstants.CONTACT_URL, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(fields),
            });
            if (response.status === 400) {
                const body = await response.json().catch(() => ({}));
                setErrors(body.errors || {});
                setStatus('idle');
                return;
            }
            if (!response.ok) throw new Error(`Contact form failed (${response.status})`);
            setFields(empty);
            setStatus('sent');
        } catch (err) {
            console.error(err);
            setStatus('failed');
        }
    };

    if (status === 'sent') {
        return (
            <section className="contact" data-test="contact-form">
                <h2 className="contact__title">Thanks!</h2>
                <p className="contact__note" role="status">Your message was sent. I'll get back to you by email.</p>
                <button type="button" className="contact__again" onClick={() => setStatus('idle')}>Send another message</button>
            </section>
        );
    }

    const field = (name, label, props = {}) => (
        <div className={`contact__field${errors[name] ? ' contact__field--error' : ''}`}>
            <label className="contact__label" htmlFor={`contact-${name}`}>{label}</label>
            {props.multiline
                ? <textarea id={`contact-${name}`} name={name} className="contact__input contact__input--multiline"
                            rows={6} maxLength={LIMITS[name]} value={fields[name]} onChange={onChange}
                            aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `contact-${name}-error` : undefined} />
                : <input id={`contact-${name}`} name={name} className="contact__input" type={props.type || 'text'}
                         autoComplete={props.autoComplete} maxLength={LIMITS[name]} value={fields[name]} onChange={onChange}
                         aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `contact-${name}-error` : undefined} />}
            {errors[name] && <span className="contact__error" id={`contact-${name}-error`}>{errors[name]}</span>}
        </div>
    );

    return (
        <section className="contact" data-test="contact-form">
            <h2 className="contact__title">Get in <strong>touch</strong></h2>
            <p className="contact__note">Corrections, missing tracks, or anything else about the site.</p>

            <form className="contact__form" onSubmit={onSubmit} noValidate>
                {field('name', 'Name', { autoComplete: 'name' })}
                {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
                {field('message', 'Message', { multiline: true })}

                {/* Honeypot: hidden from people, filled in by bots. */}
                <div className="contact__trap" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                           value={fields.website} onChange={onChange} />
                </div>

                {errors.form && <p className="contact__error">{errors.form}</p>}
                {status === 'failed' && (
                    <p className="contact__error" role="alert">Sorry, the message couldn't be sent. Please try again.</p>
                )}

                <div className="contact__actions">
                    <button type="submit" className="contact__submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                    {status === 'sending' && <Spinner label="Sending message" className="spinner--inline" />}
                </div>
                <p className="contact__privacy">Your email is only used to reply to you.</p>
            </form>
        </section>
    );
}

export default ContactForm;
