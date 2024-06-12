import { FastifyInstance } from "fastify";
import { prefixUser, routesUser } from "./userRouters";
import { AuthPrefix, AuthRoutes } from "./authRoutes";
import { TreinoRoutes, TreinoPrefix } from "./treinoRoutes";
import { exercicioRoutes, exercicioPrefix } from "./ExercicioRouters";

export async function appRoutes(app: FastifyInstance){
  
    register(app, AuthRoutes, AuthPrefix)
    register(app, routesUser, prefixUser)
    register(app, TreinoRoutes, TreinoPrefix)
    register(app, exercicioRoutes, exercicioPrefix)

}
function register(app: FastifyInstance, routes, prefix: string){
    
    routes.forEach((route, index)=>{    
        route.url = prefix + route.url;
        app.route(route)
    })
}