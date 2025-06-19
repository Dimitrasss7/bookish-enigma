import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status"), // active, canceled, expired
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Questionnaire responses
export const questionnaireResponses = pgTable("questionnaire_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  gender: text("gender").notNull(), // male, female
  activityLevel: text("activity_level").notNull(), // sedentary, light, moderate, high
  proteinSources: jsonb("protein_sources").notNull(),
  favoriteVegetables: jsonb("favorite_vegetables"),
  badHabits: jsonb("bad_habits"),
  age: integer("age").notNull(),
  height: integer("height").notNull(), // cm
  currentWeight: decimal("current_weight", { precision: 5, scale: 2 }).notNull(), // kg
  targetWeight: decimal("target_weight", { precision: 5, scale: 2 }).notNull(), // kg
  createdAt: timestamp("created_at").defaultNow(),
});

// Diet plans
export const dietPlans = pgTable("diet_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  questionnaireResponseId: integer("questionnaire_response_id").references(() => questionnaireResponses.id),
  metabolicAge: integer("metabolic_age"),
  dailyCalories: integer("daily_calories"),
  waterIntake: decimal("water_intake", { precision: 3, scale: 1 }), // liters
  fatPercentage: integer("fat_percentage"),
  proteinPercentage: integer("protein_percentage"),
  carbPercentage: integer("carb_percentage"),
  projectedWeightLoss: jsonb("projected_weight_loss"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Recipes
export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ingredients: jsonb("ingredients").notNull(),
  instructions: text("instructions").notNull(),
  calories: integer("calories").notNull(),
  protein: decimal("protein", { precision: 5, scale: 2 }).notNull(), // grams
  fat: decimal("fat", { precision: 5, scale: 2 }).notNull(), // grams
  carbs: decimal("carbs", { precision: 5, scale: 2 }).notNull(), // grams
  category: text("category").notNull(), // breakfast, lunch, dinner, snack
  prepTime: integer("prep_time"), // minutes
  servings: integer("servings").default(1),
  isKeto: boolean("is_keto").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Diet plan days
export const dietPlanDays = pgTable("diet_plan_days", {
  id: serial("id").primaryKey(),
  dietPlanId: integer("diet_plan_id").references(() => dietPlans.id),
  dayNumber: integer("day_number").notNull(), // 1-28
  breakfastRecipeId: integer("breakfast_recipe_id").references(() => recipes.id),
  lunchRecipeId: integer("lunch_recipe_id").references(() => recipes.id),
  dinnerRecipeId: integer("dinner_recipe_id").references(() => recipes.id),
  snackRecipeId: integer("snack_recipe_id").references(() => recipes.id),
  totalCalories: integer("total_calories"),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("rub"),
  status: text("status").notNull(), // pending, succeeded, failed
  planType: text("plan_type").notNull(), // basic, premium
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  questionnaireResponses: many(questionnaireResponses),
  dietPlans: many(dietPlans),
  payments: many(payments),
}));

export const questionnaireResponsesRelations = relations(questionnaireResponses, ({ one, many }) => ({
  user: one(users, {
    fields: [questionnaireResponses.userId],
    references: [users.id],
  }),
  dietPlans: many(dietPlans),
}));

export const dietPlansRelations = relations(dietPlans, ({ one, many }) => ({
  user: one(users, {
    fields: [dietPlans.userId],
    references: [users.id],
  }),
  questionnaireResponse: one(questionnaireResponses, {
    fields: [dietPlans.questionnaireResponseId],
    references: [questionnaireResponses.id],
  }),
  dietPlanDays: many(dietPlanDays),
}));

export const dietPlanDaysRelations = relations(dietPlanDays, ({ one }) => ({
  dietPlan: one(dietPlans, {
    fields: [dietPlanDays.dietPlanId],
    references: [dietPlans.id],
  }),
  breakfastRecipe: one(recipes, {
    fields: [dietPlanDays.breakfastRecipeId],
    references: [recipes.id],
  }),
  lunchRecipe: one(recipes, {
    fields: [dietPlanDays.lunchRecipeId],
    references: [recipes.id],
  }),
  dinnerRecipe: one(recipes, {
    fields: [dietPlanDays.dinnerRecipeId],
    references: [recipes.id],
  }),
  snackRecipe: one(recipes, {
    fields: [dietPlanDays.snackRecipeId],
    references: [recipes.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuestionnaireResponseSchema = createInsertSchema(questionnaireResponses).omit({
  id: true,
  createdAt: true,
});

export const insertDietPlanSchema = createInsertSchema(dietPlans).omit({
  id: true,
  createdAt: true,
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  createdAt: true,
});

export const insertDietPlanDaySchema = createInsertSchema(dietPlanDays).omit({
  id: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type QuestionnaireResponse = typeof questionnaireResponses.$inferSelect;
export type InsertQuestionnaireResponse = z.infer<typeof insertQuestionnaireResponseSchema>;
export type DietPlan = typeof dietPlans.$inferSelect;
export type InsertDietPlan = z.infer<typeof insertDietPlanSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type DietPlanDay = typeof dietPlanDays.$inferSelect;
export type InsertDietPlanDay = z.infer<typeof insertDietPlanDaySchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
