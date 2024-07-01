import {prisma} from '../lib/prisma'
import {z} from 'zod'
import dayjs from 'dayjs'


export class Registro {
    constructor(){}
    async createRegistroTreino(request: Request){
       
        const today = dayjs().startOf('day').toDate();

        const zodBodyRegistro = z.object({
            userId: z.string(),
            treinoId: z.string(),
            tempo: z.number()
        })

        const {userId, treinoId, tempo} = zodBodyRegistro.parse(request.body)
        const registro = await prisma.registroTreinoRealiza.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                treino: {
                    connect: {
                        id: treinoId
                    }
                },
                tempo: tempo,
                data: today
            }
        })
        
        return registro
    
       
    }
    async createRegistroExercicio(request : Request){
        const validator = z.object({
            seriesRealizadas: z.number(),
            treinoPossuiExercicioId: z.string(),
            registroTreinoRealiza: z.string()
        })
        
        const {seriesRealizadas, treinoPossuiExercicioId, registroTreinoRealiza} = validator.parse(request.body)

        const data = await prisma.registroExercicio.create({
            data: {
                SeriesRealizadas: seriesRealizadas,
                RegistroTreinoRealiza: {
                    connect: {
                        id: registroTreinoRealiza
                    }
                },
                TreinoPossuiExercicio: {
                    connect: {
                        id: treinoPossuiExercicioId
                    }
                }
            }
        })
        
        return data
    }



    async getRegistroTreino(id: string){
        let registro = await prisma.registroTreinoRealiza.findUnique({
            where: {
                id: id
            }
        })

        if(registro == null){
            throw({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Registro não encontrado"
            });
        }
        return registro
    }
}