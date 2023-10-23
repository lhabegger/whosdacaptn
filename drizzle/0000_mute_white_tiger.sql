CREATE TABLE `games` (
	`id` integer PRIMARY KEY NOT NULL,
	`game_uid` text NOT NULL,
	`player_name` text NOT NULL,
	`score` integer NOT NULL,
	`location` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
