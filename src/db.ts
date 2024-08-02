import { openSqliteDatabase } from './utils/sqlite';

export async function writeQuoteDB(file) {
  const readonly = false;
  const db = await openSqliteDatabase(file, readonly);
  return db;
}

export async function readQuoteDB(file) {
  const db = await openSqliteDatabase(file, true);
  return db;
}
