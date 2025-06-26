import { Sparkle } from "lucide-react";
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function StarlightIcon(props: Props) {
	return <Sparkle {...props} stroke="#f9e2af" />;
}
