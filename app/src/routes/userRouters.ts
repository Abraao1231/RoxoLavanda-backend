import {getUser, AddUser, Hello, deleteUser, updateUser} from '../controller/userController'
import { createUserSchema, findUserByEmailSchema, updateUserSchema } from '../schemas/userSchemas'
import { verifyJwt } from '../middleware/authJwt'
import { getTreinoSchema } from '../schemas/TreinoSchema'
export const prefixUser = '/user'

export const routesUser = [
    {
        method: 'GET',
        url: '/hello',
        handler: Hello,
    },
    {
        method: 'POST',
        url: '/',
        handler: AddUser,
        schema: createUserSchema

    },
    {
        method: 'GET',
        url: '/',
        handler: getUser,
        onRequest: [verifyJwt],
        schema: findUserByEmailSchema
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deleteUser,
        onRequest: [verifyJwt],
        schema: getTreinoSchema

    },
    {
        method: 'PATCH',
        url: '/',
        handler: updateUser,
        schema: updateUserSchema,
        onRequest: [verifyJwt],
    },
]
