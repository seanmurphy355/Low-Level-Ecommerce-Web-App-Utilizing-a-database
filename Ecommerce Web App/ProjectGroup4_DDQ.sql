-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: bsg
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `shippers`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `vendors`;
DROP TABLE IF EXISTS `customers`;

-- Table structure for table `customers`

CREATE TABLE `customers` (
 `customerID` int(11)NOT NULL AUTO_INCREMENT,
 `email` varchar(255) NOT NULL,
 `paymentTypes` varchar(255) NOT NULL,
 `address` varchar(255) NOT NULL,
 `phoneNumber` varchar(255) NOT NULL,
 `password`varchar(255) NOT NULL,
 `mailingList`boolean default NULL,
 PRIMARY KEY (`customerID`)
);


-- Dumping data for table `customers`
LOCK TABLES `customers` WRITE;
INSERT INTO `customers` VALUES (1,'Hello@gmail.com','Credit','22079 quebec drive','5032348843','yikes123', NULL), 
(2,'yo@gmail.com','Credit','22032 not quebec drive','5032648843','042345234re', NULL), 
(10, 'aadd@asdas.com', 'DEBIT', '323 S St', '2147483647', 'a213aes!!', NULL), 
(12, 'asdadsa@asda.com', 'CREDIT', '322 Main St', '1231231122', 'asdak21i31iaisdi!12', 1),
(13, 'asda@asda.com', 'DEBIT', '32 5th Blv', '2147483647', 'jk123781g1i123', NULL),
(14, 'newfake@gmail.com', 'DEBIT', '55th New Ave', '2147483647', 'QQ@#@JAS', NULL),
(16, 'lol@lol.com', 'Weird Payment', '1234 IDK ', '1234567891', '123456', NULL);;
 
UNLOCK TABLES;
 

-- Table structure for table `vendors`
CREATE TABLE `vendors`(
  `vendorID` int(11) NOT NULL AUTO_INCREMENT,
  `productType` varchar(255) NOT NULL,
  `isCurrentVendor` boolean NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`vendorID`)
);
 

-- Dumping data for table `vendors`
LOCK TABLES `vendors` WRITE;
INSERT INTO `vendors` VALUES (1,'Computer Parts',FALSE),(2,'Software', TRUE);
UNLOCK TABLES;


-- Table structure for table `products`
CREATE TABLE `products` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `inStock` boolean DEFAULT NULL,
  `productType` varchar(255) NOT NULL,
  `vendorID` int(11) NOT NULL,
  `prodName` varchar(255),
  PRIMARY KEY (`productID`),
  FOREIGN KEY (`vendorID`) REFERENCES `vendors` (`vendorID`)
);


-- Dumping data for table `products`
LOCK TABLES `products` WRITE;
INSERT INTO `products` (`productID`, `price`, `inStock`, `productType`, `vendorID`, `prodName`) VALUES (1, 200, 2, 'Accessories', 2, 'Ultra Grade Headphones'),
(3, 499.99, 1, 'Software', 1, 'Mathematica'),
(10, 999.98, 1, 'Parts', 1, 'GPU'),
(11, 140, 0, 'Parts', 2, 'corsair fans'),
(12, 500, 0, 'Parts', 2, 'Core I9'),
(13, 200, 1, 'Parts', 2, 'Corsair RM 750x PSU'),
(14, 50, 0, 'Parts', 2, 'DDR RAM'),
(15, 100, 1, 'Accessories', 1, 'Keyboard'),
(16, 80, 1, 'Accessories', 1, 'Mouse'),
(17, 200, 0, 'Accessories', 1, 'Monitor'),
(18, 20, 0, 'Accessories', 1, 'HDMI'),
(19, 150.99, 1, 'Software', 1, 'Windows 10'),
(20, 50.99, 0, 'Software', 1, 'Norton'),
(21, 199.99, 0, 'Software', 1, 'OFFICE 365 Home');
UNLOCK TABLES;


-- Table structure for table `shippers`
CREATE TABLE `shippers` (
  `shipperID` int(11) NOT NULL AUTO_INCREMENT,
  `shipCost` float NOT NULL,
  PRIMARY KEY (`shipperID`)
);


-- Dumping data for table `shippers`
LOCK TABLES `shippers` WRITE;
INSERT INTO `shippers` VALUES (1, 20.50), (4, 8.99), (5, 34.00);
UNLOCK TABLES;


-- Table structure for table `orders`
CREATE TABLE `orders` (
 `orderID` int(11)NOT NULL AUTO_INCREMENT,
 `customerID` int(11) NOT NULL,
 `shipperID` int(11) NOT NULL,
 `productID` int(11) NOT NULL,
 `quantity` int(11) NOT NULL,
 PRIMARY KEY (`orderID`),
 FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
 FOREIGN KEY (`shipperID`) REFERENCES `shippers` (`shipperID`),
 FOREIGN KEY (`productID`) REFERENCES `products` (`productID`)
);
 
-- Dumping data for table `orders`
LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (11, 1, 1,3, 15),(13245,2,4,3, 22);
UNLOCK TABLES; 

