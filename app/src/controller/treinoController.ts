import { Treino } from "../model/Treino"

const model = new Treino()
export let AddTreino = async (request, response)=> {
    try {
        const treino = await model.createTreino(request)
        response.send({
            message: 'treino cadastrado com sucesso',
            data: treino
        })
    } catch (error) {
        response.status(500)
        
        response.send(error.message)
    }
}

export let deletetreino = async (request, response)=>{
    try {
        await model.deletetreino(request)
        response.send({
            message: "treino excluido !"
        })
    } catch (error) {
        console.log(error);
        response.status(error.statusCode)
        response.send({message: error})   
    }
}

export let updateTreino = async(request, response)=> {
    try {
        const exercicio = await model.updateTreino(request)
        response.send({
            message: "Treino alterado com sucesso !",
            data: exercicio
        })
    } catch (error) {
        if (error.name == "PrismaClientValidationError")
            response.status(500)
            response.send({message: "Campos invalidos"})        

        console.log(error);
        response.send({message: error})        
    } 
} 