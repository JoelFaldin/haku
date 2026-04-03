import { db } from "#/db";
import { usersTable } from "#/db/schema";

type DataType = {
	fullName: string;
	phoneNumber: string;
	firstTime: string;
	plate: string;
};

export async function saveFormData(data: DataType) {
	return await db.insert(usersTable).values(data);
}
