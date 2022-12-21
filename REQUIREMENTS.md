# API Given Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# API Endpoints

## Users

-   Signup: `'api/v1/users' [POST]`

-   Signin: `'api/v1/users/signin' [POST]`
-   Index [token required]: `'api/v1/users/' [GET] (token)`
-   Show [token required]: `'api/v1/users/profile' [GET] (token)`
-   Create (args: User)[token required]: `'api/v1/users/' [POST] (token)`
-   Delete [token required]: `'users/:id' [DELETE] (token)`

## Products

-   Index: `'/api/v1/products' [GET]`

-   Show: `'/api/v1/products/:id' [GET]`
-   Create (args: Product)[token required]: `'/api/v1/products' [POST] (token)`
-   Delete: `'products/:id [DELETE]`

## Orders

-   Index [token required]: `'/api/v1/orders' [GET] (token)`

-   Current Order by user [token required]: `'/api/v1/orders/current' [GET] (token)`
-   Completed Orders by user [token required]: `'/api/v1/orders/completed' [GET] (token)`
-   Active Orders by user [token required]: `'/api/v1/orders/current' [GET] (token)`
-   [ADDED] Delete [token required]: `'orders/:id [DELETE] (token)`

# Database Schema

## User Data Types and Schema

-   id: integer [Primary Key]
-   first_name: varchar(90) [Not Null]
-   last_name: varchar(90) [Not Null]
-   email: varchar(255) [Not Null]
-   password: varchar(80) [Not Null]

![](https://i.imgur.com/TVNzICs.png)

## Product Data Types and Schema

-   id: integer [Primary Key]
-   name: varchar(100) [Not Null]
-   price: integer [Not Null]
-   category: varchar(90)
-   user_id: integer [Foreign Key]

![](https://i.imgur.com/CRjr6sw.png)

## Order

-   id: integer [Primary Key]
-   active: boolean [default: true]
-   user_id: integer [Foreign Key]

![](https://i.imgur.com/lCeOYmQ.png)

## Order Prodcuts

-   id: integer [Primary Key]
-   quantity: integer [default: 1]
-   product_id: integer [Foreign Key]
-   user_id: integer [Foreign Key]

![](https://i.imgur.com/YbwdxAN.png)
