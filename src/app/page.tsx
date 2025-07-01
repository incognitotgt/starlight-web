import { CheckCircle, LayoutDashboard, LogOut, MonitorSmartphone, Signpost } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, unstable_rethrow } from "next/navigation";
import { StarlightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<main className="flex flex-col justify-center items-center px-20 pt-8 h-screen">
			<div className="flex flex-row gap-2 items-center">
				<StarlightIcon className="size-8" />
				<h1 className="font-bold text-4xl">Starlight</h1>
			</div>
			<div className="pt-10 max-w-2xl text-center">
				<p>
					Starlight is a secure VNC connector that enables remote access to your systems, no matter where you are in the
					world, without compromising security.
				</p>
				<div className="flex flex-wrap gap-6 py-4 justify-center">
					{[
						{
							title: "Access Anywhere",
							description: "Connect to your systems from any device with an internet connection",
							Icon: MonitorSmartphone,
						},

						{
							title: "Compatible Anywhere",
							description: "Starlight simply interfaces with your existing VNC server with a lightweight agent",
							Icon: CheckCircle,
						},
					].map((feature) => (
						<Card key={feature.title} className="w-72 h-36 flex justify-center">
							<CardHeader>
								<CardAction>
									<feature.Icon className="size-8" />
								</CardAction>
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
				<Separator />
				{session ? (
					<div className="flex flex-col gap-2 py-2 font-bold">
						Welcome, {session.user.name || session.user.email.split("@")[0]}
						<Button asChild size="lg">
							<Link href="/app">
								<LayoutDashboard />
								Dashboard
							</Link>
						</Button>
						<Button asChild size="lg" variant="secondary">
							<Link href="/auth/signout">
								<LogOut />
								Sign Out
							</Link>
						</Button>
					</div>
				) : (
					<form
						action={async () => {
							"use server";
							try {
								const res = await auth.api.signInSocial({
									body: {
										provider: "github",
									},
								});
								if (!res.url) throw new Error("No URL returned");
								const url = new URL(res.url);
								const { get } = await headers();
								const proto = get("x-forwarded-proto");
								const host = get("x-forwarded-host");
								const redirect_uri = new URL(url.searchParams.get("redirect_uri") as string);
								if (proto && host) {
									redirect_uri.protocol = proto;
									redirect_uri.host = host;
									redirect_uri.port = ""; // normally when those headers exist it's from behind a reverse proxy that goes to 443 or wtv the default port is
								}
								url.searchParams.set("redirect_uri", redirect_uri.href);
								redirect(url.href);
							} catch (error) {
								unstable_rethrow(error);
								redirect(`/auth/signin?error=${(error as Error).message}`);
							}
						}}
						className="flex flex-col gap-2 py-2 font-bold"
					>
						<Button type="submit" size="lg">
							<Signpost />
							Sign up/log in
						</Button>
					</form>
				)}
			</div>
		</main>
	);
}
export const experimental_ppr = true;
