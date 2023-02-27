import { InferGetStaticPropsType } from "next";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
  const posts: Post[] = await response.json();
  return { props: { posts } };
}

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const deletePost = async (id: string) => {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <div>
      {posts.map((post) => (
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
    </div>
  );
}
