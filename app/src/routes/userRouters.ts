import {getUser, AddUser, Hello, deleteUser, updateUser} from '../controller/userController'
import { updateUserSchema } from '../schemas/userSchemas'

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
        handler: getUser
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deleteUser
    },
    {
        method: 'PATCH',
        url: '/',
        handler: updateUser,
        schema: updateUserSchema
    },
]
