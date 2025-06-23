import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProgressBar } from "./progress-bar";
import { QuestionnaireData, PROTEIN_SOURCES, VEGETABLES, ACTIVITY_LEVELS } from "@/lib/types";
import { ChevronLeft, ChevronRight, User, Activity, Utensils, Ruler, Heart, Zap, Target, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const questionnaireSchema = z.object({
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'high']),
  proteinSources: z.array(z.string()).min(1, "Выберите хотя бы один источник белка"),
  favoriteVegetables: z.array(z.string()),
  badHabits: z.array(z.string()),
  age: z.number().min(18, "Возраст должен быть не менее 18 лет").max(80, "Возраст должен быть не более 80 лет"),
  height: z.number().min(140, "Рост должен быть не менее 140 см").max(220, "Рост должен быть не более 220 см"),
  currentWeight: z.number().min(40, "Вес должен быть не менее 40 кг").max(200, "Вес должен быть не более 200 кг"),
  targetWeight: z.number().min(40, "Целевой вес должен быть не менее 40 кг").max(200, "Целевой вес должен быть не более 200 кг"),
});

interface QuestionnaireFormProps {
  onComplete: (data: QuestionnaireData) => void;
}

const questions = [
  { 
    id: 'gender', 
    title: 'Укажите ваш пол', 
    description: 'Это поможет нам рассчитать ваши потребности в калориях более точно',
    icon: User,
    color: 'bg-blue-500'
  },
  { 
    id: 'activity', 
    title: 'Какой у вас уровень физической активности?', 
    description: 'Выберите вариант, который лучше всего описывает ваш образ жизни',
    icon: Activity,
    color: 'bg-green-500'
  },
  { 
    id: 'protein', 
    title: 'Какие источники белка вы предпочитаете?', 
    description: 'Выберите все подходящие варианты',
    icon: Utensils,
    color: 'bg-orange-500'
  },
  { 
    id: 'vegetables', 
    title: 'Какие овощи вы любите?', 
    description: 'Выберите ваши любимые овощи для включения в план',
    icon: Heart,
    color: 'bg-red-500'
  },
  { 
    id: 'parameters', 
    title: 'Укажите ваши параметры', 
    description: 'Эти данные необходимы для точного расчета ваших потребностей в калориях',
    icon: Target,
    color: 'bg-purple-500'
  },
];

