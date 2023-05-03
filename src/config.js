import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    PERSISTENCE: process.env.PERSISTENCE || 'MONGO',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}