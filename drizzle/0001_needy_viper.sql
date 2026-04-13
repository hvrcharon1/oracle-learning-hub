CREATE TABLE `chat_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diagrams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`svg_content` text,
	`image_url` varchar(500),
	`related_module_id` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `diagrams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`subcategory` varchar(100),
	`content` text,
	`official_doc_link` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news_feed` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`content` text,
	`category` varchar(100) NOT NULL,
	`source_url` varchar(500) NOT NULL,
	`source_type` varchar(50) NOT NULL,
	`published_date` timestamp NOT NULL,
	`fetched_at` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `news_feed_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`resource_type` varchar(50) NOT NULL,
	`url` varchar(500) NOT NULL,
	`author` varchar(255),
	`published_date` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `search_index` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content_type` varchar(50) NOT NULL,
	`content_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`keywords` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `search_index_id` PRIMARY KEY(`id`)
);
