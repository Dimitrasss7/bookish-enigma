import puppeteer from 'puppeteer';
import { storage } from './storage';
import type { User, DietPlan, DietPlanDay } from '@shared/schema';

interface PDFGenerationData {
  user: User;
  dietPlan: DietPlan;
  dietPlanDays: DietPlanDay[];
}

export class PDFGenerator {
  private async generateHTML(data: PDFGenerationData): Promise<string> {
    const { user, dietPlan, dietPlanDays } = data;
    
    const currentWeight = 70; // Mock data for now - would come from questionnaire
    const targetWeight = 60;
    const weightToLose = currentWeight - targetWeight;
    
    return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Персональный план кето-диеты</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
        }
        
        .header {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="60" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }
        
        .user-info {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 30px;
            margin: 20px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .user-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 2px solid transparent;
            background-clip: padding-box;
            position: relative;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 15px;
            padding: 2px;
            background: linear-gradient(135deg, #22c55e, #3b82f6, #8b5cf6);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            z-index: -1;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #6b7280;
            font-size: 0.9rem;
        }
        
        .meal-plan {
            padding: 30px;
        }
        
        .food-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .week-section {
            margin-bottom: 40px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            border: 1px solid #e5e7eb;
        }
        
        .week-title {
            font-size: 1.8rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
        }
        
        .week-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #22c55e, #16a34a);
            border-radius: 2px;
        }
        
