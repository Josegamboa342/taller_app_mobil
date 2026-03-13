import { Platform } from "react-native";

let db: any;

if (Platform.OS !== "web") {
  const SQLite = require("expo-sqlite");
  db = SQLite.openDatabaseSync("universidad.db");
} else {
  db = {
    execAsync: async () => {},
    runAsync: async () => {},
    getFirstAsync: async () => null,
    getAllAsync: async () => [],
  };
}

export { db };

export async function crearTablas() {
  if (Platform.OS === "web") return;
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS programas(
      cod TEXT PRIMARY KEY,
      nombre TEXT
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS estudiantes(
      cod TEXT PRIMARY KEY,
      nombre TEXT,
      email TEXT,
      programa_cod TEXT,
      FOREIGN KEY(programa_cod) REFERENCES programas(cod)
    );
  `);
}