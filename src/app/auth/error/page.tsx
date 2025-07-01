import Link from "next/link";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AuthError({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { error } = await searchParams;
	return (
		<>
			<CardHeader>
				<CardTitle>Authentication Error</CardTitle>
				<CardDescription>Something went wrong authenticating:</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<div className="flex flex-col items-center justify-center gap-4">
					{error ? <span className="font-bold font-mono text-destructive">{error}</span> : null}
					<Link href="/">Home</Link>
				</div>
			</CardContent>
		</>
	);
}
