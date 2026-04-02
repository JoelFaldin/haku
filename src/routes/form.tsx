import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/form")({
	component: RouteComponent,
});

function RouteComponent() {
	const [checkedBox, setCheckedBox] = useState(2);

	return (
		<section className="flex flex-col justify-center items-center gap-5 h-dvh">
			<span className="flex flex-col gap-2 justify-center items-center">
				<h1 className="display-title mb-5 mt-2 text-4xl leading-[1.02] font-bold tracking-tight text-(--sea-ink)">
					¡Bienvenido!
				</h1>
				<p className="max-w-xs text-pretty">
					Por favor, indica los siguientes datos antes de continuar. No
					compartiremos esta información con nadie.
				</p>
			</span>

			<form className="flex flex-col gap-4 items-center">
				<label htmlFor="nombre" className="flex flex-col w-xs">
					<span>Nombre completo:</span>
					<input id="nombre" type="text" className="border" />
				</label>

				<label htmlFor="phone" className="flex flex-col gap-2 w-xs">
					<span className="w-full">
						Número de teléfono:
						<input id="phone" type="text" className="border w-full" />
					</span>

					<span className="max-w-xs text-sm">
						Sólo usaremos tu número para enviarte un mensaje en caso de
						necesitar mover tu vehículo.
					</span>
				</label>

				<div className="w-xs">
					<span>¿Es tu primera vez por aquí?</span>
					<div className="flex flex-row gap-2">
						<label htmlFor="cbox1" className="flex flex-row gap-2">
							<span>Sí</span>
							<input
								type="radio"
								name="first?time"
								id="cbox1"
								value="first_checkbox"
								checked={checkedBox === 1}
								onChange={() => setCheckedBox(2)}
							/>
						</label>
						<label htmlFor="cbox2" className="flex flex-row gap-2">
							<span>No</span>
							<input
								type="radio"
								name="first?time"
								id="cbox2"
								value="second_checkbox"
								checked={checkedBox === 2}
								onChange={() => setCheckedBox(1)}
							/>
						</label>
					</div>
				</div>

				<label htmlFor="plate" className="flex flex-col w-xs">
					<span>Indica la patente de tu vehículo:</span>
					<input id="plate" type="text" className="border" />
				</label>
			</form>
		</section>
	);
}
