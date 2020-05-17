CREATE TABLE `categories` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `no` VARCHAR(30) NOT NULL,
    `user_id` BIGINT(20)  DEFAULT 0,
    `name` VARCHAR(30) NOT NULL,
    `image` VARCHAR(255) NULL,
    `parent_id` BIGINT(20) DEFAULT 0,
    `seq` BIGINT(20) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`no`),
    UNIQUE( `user_id`, `name`, `parent_id`, `deleted_at`)
);