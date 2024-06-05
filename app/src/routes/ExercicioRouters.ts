import { addExercicio, addExercicioInTreino, deleteExercicio, deleteExercicioTreino, updateExercicioTreino } from "../controller/ExercicioController"

export const exercicioPrefix = '/exercicio'

export const exercicioRoutes = [
    {
        method: 'POST',
        url: '/',
        handler: addExercicio,
    },
    {
        method: 'POST',
        url: '/treino',
        handler: addExercicioInTreino,
    },
    {
        method: 'DELETE',
        url: '/treino',
        handler: deleteExercicioTreino,
    },
    {
        method: 'PATCH',
        url: '/treino',
        handler: updateExercicioTreino,
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deleteExercicio,
    },
]
