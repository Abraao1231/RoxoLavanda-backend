import {prisma} from '../lib/prisma'
import {z} from 'zod'

export class Exercicio {
    constructor() {}
    async createExercicio(request){

        const zodBodyExercicio = z.object({
            nome: z.string().min(5,{message: "Nome do Exercicio deve ter no minimo 5 caracteres"}), 
        }) 
        
        const { nome } = zodBodyExercicio.parse(request.body)
        await prisma.exercicio.create({
            data: {
                nome: nome
            }  
        })

    }
}