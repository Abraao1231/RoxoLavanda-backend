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
}