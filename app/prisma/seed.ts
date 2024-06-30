import { PrismaClient } from "@prisma/client"
import exercicio from './exercicios.json'
import dayjs from "dayjs";
import bcrypt from "bcrypt"


const prisma = new PrismaClient()


async function run(){

    const yesterday = dayjs().subtract(1, 'day').toDate(); // Data de ontem
    const dayBeforeYesterday = dayjs().subtract(2, 'day').toDate(); // Data de anteontem
    
    await prisma.treinoPossuiExercicio.deleteMany()
    await prisma.registroTreinoRealiza.deleteMany()
    await prisma.registroExercicio.deleteMany()
    await prisma.user.deleteMany()
    await prisma.treino.deleteMany()
    await prisma.exercicio.deleteMany()


    const today = dayjs().startOf('day').toDate()
    
    exercicio.forEach( async (item) => {
    await prisma.exercicio.create({
            data: {
                nome: item
            }
        })
    })
    const exercicios = await prisma.exercicio.findMany()
        const dataUser = await prisma.user.create({
            data: {
                altura: 1.77,
                email: "123@gmail.com",
                genero: "Masculino",
                password: await bcrypt.hash("12345", 10),
                peso: 70.6,
                userName: "Abraão",
                created_at: today,
                nivel: "Iniciante",
                Treinos: {
                    create: 
                    [
                        {
                            intervalo: 40,
                            nome: "Treino de Peito",
                            diasDaSemana: "0123456",
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
                        },
                        {
                            intervalo: 60,
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
                    ]
                    }
                }

        })
        const Treino = await prisma.treino.findFirst({
            where: {
                userId: dataUser.id
            }
        })
        const TreinoPossui = await prisma.treinoPossuiExercicio.findMany({
            where: {
                treinoId: Treino.id
            }
        }) 
        const registroTreino = await prisma.registroTreinoRealiza.create({
            data: {
                data: today,
                tempo: 0,
                treinoId: Treino?.id,
                userId: dataUser.id,
                exerciciosRealizados: {
                    create: {
                        SeriesRealizadas: 3,
                        treinoPossuiExercicioId: TreinoPossui[0].id,
                    }
                }
            }
        })       
        await prisma.registroTreinoRealiza.create({
            data: {
                data: dayjs().subtract(5, 'day').toDate(),
                tempo: 0,
                treinoId: Treino?.id,
                userId: dataUser.id,
                exerciciosRealizados: {
                    create: {
                        SeriesRealizadas: 3,
                        treinoPossuiExercicioId: TreinoPossui[0].id,
                    }
                }
            }
        })       
        await prisma.registroTreinoRealiza.create({
            data: {
                data: dayjs().subtract(3, 'day').toDate(),
                tempo: 0,
                treinoId: Treino?.id,
                userId: dataUser.id,
                exerciciosRealizados: {
                    create: {
                        SeriesRealizadas: 3,
                        treinoPossuiExercicioId: TreinoPossui[0].id,
                    }
                }
            }
    })       
    await prisma.registroTreinoRealiza.create({
            data: {
                data: dayjs().subtract(9, 'day').toDate(),
                tempo: 0,
                treinoId: Treino?.id,
                userId: dataUser.id,
                exerciciosRealizados: {
                    create: {
                        SeriesRealizadas: 3,
                        treinoPossuiExercicioId: TreinoPossui[0].id,
                    }
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