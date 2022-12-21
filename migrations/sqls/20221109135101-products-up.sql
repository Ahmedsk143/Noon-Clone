CREATE TABLE products(
    id serial primary key,
    name varchar(100) not null,
    price integer not null,
    category varchar(90)
)