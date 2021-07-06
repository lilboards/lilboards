export const isDevelopment = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-restricted-globals
export const isLocalhost = location.hostname === 'localhost';

export const isProduction = process.env.NODE_ENV === 'production';
