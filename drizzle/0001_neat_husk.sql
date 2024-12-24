PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_facility` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`address` text,
	`phone` text,
	`active` integer DEFAULT 1
);
--> statement-breakpoint
INSERT INTO `__new_facility`("id", "name", "description", "address", "phone", "active") SELECT "id", "name", "description", "address", "phone", "active" FROM `facility`;--> statement-breakpoint
DROP TABLE `facility`;--> statement-breakpoint
ALTER TABLE `__new_facility` RENAME TO `facility`;--> statement-breakpoint
PRAGMA foreign_keys=ON;