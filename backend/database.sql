-- SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
-- SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
-- SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema devs_corner
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `devs_corner` ;

-- -----------------------------------------------------
-- Schema devs_corner
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devs_corner` DEFAULT CHARACTER SET utf8 ;
USE `devs_corner` ;

-- -----------------------------------------------------
-- Table `devs_corner`.`user`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  `state` TINYINT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`subject`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`subject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `text` MEDIUMBLOB NOT NULL,
  `best_answer_id` INT ,
  `status_resolve` TINYINT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_subject_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_subject_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`tag`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`answer`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMBLOB NOT NULL,
  `note` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `subject_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `subject_id`, `user_id`),
  INDEX `fk_answer_subject_idx` (`subject_id` ASC) ,
  INDEX `fk_answer_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_answer_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `devs_corner`.`subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answer_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`comment`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMBLOB NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `answer_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `answer_id`, `user_id`),
  INDEX `fk_comment_answer_idx` (`answer_id` ASC) ,
  INDEX `fk_comment_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_comment_answer`
    FOREIGN KEY (`answer_id`)
    REFERENCES `devs_corner`.`answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`subject_has_tag`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`subject_has_tag` (
  `subject_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`subject_id`, `tag_id`),
  INDEX `fk_subject_has_tag_tag_idx` (`tag_id` ASC) ,
  INDEX `fk_subject_has_tag_subject_idx` (`subject_id` ASC) ,
  CONSTRAINT `fk_subject_has_tag_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `devs_corner`.`subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subject_has_tag_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `devs_corner`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

USE `devs_corner` ;
INSERT INTO user
(first_name, last_name, email, hashedPassword, role, state)
VALUES 
(    'John',    'Doe',    'john.doe@example.com',     "$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ"     , "user", 1  ),
(    'Valeriy',    'Appius',    'valeriy.ppius@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw', "user", 1  ),
(    'Ralf',    'Geronimo',    'ralf.geronimo@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZXphZGF6ZGQ$a0bg5DZB6H6v3jjQC81DXg', "user", 1  ),
(    'Maria',    'Iskandar',    'maria.iskandar@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA', "user", 1  ),
(    'Jane',    'Doe',    'jane.doe@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw', "user", 1  ),
(    'Johanna',    'Martino',    'johanna.martino@example.com',    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$UKaGZ9hGFn/S5SBQDMe/Uw', "user", 1);
    
INSERT INTO subject  (title, text, user_id, status_resolve)
VALUES
('test1',
'test1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',1,0),
('test2',
'test2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',2,0),
('TEST3',
'test 3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',3,0),
('TEST4',
'test 4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',5,0),
('TEST5',
'test 5 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',4,0);

INSERT INTO answer (text, note, subject_id, user_id)
VALUES
('Answer1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',0,1,2),
('Answer2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',0,1,3),
('Answer3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',0,2,4);
 
INSERT INTO comment (text, answer_id, user_id)
VALUES
('Comment1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',1,2),
('Comment2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',2,3),
('Comment3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',2,5);
 
INSERT INTO tag (name)
VALUES
('JavaScript'), ('REACT'), ('Html'), ('CSS'), ('Java'), ('Angular');  

INSERT INTO subject_has_tag (subject_id, tag_id)
VALUES
(1, 3),(1, 4),
(2, 1),
(3, 3), (3, 4),
(4, 6),
(5, 3);

