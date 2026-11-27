import React from 'react';

function Spinner({ label = 'Loading', className = '' }) {
    return (
        <div className={`spinner ${className}`} role="status" aria-live="polite" data-test="spinner">
            <span className="spinner__ring" aria-hidden="true" />
            <span className="spinner__label">{label}</span>
        </div>
    );
}

export default Spinner;
