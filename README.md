# Getting Started

## Database Configuration

1.  [Download PostgreSQL database](https://www.postgresql.org/download/) based on your operating system
2.  Open the SQL Shell and connect to the
    Server **localhost** and Database **Postgres** on
    Port **5432** using your **Username** and **Password**
3.  ```bash:
     CREATE DATABASE ecommercedb;
    ```

## Package installation instructions

1.  ```bash:
    git clone https://github.com/Ahmedsk143/Storefront-Backend.git
    ```
2.  ```bash:
     cd Storefront-Backend
    ```
3.  ```bash:
    npm install
    ```
4.  ```bash:
    db-migrate up
    ```
5.  ```bash:
    npm run start
    ```
    Now the server is up and running successfully on port 5555 and the database on port 5432

# Testing the database actions and endpoints

```bash:
    npm run test
```

# Environment Variables

```javascript:
DB_HOST = "localhost"
DB_NAME_DEV = "ecommercedb"
DB_NAME_TEST = "ecommercedb_test"
DB_NAME_PROD = "ecommercedb_prod"
DB_PORT = 5432
DB_USERNAME = "postgres"
DB_PASSWORD = ""
ENV = "dev"
BCRYPT_PASSWORD = "!@#$%"
SALT_ROUNDS = 10
PRIVATE_KEY = "!@#$%^"
```
