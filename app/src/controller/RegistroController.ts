import { Registro } from "../model/Registro"

const model = new Registro()
export let getRegistroTreino = async function (request, reply){
    try {
        const registro = model.getRegistroTreino(request.query.id)
        return {
            data: {
                registro: registro
            }
        }
    } catch (error) {
        reply.status(500)
        reply.send(error.message)
    }
}
export let createRegistroTreino = async function (request, reply){
    try {
        const registro = await model.createRegistroTreino(request)
        reply.send({
            message: "registro realizado com sucesso",
            data: registro
        })
    } catch (error) {
        reply.status(500)
        reply.send(error.message)
    }

}
export let createRegistroExercicio = async function (request, reply){
    try {
        const registro = await model.createRegistroExercicio(request)
        reply.send({
            message: "registro realizado com sucesso",
            data: registro
        })
    } catch (error) {
        reply.status(500)
        reply.send(error.message)
    }

}