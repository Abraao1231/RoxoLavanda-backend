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
            nivel: z.string(),
            email: z.string().email({message: "E-mail inválido"}), 
            password: z.string().min(5, {message: "Senha deve ter no minimo 5 caracteres" }),
            genero: z.enum(["Masculino","Feminino","Prefiro não informar"]),
            altura: z.number().min(0.0, {message: "A altura deve ser um número positivo"})
                .max(300, {message: "Altura acima do máximo permitido"}),
            peso: z.number().min(0.0, {message: "O peso deve ser um número positivo"})
                .max(300, {message: "Peso acima do máximo permitido"})
        }) 
  
        const {userName, email, password, genero, altura, peso, nivel} = zodBodyUser.parse(request.body)
       

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
            const user = await prisma.user.create({
                data: {
                    userName: userName,
                    email: email,
                    password:  hashPass,
                    created_at: today,
                    genero: genero,
                    altura: altura,
                    peso: peso,
                    nivel: nivel
                }   
            })

            if (nivel == "Iniciante"){
                const exercicios = await prisma.exercicio.findMany()
                await prisma.treino.create({
                    data: {
                        intervalo: 60,
                        userId: user.id,
                        nome: "Treino de Pernas",
                        diasDaSemana: "36",
                        TreinoPossuiExercicio: {
                            create: [
                                {
                                    intervalo: 30,
                                    numeroRep: 15,
                                    numeroSer: 3,
                                    carga: 40,
                                    exercicio: {
                                        connect: {
                                            id: exercicios[2].id
                                        }
                                    }
                                },
                                {
                                    intervalo: 30,
                                    numeroRep: 15,
                                    numeroSer: 3,
                                    carga: 40,
                                    exercicio: {
                                        connect: {
                                            id: exercicios[3].id
                                        }
                                    }
                                }
                            ]
                        }
                        
                    }
                })
            }
            return user     

        }
            
    }
    async findUserByEmail(request){
        const getUserParams = z.object({
            email: z.string().email({message: "E-mail inválido"})
        })
        const { email } = getUserParams.parse(request.query)
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        
        if (user == null)
            return false
        return user
    }
    async findUserById(id: string){ 
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Usuario não encontrado"
            });
        return user
    }
    
    async deleteUser(request){
        
        const getUserId = z.object({id: z.string()})
        const { id } = getUserId.parse(request.query)

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        
        if (!user)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Usuario não encontrado"
            });
            
            await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return true;
    }
    async updateUser(request){
        const getUserId = z.object({id: z.string()})
        const { id } = getUserId.parse(request.query)
        const userParams = request.body;
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        }) 
        
        if (!user)
            throw ({
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Usuario não encontrado"
            });


        const userUpdated = await prisma.user.update({
            where: {
                id:id
            },
            data:userParams
        })
        return userUpdated
    }
    async getDataUser(request){
        
        const  userId  = request.query.id
        const nextWorkout = this.getNextWorkout(userId)
        
    }
    async  getNextWorkout(userId: string){
 
        
        const weekDayToday =  dayjs().day()        
        const treinos = await prisma.treino.findMany({
            where: {
                userId: String(userId)
            }
        })
        const  treinosHoje = treinos.filter(item => item.diasDaSemana.includes(String(weekDayToday)))
        const registrosHoje = await prisma.registroTreinoRealiza.findMany({
            where: {
                userId: String(userId),
                data: {
                    gte: dayjs().startOf('day').toDate(),
                    lte: dayjs().endOf('day').toDate()
                }

            }
        });
        console.log(registrosHoje);
        
        return treinosHoje;
    }
    async getlast10Days(userId :string){
        const dezDiasAtras = dayjs().subtract(10, 'day')
        let registro : Array<{}> = []
       

        const data = await prisma.registroTreinoRealiza.findMany({
            where: {
                data: {
                    gt:dezDiasAtras
                },
                userId: userId   
            }
        })
        for (let i = 0; i <= 10; i++) {
            const dataIteracao = dezDiasAtras.add(i, 'day').toDate()
        
            // Substitua este trecho com sua lógica de consulta real usando Prisma
            const dataFind = await prisma.registroTreinoRealiza.findMany({
              where: {
                data: {
                    gte: dayjs(dataIteracao).startOf('day').toDate(),
                    lt: dayjs(dataIteracao).endOf('day').toDate(),
                },
              },
            })
        
            if (dataFind.length > 0) {
              registro.push({
                data: dataIteracao,
                treinos: dataFind,
                isExists: true,
                diaSemana: dayjs(dataIteracao).day()     
              })
            } else {
              registro.push({
                data: dataIteracao,
                treinos: dataFind,
                isExists: false,
                diaSemana: dayjs(dataIteracao).day()     

              })
            }
          }
        
        return registro;
    }
}