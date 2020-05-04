CREATE TABLE `order_logs` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT(20) NOT NULL,
    `type` VARCHAR(50) NOT NULL COMMENT 'status payment',
    `value` VARCHAR(255) NOT NULL,
    `payload` JSON NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`)
);