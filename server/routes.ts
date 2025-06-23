import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuestionnaireResponseSchema, insertPaymentSchema } from "@shared/schema";
import { pdfGenerator } from "./pdf-generator";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Questionnaire routes
  app.post("/api/questionnaire", async (req, res) => {
    try {
      const validatedData = insertQuestionnaireResponseSchema.parse(req.body);
      const response = await storage.createQuestionnaireResponse(validatedData);
      res.json(response);
    } catch (error) {
      console.error("Error creating questionnaire response:", error);
      res.status(500).json({ message: "Failed to create questionnaire response" });
    }
  });

  app.get("/api/questionnaire/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const response = await storage.getQuestionnaireResponse(userId);
      if (!response) {
        return res.status(404).json({ message: "Questionnaire response not found" });
      }
      res.json(response);
    } catch (error) {
      console.error("Error fetching questionnaire response:", error);
      res.status(500).json({ message: "Failed to fetch questionnaire response" });
    }
  });

  // Diet plan routes
  app.post("/api/diet-plan", async (req, res) => {
    try {
      const dietPlan = await storage.createDietPlan(req.body);
      res.json(dietPlan);
    } catch (error) {
      console.error("Error creating diet plan:", error);
      res.status(500).json({ message: "Failed to create diet plan" });
    }
  });

  app.get("/api/diet-plan/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const dietPlan = await storage.getDietPlanWithDays(userId);
      if (!dietPlan) {
        return res.status(404).json({ message: "Diet plan not found" });
      }
      res.json(dietPlan);
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      res.status(500).json({ message: "Failed to fetch diet plan" });
    }
  });

  // Recipe routes
  app.get("/api/recipes", async (req, res) => {
    try {
      const category = req.query.category as string;
      const recipes = category 
        ? await storage.getRecipesByCategory(category)
        : await storage.getRecipes();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Failed to fetch recipes" });
    }
  });

  app.post("/api/recipes", async (req, res) => {
    try {
      const recipe = await storage.createRecipe(req.body);
      res.json(recipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Failed to create recipe" });
    }
  });

  // Diet plan day routes
  app.post("/api/diet-plan-days", async (req, res) => {
    try {
      const dietPlanDay = await storage.createDietPlanDay(req.body);
      res.json(dietPlanDay);
    } catch (error) {
      console.error("Error creating diet plan day:", error);
      res.status(500).json({ message: "Failed to create diet plan day" });
    }
  });

  app.patch("/api/diet-plan-days/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isCompleted } = req.body;
      const dietPlanDay = await storage.updateDietPlanDayCompletion(id, isCompleted);
      res.json(dietPlanDay);
    } catch (error) {
      console.error("Error updating diet plan day:", error);
      res.status(500).json({ message: "Failed to update diet plan day" });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, planType, userId } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to kopecks
        currency: "rub",
        metadata: {
          planType,
          userId: userId?.toString() || "",
        },
      });

      // Store payment in database
      if (userId) {
        await storage.createPayment({
          userId,
          stripePaymentIntentId: paymentIntent.id,
          amount: amount.toString(),
          status: "pending",
          planType,
        });
      }

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Stripe webhook to handle payment confirmations
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const event = req.body;
      
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        
        // Update payment status
        await storage.updatePaymentStatus(paymentIntent.id, "succeeded");
        
        // Update user subscription if userId is available
        const userId = parseInt(paymentIntent.metadata?.userId || "0");
        if (userId) {
          const planType = paymentIntent.metadata?.planType;
          const expiresAt = planType === "premium" 
            ? undefined // lifetime access
            : new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); // 28 days
          
          await storage.updateUserSubscription(userId, "active", expiresAt);
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error("Error handling stripe webhook:", error);
      res.status(500).json({ message: "Webhook handler failed" });
    }
  });

  // Payment history routes
  app.get("/api/payments/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const payments = await storage.getUserPayments(userId);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // PDF Generation endpoint
  app.get("/api/generate-pdf/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const pdfBuffer = await pdfGenerator.generatePDF(userId);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="keto-plan-${userId}.pdf"`);
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
