import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Learning Modules Table
export const learningModules = mysqlTable("learning_modules", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "fusion", "26ai", "general"
  subcategory: varchar("subcategory", { length: 100 }), // "erp", "hcm", "scm", "cx", "vector-search", "sql-ai", etc.
  content: text("content"), // Markdown content
  officialDocLink: varchar("official_doc_link", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearningModule = typeof learningModules.$inferSelect;
export type InsertLearningModule = typeof learningModules.$inferInsert;

// Resources Table
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "fusion", "26ai", "general"
  resourceType: varchar("resource_type", { length: 50 }).notNull(), // "pdf", "video", "documentation", "tutorial"
  url: varchar("url", { length: 500 }).notNull(),
  author: varchar("author", { length: 255 }),
  publishedDate: timestamp("published_date"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

// News Feed Table
export const newsFeed = mysqlTable("news_feed", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  content: text("content"),
  category: varchar("category", { length: 100 }).notNull(), // "fusion", "26ai", "cloud", "ai"
  sourceUrl: varchar("source_url", { length: 500 }).notNull(),
  sourceType: varchar("source_type", { length: 50 }).notNull(), // "oracle-news", "oracle-blog", "press-release"
  publishedDate: timestamp("published_date").notNull(),
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsFeedItem = typeof newsFeed.$inferSelect;
export type InsertNewsFeedItem = typeof newsFeed.$inferInsert;

// Diagrams Table
export const diagrams = mysqlTable("diagrams", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "architecture", "data-flow", "ai-pipeline", etc.
  svgContent: text("svg_content"),
  imageUrl: varchar("image_url", { length: 500 }),
  relatedModuleId: int("related_module_id"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Diagram = typeof diagrams.$inferSelect;
export type InsertDiagram = typeof diagrams.$inferInsert;

// Chat History Table
export const chatHistory = mysqlTable("chat_history", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatHistoryItem = typeof chatHistory.$inferSelect;
export type InsertChatHistoryItem = typeof chatHistory.$inferInsert;

// Search Index Table (for full-text search)
export const searchIndex = mysqlTable("search_index", {
  id: int("id").autoincrement().primaryKey(),
  contentType: varchar("content_type", { length: 50 }).notNull(), // "module", "resource", "diagram", "news"
  contentId: int("content_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  keywords: text("keywords"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SearchIndexItem = typeof searchIndex.$inferSelect;
export type InsertSearchIndexItem = typeof searchIndex.$inferInsert;