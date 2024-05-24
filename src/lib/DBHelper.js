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
    
    // Create the query to find data by username
    const query = { username: data.username };
    
    // Check if data with the same username already exists
    const existingData = await collection.findOne(query);

    if (existingData) {
      // If data exists, update it
      const result = await collection.updateOne(query, { $set: data });
      if (result.modifiedCount === 0) {
        throw new Error(`Failed to update data in ${collectionName}`);
      }
      return { success: true, message: `Data updated in ${collectionName}` };
    } else {
      // If data does not exist, insert it
      const result = await collection.insertOne(data);
      return { success: true, message: `Data inserted into ${collectionName}` };
    }
  } catch (error) {
    console.error(`Error inserting/updating data into ${collectionName}:`, error);
    throw new Error(`Could not insert/update data into ${collectionName}`);
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
    console.log("filter: ",query)
    const collection = db.collection(collectionName);
    
    const result = await collection.deleteOne(query);
    console.log("__result:",result)
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting data from ${collectionName}:`, error);
    throw new Error(`Could not delete data from ${collectionName}`);
  }
}
