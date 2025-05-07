import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ 
      _id: decoded._id,
      'tokens.token': token 
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication failed' 
      });
    }

    req.token = token;
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Please authenticate',
      error: error.message 
    });
  }
};

export default auth;