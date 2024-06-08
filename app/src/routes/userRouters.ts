import {getUser, AddUser, Hello, deleteUser, updateUser} from '../controller/userController'
import { updateUserSchema } from '../schemas/userSchemas'
import { verifyJwt } from '../middleware/authJwt'
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
        handler: AddUser

    },
    {
        method: 'GET',
        url: '/',
        handler: getUser,
        onRequest: [verifyJwt]
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deleteUser,
        // onRequest: [verifyJwt]
    },
    {
        method: 'PATCH',
        url: '/',
        handler: updateUser,
        schema: updateUserSchema,
        onRequest: [verifyJwt]
    },
]
