import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

 
export const db = mysql.createPool(process.env.dbUrl).promise();