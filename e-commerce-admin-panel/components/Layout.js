import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Logo from "./Logo";

export default function Layout( {children} ) {
  const [showNav, setShowNav] = useState(false);  //hamburger menu for mobile menu display

  const { data: session } = useSession();

  if (!session) {
    return (
    <div className='bg-stone-700 w-screen h-screen flex items-center'>

      <div className="text-center w-full">
        <button onClick={() => signIn('google')} className='bg-white p-1 px-2 rounded-lg'>
          Log in with Google
        </button>
      </div>

    </div>
    )
  }

  return (
    <div className="bg-sky-700 min-h-screen ">

      <div className="md:hidden flex items-center p-2">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      

      <div className="flex">
        <Nav show={showNav} />
        <div className="bg-gray-200 flex-grow my-1 m-2 rounded-md p-2">
          {children}
        </div>
      </div>

    </div>
  
  )
}
