import {prisma} from '../lib/prisma'
import dayjs from 'dayjs'
import {z} from 'zod'
import bcrypt from 'bcrypt';

export class User {
    constructor() {}
    async createUser(request){
        const today = dayjs().startOf('day').toDate();

        const zodBodyUser = z.object({
            userName: z.string().min(4, {message: "O nome de usuario deve ter no minimo 4 caracteres"}),
            email: z.string().email({message: "E-mail inválido"}), 
            password: z.string().min(5, {message: "Senha deve ter no minimo 5 caracteres" }),
            genero: z.enum(["masculino","feminino","outro"]),
            altura: z.number().min(0.0, {message: "A altura deve ser um número positivo"})
                .max(3.0, {message: "Altura acima do máximo permitido"}),
            peso: z.number().min(0.0, {message: "O peso deve ser um número positivo"})
                .max(300, {message: "Peso acima do máximo permitido"})
        }) 
  
        const {userName, email, password, genero, altura, peso} = zodBodyUser.parse(request.body)
       

        const userSearch = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userSearch)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "E-mail ja cadastrado"
            });

        else {

            const hashPass = await bcrypt.hash(password, 10);
            await prisma.user.create({
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