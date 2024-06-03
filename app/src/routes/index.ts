import { FastifyInstance } from "fastify";
import { prefixUser, routesUser } from "./userRouters";
import { AuthPrefix, AuthRoutes } from "./authRoutes";
export async function appRoutes(app: FastifyInstance){

    register(app, routesUser, prefixUser)
    register(app, AuthRoutes, AuthPrefix)
}
function register(app: FastifyInstance, routes, prefix: string){
    
    routes.forEach((route, index)=>{    
        route.url = prefix + route.url;
        app.route(route)
    })
}