CREATE TABLE `categories` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `no` VARCHAR(30) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `parent_id` BIGINT(20) DEFAULT 0,
    `seq` BIGINT(20) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`no`)
);