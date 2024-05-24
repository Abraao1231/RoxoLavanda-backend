import { FastifyInstance } from "fastify";
import { prefixUser, routesUser } from "./userRouters";

export async function appRoutes(app: FastifyInstance){

    register(app, routesUser, prefixUser)
    
}
function register(app: FastifyInstance, routes, prefix){
    routes.forEach((route, index)=>{    
        route.url = prefix + route.url;
        app.route(route)
    })
}