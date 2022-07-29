import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { createOrGetUser } from "../utils";
import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const { userProfile, addUser, removeUser } = useAuthStore();
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchText) {
      router.push(`/search/${searchText}`);
    }
    setSearchText("");
  };

  return (
    <div
      className="w-full flex justify-between items-center 
    border-b-2 border-gray-200 py-2 px-4"
    >
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[30px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="bg-primary p-3 md:text-md font-medium border-2
            border-gray-100 focus:outline-none focus:border-2 hover:border-[#F51997]
            w-[300px] md:w-[350px] rounded-full md:top-0 focus:border-[#F51997]"
            placeholder="Search Videos and Accounts"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 
            border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch className="hover:text-[#F51997]" />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button
                className="border-2 px-2 md:px-4 text-md font-semibold hover:border-[#F51997]
              flex items-center gap-2 hover:text-[#F51997] active:scale-95 transition duration-150 ease-in-out"
              >
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                    // layout="responsive"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2 hover:scale-125 transition duration-150 ease-in-out"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
            }}
            onError={() => {
              console.log("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
