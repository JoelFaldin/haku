import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { saveFormData } from "./form.server";

const submitFormSchema = z.object({
	fullName: z.string().min(3),
	phoneNumber: z.string().min(6),
	firstTime: z.string().min(2).max(2),
	plate: z.string().min(8).max(8),
	carBrand: z.string().min(2),
	carModel: z.string().min(2),
});

export const submitForm = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => submitFormSchema.safeParse(data))
	.handler(async ({ data }) => {
		if (data.error) {
			return;
		}
		return saveFormData(data.data);
	});
