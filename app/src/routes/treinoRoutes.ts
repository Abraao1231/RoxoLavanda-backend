import { AddTreino } from "../controller/treinoController"

export const prefix = '/treino'

export const routes = [
    {
        method: 'POST',
        url: '/',
        handler: AddTreino,
    },
]
