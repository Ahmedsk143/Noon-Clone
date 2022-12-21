# Getting Started

## Database Configuration

1.  [Download PostgreSQL database](https://www.postgresql.org/download/) based on your operating system
2.  Open the SQL Shell and connect to the
    Server **localhost** and Database **Postgres** on
    Port **5432** using your **Username** and **Password**
3.  ```bash:
     CREATE DATABASE noondb;
    ```

## Package installation instructions

1.  ```bash:
    git clone https://github.com/Ahmedsk143/Noon-Clone.git
    ```
2.  ```bash:
     cd Noon-Clone
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
