
import { User } from "../model/User"
export let Hello = async (request, response) => {
    response.send({message: 'ola'})
}

export let AddUser = async (request, response)=> {
    try {
        const user = new User()
        await user.createUser(request)
        response.send({message: 'usuario cadastrado com sucesso'})
    } catch (error) {
        response.status(500)
        response.send(error.message)
    }
}

export let getUser = async(request, response)=> {
    try {
        const userModel = new User()
        const user = await userModel.findUserByEmail(request)
        response.send(user)
    } catch (error) {
        console.log(error);
        response.send({message: error})
    }
}