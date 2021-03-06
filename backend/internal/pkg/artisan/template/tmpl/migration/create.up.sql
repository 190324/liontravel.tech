CREATE TABLE `{{ .createTableName }}` (
    `id`         BIGINT(20) NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP  NULL,
    PRIMARY KEY (`id`)
);
