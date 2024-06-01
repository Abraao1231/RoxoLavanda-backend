import fastifyJwt from "@fastify/jwt";
import Fastfy from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from "./routes";
import fastify from "fastify";


const app = Fastfy();

app.register(cors, {})
app.register(fastifyJwt, {
    secret: String(process.env.SECRET_JWT)
})

app.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

app.register(appRoutes)

app.listen({
    host: "0.0.0.0",
    port: 3333
}).then(()=> {
    console.log(`HTTP SERVER RUNNING ON ${3333}`);
    
})
