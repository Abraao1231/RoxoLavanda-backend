import { AddTreino, deletetreino, updateTreino } from "../controller/treinoController"

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
    }
]
