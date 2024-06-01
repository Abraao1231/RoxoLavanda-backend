import { login } from "../controller/authController"
export const AuthPrefix = '/auth'

export const AuthRoutes = [
      {
        method: 'POST',
        url: '/login',
        handler: login,
        schema: {
            body: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                password: {type: 'string'}
              },
              required: ['email', 'password'], 
            },
          },
      },
]



