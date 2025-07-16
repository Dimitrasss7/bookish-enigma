# Моя Кето Диета - Keto Diet Planning Application

## Overview

"Моя Кето Диета" is a personalized keto diet planning web application built with a modern full-stack architecture. The application provides users with customized meal plans, nutritional guidance, and progress tracking for ketogenic diet adherence. The system includes a questionnaire-based approach to generate personalized diet recommendations and integrates payment processing for premium features.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom keto diet color scheme
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with ESBuild for production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Development**: Hot module replacement with Vite integration
- **Production**: Compiled with ESBuild for optimal performance

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Provider**: Neon Database (serverless PostgreSQL)
- **Connection**: Connection pooling with WebSocket support
- **Migrations**: Drizzle Kit for schema management

## Key Components

### User Management
- User registration and profile management
- Stripe customer integration for payment processing
- Subscription status tracking with expiration dates
- Profile customization with images
- Weight tracking and goal management

### Modern Questionnaire System
- Multi-step form with animated progress indicators
- Color-coded sections with custom icons
- Glass-morphism design with gradient backgrounds
- Comprehensive health and preference assessment
- Real-time validation using Zod schemas
- Beautiful card-based interface with hover effects

### Diet Plan Generation
- BMR calculation using Mifflin-St Jeor equation
- Activity level multipliers for TDEE calculation
- Keto macronutrient distribution (70% fat, 25% protein, 5% carbs)
- Personalized calorie recommendations
- Metabolic age estimation
- Water intake calculations

### Payment Processing
- Modern payment page with plan comparison
- Two-tier pricing (990₽ Basic, 1990₽ Premium)
- Secure Stripe integration with tabbed payment methods
- Trust indicators and money-back guarantee
- Terms of service and data processing consent
- Beautiful card-based design with gradients

### User Dashboard
- Comprehensive personal cabinet with 5 main sections
- Real-time progress tracking with visual indicators
- Today's meal plan with macro breakdown
- Weekly weight loss progress charts
- Payment history and subscription management
- Profile settings and weight updates
- Quick actions for downloading plans and support

### Corporate Website Pages
- **About**: Company overview, team profiles, mission and values
- **Contact**: Contact form, company information, FAQ preview
- **Terms**: Comprehensive terms of service and legal information
- **Privacy**: Detailed privacy policy and data protection information
- **Refund**: Money-back guarantee policy and refund process
- **How It Works**: Step-by-step explanation of the keto program
- **Pricing**: Detailed pricing comparison and plan features
- **FAQ**: Categorized frequently asked questions with search
- **Reviews**: Customer testimonials and success stories
- **Blog**: Content marketing hub with keto articles and tips
- **Career**: Job openings, company culture, and application process

### Navigation System
- Responsive header with mobile menu support
- Comprehensive footer with organized link structure
- Consistent branding across all pages
- SEO-optimized structure with proper meta information

### Meal Planning
- Recipe database with categorization
- Daily meal plan generation with detailed macros
- Shopping list generation
- Meal completion tracking with visual feedback
- Progress tracking and completion status

## Data Flow

1. **User Onboarding**: Users complete a comprehensive questionnaire covering demographics, activity levels, food preferences, and health goals
2. **Diet Calculation**: The system processes questionnaire data to calculate BMR, TDEE, and generates personalized recommendations
3. **Plan Generation**: Based on calculations, the system creates a customized diet plan with meal suggestions and shopping lists
4. **Payment Processing**: Users can upgrade to premium features through Stripe integration
5. **Progress Tracking**: The dashboard provides ongoing monitoring of weight loss progress and meal completion

## External Dependencies

### Payment Processing
- **Stripe**: Payment processing, subscription management, and customer billing
- **Integration**: React Stripe.js for secure payment forms

### Database
- **Neon Database**: Serverless PostgreSQL with automatic scaling
- **Connection**: WebSocket-based connections for real-time capabilities

### UI Components
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Shadcn/ui**: Pre-built component library with consistent design system

### Development Tools
- **Replit**: Development environment integration
- **Vite**: Fast development server and build tool
- **ESBuild**: High-performance bundling for production

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module integration
- **Hot Reload**: Vite development server on port 5000
- **Environment**: Automatic module detection and setup

### Production Deployment
- **Build Process**: Vite build for client assets, ESBuild for server compilation
- **Deployment Target**: Autoscale deployment with automatic scaling
- **Port Configuration**: External port 80 mapping to internal port 5000
- **Static Assets**: Compiled to `dist/public` directory

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable for connection string
- **Payments**: `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY` for payment processing
- **Security**: Environment-based configuration for sensitive credentials

## Changelog

Changelog:
- July 16, 2025. Major expansion: Added comprehensive website structure with 11 new pages (About, Contact, Terms, Privacy, Refund, How It Works, Pricing, FAQ, Reviews, Blog, Career), complete navigation system with header/footer, and full corporate website functionality. Migrated from Replit Agent to standard Replit environment with proper security setup.
- June 23, 2025. Major update: Created modern payment system with premium/basic tiers (990₽/1990₽), comprehensive user dashboard with 5 tabs (overview, meals, progress, profile, payments), weight tracking, meal completion system, and enhanced UI with gradient designs and real food photography integration
- June 23, 2025. Modernized questionnaire design with enhanced UI components, animated progress indicators, colorful icons, and integrated user-uploaded food photography
- June 19, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.