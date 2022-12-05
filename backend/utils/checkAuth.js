import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer', '').trim()
  
  if(token) {
    try {
      const isVerify = jwt.verify(token, 'secret123')
      
      req.userId = isVerify._id
      next()
    } catch(e) {
      return res.status(403).json({
        msg: "Нет доступа"
      })
    }
  } else {
    return res.status(403).json({
      msg: "Нет доступа"
    })
  }
}