CREATE TABLE `nos`
(
    `id`         BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `prefix`     VARCHAR(5)  NOT NULL,
    `middle`     VARCHAR(15) NOT NULL,
    `sn`         INT         NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP            DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP            DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP   NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`prefix`, `middle`)
) ENGINE = InnoDB;