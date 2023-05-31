import { database } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface RequestBody {
	username: string;
	password: string;
}

export async function POST(req: Request) {
	const body: RequestBody = await req.json();
	const { username, password } = body;
	console.log("username:", username);
	console.log("password:", password);
	// const docRef = doc(database, "admins", username);
	// const docSnapshot = await getDoc(docRef);
	// if (docSnapshot.exists()) {
	// 	const userData = docSnapshot.data();
	// 	const storedPassword = userData.password;
	// 	if (password === storedPassword) {
	// 		console.log("Password matches");
	// 		return new Response(JSON.stringify(userData));
	// 	} else {
	// 		console.log("Password does not match");
	// 		return new Response(null);
	// 	}
	// } else {
	// 	console.log("User not found");
	// 	return new Response(null);
	// }
	const adminsRef = collection(database, "admins");
	try {
		const admins = await getDocs(adminsRef);
		const data = admins.docs.map((doc) => doc.data());
		for (const admin of data) {
			if (admin.username === username && admin.password === password) {
				console.log("Password matches");
				return new Response(JSON.stringify(admin));
			}
		}
		console.log("Password does not match");
		return new Response(null);
	} catch (e) {
		console.log(e);
		return new Response(null);
	}
}
