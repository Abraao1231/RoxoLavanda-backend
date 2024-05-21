import {getUser, AddUser, Hello} from '../controller/userController'

export const prefix = '/user'

export const routes = [
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
