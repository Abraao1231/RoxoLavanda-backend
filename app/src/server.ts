import fastifyJwt from "@fastify/jwt";
import Fastfy from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from "./routes";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = Fastfy();



const swaggerOptions = {
    exposeRoute: true,
    swagger: {
        info: {
            title: "Roxo Lavanda API",
            description: "My Description.",
            version: "1.0.0",
        },
        host: "localhost:3333",
        consumes: ["application/json"],
        produces: ["application/json"],
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};
app.register(cors, {})
app.register(fastifyJwt, {
    secret: String(process.env.SECRET_JWT)
})
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);




app.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

app.get(`/`, async function (request, reply) {
    reply.redirect("docs")
})

app.register(appRoutes)
app.listen({
    host: "0.0.0.0",
    port: 3333
}).then(()=> {
    console.log(`HTTP SERVER RUNNING ON ${3333}`);
    
})
