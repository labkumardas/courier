const allowedOrigins = ['http://allowed-origin-1.com', 'http://allowed-origin-2.com', 'http://allowed-origin-3.com'];
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins array or if it's undefined (for same-origin requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
export default corsOptions;