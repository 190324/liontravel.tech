CREATE TABLE `nos`(
  `id`     BIGINT(20)  NOT NULL AUTO_INCREMENT,
  `prefix` VARCHAR(5)  NOT NULL,
  `middle` VARCHAR(15) NOT NULL,
  `sn`     INT         NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE (`prefix`, `middle`)
) ENGINE = InnoDB;