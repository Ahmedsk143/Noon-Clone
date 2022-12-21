CREATE TABLE order_products(
   id serial primary key,
   quantity integer not null,
   order_id INTEGER not null,
   product_id INTEGER not null,
   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);