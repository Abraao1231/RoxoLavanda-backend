import { addExercicio, addExercicioInTreino, deleteExercicio, deleteExercicioTreino, getAllExercicios, getExercicioTreino, getOneExercicioTreino, updateExercicioTreino } from "../controller/ExercicioController"
import { getExercicioTreinoEschema, getTreinoSchema } from "../schemas/TreinoSchema"

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
    {
        method: 'GET',
        url: '/',
        handler: getAllExercicios ,
    },
    {
        method: 'GET',
        url: '/treino',
        handler: getExercicioTreino,
        eschema: getTreinoSchema
    },
    {
        method: 'GET',
        url: '/oneExercicio',
        handler: getOneExercicioTreino,
        eschema: getTreinoSchema
    },
]
