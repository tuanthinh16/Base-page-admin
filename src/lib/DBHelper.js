import clientPromise from './mongodb';

const dbName = "YTE";

export async function getData(collectionName, query = {}) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find(query).toArray();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    throw new Error(`Could not fetch data from ${collectionName}`);
  }
}

export async function insertData(collectionName, data) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result.ops[0];
  } catch (error) {
    console.error(`Error inserting data into ${collectionName}:`, error);
    throw new Error(`Could not insert data into ${collectionName}`);
  }
}

export async function updateData(collectionName, query, update) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, { $set: update });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`Error updating data in ${collectionName}:`, error);
    throw new Error(`Could not update data in ${collectionName}`);
  }
}

export async function deleteData(collectionName, query) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting data from ${collectionName}:`, error);
    throw new Error(`Could not delete data from ${collectionName}`);
  }
}
