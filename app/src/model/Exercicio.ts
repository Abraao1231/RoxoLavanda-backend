import {prisma} from '../lib/prisma'
import {z} from 'zod'

export class Exercicio {
    constructor() {}
    async createExercicio(request){

        const zodBodyExercicio = z.object({
            nome: z.string().min(5,{message: "Nome do Exercicio deve ter no minimo 5 caracteres"}), 
        }) 
        
        const { nome } = zodBodyExercicio.parse(request.body)
        const exercicio = await prisma.exercicio.create({
            data: {
                nome: nome
            }  
        })
        return exercicio
    }
    async addExercicioInTreino(request){
        
        const zodBodyTreinoPossuiExercicio = z.object({
            treinoId: z.string(),
            exercicioId: z.string(),
            numeroRep: z.number().min(1),
            intervalo: z.number().min(10),
            numeroSer: z.number().min(1),
        }) 
        
        const {treinoId, exercicioId, numeroRep, intervalo, numeroSer} = zodBodyTreinoPossuiExercicio.parse(request.body)
        
        const exercicioTreino = await prisma.treinoPossuiExercicio.create({
            data: {
                intervalo: intervalo,
                numeroRep: numeroRep,
                numeroSer: numeroSer,
                exercicio: {
                    connect: {
                        id: exercicioId
                    }
                },
                treino: {
                    connect: {
                        id: treinoId
                    }
                }
            }
        })
        return exercicioTreino
    }
    async deleteExercicioTreino(request){
        const getIdTreinoExercicio = z.object({id: z.string()})
        const { id } = getIdTreinoExercicio.parse(request.query)
        
        const treinoPossui = await prisma.treinoPossuiExercicio.findUnique({
            where: {
                id: id
            }
        })
        
        if (!treinoPossui)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Usuario não encontrado"
            });

        await prisma.treinoPossuiExercicio.delete({
            where: {
                id: id
            }
        })

        return true;
    }
    async updateTreinoExercicio(request){
        const getIdTreinoExercicio = z.object({id: z.string()})
        const { id } = getIdTreinoExercicio.parse(request.query)
        
        const exercicioParams = request.body;
        const exercicio = await prisma.treinoPossuiExercicio.findUnique({
            where: {
                id: id
            }
        }) 
        
        if (!exercicio)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Usuario não encontrado"
            });


        const userUpdated = await prisma.treinoPossuiExercicio.update({
            where: {
                id:id
            },
            data:exercicioParams
        })
        return userUpdated
    }
    async deleteExercicio(request){
        const getExercicioId = z.object({id: z.string()})
        console.log(request.query.id);
    
        const { id } = getExercicioId.parse(request.query)
    
        const treino = await prisma.exercicio.findUnique({
            where: {
                id: id
            }
        })
        
        if (!treino)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "treino não encontrado"
            });
            
            await prisma.exercicio.delete({
                where: {
                    id: id
                }
            })
            return true;
    }
    async findAllExercicios(request){
        let data;
        if (request.query.id == undefined)
            data = await prisma.exercicio.findMany()
        else 
            data = await prisma.exercicio.findUnique({
                where: {
                    id: request.query.id
                }
            })
            return data
    }
    async getAllPossuiExercicio(request){
        
        const possuiTreino = await prisma.treinoPossuiExercicio.findMany({
            where: {
                treinoId: request.query.id
            },
            include: {
                exercicio: true,
                treino: true
            }
        })
        return possuiTreino
    }
    async getOneExercicioTreino(id: string){
        const data = await prisma.treinoPossuiExercicio.findUnique({
            where: {
                id: id
            },
            include: {
                exercicio: true,
                treino: true
            }

        })
        return data
    }   
}