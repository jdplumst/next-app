import { useState } from "react";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  const createPost = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: content,
          first_name: firstName,
          last_name: lastName
        })
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="my-5">
        <label className="text-right w-20 inline-block">Title</label>
        <input
          onInput={handleTitle}
          value={title}
          className="border-2 border-black ml-4"></input>
      </div>
      <div className="my-5">
        <label className="text-right w-20 inline-block">Content</label>
        <input
          onInput={handleContent}
          value={content}
          className="border-2 border-black ml-4"></input>
      </div>
      <div className="my-5">
        <label className="text-right w-20 inline-block">First Name</label>
        <input
          onInput={handleFirstName}
          value={firstName}
          className="border-2 border-black ml-4"></input>
      </div>
      <div className="my-5">
        <label className="text-right w-20 inline-block">Last Name</label>
        <input
          onInput={handleLastName}
          value={lastName}
          className="border-2 border-black ml-4"></input>
      </div>
      <button onClick={createPost} className="bg-teal-500 w-fit p-4">
        Add New Post
      </button>
    </div>
  );
}
