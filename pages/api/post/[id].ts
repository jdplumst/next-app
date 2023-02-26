// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/script";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  try {
    const post = await prisma.post.findFirstOrThrow({ where: { id: id } });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}
