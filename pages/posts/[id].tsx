import { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

interface Post {
  id: string;
  title: string;
  content: string;
  first_name: string;
  last_name: string;
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}/api/post`);
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
    `${process.env.BASE_URL}/api/post/${context.params.id}`
  );
  const post: Post = await response.json();
  return { props: { post } };
}

export default function IndividualPost({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>This is a post!</h1>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>
        {post.first_name} {post.last_name}
      </p>
    </div>
  );
}
