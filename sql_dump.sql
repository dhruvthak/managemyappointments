-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 23, 2017 at 11:00 AM
-- Server version: 10.1.23-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointments_db`
--
CREATE DATABASE IF NOT EXISTS `appointments_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `appointments_db`;

-- --------------------------------------------------------

--
-- Table structure for table `tb_appointments`
--

CREATE TABLE `tb_appointments` (
  `app_id` int(11) NOT NULL,
  `app_date` datetime NOT NULL,
  `app_description` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_appointments`
--

INSERT INTO `tb_appointments` (`app_id`, `app_date`, `app_description`) VALUES
(1, '2017-06-16 11:05:00', 'Some dummy data'),
(2, '2017-06-16 11:05:00', 'Some more dummy content'),
(37, '2019-01-05 23:29:00', 'Just Checking');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_appointments`
--
ALTER TABLE `tb_appointments`
  ADD PRIMARY KEY (`app_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_appointments`
--
ALTER TABLE `tb_appointments`
  MODIFY `app_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
