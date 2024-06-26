import { PrismaClient } from "@prisma/client"
import exercicio from './exercicios.json'
import dayjs from "dayjs";
import bcrypt from "bcrypt"


const prisma = new PrismaClient()


async function run(){
    await prisma.user.deleteMany()
    await prisma.treino.deleteMany()
    await prisma.exercicio.deleteMany()
    await prisma.treinoPossuiExercicio.deleteMany()
    await prisma.registroTreinoRealiza.deleteMany()
    const today = dayjs().startOf('day').toDate()
    
    exercicio.forEach( async (item) => {
    await prisma.exercicio.create({
            data: {
                nome: item
            }
        })
    })
    const exercicios = await prisma.exercicio.findMany()
    await prisma.user.create({
        data: {
            altura: 1.77,
            email: "123@gmail.com",
            genero: "Masculino",
            password: await bcrypt.hash("12345", 10),
            peso: 70.6,
            userName: "Abraão",
            created_at: today,
            Treinos: {
                create: 
                  [
                    {
                        intervalo: 40,
                        nome: "Treino de Peito",
                        diasDaSemana: "2",
                        TreinoPossuiExercicio: {
                            create: [
                                {
                                    intervalo: 30,
                                    numeroRep: 15,
                                    numeroSer: 3,
                                    carga: 40,
                                    exercicio: {
                                        connect: {
                                            id: exercicios[1].id
                                        }
                                    }
                                },
                                {
                                    intervalo: 30,
                                    numeroRep: 15,
                                    numeroSer: 3,
                                    carga: 20,
                                    exercicio: {
                                        connect: {
                                            id: exercicios[2].id
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        intervalo: 60,
                        nome: "Treino de Costas",
                        diasDaSemana: "3",
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
                  ]
                }
            }
    })

  
    
    // JSON.stringify('exercicios.json
}
run()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
        process.exit(1)
    })