import {prisma} from '../lib/prisma'
import {z} from 'zod'

export class Treino {
    constructor() {}
    async createTreino(request){

        const zodBodyTreino = z.object({
            userId: z.string(),
            nome: z.string().min(5,{message: "Nome do treino deve ter no minimo 5 caracteres"}), 
            intervalo: z.number().min(10, {message: "O tempo de treino deve ser um número positivo"}),
            exercicios: z.object({
                numeroRep: z.number().min(1),
                intervalo: z.number().min(10),
                numeroSer: z.number().min(1),
                exericioId: z.string()
            }).array().min(1, {message: "O treino deve conter no minimo 1 exercicio"})
        }) 
        
        const {userId, nome, intervalo, exercicios} = zodBodyTreino.parse(request.body)
        const treino = await prisma.treino.create({
            data: {
                nome: nome,
                intervalo:  intervalo,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }  
        })
        exercicios.map( async (exercicio)=> {
            await prisma.treinoPossuiExercicio.create({
                data:{
                    intervalo: exercicio.intervalo,
                    numeroRep: exercicio.numeroRep,
                    numeroSer: exercicio.numeroSer,
                    exercicioId: exercicio.exericioId,
                    treinoId: treino.id
                }
            })
        })
    }
}