import { VercelRequest, VercelResponse } from "@vercel/node";

export default function (req: VercelRequest, res: VercelResponse) {
    return res.redirect("https://discord.com/oauth2/authorize?client_id=1225139300015018185&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord&scope=identify");
}