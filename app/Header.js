import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex justify-between items-center py-10  px-4">
      <Link href="/">
        <button className="text-lg font-poppins font-medium">
          Creative Minds
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        <Link href={"/auth/login"}>
          <div className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
            Join Now
          </div>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
