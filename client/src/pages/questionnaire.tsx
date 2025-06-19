import { useState } from "react";
import { useLocation } from "wouter";
import { QuestionnaireForm } from "@/components/questionnaire-form";
import { QuestionnaireData } from "@/lib/types";
import { calculateDietPlan } from "@/lib/diet-calculator";

export default function Questionnaire() {
  const [, setLocation] = useLocation();

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    // Calculate diet plan
    const dietPlan = calculateDietPlan(data);
    
    // Store data in sessionStorage for the results page
    sessionStorage.setItem('questionnaireData', JSON.stringify(data));
    sessionStorage.setItem('dietPlan', JSON.stringify(dietPlan));
    
    // Navigate to results
    setLocation('/results');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
    </div>
  );
}
