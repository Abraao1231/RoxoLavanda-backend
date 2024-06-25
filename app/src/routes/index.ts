import { FastifyInstance } from "fastify";
import { prefixUser, routesUser } from "./userRouters";
import { AuthPrefix, AuthRoutes } from "./authRoutes";
import { TreinoRoutes, TreinoPrefix } from "./treinoRoutes";
import { exercicioRoutes, exercicioPrefix } from "./ExercicioRouters";
import { prefixRegistro, routesRegistro } from "./RegistrosRouters";
const mainRoute = 
    {
        method: 'GET',
        url : '/',
        handler: async (request, reply)=> {
            reply.redirect('/docs')
        },
}

export async function appRoutes(app: FastifyInstance){
    
    register(app, AuthRoutes, AuthPrefix)
    register(app, routesUser, prefixUser)
    register(app, TreinoRoutes, TreinoPrefix)
    register(app, exercicioRoutes, exercicioPrefix)
    register(app, routesRegistro, prefixRegistro)

}
function register(app: FastifyInstance, routes, prefix: string){
    // app.route(mainRoute)
    routes.forEach((route, index)=>{    
        route.url = prefix + route.url;
        app.route(route)
    })
}