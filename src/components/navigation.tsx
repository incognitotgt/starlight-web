"use client";
import { LogOut, Monitor, SwatchBook } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { SessionSchema } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { StarlightIcon } from "./icons";

export default function Navigation({ session }: { session: SessionSchema | null }) {
	const { name, email, image } = session?.user || {};
	const { themes, setTheme, theme: currentTheme } = useTheme();
	const pathname = usePathname();
	const navigationItems: {
		icon: React.ReactNode;
		label: string;
		href: Route;
	}[] = [
		{
			icon: <Monitor />,
			label: "Servers",
			href: "/app",
		},
	];
	return (
		<nav className="flex h-16 min-w-full items-center justify-between px-4 border-b">
			<div className="flex items-center gap-2">
				<StarlightIcon className="size-8" />
				<span className="text-2xl font-bold md:block hidden mr-2">Starlight</span>
			</div>
			<div className="flex justify-end gap-5">
				<NavigationMenu>
					<NavigationMenuList>
						{navigationItems.map((item) => (
							<NavigationMenuItem key={item.href}>
								<NavigationMenuLink
									asChild
									className={cn(
										pathname.startsWith(item.href) && "bg-muted",
										"inline-flex flex-row gap-2 items-center",
									)}
								>
									<Link href={item.href}>
										{item.icon} {item.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={image || ""} alt={name || email || "Profile Picture"} />
							<AvatarFallback>{name ? name?.charAt(0) + name?.charAt(1) : email?.charAt(0)}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-4 mt-4 w-48">
						<DropdownMenuLabel className="flex flex-col">
							<span className="flex flex-row items-center justify-between gap-1">
								<p className="text-lg">{name || email?.split("@")[0]}</p>
							</span>
							<p className="text-xs font-light text-muted-foreground">{email}</p>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<SwatchBook className="size-4 mr-2" />
								<span>Theme</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuRadioGroup value={currentTheme} onValueChange={setTheme}>
										{themes.map((theme) => (
											<DropdownMenuRadioItem key={theme} value={theme}>
												{theme.charAt(0).toUpperCase() + theme.slice(1)}
											</DropdownMenuRadioItem>
										))}
									</DropdownMenuRadioGroup>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem asChild>
							<Link href="/auth/signout">
								<LogOut className="size-4 mr-2" />
								<span>Sign Out</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
