import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalendarCog, GitCommit } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Starlight",
	description: "Simple, effortless remote desktop",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					themes={["light", "dark"]}
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<footer className="flex justify-center items-center flex-row gap-4 bg-sidebar p-4 h-12">
						<Button asChild variant="link">
							<Link
								className="flex flex-row gap-1"
								href={`https://github.com/incognitotgt/starlight-web/commit/${process.env.GIT_COMMIT}`}
							>
								<GitCommit />
								{process.env.GIT_COMMIT?.slice(0, 7)}
							</Link>
						</Button>
						<div className="flex flex-row gap-1">
							<CalendarCog />
							{new Date(Number(process.env.BUILD_DATE)).toLocaleString()}
						</div>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
