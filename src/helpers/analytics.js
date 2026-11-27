import ReactGA from 'react-ga4';

// GA4 measurement id, e.g. "G-XXXXXXXXXX". Analytics is a no-op when unset.
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initAnalytics = () => {
    if (!MEASUREMENT_ID) return;
    ReactGA.initialize(MEASUREMENT_ID);
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const trackEvent = (event) => {
    if (!MEASUREMENT_ID) return;
    ReactGA.event(event);
};
