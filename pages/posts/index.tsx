import Navbar from "@/components/Navbar";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import prisma from "@/prisma/script";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticProps() {
  try {
    const posts: Post[] = await prisma.post.findMany();
    return { props: { posts } };
  } catch (err) {
    throw err;
  }
}

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [statePosts, setStatePosts] = useState(posts);

  const deletePost = async (id: string) => {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    setStatePosts((prevStatePosts) =>
      prevStatePosts.filter((post) => post.id !== data.id)
    );
    return data;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center">
        {statePosts.map((post) => (
          <div key={post.id} className="flex justify-center my-5">
            <Link href={`posts/${post.id}`} className="w-1/2">
              <div className="bg-purple-500 my-5 text-center">
                <strong>{post.title}</strong> by {post.first_name}{" "}
                {post.last_name}{" "}
              </div>
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 ml-10 w-20">
              Delete
            </button>
          </div>
        ))}
        <Link href={"posts/new"} className="w-fit mx-auto">
          <button className="bg-teal-500 p-4">Create New Post</button>
        </Link>
      </div>
    </>
  );
}
