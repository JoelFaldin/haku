import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { useRef, useState } from "react";

import CameraIcon from "#/components/Icons/CameraIcon";
import SendIcon from "#/components/Icons/SendIcon";
import XIcon from "#/components/Icons/XIcon";
import { submitForm } from "#/utils/form.functions";

export const Route = createFileRoute("/form")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		defaultValues: {
			fullName: "",
			phoneNumber: "",
			firstTime: "",
			plate: "",
			image: null as File | null,
		},
		onSubmit: async ({ value }) => {
			const submitObject = {
				data: {
					fullName: value.fullName,
					phoneNumber: value.phoneNumber,
					firstTime: value.firstTime,
					plate: value.plate,
				},
			};

			await submitForm(submitObject);
		},
	});

	const [picture, setPicture] = useState<string | null>();
	const pictureRef = useRef<HTMLInputElement>(null);

	return (
		<section className="bg-base text-primary h-full flex justify-center items-center">
			<div className="bg-white flex flex-col justify-center items-center gap-5 my-4 rounded-md p-8 shadow-xl">
				<span className="flex flex-col gap-2 justify-center items-center">
					<h1 className="font-fraunces mb-5 mt-2 text-2xl leading-[1.02] font-bold tracking-tight">
						¡Bienvenido!
					</h1>
					<p className="max-w-xs text-sm text-pretty">
						Por favor, indica los siguientes datos antes de continuar. No
						compartiremos esta información con nadie.
					</p>
				</span>

				<form
					className="flex flex-col gap-4 items-center"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
					}}
				>
					<form.Field
						name="fullName"
						children={(field) => (
							<div className="flex flex-col w-xs">
								<span className="text-sm">
									Nombre completo<span className="text-red-400">*</span>:
								</span>

								<input
									type="text"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									required
									className="border-0 focus-visible:ring-1 p-1 shadow-md text-sm"
									placeholder="Ingresa tu nombre"
								/>
							</div>
						)}
					/>

					<form.Field
						name="phoneNumber"
						children={(field) => (
							<div className="flex flex-col gap-2 w-xs">
								<div className="flex flex-col w-full text-sm">
									<span>
										Número de teléfono<span className="text-red-400">*</span>:
									</span>
									<input
										type="text"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										required
										className="border-0 focus-visible:ring-1 p-1 shadow-md text-sm"
										placeholder="Ingresa tu número de teléfono"
									/>
								</div>

								<span className="max-w-xs text-xs">
									Sólo usaremos tu número para enviarte un mensaje en caso de
									necesitar mover tu vehículo.
								</span>
							</div>
						)}
					/>

					<form.Field
						name="firstTime"
						children={(field) => (
							<div className="w-xs text-sm">
								<span>
									¿Es tu primera vez por aquí?
									<span className="text-red-400">*</span>
								</span>
								<div className="flex flex-row gap-2">
									<label htmlFor="cbox1" className="flex flex-row gap-2">
										<span>Sí</span>
										<input
											type="radio"
											name="first?time"
											checked={field.state.value === "Sí"}
											onChange={() => field.handleChange("Sí")}
											onBlur={field.handleBlur}
										/>
									</label>
									<label htmlFor="cbox2" className="flex flex-row gap-2">
										<span>No</span>
										<input
											type="radio"
											name="first?time"
											checked={field.state.value === "No"}
											onChange={() => field.handleChange("No")}
											onBlur={field.handleBlur}
										/>
									</label>
								</div>
							</div>
						)}
					/>

					<form.Field
						name="plate"
						children={(field) => (
							<div className="flex flex-col w-xs">
								<span className="text-sm">
									Indica la patente de tu vehículo
									<span className="text-red-400">*</span>:
								</span>
								<input
									type="text"
									className="w-full border-0 focus-visible:ring-1 p-1 bg-surface shadow-md"
									placeholder="AA-BB-11"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={field.handleBlur}
								/>
							</div>
						)}
					/>

					<form.Field
						name="image"
						children={(field) => (
							<div className="w-full">
								<label htmlFor="image" className="text-primary text-sm">
									Imagen <span>(opcional)</span>:
								</label>
								{picture ? (
									<div className="relative w-32 h-32 mx-auto">
										<Image
											src={picture}
											alt="Preview de la fotografía"
											className="object-cover rounded-xl"
											layout="fullWidth"
										/>
										<button
											type="button"
											onClick={() => {
												field.handleBlur();
												setPicture(null);
											}}
											className="absolute -top-2 -right-2 p-1 rounded-full shadow-md bg-surface-strong"
										>
											<XIcon width={16} height={16} />
										</button>
									</div>
								) : (
									<div
										onClick={() => pictureRef.current?.click()}
										className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition-all hover:opacity-80 bg-surface border border-border-line border-dashed"
									>
										<div className="p-3 rounded-full">
											<CameraIcon />
										</div>
										<span className="text-sm">Añade una fotografía</span>

										<input
											ref={pictureRef}
											type="file"
											accept="image/**"
											onChange={(event) => {
												const file = event.target.files?.[0] || null;
												if (file) {
													field.handleChange(file);

													const reader = new FileReader();
													reader.onload = () => {
														setPicture(reader.result as string);
													};
													reader.readAsDataURL(file);
												}
											}}
											hidden
										/>
									</div>
								)}
							</div>
						)}
					/>

					<button
						type="submit"
						onClick={() => form.handleSubmit()}
						className="w-full p-2 cursor-pointer flex flex-row justify-center items-center gap-2 bg-lagoon/80"
					>
						<SendIcon width={16} height={16} />
						<span className="text-sm">Enviar</span>
					</button>
				</form>
			</div>
		</section>
	);
}
