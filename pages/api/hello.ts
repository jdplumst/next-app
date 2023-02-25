// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      id: 1,
      title: "First Post!",
      content: "First Post Content",
      first_name: "John",
      last_name: "Doe"
    },
    {
      id: 2,
      title: "Second Post!",
      content: "Second Post Content",
      first_name: "Mary",
      last_name: "Jane"
    }
  ]);
}
