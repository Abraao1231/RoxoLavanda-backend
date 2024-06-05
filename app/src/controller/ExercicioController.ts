import { Exercicio } from "../model/Exercicio"
const model = new Exercicio()
export let addExercicio = async (request, response)=> {
    try {
        
        const exercicio = await model.createExercicio(request)
        response.send({message: 'exercicio cadastrado com sucesso', data: exercicio})
    } catch (error) {
        response.status(500)
        response.send(error.message)
    }
}
export let addExercicioInTreino = async (request, response)=> {
    try {
        const exercicioTreino = await model.addExercicioInTreino(request)
        response.send({message: 'exercicio cadastrado com sucesso', data: exercicioTreino})
    } catch (error) {
        response.status(500)
        console.log(error);

        response.send(error.message)
    }
}
export let deleteExercicioTreino = async(request, response)=> {
    try {
        await model.deleteExercicioTreino(request)
        response.send({
            message: "Exercicio excluido !"
        })
    } catch (error) {
        response.status(error.statusCode)
        response.send({message: error})   
    }
}
export let updateExercicioTreino = async(request, response)=>{
    try {
        const model = new Exercicio()
        const exercicio = await model.updateTreinoExercicio(request)
        response.send({
            message: "Exercicio alterada com sucesso !",
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


export let deleteExercicio = async (request, response)=>{
    try {
        await model.deleteExercicio(request)
        response.send({
            message: "Exercicio excluido !"
        })
    } catch (error) {
        console.log(error);
        response.status(error.statusCode)
        response.send({message: error})   
    }
}