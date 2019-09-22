-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2019 at 09:24 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_house_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int(11) NOT NULL,
  `full_name` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(40) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_balance`
--

CREATE TABLE `tbl_balance` (
  `balance_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `total_amount_in` double(24,2) NOT NULL,
  `total_amount_out` double(24,2) NOT NULL,
  `total_balance` double(24,2) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_balance`
--

INSERT INTO `tbl_balance` (`balance_id`, `owner_id`, `house_id`, `total_amount_in`, `total_amount_out`, `total_balance`, `updated_at`) VALUES
(8, 3, 6, 14500.00, 2300.00, 12200.00, '2019-05-27 10:30:43'),
(9, 3, 7, 84100.00, 0.00, 84100.00, '2019-06-11 10:36:18'),
(10, 4, 8, 28600.00, 5300.00, 23300.00, '2019-05-28 06:40:32'),
(11, 4, 9, 14500.00, 0.00, 14500.00, '2019-05-27 10:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_expense`
--

CREATE TABLE `tbl_expense` (
  `expense_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `current_bill` float(10,2) NOT NULL DEFAULT '0.00',
  `gas_bill` float(10,2) NOT NULL DEFAULT '0.00',
  `electricity_bill` float(10,2) NOT NULL DEFAULT '0.00',
  `wasa_bill` double(10,2) NOT NULL DEFAULT '0.00',
  `tax` float(10,2) NOT NULL DEFAULT '0.00',
  `others` float(10,2) NOT NULL DEFAULT '0.00',
  `title` varchar(255) NOT NULL,
  `payment_date` date NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_expense`
--

INSERT INTO `tbl_expense` (`expense_id`, `owner_id`, `house_id`, `current_bill`, `gas_bill`, `electricity_bill`, `wasa_bill`, `tax`, `others`, `title`, `payment_date`, `created_at`, `updated_at`) VALUES
(6, 3, 6, 0.00, 800.00, 500.00, 1000.00, 0.00, 0.00, 'hi', '2019-05-28', '2019-05-27', '2019-06-01 10:32:42'),
(7, 4, 8, 0.00, 800.00, 1000.00, 1500.00, 1000.00, 1000.00, 'Pani bill', '2019-05-21', '2019-05-27', '2019-06-01 10:32:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_flat`
--

CREATE TABLE `tbl_flat` (
  `flat_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `renter_id` int(1) DEFAULT '0',
  `house_id` int(11) NOT NULL,
  `flat_name` varchar(40) NOT NULL,
  `flat_rent` float(10,2) NOT NULL,
  `flat_bed_room` int(11) NOT NULL,
  `flat_drawing_room` int(1) NOT NULL DEFAULT '0',
  `flat_dining_room` int(1) NOT NULL DEFAULT '0',
  `flat_wash_room` int(11) NOT NULL,
  `flat_kitchen` int(1) NOT NULL DEFAULT '0',
  `flat_balcony` int(1) NOT NULL DEFAULT '0',
  `flat_window` int(1) NOT NULL DEFAULT '0',
  `flat_photo` text NOT NULL,
  `flat_description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_flat`
--

INSERT INTO `tbl_flat` (`flat_id`, `owner_id`, `renter_id`, `house_id`, `flat_name`, `flat_rent`, `flat_bed_room`, `flat_drawing_room`, `flat_dining_room`, `flat_wash_room`, `flat_kitchen`, `flat_balcony`, `flat_window`, `flat_photo`, `flat_description`, `created_at`, `updated_at`) VALUES
(18, 4, 14, 8, 'A1', 12000.00, 3, 1, 1, 2, 1, 2, 3, '[\"upload\\/image\\/house\\/flat\\/download (1).jpg\",\"upload\\/image\\/house\\/flat\\/download.jpg\",\"upload\\/image\\/house\\/flat\\/feb-21-word-press-main.png\"]', '<p>jadhfia</p>', '2019-05-27 09:34:13', '2019-05-27 09:41:09'),
(19, 4, 0, 9, 'A2', 12000.00, 3, 1, 1, 2, 1, 2, 10, '[\"upload\\/image\\/house\\/flat\\/images (1).jpg\",\"upload\\/image\\/house\\/flat\\/images (1).png\",\"upload\\/image\\/house\\/flat\\/images (2).jpg\",\"upload\\/image\\/house\\/flat\\/images (2).png\"]', 'jfafhaui', '2019-05-27 09:35:30', '2019-05-28 06:29:19'),
(20, 1, 0, 6, 'B1', 12000.00, 3, 1, 0, 2, 1, 2, 4, '[\"upload\\/image\\/house\\/flat\\/66759479_501692113911126_7467557778110808064_n.jpg\"]', '<p>jafha</p>', '2019-08-29 09:17:17', '2019-08-29 09:17:17'),
(21, 3, 17, 7, 'B2', 12000.00, 3, 0, 1, 2, 1, 2, 5, '[\"upload\\/image\\/house\\/flat\\/images (2).png\"]', 'jfahfieohfa', '2019-05-27 09:37:27', '2019-05-27 09:46:55'),
(22, 3, 18, 6, 'A2', 12000.00, 3, 1, 0, 2, 1, 2, 10, '[\"upload\\/image\\/house\\/flat\\/download (1).jpg\",\"upload\\/image\\/house\\/flat\\/download.jpg\",\"upload\\/image\\/house\\/flat\\/feb-21-word-press-main.png\",\"upload\\/image\\/house\\/flat\\/image1.jpg\"]', '<p>dferetrythghjuiukjkkl</p>', '2019-05-31 12:27:42', '2019-08-29 08:29:34'),
(23, 3, 0, 7, 'malancho', 123000.00, 4, 0, 1, 2, 1, 2, 10, '[\"upload\\/image\\/house\\/flat\\/netreakona.jpg\"]', '<p>hgjg</p>', '2019-08-17 09:56:52', '2019-08-17 09:56:52'),
(24, 3, 0, 6, 'A1', 12000.00, 4, 1, 1, 2, 1, 2, 10, '[\"upload\\/image\\/house\\/flat\\/66709750_1267327310116511_3566626312447590400_n.jpg\"]', '<p>hi</p>', '2019-08-29 07:27:24', '2019-08-29 07:27:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_flat_archive`
--

CREATE TABLE `tbl_flat_archive` (
  `archive_id` int(11) NOT NULL,
  `renter_id` int(10) NOT NULL,
  `flat_id` int(10) NOT NULL,
  `from_date` datetime NOT NULL,
  `to_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_house`
--

CREATE TABLE `tbl_house` (
  `house_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `house_name` text NOT NULL,
  `house_name_slug` text NOT NULL,
  `house_number` varchar(100) NOT NULL,
  `house_address` text NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `house_information` text NOT NULL,
  `is_active` int(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_house`
--

INSERT INTO `tbl_house` (`house_id`, `owner_id`, `house_name`, `house_name_slug`, `house_number`, `house_address`, `lat`, `lon`, `house_information`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 3, 'House One', 'house-one', '5723947', '<p>jahfaiefah</p>', 0, 0, '<p>jafjiheiao</p>', 1, '2019-05-27 09:30:17', '2019-05-27 09:30:17'),
(7, 3, 'House Two', 'house-two', '70/A', 'kajfia', 0, 0, 'ajfiah', 1, '2019-05-27 09:30:34', '2019-05-27 09:30:34'),
(8, 4, 'House 3', 'house-3', '80', '<p>jfaieha</p>', 0, 0, '<p>fjaeafh</p>', 1, '2019-05-27 09:32:09', '2019-05-27 09:32:09'),
(9, 4, 'House 4', 'house-4', '89', 'dfjaieha', 0, 0, 'jfaiea', 1, '2019-05-27 09:32:29', '2019-05-27 09:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_owner`
--

CREATE TABLE `tbl_owner` (
  `owner_id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(56) NOT NULL,
  `nid` varchar(40) NOT NULL,
  `nid_scan` text NOT NULL,
  `owner_photo` text NOT NULL,
  `address` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` int(1) NOT NULL DEFAULT '0',
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_owner`
--

INSERT INTO `tbl_owner` (`owner_id`, `full_name`, `email`, `mobile`, `nid`, `nid_scan`, `owner_photo`, `address`, `password`, `is_active`, `token`, `created_at`, `updated_at`) VALUES
(3, 'Md Jakir Hossain', 'jakir@gmail.com', '284937835', '8312732853', 'upload/image/houseowner/download.jpg', 'upload/image/houseowner/download (1).jpg', '<p>Dhanmondi, Dhaka - 1209.</p>', '$2y$10$QcFCu3DJPSQnKgHTzr52QOHHbuzZgfmXbhm98M7aMe7V6MYfbzglq', 1, NULL, '2019-05-25 11:57:01', '2019-05-25 11:57:01'),
(4, 'Jakir', 'admin@gmail.com', '3583290', '85325723', 'upload/image/houseowner/download.jpg', 'upload/image/houseowner/download (1).jpg', '<p>jksfiwa</p>', '$2y$10$jFL50pwrYcW2VQyLW3fcP.x8jHYZqhTkaNmxCcas441Nf8eWOk8jS', 1, NULL, '2019-05-27 05:48:34', '2019-05-27 05:48:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rent`
--

CREATE TABLE `tbl_rent` (
  `rent_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `flat_id` int(11) NOT NULL,
  `renter_id` int(11) NOT NULL,
  `basic_rent` float(10,2) NOT NULL,
  `gas_bill` float(10,2) NOT NULL,
  `electricity_bill` float(10,2) NOT NULL,
  `water_bill` float(10,2) NOT NULL,
  `others_charge` float(10,2) NOT NULL,
  `total_rent` float(10,2) NOT NULL,
  `rent_type` int(1) NOT NULL DEFAULT '1' COMMENT '1 = regular rent, 2 = advanced',
  `rent_month` date NOT NULL,
  `accepted_at` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_rent`
--

INSERT INTO `tbl_rent` (`rent_id`, `owner_id`, `house_id`, `flat_id`, `renter_id`, `basic_rent`, `gas_bill`, `electricity_bill`, `water_bill`, `others_charge`, `total_rent`, `rent_type`, `rent_month`, `accepted_at`, `created_at`, `updated_at`) VALUES
(16, 3, 7, 21, 17, 12000.00, 800.00, 500.00, 1000.00, 200.00, 14500.00, 1, '2019-05-01', '2019-05-16', '2019-05-27 09:51:40', '2019-05-27 09:51:40'),
(17, 3, 6, 20, 16, 12000.00, 800.00, 500.00, 1000.00, 200.00, 14500.00, 1, '2019-05-01', '2019-05-21', '2019-05-27 09:52:52', '2019-05-27 09:52:52'),
(18, 4, 8, 18, 14, 12000.00, 800.00, 500.00, 1000.00, 0.00, 14300.00, 1, '2019-05-01', '2019-05-21', '2019-05-27 10:00:36', '2019-05-27 10:00:36'),
(19, 4, 9, 19, 15, 12000.00, 800.00, 500.00, 1000.00, 200.00, 14500.00, 2, '2019-05-01', '2019-05-20', '2019-05-27 10:03:40', '2019-05-27 10:03:40'),
(20, 4, 8, 18, 14, 12000.00, 800.00, 500.00, 1000.00, 0.00, 14300.00, 1, '2019-04-01', '2019-04-10', '2019-05-28 06:40:31', '2019-05-28 06:40:31'),
(21, 3, 7, 21, 17, 12000.00, 800.00, 500.00, 1000.00, 200.00, 14500.00, 1, '2019-04-01', '2019-05-16', '2019-05-28 07:52:45', '2019-05-28 07:52:45'),
(22, 3, 7, 21, 17, 12000.00, 800.00, 0.00, 1000.00, 0.00, 13800.00, 1, '2019-05-01', '2019-05-16', '2019-05-28 08:15:32', '2019-05-28 08:15:33'),
(23, 3, 7, 21, 17, 12000.00, 0.00, 0.00, 2000.00, 0.00, 14000.00, 1, '2019-05-01', '2019-05-22', '2019-05-28 08:35:47', '2019-05-28 08:35:47'),
(24, 3, 7, 21, 17, 12000.00, 0.00, 0.00, 0.00, 0.00, 12000.00, 1, '2019-05-01', '2019-05-17', '2019-05-28 08:43:11', '2019-05-28 08:43:11'),
(25, 3, 7, 21, 17, 12000.00, 1600.00, 500.00, 1000.00, 200.00, 15300.00, 1, '2019-06-01', '2019-06-11', '2019-06-11 10:36:17', '2019-06-11 10:36:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_renter`
--

CREATE TABLE `tbl_renter` (
  `renter_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `flat_id` int(11) NOT NULL,
  `renter_name` varchar(120) NOT NULL,
  `members` int(11) NOT NULL,
  `members_description` text NOT NULL,
  `nid` varchar(40) NOT NULL,
  `nid_scan` text NOT NULL,
  `renter_photo` text NOT NULL,
  `renter_profession` varchar(100) NOT NULL,
  `permanent_address` text NOT NULL,
  `old_address` text NOT NULL,
  `phone_number` varchar(56) NOT NULL,
  `left_date` date DEFAULT NULL,
  `enter_date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '0 = old, 1 = running',
  `created_at` date NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_renter`
--

INSERT INTO `tbl_renter` (`renter_id`, `house_id`, `flat_id`, `renter_name`, `members`, `members_description`, `nid`, `nid_scan`, `renter_photo`, `renter_profession`, `permanent_address`, `old_address`, `phone_number`, `left_date`, `enter_date`, `status`, `created_at`, `updated_at`) VALUES
(14, 8, 18, 'Renter 1', 5, '<p>jfahfiafha</p>', '3272303383', 'upload/image/renter/images (2).jpg', 'upload/image/renter/images (4).jpg', 'Teacher', '<p>jfahfa</p>', '<p>jafhih</p>', '10093748232', '2019-06-01', '2019-05-16', 1, '2019-05-27', '2019-05-27 09:41:08'),
(15, 9, 19, 'Ranter 2', 4, '<p>jkafah</p>', '09099', 'upload/image/renter/images (2).jpg', 'upload/image/renter/images (4).png', 'Teacher', '<p>jaha</p>', '<p>jfak</p>', '10093748232', '2019-07-05', '2019-05-24', 0, '2019-05-27', '2019-05-28 06:29:19'),
(16, 6, 20, 'Renter 3', 5, '<p>jkdajs</p>', '0998547249582', 'upload/image/renter/images (2).png', 'upload/image/renter/images (4).png', 'Teacher', '<p>jakfiae</p>', '<p>jfakfae</p>', '10093748232', '2019-06-01', '2019-05-17', 0, '2019-05-27', '2019-05-28 05:57:42'),
(17, 7, 21, 'Renter 4', 5, '<p>kajfaajei</p>', 'jkajifea', 'upload/image/renter/images (2).png', 'upload/image/renter/images (4).png', 'Teacher', '<p>jfiaefh</p>', '<p>hfahu</p>', '10093748232', '2019-06-01', '2019-05-21', 1, '2019-05-27', '2019-05-27 09:46:55'),
(18, 6, 22, 'Renter 4', 4, '<p>jkfd</p>', '3272303383', 'upload/image/renter/66602314_1186803494853835_6716124460509822976_n.jpg', 'upload/image/renter/66709750_1267327310116511_3566626312447590400_n.jpg', 'Teacher', '<p>jkafj</p>', '<p>jkajfi</p>', '10093748232', '2019-08-13', '2019-08-16', 1, '2019-08-29', '2019-08-29 08:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_renter_archive`
--

CREATE TABLE `tbl_renter_archive` (
  `renter_archive_id` int(11) NOT NULL,
  `flat_id` int(11) NOT NULL,
  `renter_id` int(11) NOT NULL,
  `enter_date` date NOT NULL,
  `left_date` date NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `feedback` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_renter_archive`
--

INSERT INTO `tbl_renter_archive` (`renter_archive_id`, `flat_id`, `renter_id`, `enter_date`, `left_date`, `updated_at`, `feedback`) VALUES
(1, 20, 16, '2019-05-27', '2019-05-28', '2019-05-28 05:57:42', '0'),
(2, 19, 15, '2019-05-27', '2019-05-28', '2019-05-28 06:29:19', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `transaction_id` int(11) NOT NULL,
  `rent_id` int(11) NOT NULL DEFAULT '0',
  `expense_id` int(11) NOT NULL DEFAULT '0',
  `amount_in` float(10,2) NOT NULL DEFAULT '0.00',
  `amount_out` float(10,2) NOT NULL,
  `old_balance` float(10,2) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`transaction_id`, `rent_id`, `expense_id`, `amount_in`, `amount_out`, `old_balance`, `updated_at`) VALUES
(11, 16, 0, 14500.00, 0.00, 14500.00, '2019-05-27 09:51:40'),
(12, 17, 0, 14500.00, 0.00, 14500.00, '2019-05-27 09:52:52'),
(13, 18, 0, 14300.00, 0.00, 14300.00, '2019-05-27 10:00:37'),
(14, 19, 0, 14500.00, 0.00, 14500.00, '2019-05-27 10:03:40'),
(15, 20, 0, 14300.00, 0.00, 14300.00, '2019-05-28 06:40:32'),
(16, 21, 0, 14500.00, 0.00, 14500.00, '2019-05-28 07:52:45'),
(17, 22, 0, 13800.00, 0.00, 13800.00, '2019-05-28 08:15:33'),
(18, 23, 0, 14000.00, 0.00, 14000.00, '2019-05-28 08:35:48'),
(19, 24, 0, 12000.00, 0.00, 12000.00, '2019-05-28 08:43:11'),
(20, 25, 0, 15300.00, 0.00, 15300.00, '2019-06-11 10:36:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_balance`
--
ALTER TABLE `tbl_balance`
  ADD PRIMARY KEY (`balance_id`);

--
-- Indexes for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `tbl_flat`
--
ALTER TABLE `tbl_flat`
  ADD PRIMARY KEY (`flat_id`);

--
-- Indexes for table `tbl_flat_archive`
--
ALTER TABLE `tbl_flat_archive`
  ADD PRIMARY KEY (`archive_id`);

--
-- Indexes for table `tbl_house`
--
ALTER TABLE `tbl_house`
  ADD PRIMARY KEY (`house_id`);

--
-- Indexes for table `tbl_owner`
--
ALTER TABLE `tbl_owner`
  ADD PRIMARY KEY (`owner_id`);

--
-- Indexes for table `tbl_rent`
--
ALTER TABLE `tbl_rent`
  ADD PRIMARY KEY (`rent_id`);

--
-- Indexes for table `tbl_renter`
--
ALTER TABLE `tbl_renter`
  ADD PRIMARY KEY (`renter_id`);

--
-- Indexes for table `tbl_renter_archive`
--
ALTER TABLE `tbl_renter_archive`
  ADD PRIMARY KEY (`renter_archive_id`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_balance`
--
ALTER TABLE `tbl_balance`
  MODIFY `balance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_expense`
--
ALTER TABLE `tbl_expense`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_flat`
--
ALTER TABLE `tbl_flat`
  MODIFY `flat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_flat_archive`
--
ALTER TABLE `tbl_flat_archive`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_house`
--
ALTER TABLE `tbl_house`
  MODIFY `house_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_owner`
--
ALTER TABLE `tbl_owner`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_rent`
--
ALTER TABLE `tbl_rent`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tbl_renter`
--
ALTER TABLE `tbl_renter`
  MODIFY `renter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_renter_archive`
--
ALTER TABLE `tbl_renter_archive`
  MODIFY `renter_archive_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
