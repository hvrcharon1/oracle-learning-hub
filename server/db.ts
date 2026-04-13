import { eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, learningModules, resources, newsFeed, InsertNewsFeedItem, chatHistory, diagrams, searchIndex } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Learning Modules Queries
export async function getLearningModules(category?: string, subcategory?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(learningModules) as any;
  if (category) {
    query = query.where(eq(learningModules.category, category));
  }
  if (subcategory) {
    query = query.where(eq(learningModules.subcategory, subcategory));
  }
  return query.limit(100);
}

export async function getLearningModuleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(learningModules).where(eq(learningModules.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Resources Queries
export async function getResources(category?: string, resourceType?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(resources) as any;
  if (category) {
    query = query.where(eq(resources.category, category));
  }
  if (resourceType) {
    query = query.where(eq(resources.resourceType, resourceType));
  }
  return query.limit(100);
}

// News Feed Queries
export async function getNewsFeed(category?: string, limit: number = 15) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(newsFeed).orderBy(desc(newsFeed.publishedDate)) as any;
  if (category) {
    query = query.where(eq(newsFeed.category, category));
  }
  return query.limit(limit);
}

export async function addNewsFeedItem(item: InsertNewsFeedItem) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    await db.insert(newsFeed).values(item);
    return item;
  } catch (error) {
    console.error("[Database] Failed to add news feed item:", error);
    throw error;
  }
}

// Chat History Queries
export async function getChatHistory(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(chatHistory)
    .where(eq(chatHistory.userId, userId))
    .orderBy(desc(chatHistory.createdAt))
    .limit(limit);
}

export async function addChatMessage(userId: number, role: "user" | "assistant", message: string) {
  const db = await getDb();
  if (!db) return undefined;

  try {
    await db.insert(chatHistory).values({ userId, role, message });
    return { userId, role, message };
  } catch (error) {
    console.error("[Database] Failed to add chat message:", error);
    throw error;
  }
}

// Search Queries
export async function searchContent(query: string, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];

  // Simple search across search_index table
  const searchTerm = `%${query}%`;
  // Simple LIKE-based search (FULLTEXT not configured)
  return db.select().from(searchIndex)
    .where(sql`${searchIndex.title} LIKE ${searchTerm} OR ${searchIndex.description} LIKE ${searchTerm}`)
    .limit(limit);
}

// Diagrams Queries
export async function getDiagrams(category?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(diagrams) as any;
  if (category) {
    query = query.where(eq(diagrams.category, category));
  }
  return query.limit(50);
}

export async function getDiagramById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(diagrams).where(eq(diagrams.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
