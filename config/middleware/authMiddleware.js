const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Token:', token);
    if (token) {
      try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log('Decoded:', decoded);
        req.user = decoded;
      } catch (err) {
        console.error('Token error:', err);
      }
    }
    next();
  };
  