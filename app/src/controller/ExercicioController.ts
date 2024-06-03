import { Exercicio } from "../model/Exercicio"

export let addExercicio = async (request, response)=> {
    try {
        const treino = new Exercicio()
        await treino.createExercicio(request)
        response.send({message: 'exercicio cadastrado com sucesso'})
    } catch (error) {
        response.status(500)
        response.send(error.message)
    }
}