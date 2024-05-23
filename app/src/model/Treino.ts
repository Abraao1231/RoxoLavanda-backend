import {prisma} from '../lib/prisma'
import dayjs from 'dayjs'
import {z} from 'zod'
import bcrypt from 'bcrypt';

export class Treino {
    constructor() {}
    async createTreino(request){

        const zodBodyTreino = z.object({
            userName: z.string().min(4, {message: "O nome de usuario deve ter no minimo 4 caracteres"}),
            email: z.string().email({message: "E-mail inválido"}), 
            password: z.string().min(5, {message: "Senha deve ter no minimo 5 caracteres" }),
            genero: z.enum(["masculino","feminino","outro"]),
            altura: z.number().min(0.0, {message: "A altura deve ser um número positivo"})
                .max(3.0, {message: "Altura acima do máximo permitido"}),
            peso: z.number().min(0.0, {message: "O peso deve ser um número positivo"})
                .max(300, {message: "Peso acima do máximo permitido"})
        }) 
  
        const {userName, email, password, genero, altura, peso} = zodBodyTreino.parse(request.body)
       

            await prisma.treino.create({
                data: {
                    userName: userName,
                    email: email,
                    password:  hashPass,
                    created_at: today,
                    genero: genero,
                    altura: altura,
                    peso: peso
                }   
            })        
    }
}