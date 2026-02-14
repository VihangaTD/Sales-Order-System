-- CLIENT
IF NOT EXISTS (SELECT 1 FROM clients WHERE name = 'Nimal')
INSERT INTO clients (name, address1, address2, address3, suburb, state, post_code)
VALUES ('Nimal', 'No 10', 'Main Street', 'Bambalapitiya', 'Colombo', 'Western', '10100');

IF NOT EXISTS (SELECT 1 FROM clients WHERE name = 'Ajith')
INSERT INTO clients (name, address1, address2, address3, suburb, state, post_code)
VALUES ('Ajith', 'No 22', 'Galle Road', '', 'Galle', 'Southern', '80000');


-- ITEMS
IF NOT EXISTS (SELECT 1 FROM items WHERE item_code = 'ITM001')
INSERT INTO items (item_code, description, price)
VALUES ('ITM001', 'Laptop', 250000);

IF NOT EXISTS (SELECT 1 FROM items WHERE item_code = 'ITM002')
INSERT INTO items (item_code, description, price)
VALUES ('ITM002', 'Mouse', 3500);

IF NOT EXISTS (SELECT 1 FROM items WHERE item_code = 'ITM003')
INSERT INTO items (item_code, description, price)
VALUES ('ITM003', 'Keyboard', 7500);

