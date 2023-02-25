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
  const response = await fetch(`${process.env.BASE_URL}/api/post`);
  const posts: Post[] = await response.json();
  return { props: { posts } };
}

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} href={`posts/${post.id}`}>
          <div className="bg-red-500 my-5 text-center w-1/2 mx-auto">
            <strong>{post.title}</strong> by {post.first_name} {post.last_name}
          </div>
        </Link>
      ))}
    </div>
  );
}
