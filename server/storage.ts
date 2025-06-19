import {
  users,
  questionnaireResponses,
  dietPlans,
  recipes,
  dietPlanDays,
  payments,
  type User,
  type InsertUser,
  type QuestionnaireResponse,
  type InsertQuestionnaireResponse,
  type DietPlan,
  type InsertDietPlan,
  type Recipe,
  type InsertRecipe,
  type DietPlanDay,
  type InsertDietPlanDay,
  type Payment,
  type InsertPayment,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscription(userId: number, status: string, expiresAt?: Date): Promise<User>;

  // Questionnaire operations
  createQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse>;
  getQuestionnaireResponse(userId: number): Promise<QuestionnaireResponse | undefined>;

  // Diet plan operations
  createDietPlan(dietPlan: InsertDietPlan): Promise<DietPlan>;
  getDietPlan(userId: number): Promise<DietPlan | undefined>;
  getDietPlanWithDays(userId: number): Promise<(DietPlan & { dietPlanDays: DietPlanDay[] }) | undefined>;

  // Recipe operations
  getRecipes(): Promise<Recipe[]>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;

  // Diet plan day operations
  createDietPlanDay(dietPlanDay: InsertDietPlanDay): Promise<DietPlanDay>;
  updateDietPlanDayCompletion(id: number, isCompleted: boolean): Promise<DietPlanDay>;
  getDietPlanDays(dietPlanId: number): Promise<DietPlanDay[]>;

  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(stripePaymentIntentId: string, status: string): Promise<Payment>;
  getUserPayments(userId: number): Promise<Payment[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserSubscription(userId: number, status: string, expiresAt?: Date): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionStatus: status,
        subscriptionExpiresAt: expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Questionnaire operations
  async createQuestionnaireResponse(response: InsertQuestionnaireResponse): Promise<QuestionnaireResponse> {
    const [questionnaireResponse] = await db
      .insert(questionnaireResponses)
      .values(response)
      .returning();
    return questionnaireResponse;
  }

  async getQuestionnaireResponse(userId: number): Promise<QuestionnaireResponse | undefined> {
    const [response] = await db
      .select()
      .from(questionnaireResponses)
      .where(eq(questionnaireResponses.userId, userId))
      .orderBy(desc(questionnaireResponses.createdAt));
    return response || undefined;
  }

  // Diet plan operations
  async createDietPlan(dietPlan: InsertDietPlan): Promise<DietPlan> {
    const [plan] = await db
      .insert(dietPlans)
      .values(dietPlan)
      .returning();
    return plan;
  }

  async getDietPlan(userId: number): Promise<DietPlan | undefined> {
    const [plan] = await db
      .select()
      .from(dietPlans)
      .where(eq(dietPlans.userId, userId))
      .orderBy(desc(dietPlans.createdAt));
    return plan || undefined;
  }

  async getDietPlanWithDays(userId: number): Promise<(DietPlan & { dietPlanDays: DietPlanDay[] }) | undefined> {
    const plan = await this.getDietPlan(userId);
    if (!plan) return undefined;

    const days = await this.getDietPlanDays(plan.id);
    return { ...plan, dietPlanDays: days };
  }

  // Recipe operations
  async getRecipes(): Promise<Recipe[]> {
    return await db.select().from(recipes);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return await db
      .select()
      .from(recipes)
      .where(eq(recipes.category, category));
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const [newRecipe] = await db
      .insert(recipes)
      .values(recipe)
      .returning();
    return newRecipe;
  }

  // Diet plan day operations
  async createDietPlanDay(dietPlanDay: InsertDietPlanDay): Promise<DietPlanDay> {
    const [day] = await db
      .insert(dietPlanDays)
      .values(dietPlanDay)
      .returning();
    return day;
  }

  async updateDietPlanDayCompletion(id: number, isCompleted: boolean): Promise<DietPlanDay> {
    const [day] = await db
      .update(dietPlanDays)
      .set({
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where(eq(dietPlanDays.id, id))
      .returning();
    return day;
  }

  async getDietPlanDays(dietPlanId: number): Promise<DietPlanDay[]> {
    return await db
      .select()
      .from(dietPlanDays)
      .where(eq(dietPlanDays.dietPlanId, dietPlanId))
      .orderBy(dietPlanDays.dayNumber);
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db
      .insert(payments)
      .values(payment)
      .returning();
    return newPayment;
  }

  async updatePaymentStatus(stripePaymentIntentId: string, status: string): Promise<Payment> {
    const [payment] = await db
      .update(payments)
      .set({ status })
      .where(eq(payments.stripePaymentIntentId, stripePaymentIntentId))
      .returning();
    return payment;
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }
}

export const storage = new DatabaseStorage();
