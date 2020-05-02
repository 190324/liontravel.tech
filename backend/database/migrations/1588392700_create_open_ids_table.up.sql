CREATE TABLE `open_ids`
(
    `id`         BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `user_id`    BIGINT(20)   NOT NULL,
    `app_type`   VARCHAR(50)  NOT NULL,
    `app_id`     VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP    NULL,
    PRIMARY KEY (`id`)
);
