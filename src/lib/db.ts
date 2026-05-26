import { MongoClient, type Db, type Collection, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "atelier_os";

// Use globalThis to persist state across module reloads in Next.js dev mode
const globalStore = globalThis as unknown as {
  _mongoClient?: MongoClient;
  _mongoDb?: Db;
  _inMemoryCollections?: Record<string, Document[]>;
  _useInMemory?: boolean;
};

// In-memory fallback store for when MongoDB is unavailable
function getInMemoryCollections(): Record<string, Document[]> {
  if (!globalStore._inMemoryCollections) {
    globalStore._inMemoryCollections = {};
  }
  return globalStore._inMemoryCollections;
}

class InMemoryCollection {
  private name: string;

  constructor(name: string) {
    this.name = name;
    const collections = getInMemoryCollections();
    if (!collections[name]) {
      collections[name] = [];
    }
  }

  async findOne(filter: Record<string, unknown>) {
    const docs = getInMemoryCollections()[this.name];
    return (
      docs.find((doc) =>
        Object.entries(filter).every(
          ([key, value]) => doc[key] === value
        )
      ) ?? null
    );
  }

  async insertOne(doc: Document) {
    const id = crypto.randomUUID();
    const newDoc = { ...doc, _id: id };
    getInMemoryCollections()[this.name].push(newDoc);
    return { insertedId: id };
  }
}

class InMemoryDb {
  collection(name: string) {
    return new InMemoryCollection(name) as unknown as Collection;
  }
}

export async function getDb(): Promise<Db> {
  // If we already established that MongoDB is unavailable, use in-memory
  if (globalStore._useInMemory) {
    return new InMemoryDb() as unknown as Db;
  }

  if (globalStore._mongoClient && globalStore._mongoDb) {
    return globalStore._mongoDb;
  }

  if (!uri) {
    console.warn(
      "MONGODB_URI not set. Using in-memory storage (data will be lost on restart)."
    );
    globalStore._useInMemory = true;
    return new InMemoryDb() as unknown as Db;
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();

    const db = client.db(dbName);

    globalStore._mongoClient = client;
    globalStore._mongoDb = db;

    console.log("Connected to MongoDB successfully.");
    return db;
  } catch (error) {
    console.warn(
      "MongoDB connection failed. Using in-memory storage (data will be lost on restart).",
      error instanceof Error ? error.message : error
    );
    globalStore._useInMemory = true;
    return new InMemoryDb() as unknown as Db;
  }
}
