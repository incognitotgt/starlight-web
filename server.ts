import { createServer } from "node:http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const port = Number.parseInt(process.env.PORT as string) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";
console.log(`✨ Starlight: Starting ${dev ? "development" : "production"} server...`);
const httpServer = createServer();
const app = next({
	dev,
	port,
	httpServer,
	hostname,
	turbopack: process.argv.includes("--turbopack"),
	customServer: true,
});
await app.prepare()
const nextRequest = app.getRequestHandler();
const nextUpgrade = app.getUpgradeHandler();
httpServer
	.on("request", nextRequest)
	.on("upgrade", (req, socket, head) => {
		if (req.url?.startsWith("/api/signaling")) {
			console.log("implementation? never heard of it")
		} else {
			nextUpgrade(req, socket, head);
		}
	})
	.listen(port, () => {
		console.log(`✨ Starlight: Server listening on ${hostname}:${port}`);
	});
