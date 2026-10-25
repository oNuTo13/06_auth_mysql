import mysql from "mysql2/promise";

let pool;

function requiredEnv(name, legacyName) {
  const value = process.env[name] || (legacyName && process.env[legacyName]);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getPool() {
  if (!pool) {
    const port = Number(requiredEnv("DB_PORT"));
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error("DB_PORT must be a valid port number");
    }

    pool = mysql.createPool({
      host: requiredEnv("DB_HOST"),
      port,
      user: requiredEnv("DB_USERNAME", "DB_USER"),
      password: requiredEnv("DB_PASSWORD"),
      database: requiredEnv("DB_DATABASE", "DB_NAME"),
      waitForConnections: true,
      connectionLimit: 5,
      ssl: process.env.DB_SSL === "true"
        ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
        : undefined,
    });
  }

  return pool;
}
