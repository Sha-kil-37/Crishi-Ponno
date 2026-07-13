import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import UserModel from "@/models/User";
//
const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  //   maxAge: 1 * 60, // 1 minutes
  // },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) {
        return true;
      }
      //
      try {
        await db();
        const normalizedEmail = user.email.toLowerCase();
        const existingUser = await UserModel.findOne({
          email: normalizedEmail,
        });
        //
        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: normalizedEmail,
            image: user.image,
          });
        } else if (user.image) {
          existingUser.image = user.image;
          await existingUser.save();
        }
      } catch (error) {
        // console.error(error);
        return false;
      }
      return true;
    },
  },
});
//
export { handler as GET, handler as POST };
