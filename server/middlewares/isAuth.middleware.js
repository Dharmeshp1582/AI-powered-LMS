import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized User ! Login first' });
    }


    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if(!verifyToken){
      return res.status(401).json({ message: 'User does not have valid token' });
    }

    req.userId = verifyToken.userId;
    next();
  }
    catch(error){
     res.status(500).json({ message: `isAuth error ${error} ` });
    }
}

export default isAuth;