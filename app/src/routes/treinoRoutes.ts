import { AddTreino, deletetreino, getAlltreinos, getTreino, updateTreino } from "../controller/treinoController"
import { getTreinoSchema } from "../schemas/TreinoSchema"

export const TreinoPrefix = '/treino'

export const TreinoRoutes = [
    {
        method: 'POST',
        url: '/',
        handler: AddTreino,
    },
    {
        method: 'DELETE',
        url: '/',
        handler: deletetreino,
    },
    {
        method: 'PATCH',
        url: '/',
        handler: updateTreino,
    },
    {
        method: 'GET',
        url : '/',
        handler: getTreino,
        schema: getTreinoSchema
    },
    {
        method: 'GET',
        url : '/all',
        handler: getAlltreinos,
    }

]
