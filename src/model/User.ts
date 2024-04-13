import {prisma} from '../lib/prisma'
import dayjs from 'dayjs'
import {z} from 'zod'

export class User {
    constructor() {}
    async createUser(request){
        const today = dayjs().startOf('day').toDate();

        const zodBodyUser = z.object({
            userName: z.string().min(4, {message: "O nome de usuario deve ter no minimo 5 caracteres"}),
            email: z.string().email({message: "E-mail inválido"}),
            password: z.string().min(5, {message: "Senha deve ter no minimo 5 caracteres" })
        }) 

        const {userName, email, password} = zodBodyUser.parse(request.body)

        await prisma.user.create({
            data: {
                userName: userName,
                email: email,
                password: email,
                created_at: today
            }   
        })
    }
    async findUserByEmail(request){
        const getDayParams = z.object({
            email: z.string().email({message: "E-mail inválido"})
        })
        const { email } = getDayParams.parse(request.query)
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if (!user)
            throw new Error("Usuario não encontrado");
        return user
    }
}