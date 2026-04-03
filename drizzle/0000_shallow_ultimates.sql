CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fullName` text NOT NULL,
	`phoneNumber` text NOT NULL,
	`firstTime` text NOT NULL,
	`plate` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch())
);
