import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<section className="flex items-center justify-center h-screen">
			<QRCodeSVG value="http://192.168.1.94:3000/" size={600} />
		</section>
	);
}
