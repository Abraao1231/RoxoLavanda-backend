import { Registro } from "../model/Registro"
const modal = new Registro()
export let getRegistroTreino = async function (request, reply){
    try {
        
    } catch (error) {
        reply.status(500)
        reply.send(error.message)
    }
}
export let createRegistroTreino = async function (request, reply){
    try {
        const data = await modal.createRegistroTreino(request)
        
        reply.send({data: data})
    } catch (error) {
        reply.status(error.status)
        reply.send(error.message)
    }

}
export let createRegistroExercicio = async function (request, reply){
    try {
        
        const data = await modal.createRegistroExercicio(request)
        reply.send({data: data})
    } catch (error) {
        reply.status(500)
        reply.send(error.message)
    }

}