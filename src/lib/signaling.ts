import { useCallback, useEffect, useRef, useState } from "react";

export function useSignaling(onMessage: (msg: any) => void) {
	const wsRef = useRef<WebSocket | null>(null);
	const connectedRef = useRef(false);

	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const wsUrl = typeof window !== "undefined" ? `${window.location.origin.replace(/^http/, "ws")}/api/signaling` : "";

		const ws = new WebSocket(wsUrl);
		wsRef.current = ws;

		ws.onopen = () => {
			connectedRef.current = true;
			setConnected(true);
		};

		ws.onclose = () => {
			connectedRef.current = false;
			setConnected(false);
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				onMessage(data);
			} catch {
				onMessage(event.data);
			}
		};

		ws.onerror = (err) => {
			console.error("WebSocket error:", err);
		};

		return () => {
			ws.close();
		};
	}, [onMessage]);

	const send = useCallback((msg: Parameters<InstanceType<typeof WebSocket>["send"]>[0]) => {
		if (wsRef.current && connectedRef.current) {
			wsRef.current.send(msg);
		}
	}, []);

	return { send, connected };
}
