## How it works

For authentication visit "/register"; Post username & password request in the body to authenticate; Your data will be saved in the database (password will be hashed). <br />
For authorization visit "/login"; Post username & password request in the body to authorize; if successfull you'll recieve a token in the response header. <br />
You can use the token to see the protected path "/api/posts"; if allowed you'll see the top secret information. <br /> Or you can upload a file in databse if you're logged in. Just use that token and visit "/upload".

## Keywords
Main technologies used in this project are: `Nodejs`, `Expressjs`, `TypeScript`, `JWT`, `PostgreSQL`, `TypeORM`, `Joi`, `BCrypt`, `Docker`, `multer`