import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout( {children} ) {
  const { data: session } = useSession();

  if (!session) {
    return (
    <div className='bg-blue-700 w-screen h-screen flex items-center'>

      <div className="text-center w-full">
        <button onClick={() => signIn('google')} className='bg-white p-1 px-2 rounded-lg'>
          Log in with Google
        </button>
      </div>

    </div>
    )
  }
  return (
  <div className="bg-sky-700 min-h-screen flex">
    <Nav />
    <div className="bg-white flex-grow my-1 mr-1 rounded-md p-2">
        {children}
    </div>
    
  </div>
  )
}
