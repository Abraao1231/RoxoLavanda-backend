import {prisma} from '../lib/prisma'
import dayjs from 'dayjs'
import {z} from 'zod'
import bcrypt from 'bcrypt';

export class Treino {
    constructor() {}
    async createTreino(request){

        const zodBodyTreino = z.object({
            id: z.string().min(4, {message: "O id do treino deve ter no minimo 4 caracteres"}),
            nome: z.string().min(5,{message: "Nome do treino deve ter no minimo 5 caracteres"}), 
            intervalo: z.number().min(0.0, {message: "O tempo de treino deve ser um número positivo"}),

        }) 
  
        const {id, nome, intervalo,} = zodBodyTreino.parse(request.body)
       

            await prisma.treino.create({
                data: {
                    id: id,
                    nome: nome,
                    intervalo:  intervalo,

                
                }  
            })        
    }
}