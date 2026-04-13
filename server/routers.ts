import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import type { Message } from "./_core/llm";
import {
  getLearningModules,
  getLearningModuleById,
  getResources,
  getNewsFeed,
  getDiagrams,
  getDiagramById,
  searchContent,
  getChatHistory,
  addChatMessage,
} from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Learning Modules Router
  learning: router({
    modules: publicProcedure
      .input(
        z
          .object({
            category: z.string().optional(),
            subcategory: z.string().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const modules = await getLearningModules(
          input?.category,
          input?.subcategory
        );
        return modules;
      }),

    moduleById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const module = await getLearningModuleById(input.id);
        return module;
      }),
  }),

  // Resources Router
  resources: router({
    list: publicProcedure
      .input(
        z
          .object({
            category: z.string().optional(),
            resourceType: z.string().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const resources = await getResources(
          input?.category,
          input?.resourceType
        );
        return resources;
      }),
  }),

  // News Feed Router
  news: router({
    feed: publicProcedure
      .input(
        z
          .object({
            category: z.string().optional(),
            limit: z.number().optional(),
          })
          .optional()
      )
      .query(async ({ input }) => {
        const feed = await getNewsFeed(input?.category, input?.limit);
        return feed;
      }),
  }),

  // Diagrams Router
  diagrams: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        const diagrams = await getDiagrams(input?.category);
        return diagrams;
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const diagram = await getDiagramById(input.id);
        return diagram;
      }),
  }),

  // Search Router
  search: router({
    global: publicProcedure
      .input(z.object({ query: z.string(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        const results = await searchContent(input.query, input.limit);
        return results;
      }),
  }),

  // Chat Router
  chat: router({
    history: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const history = await getChatHistory(ctx.user.id, input?.limit);
        return history;
      }),

    send: protectedProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // Add user message to history
        await addChatMessage(ctx.user.id, "user", input.message);

        try {
          // Generate AI response using LLM
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content:
                  "You are an expert assistant for Oracle Fusion Applications and Oracle 26ai Database. Provide concise, accurate, and helpful answers about Oracle technologies, features, and best practices. Keep responses focused and informative.",
              },
              { role: "user", content: input.message },
            ],
          });

          const content = response.choices[0]?.message?.content;
          const assistantMessage =
            typeof content === "string"
              ? content
              : "I apologize, I could not generate a response at this time.";
          await addChatMessage(ctx.user.id, "assistant", assistantMessage);

          return { userMessage: input.message, assistantMessage };
        } catch (error) {
          console.error("[Chat] LLM invocation failed:", error);
          const errorMessage =
            "I encountered an error while processing your request. Please try again.";
          try {
            await addChatMessage(ctx.user.id, "assistant", errorMessage);
          } catch (dbError) {
            console.error("[Chat] Failed to save error message:", dbError);
          }
          return { userMessage: input.message, assistantMessage: errorMessage };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
