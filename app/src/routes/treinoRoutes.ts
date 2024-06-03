import { AddTreino, addExercicioInTreino } from "../controller/treinoController"

export const TreinoPrefix = '/treino'

export const TreinoRoutes = [
    {
        method: 'POST',
        url: '/',
        handler: AddTreino,
    },
    {
        method: 'POST',
        url: '/exercicio',
        handler: addExercicioInTreino,
    },
]
