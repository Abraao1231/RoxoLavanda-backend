import {prisma} from '../lib/prisma'
import {z} from 'zod'

export class Treino {
    constructor() {}
    async createTreino(request){

        const zodBodyTreino = z.object({
            userId: z.string(),
            nome: z.string().min(5,{message: "Nome do treino deve ter no minimo 5 caracteres"}), 
            intervalo: z.number().min(0, {message: "O tempo de treino deve ser um número positivo"}),
            exercicios: z.object({
                numeroRep: z.number().min(1),
                intervalo: z.number().min(0),
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
        return treino
    }
   
    async deletetreino(request){
        const getTreinoId = z.object({id: z.string()})
        console.log(request.query.id);

        const { id } = getTreinoId.parse(request.query)

        const treino = await prisma.treino.findUnique({
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
            
            await prisma.treino.delete({
                where: {
                    id: id
                }
            })
            return true;
    }

    async updateTreino(request){

            const getTreinoID = z.object({id: z.string()})
            const { id } = getTreinoID.parse(request.query)
            const treinoParams = request.body;
            const user = await prisma.treino.findUnique({
                where: {
                    id: id
                }
            }) 
            
            if (!user)
                throw ({
                    "statusCode": 500,
                    "error": "Internal Server Error",
                    "message": "Treino não encontrado"
                });


            const userUpdated = await prisma.treino.update({
                where: {
                    id:id
                },
                data:treinoParams
            })
            return userUpdated
        }
    async getTreino(id: string){
        let treino = await prisma.treino.findUnique({
            where: {
                id: id
            }
        })

        if (treino == null){
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Treino não encontrado"
            }); 
        }
        
            return treino
        }
    async getAllTreinos(userId: string){
        const treinos = await prisma.treino.findMany({
            where: {
                userId: userId
            }
        })
        return treinos
    }
}
