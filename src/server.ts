import { env } from "./env";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import  { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscription-to-event-route";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Configuração dos compilers para validação e serialização
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Habilita CORS
app.register(fastifyCors);

// Configuração do Swagger (Documentação)
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "NLW 7 - Connect",
            version: "0.0.1",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

// Registra as rotas
app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute)

// Inicia o servidor
app.listen({ port: env.PORT || 3333 })
    .then(() => console.log(`🚀 Server is running on http://localhost:${env.PORT}`))
    .catch((err) => {
        console.error("❌ Error to init server:", err);
        process.exit(1);
});
