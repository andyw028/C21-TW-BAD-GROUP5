import Joi from 'joi'

interface UserLogin {
	username: string
	password: string
}

export const loginSchema = Joi.object<UserLogin>({
	username: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
