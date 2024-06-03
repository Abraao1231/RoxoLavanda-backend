import { addExercicio } from "../controller/ExercicioController"

export const exercicioPrefix = '/exercicio'

export const exercicioRoutes = [
    {
        method: 'POST',
        url: '/',
        handler: addExercicio,
    },
]
