"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
export function SubmitButton({
	pendingText = "Loading...",
	pendingSpinner = false,
	children,
	...props
}: React.ComponentProps<typeof Button> & { pendingText?: string; pendingSpinner?: boolean }) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending} {...props}>
			{pending ? pendingSpinner ? <Loader2 className="animate-spin" /> : pendingText : children}
		</Button>
	);
}
