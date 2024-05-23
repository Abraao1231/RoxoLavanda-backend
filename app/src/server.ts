import fastifyJwt from "@fastify/jwt";
import Fastfy from 'fastify'
import cors from '@fastify/cors'
import { prefix, routes } from "./routes/userRouters";


const app = Fastfy();

app.register(cors, {})
app.register(fastifyJwt, {
    secret: String(process.env.JWT_SECRET)
})

routes.forEach((route, index)=>{    
    route.url = prefix + route.url;
    app.route(route)
})
app.listen({
    host: "0.0.0.0",
    port: 3333
}).then(()=> {
    console.log(`HTTP SERVER RUNNING ON ${3333}`);
    
})