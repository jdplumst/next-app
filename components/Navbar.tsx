import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-around my-10">
        <Link href="/">
          <div className="mr-10">Home</div>
        </Link>
        <Link href="/posts">
          <div className="mr-10">Posts</div>
        </Link>
      </nav>
      <hr></hr>
    </>
  );
};

export default Navbar;
