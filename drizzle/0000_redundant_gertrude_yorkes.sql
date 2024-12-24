CREATE TABLE `entrance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`facility_id` integer,
	`cage_name` text NOT NULL,
	`stock_number` text,
	`count` integer,
	`unit_mass` integer,
	`biomass` integer,
	`from_place` text,
	`from_cage` text,
	`is_local` text,
	`date_in` text,
	FOREIGN KEY (`facility_id`) REFERENCES `facility`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entrance_cage_name_unique` ON `entrance` (`cage_name`);--> statement-breakpoint
CREATE TABLE `facility` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`address` text,
	`phone` text,
	`actaaive` integer
);
