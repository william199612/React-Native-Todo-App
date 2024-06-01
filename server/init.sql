DROP SCHEMA IF EXISTS todo;
CREATE SCHEMA todo;
USE totododo;
SET AUTOCOMMIT=0;


--
-- Table structure for table `User`
--
DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` char(52) NOT NULL DEFAULT '',
  `email` char(50) NOT NULL,
  `password` char(100) NOT NULL,
  `birth` DATE NOT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);


--
-- Table structure for table `Todo`
--
DROP TABLE IF EXISTS `Todo`;

CREATE TABLE `Todo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `description` TEXT,
  `due_date` DATETIME,
  `completed` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

