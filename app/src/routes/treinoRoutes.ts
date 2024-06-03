import { AddTreino } from "../controller/treinoController"

export const TreinoPrefix = '/treino'

export const TreinoRoutes = [
    {
        method: 'POST',
        url: '/',
        handler: AddTreino,
    },
]
