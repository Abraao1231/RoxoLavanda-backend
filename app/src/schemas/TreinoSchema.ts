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
      