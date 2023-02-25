// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/script";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}
