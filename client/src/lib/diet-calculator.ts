import { QuestionnaireData, DietCalculationResult } from './types';

export function calculateDietPlan(data: QuestionnaireData): DietCalculationResult {
  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  let bmr: number;
  if (data.gender === 'male') {
    bmr = 10 * data.currentWeight + 6.25 * data.height - 5 * data.age + 5;
  } else {
    bmr = 10 * data.currentWeight + 6.25 * data.height - 5 * data.age - 161;
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityMultipliers[data.activityLevel];

  // For weight loss, create a moderate caloric deficit (15-20%)
  const dailyCalories = Math.round(tdee * 0.8);

  // Calculate metabolic age (simplified estimation)
  const idealBmr = data.gender === 'male' 
    ? 10 * 70 + 6.25 * data.height - 5 * 30 + 5  // ideal weight 70kg, age 30
    : 10 * 60 + 6.25 * data.height - 5 * 30 - 161; // ideal weight 60kg, age 30
  
  const metabolicAge = Math.round(data.age * (bmr / idealBmr));

  // Calculate water intake (ml per kg body weight)
  const waterIntake = Math.round((data.currentWeight * 35) / 1000 * 10) / 10; // in liters

  // Keto macronutrient distribution
  const fatPercentage = 70;
  const proteinPercentage = 25;
  const carbPercentage = 5;

  // Calculate projected weight loss (simplified model)
  const weeklyWeightLoss = 0.5 + (data.currentWeight - data.targetWeight) / 20; // kg per week
  const projectedWeightLoss = {
    week1: Math.round(weeklyWeightLoss * 10) / 10,
    week2: Math.round(weeklyWeightLoss * 2 * 10) / 10,
    week3: Math.round(weeklyWeightLoss * 3 * 10) / 10,
    week4: Math.round(weeklyWeightLoss * 4 * 10) / 10,
  };

  return {
    metabolicAge,
    dailyCalories,
    waterIntake,
    fatPercentage,
    proteinPercentage,
    carbPercentage,
    projectedWeightLoss,
  };
}

export function generateDietPlanDays(
  dailyCalories: number,
  proteinSources: string[],
  favoriteVegetables: string[]
): Array<{
  dayNumber: number;
  breakfast: { name: string; calories: number };
  lunch: { name: string; calories: number };
  dinner: { name: string; calories: number };
  snack?: { name: string; calories: number };
}> {
  // Sample keto meals based on user preferences
  const breakfastOptions = [
    { name: 'Авокадо с яйцом и беконом', calories: 420 },
    { name: 'Омлет с сыром и шпинатом', calories: 380 },
    { name: 'Кето-панкейки с ягодами', calories: 350 },
    { name: 'Скрэмбл с лососем', calories: 450 },
  ];

  const lunchOptions = [
    { name: 'Лосось с брокколи', calories: 580 },
    { name: 'Куриная грудка с авокадо', calories: 520 },
    { name: 'Говяжий стейк с салатом', calories: 620 },
    { name: 'Креветки с цукини', calories: 480 },
  ];

  const dinnerOptions = [
    { name: 'Говядина с овощами', calories: 650 },
    { name: 'Запеченная рыба с спаржей', calories: 590 },
    { name: 'Свинина с цветной капустой', calories: 680 },
    { name: 'Куриные бедра с брокколи', calories: 630 },
  ];

  const days = [];
  for (let i = 1; i <= 28; i++) {
    const breakfast = breakfastOptions[i % breakfastOptions.length];
    const lunch = lunchOptions[i % lunchOptions.length];
    const dinner = dinnerOptions[i % dinnerOptions.length];

    days.push({
      dayNumber: i,
      breakfast,
      lunch,
      dinner,
    });
  }

  return days;
}
