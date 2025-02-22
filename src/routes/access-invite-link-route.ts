import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/invites/:subscriberId',
        {
            schema: {
                summary: 'Access invite link and redirects user',
                tags: ['referral'],
                params: z.object({
                    subscriberId: z.string(),
                }),
                querystring: z.object({
                    redirectCount: z.number().optional(),
                }),
                response: {
                    302: z.object({
                        302: z.null(),
                    }),
                    500: z.object({
                        error: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { subscriberId } = request.params
            const { redirectCount } = request.query

            try {
                if (redirectCount && redirectCount >= 1) {
                    return reply.status(400).send({ error: 'Too many redirects' })
                }
                await accessInviteLink({ subscriberId })

                const redirectUrl = new URL(`${env.WEB_URL}/invites/${subscriberId}`)

                redirectUrl.searchParams.set('redirectCount', (redirectCount ? redirectCount + 1 : 1).toString())

                return reply.redirect(redirectUrl.toString(), 302)
            } catch (error) {
                console.error('Error processing the invitation:', error)
                return reply.status(500).send({ error: 'Internal Server Error' })
            }
        }
    )
}
