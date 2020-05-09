CREATE TABLE `storages`
(
    `id`           BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `table_from`   VARCHAR(60)  NOT NULL,
    `table_id`     BIGINT(20)   NOT NULL,
    `content_type` VARCHAR(60)  NULL,
    `path`         VARCHAR(255) NOT NULL,
    `seq`          BIGINT(20)   NOT NULL,
    `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at`   TIMESTAMP    NULL,
    PRIMARY KEY (`id`)
);
