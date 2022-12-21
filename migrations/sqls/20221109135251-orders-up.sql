CREATE TABLE orders(
id serial primary key,
active boolean,
user_id integer not null,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
)