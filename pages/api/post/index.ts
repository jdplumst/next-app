// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma/script";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "bson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    case "POST":
      const { title, content, firstName, lastName } = req.body;
      try {
        const post = await prisma.post.create({
          data: {
            title: title,
            content: content,
            first_name: firstName,
            last_name: lastName
          }
        });
        return res.status(200).json(post);
      } catch (err) {
        return res.status(400).json({ error: err });
      }
  }
}
