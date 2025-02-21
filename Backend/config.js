import dotenv, { config } from "dotenv"

dotenv.config()


export default  {
    JWT_USER_PASSWORD: process.env.JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD: process.env.JWT_ADMIN_PASSWORD

}