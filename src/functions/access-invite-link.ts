import { redis } from '../redis/client';

interface AccessInviteLinkParams {
    subscriberId: string;
}
export async function accessInviteLink({
    subscriberId,
}: AccessInviteLinkParams) {
    console.log(`Incrementing access count for ${subscriberId}`);
    await redis.hincrby('referral:access-count', subscriberId, 1);
}