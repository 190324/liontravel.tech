CREATE TABLE `carts`
(
    `id`         BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `no`         VARCHAR(30) NOT NULL,
    `user_id`    BIGINT(20)  NOT NULL,
    `product_id` BIGINT(20)  NOT NULL,
    `qty`        INT       DEFAULT 1,
    `next`       TINYINT   DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP   NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`no`)
);
