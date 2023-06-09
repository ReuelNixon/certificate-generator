import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const res = await fetch(
					`${process.env.NEXTAUTH_URL}/api/login`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username: credentials?.username,
							password: credentials?.password,
						}),
					}
				);

				const user = await res.json();

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 10 * 24 * 60 * 60, // 10 days
	},
});

export { handler as GET, handler as POST };
