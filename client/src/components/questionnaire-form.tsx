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
import { ChevronLeft, ChevronRight, User, Activity, Utensils, Ruler } from "lucide-react";
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
  { id: 'gender', title: 'Укажите ваш пол', description: 'Это поможет нам рассчитать ваши потребности в калориях более точно' },
  { id: 'activity', title: 'Какой у вас уровень физической активности?', description: 'Выберите вариант, который лучше всего описывает ваш образ жизни' },
  { id: 'protein', title: 'Какие источники белка вы предпочитаете?', description: 'Выберите все подходящие варианты' },
  { id: 'vegetables', title: 'Какие овощи вы любите?', description: 'Выберите ваши любимые овощи для включения в план' },
  { id: 'parameters', title: 'Укажите ваши параметры', description: 'Эти данные необходимы для точного расчета ваших потребностей в калориях' },
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Создайте ваш персональный план
        </h2>
        <p className="text-xl text-gray-600">
          Ответьте на несколько вопросов, чтобы получить план питания, идеально подходящий именно вам
        </p>
      </div>

      <ProgressBar value={currentStep + 1} max={totalSteps} className="mb-8" />

      <Card className="border-2 border-gray-100 shadow-lg">
        <CardContent className="p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {questions[currentStep].title}
            </h3>
            <p className="text-gray-600">
              {questions[currentStep].description}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              {renderQuestion()}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Назад
              </Button>
              
              <div className="text-sm text-gray-500">
                {currentStep + 1} из {totalSteps}
              </div>
              
              {currentStep === totalSteps - 1 ? (
                <Button type="submit" className="flex items-center gap-2">
                  Получить результаты
                  <Utensils className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Далее
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
