import { InferGetStaticPropsType } from "next";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.BASE_URL}/api/hello`);
  const posts: Post[] = await response.json();
  return { props: { posts } };
}

export default function Posts({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-red-500 my-5 text-center w-1/2 mx-auto">
          <strong>{post.title}</strong> by {post.first_name} {post.last_name}
        </div>
      ))}
    </div>
  );
}
