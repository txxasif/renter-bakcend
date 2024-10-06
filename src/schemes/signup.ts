import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is a required field'
  }),

  firstName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'First name must be of type string',
    'string.min': 'First name must be at least 2 characters',
    'string.max': 'First name must be at most 30 characters',
    'string.empty': 'First name is a required field'
  }),

  lastName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Last name must be of type string',
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name must be at most 30 characters',
    'string.empty': 'Last name is a required field'
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  profilePicture: Joi.string().uri().required().messages({
    'string.base': 'Profile picture must be a valid URL',
    'string.uri': 'Profile picture must be a valid URL',
    'string.empty': 'Profile picture is a required field'
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be of type string',
      'string.pattern.base': 'Phone number must be exactly 11 digits',
      'string.empty': 'Phone number is a required field'
    })
});

export { signupSchema };
