import { FastifyInstance } from "fastify";
import { User } from "./model/User";


export async function userRoutes(app: FastifyInstance){
    app.get('/', (request, response) => {
        response.send({message: 'ola'})
    })
    app.post('/user', async (request, reply)=> {
        try {
            const user = new User()
            await user.createUser(request)
            reply.send({message: 'usuario cadastrado com sucesso'})
        } catch (error) {
            console.log(error);
            
            reply.send({message: error})
        }
    })

    app.get('/user', async(request, response)=> {
        try {
            const userModel = new User()
            const user = await userModel.findUserByEmail(request)
            response.send()
        } catch (error) {
            console.log(error);
            response.send({message: error})
        }
    })
}