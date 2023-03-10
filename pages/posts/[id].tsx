import Navbar from "@/components/Navbar";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import prisma from "@/prisma/script";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticPaths() {
  try {
    const posts: Post[] = await prisma.post.findMany();
    const paths = posts.map((post) => {
      return { params: { id: post.id } };
    });
    return {
      paths,
      fallback: "blocking"
    };
  } catch (err) {
    throw err;
  }
}

export async function getStaticProps(context: any) {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: { id: context.params.id }
    });
    return { props: { post } };
  } catch (err) {
    throw err;
  }
}

export default function IndividualPost({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [firstName, setFirstName] = useState(post.first_name);
  const [lastName, setLastName] = useState(post.last_name);

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleFirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: any) => {
    setLastName(e.target.value);
  };

  const updatePost = async () => {
    const response = await fetch(`/api/post/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        first_name: firstName,
        last_name: lastName
      })
    });
    const data = await response.json();
    return data;
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">This is a post!</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="text-right w-20 inline-block">ID: </label>
            <p>{post.id}</p>
          </div>
          <div className="flex gap-4">
            <label className="text-right w-20 inline-block">Title: </label>
            <input
              onInput={handleTitle}
              value={title}
              className="w-1/2 border-2 border-black"
            />
          </div>
          <div className="flex gap-4">
            <label className="text-right w-20 inline-block">Content: </label>
            <input
              onInput={handleContent}
              value={content}
              className="w-1/2 border-2 border-black"
            />
          </div>
          <div className="flex gap-4">
            <label className="text-right w-20 inline-block">First Name: </label>
            <input
              onInput={handleFirstName}
              value={firstName}
              className="w-1/2 border-2 border-black"
            />
          </div>
          <div className="flex gap-4">
            <label className="text-right w-20 inline-block">Last Name: </label>
            <input
              onInput={handleLastName}
              value={lastName}
              className="w-1/2 border-2 border-black"
            />
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={updatePost} className="bg-purple-500 w-fit p-4">
            Update
          </button>
        </div>
      </div>
    </>
  );
}
