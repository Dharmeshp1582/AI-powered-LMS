import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Correct way

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized User! Please login first.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request for next middleware
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};

export default isAuth;
