export const updateUserSchema = {
  querystring: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
      },
    },
  body: {
    type: 'object',
    properties: {
      userName: { type: 'string' },
      email: { type: 'string' },
      peso: { type: 'number' },
      altura: { type: 'number' },
      genero: { type: 'string' }
      },

    } 
  }
  
export const createUserSchema = {
body: {
  type: 'object',
  required: ['userName', 'password', 'email', 'peso', 'altura', 'genero'],

  properties: {
    userName: { type: 'string' },
    password: {type: 'string'},
    email: { type: 'string' },
    peso: { type: 'number' },
    altura: { type: 'number' },
    genero: { type: 'string' }
    },

  } 
}
  
export const findUserByEmailSchema = {
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string' }
      },
    },
  }
      