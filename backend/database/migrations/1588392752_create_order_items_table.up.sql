CREATE TABLE `order_items` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT(20) NOT NULL,
    `product_id` BIGINT(20) NOT NULL,
    `qty` INT NOT NULL,
    `discount` FLOAT DEFAULT 0,
    `price` FLOAT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`)
);