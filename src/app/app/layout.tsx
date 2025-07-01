import { headers } from "next/headers";
import Navigation from "@/components/navigation";
import { auth } from "@/lib/auth";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const userSession = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<main className="h-[95vh]">
			<Navigation session={userSession} />
			{children}
		</main>
	);
}
