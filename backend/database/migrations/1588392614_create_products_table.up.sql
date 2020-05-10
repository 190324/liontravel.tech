CREATE TABLE `products`
(
    `id`         BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `no`         VARCHAR(30)  NOT NULL,
    `user_id`    BIGINT(20)   NOT NULL,
    `name`       VARCHAR(100) NOT NULL,
    `qty`        INT       DEFAULT 0,
    `list_price` FLOAT        NULL,
    `sale_price` FLOAT        NOT NULL,
    `brief`      TEXT         NULL,
    `desp`       TEXT         NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP    NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`no`)
);
