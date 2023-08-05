//This is the Home Page of the Web App
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession(); //Grabs the session data from Next Auth
  // console.log({session});
  
  return (
    <Layout>
      <div className="text-sky-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <div className="flex bg-gray-200 text-black gap-1 items-center p-3 rounded-md">
          <img src={session?.user?.image} alt="User-Image" className="w-7 h-7 rounded-full"/>

          <span className="font-bold">
            {session?.user?.name}
          </span>
        </div>

        
      </div>
    </Layout>
  )
}
