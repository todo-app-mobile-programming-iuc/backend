ALTER TABLE `entrance` RENAME TO `cage`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cage` (
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
INSERT INTO `__new_cage`("id", "facility_id", "cage_name", "stock_number", "count", "unit_mass", "biomass", "from_place", "from_cage", "is_local", "date_in") SELECT "id", "facility_id", "cage_name", "stock_number", "count", "unit_mass", "biomass", "from_place", "from_cage", "is_local", "date_in" FROM `cage`;--> statement-breakpoint
DROP TABLE `cage`;--> statement-breakpoint
ALTER TABLE `__new_cage` RENAME TO `cage`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `cage_cage_name_unique` ON `cage` (`cage_name`);