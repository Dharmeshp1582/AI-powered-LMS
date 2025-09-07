import jwt from 'jsonwebtoken'

const generateToken = async(userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' })
     return token;
    // console.log(token)
  } catch (error) {
    console.log(error)
  }
 
}

export default generateToken