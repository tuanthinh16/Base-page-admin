import NextAuth from "next-auth/next";
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ACCOUNT_GET } from "@/app/apiRequestUri/route";
import axios from "axios";


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET;
const handler =  NextAuth({
  secret: NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages:{
    signIn:"/login"
  },
  providers: [
    GoogleProvider({
      name:'google',
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      
      async authorize(credentials: any) {
        try {
          const APIURL = ACCOUNT_GET + `username=${credentials.username}`;
            const response = await axios.get(APIURL,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            
            if(response.status === 200){
                const user = response.data;
                console.log("__USER",user)
                if (user) {
                    if (user[0]['password'] == credentials.password) {
                      return user[0];
                    }else{
                      throw new Error("Wrong password");
                    }
                  }
            }
        }
        catch (err: any) {
          console.error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }:any) {
      // Include additional user information in the session
      if(token){
        session.username = token.username;
        session.role = token.role;
      }
      return session;
    },
    async jwt({token,user}:any){
      if(user){
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    }
  },

});
export { handler as GET, handler as POST }