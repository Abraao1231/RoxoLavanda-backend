import { FastifyInstance } from "fastify";
import { User } from "./model/User";
import {prisma} from './lib/prisma'


export async function userRoutes(app: FastifyInstance){
    app.get('/', (request, response) => {
        response.send({message: 'ola'})
    })

    app.post('/user', async (request, response)=> {
        try {
            const user = new User()
            await user.createUser(request)
            response.send({message: 'usuario cadastrado com sucesso'})
        } catch (error) {
            response.status(500)
            response.send(error.message)
        }
    })

    app.get('/user', async(request, response)=> {
        try {
            const userModel = new User()
            const user = await userModel.findUserByEmail(request)
            response.send(user)
        } catch (error) {
            console.log(error);
            response.send({message: error})
        }
    })
}