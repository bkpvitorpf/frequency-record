const Jwt = require('jsonwebtoken');
const AuthConfig = require('../config/auth');

module.exports = (req,res,next) => {
  const authToken = req.headers.authorization;

  if(!authToken) return res.status(401).send({error: "No token provide"});

  const parts = authToken.split(' ');

  if(!parts.length == 2) return res.status(401).send({error: 'Invalid token format'});

  const [pattern,token] = parts;

  // Verifica se o token começa com  o padrão Bearer (padrão de formato de um JSON Web Token)
  if(!pattern.includes('Bearer' || 'bearer')) return res.status(401).send({error: 'Invalid token format'});

  // Função que valida o token 
  const validToken = Jwt.verify(token,AuthConfig.secret);

  if(!validToken) return res.status(401).send({error: 'Invalid token'});

  // Decodifica o token e disponibiliza os dados para outras funções
  req.user = Jwt.decode(token);

  return next();
}