export function QuestionnaireForm({ onComplete }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questions.length;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      proteinSources: [],
      favoriteVegetables: [],
      badHabits: [],
    },
  });

  const watchedValues = watch();

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: QuestionnaireData) => {
    onComplete(data);
  };

  const handleProteinSourceChange = (sourceId: string, checked: boolean) => {
    const currentSources = getValues('proteinSources') || [];
    if (checked) {
      setValue('proteinSources', [...currentSources, sourceId]);
    } else {
      setValue('proteinSources', currentSources.filter(id => id !== sourceId));
    }
  };

  const handleVegetableChange = (vegetableId: string, checked: boolean) => {
    const currentVegetables = getValues('favoriteVegetables') || [];
    if (checked) {
      setValue('favoriteVegetables', [...currentVegetables, vegetableId]);
    } else {
      setValue('favoriteVegetables', currentVegetables.filter(id => id !== vegetableId));
    }
  };

  const renderQuestion = () => {
    const question = questions[currentStep];

    switch (question.id) {
      case 'gender':
        return (
          <div className="space-y-6">
            <RadioGroup
              value={watchedValues.gender}
              onValueChange={(value) => setValue('gender', value as 'male' | 'female')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-0">
                <RadioGroupItem value="female" id="female" className="sr-only" />
                <Label
                  htmlFor="female"
                  className={cn(
                    "cursor-pointer w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group",
                    watchedValues.gender === 'female' && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="w-8 h-8 text-pink-500 group-hover:text-primary" />
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 text-center">Женщина</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-0">
                <RadioGroupItem value="male" id="male" className="sr-only" />
                <Label
                  htmlFor="male"
                  className={cn(
                    "cursor-pointer w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group",
                    watchedValues.gender === 'male' && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="w-8 h-8 text-blue-500 group-hover:text-primary" />
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 text-center">Мужчина</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={watchedValues.activityLevel}
              onValueChange={(value) => setValue('activityLevel', value as any)}
              className="space-y-4"
            >
              {ACTIVITY_LEVELS.map((level) => (
                <div key={level.id} className="flex items-center space-x-0">
                  <RadioGroupItem value={level.id} id={level.id} className="sr-only" />
                  <Label
                    htmlFor={level.id}
                    className={cn(
                      "cursor-pointer w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left",
                      watchedValues.activityLevel === level.id && "border-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{level.name}</div>
                        <div className="text-gray-600">{level.description}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'protein':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {PROTEIN_SOURCES.map((source) => (
              <Label
                key={source.id}
                className={cn(
                  "cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition-all text-center",
                  watchedValues.proteinSources?.includes(source.id) && "border-primary bg-primary/5"
                )}
              >
                <Checkbox
                  checked={watchedValues.proteinSources?.includes(source.id) || false}
                  onCheckedChange={(checked) => handleProteinSourceChange(source.id, !!checked)}
                  className="sr-only"
                />
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{source.emoji}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">{source.name}</div>
              </Label>
            ))}
          </div>
        );

      case 'vegetables':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VEGETABLES.map((vegetable) => (
              <Label
                key={vegetable.id}
                className={cn(
                  "cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition-all text-center",
                  watchedValues.favoriteVegetables?.includes(vegetable.id) && "border-primary bg-primary/5"
                )}
              >
                <Checkbox
                  checked={watchedValues.favoriteVegetables?.includes(vegetable.id) || false}
                  onCheckedChange={(checked) => handleVegetableChange(vegetable.id, !!checked)}
                  className="sr-only"
                />
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{vegetable.emoji}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">{vegetable.name}</div>
              </Label>
            ))}
          </div>
        );

      case 'parameters':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Возраст (лет)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  {...register('age', { valueAsNumber: true })}
                  className="text-lg"
                />
                {errors.age && (
                  <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Рост (см)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  {...register('height', { valueAsNumber: true })}
                  className="text-lg"
                />
                {errors.height && (
                  <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700 mb-2">
                  Вес (кг)
                </Label>
                <Input
                  id="currentWeight"
                  type="number"
                  placeholder="70"
                  {...register('currentWeight', { valueAsNumber: true })}
                  className="text-lg"
                />
                {errors.currentWeight && (
                  <p className="text-sm text-red-500 mt-1">{errors.currentWeight.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="targetWeight" className="block text-sm font-medium text-gray-700 mb-2">
                Желаемый вес (кг)
              </Label>
              <Input
                id="targetWeight"
                type="number"
                placeholder="60"
                {...register('targetWeight', { valueAsNumber: true })}
                className="w-full md:w-1/3 text-lg"
              />
              {errors.targetWeight && (
                <p className="text-sm text-red-500 mt-1">{errors.targetWeight.message}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentQuestion = questions[currentStep];
  const IconComponent = currentQuestion.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Modern Header with Icon */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className={cn("w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300", currentQuestion.color)}>
              <IconComponent className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Animated Progress Dots */}
          <div className="flex justify-center space-x-3 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-full transition-all duration-500 ease-out",
                  index < currentStep ? "w-4 h-4 bg-green-500 scale-110" : 
                  index === currentStep ? "w-6 h-6 bg-primary shadow-lg" : 
                  "w-4 h-4 bg-gray-200"
                )}
              />
            ))}
          </div>
          
          <div className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
            Шаг {currentStep + 1} из {totalSteps}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {currentQuestion.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentQuestion.description}
          </p>
        </div>

        {/* Modern Card Design */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-10 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-12">
                {renderQuestion()}
              </div>

              {/* Modern Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Назад
                </Button>
                
                <div className="text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
                  {currentStep + 1} / {totalSteps}
                </div>
                
                {currentStep === totalSteps - 1 ? (
                  <Button type="submit" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg">
                    Получить результаты
                    <Zap className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg"
                  >
                    Далее
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
