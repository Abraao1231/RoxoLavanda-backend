import {getUser, AddUser, Hello} from '../controller/userController'

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
]
