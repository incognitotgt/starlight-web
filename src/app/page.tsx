import { CheckCircle, MonitorSmartphone, Signpost } from "lucide-react";
import Link from "next/link";
import { StarlightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
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
				<Button asChild size="lg">
					<Link href="/auth/signup">
						<Signpost />
						Get Started
					</Link>
				</Button>
			</div>
		</main>
	);
}
