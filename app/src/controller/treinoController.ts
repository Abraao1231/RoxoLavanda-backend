import { Treino } from "../model/Treino"


export let AddTreino = async (request, response)=> {
    try {
        const treino = new Treino()
        await treino.createTreino(request)
        response.send({message: 'treino cadastrado com sucesso'})
    } catch (error) {
        response.status(500)
        
        response.send(error.message)
    }
}

export let addExercicioInTreino = async (request, response)=> {
    try {
        const treino = new Treino()
        await treino.addExercicioInTreino(request)
        response.send({message: 'exercicio cadastrado com sucesso'})
    } catch (error) {
        response.status(500)
        console.log(error);

        response.send(error.message)
    }
}