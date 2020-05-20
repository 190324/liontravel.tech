CREATE TABLE `products`
(
    `id`         BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `no`         VARCHAR(30)  NOT NULL,
    `user_id`    BIGINT(20)   NOT NULL,
    `name`       VARCHAR(100) NOT NULL,
    `brief`      TEXT         NULL,
    `desp`       TEXT         NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP    NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`no`)
);

CREATE TABLE `product_skus`
(
    `id`         BIGINT(20) NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT(20) NOT NULL,
    `qty`        INT       DEFAULT 0,
    `list_price` FLOAT      NULL,
    `sale_price` FLOAT      NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP  NULL,
    PRIMARY KEY (`id`),
);

CREATE TABLE `product_sku_items`
(
    `id`         BIGINT(20) NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT(20) NOT NULL,
    `qty`        INT       DEFAULT 0,
    `cost_price` FLOAT      NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP  NULL,
    PRIMARY KEY (`id`),
);

