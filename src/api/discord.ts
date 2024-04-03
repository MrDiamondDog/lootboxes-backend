import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../prisma";

export default async function (request: VercelRequest, response: VercelResponse) {
    const { code } = request.query;

    if (!code) return response.status(401).json({ error: "Invalid OAuth2 code" })

    const tokenData = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        // @ts-expect-error
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: `http://${process.env.VERCEL_URL}/api/discord`,
            scope: "identify"
        }).toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    const tokenJson = await tokenData.json();

    if (!tokenData.ok) {
        return response.status(500).json({ error: "could not authorize: " + tokenJson.error_description })
    }
    
    const userData = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${tokenJson.access_token}`
        }
    })

    const userJson = await userData.json();

    if (!userData.ok) {
        return response.status(500).json({ error: "could get user: " + tokenJson.error })
    }

    if (await prisma.user.findFirst({ where: { discordId: userJson.id }})) {
        return response.status(200).send("Already authorized.")
    }

    const user = await prisma.user.create({
        data: {
            discordId: userJson.id,
            username: userJson.username,
            globalName: userJson.global_name
        }
    })

    return response.status(200).send(`Logged in successfully!\n<code>id: ${user.id}\ndiscordId: ${user.discordId}\nusername: ${user.username}\nglobalName: ${user.globalName}</code>`);
}