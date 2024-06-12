import { AddTreino, deletetreino, getAlltreinos, getTreino, updateTreino } from "../controller/treinoController"
import { getTreinoSchema, updatetreinoSchema } from "../schemas/TreinoSchema"

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
        schema: getTreinoSchema

    },
    {
        method: 'PATCH',
        url: '/',
        handler: updateTreino,
        schema: updatetreinoSchema

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
        schema: getTreinoSchema
    }

]
