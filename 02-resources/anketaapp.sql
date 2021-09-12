-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.22 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for anketeapp
DROP DATABASE IF EXISTS `anketeapp`;
CREATE DATABASE IF NOT EXISTS `anketeapp` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `anketeapp`;

-- Dumping structure for table anketeapp.answer
DROP TABLE IF EXISTS `answer`;
CREATE TABLE IF NOT EXISTS `answer` (
  `answer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int unsigned NOT NULL DEFAULT '0',
  `value` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`answer_id`),
  KEY `fk_answer_question_id` (`question_id`),
  CONSTRAINT `fk_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table anketeapp.answer: ~0 rows (approximately)
DELETE FROM `answer`;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`answer_id`, `question_id`, `value`) VALUES
	(1, 1, 'Nista'),
	(2, 1, 'sta'),
	(3, 1, 'ima'),
	(4, 2, 'kod'),
	(5, 2, 'Ejj'),
	(6, 2, 'ti');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;

-- Dumping structure for table anketeapp.question
DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `question_id` int unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `arguments` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `survey_id` int unsigned NOT NULL,
  `orderOfQuestion` int unsigned NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `fk_question_survey_id` (`survey_id`),
  CONSTRAINT `fk_question_survey_id` FOREIGN KEY (`survey_id`) REFERENCES `survey` (`survey_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table anketeapp.question: ~4 rows (approximately)
DELETE FROM `question`;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_id`, `text`, `type`, `arguments`, `survey_id`, `orderOfQuestion`) VALUES
	(1, 'IZMENJENa', 'VHEK', 'IZMENA', 1, 7),
	(2, 'IZMENJENa', 'VHEK', 'IZMENA', 1, 7),
	(3, 'ovo je napravljeno preko posta', 'tip', 'argumenti', 1, 7),
	(4, 'ovo je napravljeno preko posta', 'tip', 'argumenti', 1, 7),
	(5, 'IZMENJENa', 'VHEK', 'IZMENA', 1, 7);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Dumping structure for table anketeapp.survey
DROP TABLE IF EXISTS `survey`;
CREATE TABLE IF NOT EXISTS `survey` (
  `survey_id` int unsigned NOT NULL AUTO_INCREMENT,
  `identification_number` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_id`),
  UNIQUE KEY `uq_survey_identification_number` (`identification_number`) USING BTREE,
  KEY `fk_survey_user_id` (`user_id`),
  CONSTRAINT `fk_survey_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table anketeapp.survey: ~6 rows (approximately)
DELETE FROM `survey`;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` (`survey_id`, `identification_number`, `name`, `user_id`, `created_at`) VALUES
	(1, '02354654654', 'Prva Anketa', 1, '2021-03-07 21:01:46'),
	(4, 'aaaaaaaa13', 'djole', 2, '2021-08-31 23:28:00'),
	(6, 'aaaaaaaa131', 'djole', 2, '2021-08-31 23:28:08'),
	(7, 'aaaaaaaa1312', 'djole', 2, '2021-08-31 23:28:14'),
	(8, 'aaaaaaaa13121', 'djole', 2, '2021-08-31 23:28:21'),
	(9, 'aaaaaaaa131212', 'djole', 2, '2021-08-31 23:28:25');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;

-- Dumping structure for table anketeapp.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table anketeapp.user: ~2 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `username`, `password_hash`) VALUES
	(1, 'djole', '777777733333'),
	(2, 'djoile2', 'noviuser'),
	(4, 'djsuboticdev@gmail.com', '$2b$11$2QCziDIqVLrmPv1MGkyxzOmJD.XYnn25NU9.FUegmwS2AqPu5Y93m');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
