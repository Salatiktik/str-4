const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const generateJwt = (id, email, role) => {
    try {
        const token = jwt.sign({ id, email, role }, "owo", { expiresIn: '24h' });
        console.log('Сгенерированный токен:', token);
        return token;
      } catch (error) {
        console.error('Ошибка генерации токена:', error.message);
        return null;
      }
}

class UserController {
    async registration(req, res, next) {
        try{
            const { email, password, role } = req.body;
            console.log('Полученные данные:', { email, password, role });
            if (!email || !password) {
                return next(ApiError.badRequest('Wrong email or password'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('This email is already used'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})    
        } catch (error) {
            console.error('Ошибка в функции registration:', error.message);
            return next(error);
          }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('No mathes usernames'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getUser(req, res){
        const {id} = req.params
        const user = await User.findOne({where:{id}})
        return res.json(user)
    }
    
    async googleAuthCallback (req, res) {
    try {
        console.log(1)
    const {id, email} = req.body;
    console.log(id, email)
    
    const user = await User.findOne({where:{email}})

    if(!user){
        user = await User.create({email: email,role:'ADMIN',password:'googleAuth',googleId:String(id)})
    }

    const token = generateJwt(user.id, user.email, 'ADMIN');
    res.json({ token });
  } catch (error) {
    console.error('Ошибка при обработке запроса Google Auth:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}

module.exports = new UserController()