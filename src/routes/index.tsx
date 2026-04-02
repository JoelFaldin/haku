import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const FORM_URL = `${import.meta.env.VITE_PUBLIC_URL}/form`;

	return (
		<section className="flex items-center justify-center h-screen">
			<QRCodeSVG value={FORM_URL} size={600} />
		</section>
	);
}
