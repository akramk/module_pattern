-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2014 at 01:26 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `angularcode_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `issue`
--

CREATE TABLE IF NOT EXISTS `issue` (
  `createdBy` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issue`
--

INSERT INTO `issue` (`createdBy`, `name`, `description`) VALUES
('akram', 'Issue1', 'THis is the first issue '),
('akram', 'Issue2jdhsahjsad', 'dhasjdhas');

-- --------------------------------------------------------

--
-- Table structure for table `issue1`
--

CREATE TABLE IF NOT EXISTS `issue1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `issuename` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'open',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `issue1`
--

INSERT INTO `issue1` (`id`, `issuename`, `description`, `createdBy`, `status`) VALUES
(1, 'Issue1', 'This issue is new and nothing to create.', 'akram', 'open'),
(2, 'Issue2', 'Please submit before due', 'akram', 'open'),
(3, 'Issue3', 'Nothing new', 'akram', 'open'),
(4, 'sajdksajk', 'sjckadjk', 'akram', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `issue_persmission`
--

CREATE TABLE IF NOT EXISTS `issue_persmission` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `assigned` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issue_persmission`
--

INSERT INTO `issue_persmission` (`id`, `username`, `assigned`) VALUES
(1, 'akram', 50),
(1, 'test', 45),
(2, 'test', 80),
(3, 'akram', 50),
(3, 'test2', 10),
(3, 'test', 20),
(4, 'akram', 20),
(4, 'test', 30),
(4, 'test2', 40);

-- --------------------------------------------------------

--
-- Table structure for table `issue_update`
--

CREATE TABLE IF NOT EXISTS `issue_update` (
  `id` varchar(20) NOT NULL,
  `issueUpdate` varchar(500) DEFAULT NULL,
  `postedBy` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issue_update`
--

INSERT INTO `issue_update` (`id`, `issueUpdate`, `postedBy`, `status`) VALUES
('1', 'I will update', 'akram', 'open'),
('4', 'fjsdklfjdskfjskd', 'akram', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'My first task', 0, 1390815970),
(2, 'Perform unit testing', 0, 1390815993),
(3, 'Find bugs', 0, 1390817659),
(4, 'Test in small devices', 0, 1390818389),
(5, 'testakram', 0, 1407516846),
(6, 'akramagain', 0, 1407518439),
(7, 'sdsdsd', 0, 1407539442),
(8, 'newtask', 0, 1407541305);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `status`, `created_at`) VALUES
('akram', '123456', 0, 1407542153),
('test', 'test', 0, 1407799193),
('test2', 'test2', 0, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
