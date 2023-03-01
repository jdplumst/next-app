import { InferGetStaticPropsType } from "next";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
  const posts: Post[] = await response.json();
  const paths = posts.map((post) => {
    return { params: { id: post.id } };
  });
  return {
    paths,
    fallback: "blocking"
  };
}

export async function getStaticProps(context: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${context.params.id}`
  );
  const post: Post = await response.json();
  return { props: { post } };
}

export default function IndividualPost({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
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
            defaultValue={post.title}
            className="w-1/2 border-2 border-black"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-right w-20 inline-block">Content: </label>
          <input
            defaultValue={post.content}
            className="w-1/2 border-2 border-black"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-right w-20 inline-block">First Name: </label>
          <input
            defaultValue={post.first_name}
            className="w-1/2 border-2 border-black"
          />
        </div>
        <div className="flex gap-4">
          <label className="text-right w-20 inline-block">Last Name: </label>
          <input
            defaultValue={post.last_name}
            className="w-1/2 border-2 border-black"
          />
        </div>
      </div>
    </div>
  );
}
