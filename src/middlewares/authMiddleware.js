const Jwt = require('jsonwebtoken');
const AuthConfig = require('../config/auth');

module.exports = (req,res,next) => {
  const authToken = req.headers.authorization;

  if(!authToken) return res.status(401).send({error: "No token provide"});

  const parts = authToken.split(' ');

  if(!parts.length == 2) return res.status(401).send({error: 'Invalid token format'});

  const [scheme,token] = parts;

  // Bearer -> início padrão do JSON web token
  if(!scheme.includes('Bearer' || 'bearer')) return res.status(401).send({error: 'Invalid token format'});

  const validToken = Jwt.verify(token,AuthConfig.secret);
  
  if(!validToken) return res.status(401).send({error: 'Invalid token'});

  req.user = Jwt.decode(token);

  return next();
}