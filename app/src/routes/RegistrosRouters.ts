import { getRegistroTreino, createRegistroExercicio, createRegistroTreino } from "../controller/RegistroController"
export const prefixRegistro = '/registro'
export const routesRegistro = [
    {
        method: 'GET',
        url: '/treino',
        handler: getRegistroTreino,
    },
    {
        method: 'POST',
        url: '/treino',
        handler: createRegistroTreino,
    },
    {
        method: 'POST',
        url: '/exercicio',
        handler: createRegistroExercicio,
    },
    
]