        .day-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .day-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 1px solid #f3f4f6;
            transition: transform 0.3s ease;
        }
        
        .day-card:hover {
            transform: translateY(-2px);
        }
        
        .day-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .meal {
            margin-bottom: 15px;
            padding: 15px;
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            border-radius: 10px;
            border-left: 4px solid #22c55e;
        }
        
        .meal-type {
            font-weight: bold;
            color: #16a34a;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .meal-name {
            font-size: 1.1rem;
            color: #1f2937;
            margin: 5px 0;
        }
        
        .meal-calories {
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .macros {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 0.8rem;
            color: #6b7280;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .footer {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 30px;
            text-align: center;
            margin-top: 40px;
        }
        
        .footer h3 {
            margin-bottom: 10px;
        }
        
        .footer p {
            opacity: 0.8;
            font-size: 0.9rem;
        }
        
        .tips-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 30px;
            margin: 30px;
            border-radius: 20px;
            border: 1px solid #f59e0b;
        }
        
        .tips-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #92400e;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .tip {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border-left: 4px solid #f59e0b;
        }
        
        @media print {
            body { -webkit-print-color-adjust: exact; }
            .page-break { page-break-before: always; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🥑 Ваш Персональный План Кето-Диеты</h1>
            <p>Индивидуальное меню на 28 дней для достижения ваших целей</p>
        </div>

        <!-- User Info -->
        <div class="user-info">
            <h2>Персональная информация</h2>
            <div class="user-stats">
                <div class="stat-card">
                    <div class="stat-value">${currentWeight} кг</div>
                    <div class="stat-label">Текущий вес</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${targetWeight} кг</div>
                    <div class="stat-label">Целевой вес</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${weightToLose.toFixed(1)} кг</div>
                    <div class="stat-label">К сбросу</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${dietPlan.dailyCalories}</div>
                    <div class="stat-label">Калорий в день</div>
                </div>
            </div>
        </div>

        <!-- Meal Plan -->
        <div class="meal-plan">
            ${this.generateWeeksHTML(dietPlanDays)}
        </div>

        <!-- Tips Section -->
        <div class="tips-section">
            <h3 class="tips-title">💡 Полезные советы для успеха</h3>
            <div class="tip">
                <strong>Пейте больше воды:</strong> Рекомендуется выпивать ${dietPlan.waterIntake} литров воды в день для поддержания оптимального метаболизма.
            </div>
            <div class="tip">
                <strong>Следите за макросами:</strong> Ваша цель - ${dietPlan.fatPercentage}% жиров, ${dietPlan.proteinPercentage}% белков, ${dietPlan.carbPercentage}% углеводов.
            </div>
            <div class="tip">
                <strong>Будьте терпеливы:</strong> Результаты станут заметны через 2-3 недели. Не сдавайтесь!
            </div>
            <div class="tip">
                <strong>Физическая активность:</strong> Добавьте 30 минут легких упражнений в день для лучших результатов.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <h3>Моя Кето Диета</h3>
            <p>Ваш путь к здоровому образу жизни начинается сегодня!</p>
            <p>Создано специально для вас • ${new Date().toLocaleDateString('ru-RU')}</p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateWeeksHTML(dietPlanDays: DietPlanDay[]): string {
    const weeks = [];
    for (let week = 1; week <= 4; week++) {
      const weekDays = dietPlanDays.filter(day => 
        day.dayNumber > (week - 1) * 7 && day.dayNumber <= week * 7
      );
      
      weeks.push(`
        <div class="week-section ${week > 1 ? 'page-break' : ''}">
          <h3 class="week-title">Неделя ${week}</h3>
          <div class="day-grid">
            ${weekDays.map(day => this.generateDayHTML(day)).join('')}
          </div>
        </div>
      `);
    }
    return weeks.join('');
  }

  private generateDayHTML(day: DietPlanDay): string {
    const meals = [
      { 
        type: 'Завтрак', 
        name: 'Омлет с авокадо и семенами чиа', 
        calories: 320, 
        protein: 25, 
        fat: 28, 
        carbs: 8,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmY3ZWQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZWY5YzMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzMzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+🥑 Кето-завтрак</dGV4dD48L3N2Zz4='
      },
      { 
        type: 'Обед', 
        name: 'Салат с лососем и оливковым маслом', 
        calories: 450, 
        protein: 35, 
        fat: 32, 
        carbs: 12,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmMGZkZjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkY2ZjZTciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNiKSIvPjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzE2NjUzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+🐟 Кето-обед</dGV4dD48L3N2Zz4='
      },
      { 
        type: 'Ужин', 
        name: 'Куриная грудка с брокколи и маслом', 
        calories: 380, 
        protein: 40, 
        fat: 20, 
        carbs: 15,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZWY3ZjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZGY0ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNjKSIvPjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzU4MzM0ZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+🍗 Кето-ужин</dGV4dD48L3N2Zz4='
      },
      { 
        type: 'Перекус', 
        name: 'Орехи и кето-смузи с ягодами', 
        calories: 180, 
        protein: 8, 
        fat: 16, 
        carbs: 6,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZWY5YzMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmY2Y0ZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0idXJsKCNkKSIvPjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzM4ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+🥜 Кето-перекус</dGV4dD48L3N2Zz4='
      }
    ];

    return `
      <div class="day-card">
        <div class="day-title">День ${day.dayNumber}</div>
        ${meals.map(meal => `
          <div class="meal">
            <img src="${meal.image}" alt="${meal.name}" class="food-image" />
            <div class="meal-type">${meal.type}</div>
            <div class="meal-name">${meal.name}</div>
            <div class="meal-calories">${meal.calories} ккал</div>
            <div class="macros">
              <span>Б: ${meal.protein}г</span>
              <span>Ж: ${meal.fat}г</span>
              <span>У: ${meal.carbs}г</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  public async generatePDF(userId: number): Promise<Buffer> {
    const user = await storage.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const dietPlan = await storage.getDietPlan(userId);
    if (!dietPlan) {
      throw new Error('Diet plan not found');
    }

    const dietPlanWithDays = await storage.getDietPlanWithDays(userId);
    if (!dietPlanWithDays) {
      throw new Error('Diet plan days not found');
    }

    const html = await this.generateHTML({
      user,
      dietPlan,
      dietPlanDays: dietPlanWithDays.dietPlanDays
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }
}

export const pdfGenerator = new PDFGenerator();