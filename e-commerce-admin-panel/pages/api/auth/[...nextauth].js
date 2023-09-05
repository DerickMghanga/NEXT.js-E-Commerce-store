import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongobd'

const adminEmails = ['derickmghanga3329@gmail.com']; //Allowed email address to access Admin Dashboard

export const authOptions = {   //also used in tha categories api
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user}) => {
      // console.log({session, token, user})
      if ( adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
      
    },
  },
}

export default NextAuth(authOptions);


//function to check if its the admin making the request on the api's
export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions)
  // console.log(session);

  if (!adminEmails.includes(session?.user?.email))  {
    res.status(401);   //  Uauthorized status code
    res.end();
  }
}
