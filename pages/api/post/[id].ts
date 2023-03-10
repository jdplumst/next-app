// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/script";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  switch (req.method) {
    case "GET":
      try {
        const post = await prisma.post.findFirstOrThrow({ where: { id: id } });
        return res.status(200).json(post);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    case "DELETE":
      try {
        const post = await prisma.post.delete({ where: { id: id } });
        return res.status(200).json(post);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    case "PATCH":
      const { title, content, first_name, last_name } = req.body;
      try {
        const post = await prisma.post.update({
          where: { id: id },
          data: {
            title: title,
            content: content,
            first_name: first_name,
            last_name: last_name
          }
        });
        return res.status(200).json(post);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
  }
}
