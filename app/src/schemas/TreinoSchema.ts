export const getTreinoSchema = {
  querystring: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
      },
    } 
  }
  
export const getExercicioTreinoEschema = {
  body: {
    type: 'object',
    
    properties: {
      id: { type: 'string' }
      },
  } 
}

export const createTreinoSchema = {
  body : {
    type: 'object',
    properties: {
      "nome": { type: 'string' },
      "intervalo": { type: 'number' },
      "exercicios": [{
        "exericioId": "19e50703-07d0-49ee-a958-85f22e1eec67",
        "numeroRep":  { type: 'number' },
        "intervalo":  { type: 'number' },
        "numeroSer":  { type: 'number' },
      }]
    }
  }
}
export const updatetreinoSchema = {
  body : {
    type: 'object',
    properties: {
      "nome": { type: 'string' },
      "intervalo": { type: 'number' },
    }
  }
}