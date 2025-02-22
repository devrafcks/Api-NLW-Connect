import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribe-to-event";

// Definição do esquema de validação com Zod
const subscriptionSchema = {
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        referrer: z.string().optional()
    }),
    response: {
        201: z.object({
            subscriberId: z.string()
        }),
        500: z.object({
            error: z.string(),
        }),
    },
};

// Definição da rota
export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/subscriptions', {
        schema: {
            ...subscriptionSchema,
            summary: "Subscribe someone to the event",
            tags: ["Subscription"],
        }
    }, async (req, res) => {
        try {
            const { name, email, referrer } = req.body;
            
            const { subscriberId } = await subscribeToEvent({
                name,
                email,
                referrerId: referrer,
            })

            console.log(`✅ New user subscribed: ${name} - ${email}`);

            return res.status(201).send({ subscriberId });

        } catch (error) {
            console.error("Error processing request:", error);
            return res.status(500).send({ error: "Internal server error" });
        }
    });
};