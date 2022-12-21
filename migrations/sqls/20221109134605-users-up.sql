CREATE TABLE users(
    id serial primary key,
    first_name varchar(90) not null,
    last_name varchar(90) not null,
    email varchar(255) not null,
    password varchar(80) not null
)