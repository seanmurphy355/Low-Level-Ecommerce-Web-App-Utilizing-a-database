-- These are some DBM queries for a partially implemented Project Website

-- get products for Computer Parts page
SELECT productID, price, inStock FROM products WHERE productType = 'Parts';
 
-- get products for Software page
SELECT productID, price, inStock FROM products WHERE productType = 'Software';
 
-- get products for Accessories page
SELECT productID, price, inStock FROM products WHERE productType = 'Accessories';
 
-- add a new user/customer
INSERT INTO customers (email, paymentTypes, address, phoneNumber, password, mailingList) VALUES (:emailInput, :payment_methods_input, :addressInput, :phoneInput, :passwordInput, mail_list_input);
 
-- insert a new product
INSERT INTO products (price, inStock, productType, vendorID) VALUES (:priceInput, :in_stock_input, :product_type_input, :vendor_id_Input, :prodName_Input);
 
-- update a product's info
UPDATE products SET price = :priceInput, inStock = :inStockInput, productType = :productTypeInput, vendor:vendorID WHERE productId = :id_input;
 
-- grab all the product IDs, the type of product and the cost of the product currently
SELECT productID, price , productType FROM products;

-- grab user orderID and delete the order that the user requests
DELETE FROM orders WHERE oderID = :order_id_input;

-- Updates users productID and ShipperID in orders
UPDATE orders SET  productID = :product_id_input,shipper = :shipperID WHERE orderID = :product_id_input;