// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB("contact-info", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contact-info")) {
        console.log("contact-info database already exists");
        return;
      }
      db.createObjectStore("contact-info", { keyPath: "id", autoIncrement: true });
      console.log("contact-info database created");
    },
  });
};

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  console.log("Post to the ase");
  const contactDb = await openDB("contact-info", 1);
  const tx = contactDb.transaction("contact-info", "readwrite");
  const store = tx.objectStore("contact-info");
  const request = store.add({ contact: name, home, cell, email });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log("GET all from the database");
  const contactDb = await openDB("contact-info", 1);
  const tx = contactDb.transaction("contact-info", "readonly");
  const store = tx.objectStore("contact-info");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);
  const contactDb = await openDB("contact-info", 1);
  const tx = contactDb.transaction("contact-info", "readwrite");
  const store = tx.objectStore("contact-info");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
