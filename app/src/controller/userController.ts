
import { User } from "../model/User"
export let Hello = async (request, response) => {
    response.send({message: 'ola'})
}

export let AddUser = async (request, response)=> {
    try {
        const user = new User()
        const userCreated = await user.createUser(request)
        response.send({
            message: 'usuario cadastrado com sucesso',
            data: userCreated
        })
    } catch (error) {
        response.status(500)
        response.send(error.message)
    }
}

export let getUser = async(request, response)=> {
    try {
        const userModel = new User()
        const user = await userModel.findUserByEmail(request)
        if (user)
            response.send(user)
        else{
            response.send({isExists: false,message: "Usuario não encontrado"})
        }

    } catch (error) {
        console.log(error);
        response.status(500)
        response.send({message: error})
    }
}

export let deleteUser = async(request, response)=> {
    
    try {
        const userModel = new User()
        await userModel.deleteUser(request)
        response.send({
            message: "Conta excluida !"
        })
    } catch (error) {
        console.log(error);
        
        response.status(error.statusCode)
        response.send({message: error})   
    }
}

export let updateUser = async(request, response)=>{
    try {
        const userModel = new User()
        const user = await userModel.updateUser(request)
        response.send({
            message: "Conta alterada com sucesso !",
            data: user
        })
    } catch (error) {
        if (error.name == "PrismaClientValidationError")
            response.status(500)
            response.send({message: "Campos invalidos"})        

        console.log(error);
        response.send({message: error})        
    } 
}