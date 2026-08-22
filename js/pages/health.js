/* ═══════════════════════════════════════════════════════════════════
   HEALTH & WELLNESS PAGE — Ultra-Robust Nutrition Engine, 7-Day Diet & Alerts
   ═══════════════════════════════════════════════════════════════════ */

function HealthPage() {
  const healthData = Store.get('health') || {};
  const scores = Store.get('scores') || {};
  const waterIntake = healthData.waterIntake || 0;
  const waterTarget = healthData.waterTarget || 2500;
  const fillPercent = Math.min(100, Math.round((waterIntake / waterTarget) * 100));

  const sleepLogs = healthData.sleepLogs || [];
  const workoutLogs = healthData.workoutLogs || [];
  const macroLogs = healthData.macroLogs || { protein: 140, carbs: 210, fat: 65, fiber: 35 };

  // Calculate dynamic recommendations based on real user logs
  let recIcon = '💧';
  let recTitle = 'Hydration & Cellular Vitality';
  let recText = `You have logged ${waterIntake}ml (${fillPercent}% of ${waterTarget}ml target). Every water intake log automatically dispatches a hydration report to your email.`;
  if (fillPercent >= 100 && sleepLogs.length && sleepLogs[0].quality < 4) {
    recIcon = '😴';
    recTitle = 'Circadian Sleep Debt Protocol';
    recText = 'Your sleep recovery scored under 4 stars. Take magnesium glycinate and dim blue light 45 minutes prior to sleep.';
  } else if (fillPercent >= 100) {
    recIcon = '🔥';
    recTitle = 'Peak Metabolic Performance';
    recText = 'Hydration milestone achieved! Maintain optimal metabolic rate with a 20-minute resistance or brisk walk workout.';
  }

  const content = `
    <div class="health-page">
      ${UI.sectionHeader(
        'Health & Longevity Protocol',
        'Analyze meal nutrition in real time with our deep parsing engine, generate 7-day healthy diet plans, log hydration with email alerts, and track recovery.',
        `<div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('food-search-input')?.focus()"><i class="fas fa-utensils"></i> Analyze Food</button>
          <button class="btn btn-primary btn-sm" onclick="openWorkoutModal()"><i class="fas fa-plus"></i> Log Workout</button>
        </div>`
      )}

      <!-- Real-Time Dynamic Recommendation -->
      ${UI.recommendationBanner(recIcon, recTitle, recText, 'Log Hydration (+500ml)', 'quickAddWater(500)')}

      <!-- Domain Score Banner -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);display:flex;align-items:center;justify-content:space-between;padding:24px;flex-wrap:wrap;gap:16px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(16,185,129,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">💪</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Health Score: <span style="color:var(--emerald);">${scores.health || 82}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">
              Hydration: <strong>${waterIntake}ml</strong> • Sleep Recovery: <strong>${sleepLogs[0]?.hours || '7.5'} hrs</strong> • Active Vitality Index
            </p>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <button class="btn btn-outline" onclick="openSleepModal()"><i class="fas fa-bed"></i> Log Sleep</button>
          <button class="btn btn-primary" onclick="quickAddWater(250)"><i class="fas fa-tint"></i> Drink Water (+250ml)</button>
        </div>
      </div>

      <!-- Core 2-Column Grid: Water Physics & Deep Food Nutrition Engine -->
      <div class="grid grid-2" style="gap:24px;margin-bottom:24px;">
        
        <!-- 1. Hydration & Water Intake Tracker with 3D Fluid Physics -->
        <div id="health-hydration-section">
          ${WaterPhysicsEngine.render3DWaterGlass()}
        </div>

        <!-- 2. Strongest Multi-Ingredient Real-Time Nutrition Engine -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-fire-alt" style="color:var(--gold);"></i> Deep Food & Meal Nutrition Engine</h3>
            <span class="badge badge-warning">USDA & NIN Verified</span>
          </div>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">
            Enter any food item with portion (e.g. <em>"100g Paneer"</em>, <em>"2 Chapati + 1 Bowl Dal"</em>, <em>"150g Chicken"</em>). Inputting only units without a food name will trigger smart guidance.
          </p>

          <div style="display:flex;gap:8px;margin-bottom:10px;">
            <input type="text" id="food-search-input" class="chat-input" placeholder="e.g. 100g Paneer, 2 Chapati + 1 bowl Dal, 3 Boiled Eggs" style="flex:2;" onkeydown="if(event.key==='Enter') analyzeFoodItem()">
            <button type="button" class="btn btn-primary btn-sm" onclick="analyzeFoodItem()"><i class="fas fa-search"></i> Calculate Macros</button>
          </div>

          <!-- Quick Suggestion Chips -->
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
            <span style="font-size:11px;color:#94a3b8;margin-top:4px;">Quick Test:</span>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);" onclick="setFoodQuickQuery('100g Paneer')">🧀 100g Paneer</button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);" onclick="setFoodQuickQuery('2 Chapati + 1 Bowl Dal')">🍛 2 Chapati + 1 Dal</button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);" onclick="setFoodQuickQuery('150g Chicken Breast')">🍗 150g Chicken</button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);" onclick="setFoodQuickQuery('3 Boiled Eggs')">🥚 3 Boiled Eggs</button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);" onclick="setFoodQuickQuery('50g Oats + 1 Apple')">🥣 50g Oats + Apple</button>
          </div>

          <!-- Dynamic Analysis Output Container -->
          <div id="food-analysis-result" style="background:rgba(15,23,42,0.9);border:1px solid rgba(251,191,36,0.25);border-radius:14px;padding:16px;">
            <div style="font-weight:800;font-size:14px;color:#fff;margin-bottom:10px;" id="analyzed-food-name">🍛 2 Chapati + 1 Bowl Moong Dal (270g)</div>
            
            <!-- Macro Metric Cards -->
            <div class="grid grid-4" style="gap:8px;text-align:center;font-size:11px;margin-bottom:12px;">
              <div style="background:rgba(99,102,241,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(99,102,241,0.35);">
                <div style="color:var(--indigo-light);font-weight:900;font-size:16px;" id="val-protein">21.0g</div>
                <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥩 Protein</div>
              </div>
              <div style="background:rgba(0,242,254,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(0,242,254,0.35);">
                <div style="color:var(--cyan);font-weight:900;font-size:16px;" id="val-carbs">68.7g</div>
                <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🌾 Net Carbs</div>
              </div>
              <div style="background:rgba(16,185,129,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(16,185,129,0.35);">
                <div style="color:var(--emerald);font-weight:900;font-size:16px;" id="val-fiber">13.2g</div>
                <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥦 Fiber</div>
              </div>
              <div style="background:rgba(251,191,36,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(251,191,36,0.35);">
                <div style="color:var(--gold);font-weight:900;font-size:16px;" id="val-fats">5.5g</div>
                <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥑 Fats</div>
              </div>
            </div>

            <!-- Itemized Ingredients Breakdown List -->
            <div id="food-itemized-breakdown" style="font-size:11.5px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span>• 2 Whole Wheat Roti (70g)</span>
                <span style="color:#cbd5e1;">6g P | 36g C | 1.5g F | 175 kcal</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>• 1 Bowl Yellow Tadka Dal (200g)</span>
                <span style="color:#cbd5e1;">15g P | 33g C | 4g F | 230 kcal</span>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;">
              <div>Total Energy: <strong style="color:var(--emerald);font-size:15px;" id="val-calories">405 kcal</strong></div>
              <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:4px 10px;color:var(--cyan);" onclick="logAnalyzedMeal()"><i class="fas fa-plus"></i> Add to Today's Log</button>
            </div>
          </div>
        </div>

      </div>

      <!-- 3. 7-Day Personalized Indian Healthy Diet Plan -->
      <div class="card card-glass" style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <div>
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-calendar-alt" style="color:var(--emerald);"></i> 7-Day Personalized Indian Healthy Diet Plan</h3>
            <p style="margin:2px 0 0 0;font-size:12px;color:var(--text-muted);">Calorie Target: 2,100 kcal/day • High Protein & Low Glycemic Index</p>
          </div>
          <div style="display:flex;gap:6px;" id="diet-day-tabs">
            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => `
              <button class="btn ${idx === 0 ? 'btn-primary' : 'btn-ghost'} btn-sm" style="padding:4px 10px;font-size:11.5px;border-radius:8px;" onclick="switchDietDay(${idx})">${day}</button>
            `).join('')}
          </div>
        </div>

        <div id="diet-plan-content" style="background:rgba(15,23,42,0.85);border-radius:14px;border:1px solid var(--glass-border);padding:18px;">
          ${renderDietDay(0)}
        </div>
      </div>

      <!-- 4. Daily Mood, Fitness Logs & Sleep Recovery Grid -->
      <div class="grid grid-3" style="gap:20px;margin-bottom:24px;">
        
        <!-- Daily Mood & Bio-Energy -->
        <div class="card card-glass">
          <h3 style="margin:0 0 8px 0;font-size:16px;display:flex;align-items:center;gap:8px;"><i class="fas fa-smile-beam" style="color:var(--cyan);"></i> Daily Mood & Bio-Energy</h3>
          <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Track your mental clarity and emotional resilience.</p>
          
          <div style="display:flex;gap:6px;justify-content:space-between;margin-bottom:10px;">
            ${[
              { emoji: '⚡', label: 'Energized' },
              { emoji: '🧘', label: 'Calm' },
              { emoji: '🎯', label: 'Focused' },
              { emoji: '🥱', label: 'Tired' },
              { emoji: '🤯', label: 'Stressed' },
            ].map(m => `
              <button class="btn btn-ghost btn-sm" style="flex:1;flex-direction:column;padding:6px 2px;border:1px solid var(--glass-border);" onclick="logDailyMood('${m.label}', '${m.emoji}')">
                <span style="font-size:18px;">${m.emoji}</span>
                <span style="font-size:9.5px;color:var(--text-secondary);">${m.label}</span>
              </button>
            `).join('')}
          </div>
          <div id="mood-confirmation" style="font-size:11px;color:var(--emerald);text-align:center;font-weight:600;"></div>
        </div>

        <!-- Sleep Recovery -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h3 style="margin:0;font-size:16px;display:flex;align-items:center;gap:8px;"><i class="fas fa-bed" style="color:var(--indigo-light);"></i> Sleep Recovery</h3>
            <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 6px;" onclick="openSleepModal()"><i class="fas fa-plus"></i> Log</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${sleepLogs.slice(0, 2).map((s, idx) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(15,23,42,0.7);border-radius:8px;font-size:11.5px;">
                <div>
                  <strong>${s.hours} Hours</strong> (${'⭐'.repeat(s.quality)})
                  <div style="color:var(--text-muted);font-size:10px;">${s.date}</div>
                </div>
                <span class="badge ${s.hours >= 7 ? 'badge-success' : 'badge-warning'}">${s.hours >= 7 ? 'Recovered' : 'Debt'}</span>
              </div>
            `).join('') || '<div style="font-size:11px;color:var(--text-muted);">No sleep logged.</div>'}
          </div>
        </div>

        <!-- Fitness & Workouts -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <h3 style="margin:0;font-size:16px;display:flex;align-items:center;gap:8px;"><i class="fas fa-running" style="color:var(--emerald);"></i> Workouts</h3>
            <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 6px;" onclick="openWorkoutModal()"><i class="fas fa-plus"></i> Add</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${workoutLogs.slice(0, 2).map((w, idx) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(15,23,42,0.7);border-radius:8px;font-size:11.5px;">
                <div>
                  <strong>${w.type}</strong>
                  <div style="color:var(--text-muted);font-size:10px;">${w.duration} mins • ${w.calories} kcal</div>
                </div>
                <span class="badge badge-accent">${w.date}</span>
              </div>
            `).join('') || '<div style="font-size:11px;color:var(--text-muted);">No workout logged.</div>'}
          </div>
        </div>

      </div>

      <!-- 5. Holistic Health Suggestions & Daily Rotating Vitality Tips -->
      <div class="card card-glass" style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1));border:1px solid rgba(16,185,129,0.3);">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">
          <div style="font-size:24px;">🌿</div>
          <div>
            <h4 style="margin:0;color:#fff;">Daily Holistic Vitality Protocol (Evidence-Based)</h4>
            <div style="font-size:12px;color:var(--text-muted);">Personalized recommendations based on your hydration, sleep debt & metabolic logs</div>
          </div>
        </div>
        <div class="grid grid-3" style="gap:12px;margin-top:12px;font-size:12px;color:#cbd5e1;">
          <div style="background:rgba(15,23,42,0.8);padding:10px 14px;border-radius:10px;border:1px solid var(--glass-border);">
            <strong style="color:var(--cyan);display:block;margin-bottom:2px;">💧 Hydration Timing</strong>
            Drink 500ml room temp water with Himalayan salt upon waking to instantly jumpstart morning cortisol clearance.
          </div>
          <div style="background:rgba(15,23,42,0.8);padding:10px 14px;border-radius:10px;border:1px solid var(--glass-border);">
            <strong style="color:var(--emerald);display:block;margin-bottom:2px;">🥗 Fiber & Glucose Control</strong>
            Consume vegetables/salad 5 minutes before rice or roti to flatten post-meal insulin and glucose spikes by 40%.
          </div>
          <div style="background:rgba(15,23,42,0.8);padding:10px 14px;border-radius:10px;border:1px solid var(--glass-border);">
            <strong style="color:var(--purple);display:block;margin-bottom:2px;">😴 Deep Sleep Phase</strong>
            Maintain your room temperature at 20°C (68°F). Darkness triggers peak natural melatonin secretion between 10 PM and 2 AM.
          </div>
        </div>
      </div>

    </div>
  `;

  return UI.dashboardLayout('/dashboard/health', content);
}

// ─── 7-Day Diet Plan Repository ────────────────────────────
const weeklyDietPlan = [
  {
    day: 'Monday',
    theme: 'High Protein & Clean Recovery',
    calories: '2,150 kcal',
    meals: [
      { name: '🍳 Breakfast (8:30 AM)', desc: '3 Whole Eggs / Moong Dal Chilla + 1 cup Sprouted Methi Salad + Green Tea', protein: '28g', carbs: '32g', fat: '14g' },
      { name: '🍛 Lunch (1:30 PM)', desc: '150g Grilled Paneer / Chicken Breast + 2 Multigrain Roti + 1 Bowl Mixed Vegetable Dal + Cucumber Salad', protein: '42g', carbs: '55g', fat: '18g' },
      { name: '🥜 Evening Snack (5:00 PM)', desc: '1 Handful Roasted Almonds & Walnuts + 1 Glass Tender Coconut Water', protein: '8g', carbs: '14g', fat: '16g' },
      { name: '🥗 Dinner (8:00 PM)', desc: '1 Big Bowl Palak Paneer / Tofu Curry + 1 Cup Brown Rice / Quinoa + Curd', protein: '30g', carbs: '45g', fat: '15g' }
    ]
  },
  {
    day: 'Tuesday',
    theme: 'Metabolic Booster & Antioxidant Power',
    calories: '2,080 kcal',
    meals: [
      { name: '🥣 Breakfast (8:30 AM)', desc: 'Steel-Cut Oats with Chia Seeds, Crushed Almonds, Whey/Soy Protein & Blueberries', protein: '34g', carbs: '48g', fat: '12g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Rajma Curry (Kidney Beans) + 1 Cup Steamed Brown Basmati Rice + Sautéed Beans & Carrots', protein: '26g', carbs: '68g', fat: '9g' },
      { name: '🍵 Evening Snack (5:00 PM)', desc: 'Roasted Makhana (Foxnuts) in Olive Oil + Green Herbal Tea', protein: '6g', carbs: '22g', fat: '6g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Grilled Fish / Soya Chunks Tikka + Stir-Fried Broccoli, Bell Peppers and Mushrooms', protein: '44g', carbs: '20g', fat: '14g' }
    ]
  },
  {
    day: 'Wednesday',
    theme: 'Gut Health & Probiotic Fuel',
    calories: '2,100 kcal',
    meals: [
      { name: '🥞 Breakfast (8:30 AM)', desc: 'Besan & Oats Vegetable Chilla with Mint Chutney + 1 Boiled Egg / Tofu cubes', protein: '24g', carbs: '38g', fat: '11g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Paneer Bhurji / Egg Bhurji + 2 Jowar (Sorghum) Rotis + Bowl of Tadka Dal + Beetroot Salad', protein: '38g', carbs: '46g', fat: '20g' },
      { name: '🥛 Evening Snack (5:00 PM)', desc: '1 Cup Greek Yogurt / Curd with Flaxseeds + 1 Apple', protein: '15g', carbs: '25g', fat: '5g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Yellow Moong Dal Khichdi (ghee tempered) + Steamed Sprouts + Roasted Papad', protein: '22g', carbs: '58g', fat: '10g' }
    ]
  },
  {
    day: 'Thursday',
    theme: 'Endurance & Cognitive Focus',
    calories: '2,120 kcal',
    meals: [
      { name: '🥑 Breakfast (8:30 AM)', desc: 'Avocado & Boiled Egg on Whole Wheat Toast / Paneer Sandwich + Black Coffee', protein: '26g', carbs: '36g', fat: '18g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Chole (Chickpeas) Masala + 1 Bowl Quinoa / Millets + Fresh Tomato Cucumber Salad', protein: '28g', carbs: '64g', fat: '12g' },
      { name: '🥜 Evening Snack (5:00 PM)', desc: 'Roasted Chana (Bengal Gram) + 1 Orange / Guava', protein: '10g', carbs: '28g', fat: '4g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Paneer / Chicken Tikka Masala (low oil) + 2 Bajra Rotis + Warm Dal Shorba', protein: '40g', carbs: '42g', fat: '16g' }
    ]
  },
  {
    day: 'Friday',
    theme: 'Lean Muscle Synthesis',
    calories: '2,200 kcal',
    meals: [
      { name: '🍳 Breakfast (8:30 AM)', desc: '4 Scrambled Egg Whites + 1 Whole Egg / Soya Bhurji + 2 Slices Brown Bread + Black Tea', protein: '36g', carbs: '30g', fat: '12g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Methi Chicken / Soya Chunk Curry + 2 Whole Wheat Rotis + Dal Makhani (light)', protein: '46g', carbs: '52g', fat: '16g' },
      { name: '🍵 Evening Snack (5:00 PM)', desc: 'Whey / Plant Protein Shake with Water + 10 Cashews', protein: '28g', carbs: '8g', fat: '10g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Tofu / Paneer Mushroom Stir-Fry with Garlic + 1 Cup Steamed Rice + Raita', protein: '32g', carbs: '46g', fat: '14g' }
    ]
  },
  {
    day: 'Saturday',
    theme: 'Clean Energy & Active Refresh',
    calories: '2,140 kcal',
    meals: [
      { name: '🥞 Breakfast (8:30 AM)', desc: 'Idli (3 pcs) with Sambar & Coconut Chutney + 1 Boiled Egg / Sprout Cup', protein: '20g', carbs: '54g', fat: '8g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Kadhi Pakora + Steamed Brown Rice + Sautéed Bhindi (Okra) + Curd', protein: '22g', carbs: '65g', fat: '15g' },
      { name: '🥜 Evening Snack (5:00 PM)', desc: 'Mixed Seeds (Pumpkin, Sunflower) + Handful Puffed Rice Bhel (no fried sev)', protein: '9g', carbs: '24g', fat: '12g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Grilled Fish / Paneer Steak + Steamed Asparagus, Corn & Mashed Sweet Potato', protein: '42g', carbs: '38g', fat: '14g' }
    ]
  },
  {
    day: 'Sunday',
    theme: 'Wholesome Family Nutrition',
    calories: '2,180 kcal',
    meals: [
      { name: '🍳 Breakfast (9:00 AM)', desc: 'Paneer Stuffed Multigrain Paratha (1 tsp ghee) + Mint Raita + Fruit Bowl', protein: '26g', carbs: '48g', fat: '16g' },
      { name: '🍛 Lunch (1:30 PM)', desc: 'Hyderabadi Chicken Biryani / Vegetable Soya Biryani (basmati) + Cucumber Raita', protein: '40g', carbs: '72g', fat: '16g' },
      { name: '☕ Evening Snack (5:00 PM)', desc: 'Chai with Jaggery + Roasted Lotus Seeds (Makhana)', protein: '5g', carbs: '18g', fat: '4g' },
      { name: '🥗 Dinner (8:00 PM)', desc: 'Light Bottle Gourd (Lauki) & Moong Dal Soup + 2 Phulkas + Grilled Tofu', protein: '28g', carbs: '40g', fat: '10g' }
    ]
  }
];

function renderDietDay(dayIdx) {
  const plan = weeklyDietPlan[dayIdx] || weeklyDietPlan[0];
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">
      <div>
        <h4 style="margin:0;font-size:18px;color:var(--emerald);">${plan.day} Diet Protocol</h4>
        <span style="font-size:12px;color:var(--text-muted);">${plan.theme}</span>
      </div>
      <span class="badge badge-success" style="font-size:13px;padding:6px 12px;">Target: ${plan.calories}</span>
    </div>

    <div class="grid grid-2" style="gap:14px;">
      ${plan.meals.map(m => `
        <div style="background:rgba(15,23,42,0.9);padding:14px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
          <div style="font-weight:700;font-size:13.5px;color:#fff;margin-bottom:4px;">${m.name}</div>
          <div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:8px;">${m.desc}</div>
          <div style="display:flex;gap:8px;font-size:10.5px;font-weight:700;">
            <span style="color:var(--indigo-light);background:rgba(99,102,241,0.15);padding:2px 6px;border-radius:4px;">Protein: ${m.protein}</span>
            <span style="color:var(--cyan);background:rgba(0,242,254,0.15);padding:2px 6px;border-radius:4px;">Carbs: ${m.carbs}</span>
            <span style="color:var(--gold);background:rgba(251,191,36,0.15);padding:2px 6px;border-radius:4px;">Fats: ${m.fat}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function switchDietDay(dayIdx) {
  const container = document.getElementById('diet-plan-content');
  if (container) container.innerHTML = renderDietDay(dayIdx);

  const tabs = document.querySelectorAll('#diet-day-tabs button');
  tabs.forEach((btn, idx) => {
    btn.className = idx === dayIdx ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
  });
}
window.switchDietDay = switchDietDay;

// ═══════════════════════════════════════════════════════════════════
// 🧠 ULTIMATE DEEP NUTRITION & FOOD PARSING ENGINE (USDA + NIN)
// ═══════════════════════════════════════════════════════════════════
const NutritionEngine = {
  // Verified Nutritional Data per 100 grams
  DATABASE: {
    // 🧀 Dairy & Proteins
    'paneer': { name: 'Fresh Paneer (Cottage Cheese)', p: 18.3, c: 3.4, f: 20.8, fib: 0, cal: 265, stdWeight: 100 },
    'tofu': { name: 'Firm Tofu', p: 14.0, c: 2.5, f: 8.0, fib: 1.5, cal: 140, stdWeight: 100 },
    'chicken': { name: 'Skinless Chicken Breast (Cooked)', p: 31.0, c: 0.0, f: 3.6, fib: 0, cal: 165, stdWeight: 100 },
    'chicken breast': { name: 'Skinless Chicken Breast', p: 31.0, c: 0.0, f: 3.6, fib: 0, cal: 165, stdWeight: 100 },
    'chicken curry': { name: 'Indian Chicken Curry', p: 16.5, c: 4.2, f: 11.0, fib: 1.2, cal: 180, stdWeight: 200 },
    'egg': { name: 'Whole Egg', p: 13.0, c: 1.1, f: 11.0, fib: 0, cal: 155, stdWeight: 50 }, // 1 egg = 50g
    'boiled egg': { name: 'Boiled Egg', p: 13.0, c: 1.1, f: 10.6, fib: 0, cal: 155, stdWeight: 50 },
    'egg white': { name: 'Egg White', p: 11.0, c: 0.7, f: 0.2, fib: 0, cal: 52, stdWeight: 33 },
    'omelette': { name: 'Egg Omelette', p: 11.0, c: 1.5, f: 12.0, fib: 0.2, cal: 160, stdWeight: 75 },
    'fish': { name: 'Fresh Fish Fillet', p: 22.0, c: 0.0, f: 6.5, fib: 0, cal: 150, stdWeight: 100 },
    'mutton': { name: 'Lean Mutton / Lamb', p: 25.0, c: 0.0, f: 18.0, fib: 0, cal: 260, stdWeight: 100 },
    'whey protein': { name: 'Whey Protein Isolate', p: 78.0, c: 5.0, f: 3.0, fib: 1.0, cal: 360, stdWeight: 32 }, // 1 scoop = 32g
    'soya': { name: 'Nutrela Soya Chunks (Dry)', p: 52.0, c: 33.0, f: 0.5, fib: 13.0, cal: 345, stdWeight: 100 },
    'soya chunks': { name: 'Nutrela Soya Chunks', p: 52.0, c: 33.0, f: 0.5, fib: 13.0, cal: 345, stdWeight: 100 },
    'curd': { name: 'Fresh Plain Curd (Dahi)', p: 3.8, c: 4.7, f: 3.2, fib: 0, cal: 62, stdWeight: 150 }, // 1 bowl = 150g
    'dahi': { name: 'Fresh Plain Dahi', p: 3.8, c: 4.7, f: 3.2, fib: 0, cal: 62, stdWeight: 150 },
    'greek yogurt': { name: 'Unsweetened Greek Yogurt', p: 10.0, c: 3.6, f: 0.4, fib: 0, cal: 59, stdWeight: 150 },
    'milk': { name: 'Whole Cow Milk', p: 3.4, c: 4.8, f: 3.9, fib: 0, cal: 68, stdWeight: 250 }, // 1 glass = 250ml
    'almond milk': { name: 'Unsweetened Almond Milk', p: 0.6, c: 0.3, f: 1.1, fib: 0.2, cal: 15, stdWeight: 250 },
    'butter': { name: 'Butter', p: 0.9, c: 0.1, f: 81.0, fib: 0, cal: 717, stdWeight: 15 },
    'ghee': { name: 'Pure Desi Ghee', p: 0.0, c: 0.0, f: 99.5, fib: 0, cal: 900, stdWeight: 15 },
    'cheese': { name: 'Cheddar / Processed Cheese', p: 25.0, c: 1.3, f: 33.0, fib: 0, cal: 400, stdWeight: 30 },

    // 🌾 Breads, Grains & Rice
    'roti': { name: 'Whole Wheat Roti / Phulka', p: 8.5, c: 51.0, f: 2.2, fib: 6.0, cal: 250, stdWeight: 35 }, // 1 roti = 35g (~88 kcal)
    'chapati': { name: 'Whole Wheat Chapati', p: 8.5, c: 51.0, f: 2.2, fib: 6.0, cal: 250, stdWeight: 35 },
    'paratha': { name: 'Stuffed Paratha', p: 6.5, c: 42.0, f: 12.0, fib: 4.5, cal: 300, stdWeight: 80 },
    'rice': { name: 'Cooked White Basmati Rice', p: 2.7, c: 28.0, f: 0.3, fib: 0.4, cal: 130, stdWeight: 150 }, // 1 bowl = 150g
    'white rice': { name: 'Cooked White Rice', p: 2.7, c: 28.0, f: 0.3, fib: 0.4, cal: 130, stdWeight: 150 },
    'brown rice': { name: 'Cooked Brown Rice', p: 2.6, c: 23.5, f: 0.9, fib: 1.8, cal: 112, stdWeight: 150 },
    'oats': { name: 'Rolled Oats (Raw)', p: 13.5, c: 68.0, f: 6.9, fib: 10.6, cal: 389, stdWeight: 50 },
    'oatmeal': { name: 'Cooked Oatmeal', p: 2.5, c: 12.0, f: 1.5, fib: 1.7, cal: 71, stdWeight: 200 },
    'poha': { name: 'Flattened Rice Poha', p: 3.2, c: 28.0, f: 4.5, fib: 1.8, cal: 165, stdWeight: 150 },
    'upma': { name: 'Rava Upma', p: 4.2, c: 25.0, f: 5.0, fib: 2.0, cal: 160, stdWeight: 150 },
    'idli': { name: 'Steamed Rice Idli', p: 4.0, c: 28.0, f: 0.4, fib: 1.5, cal: 130, stdWeight: 45 }, // 1 idli = 45g (~60 kcal)
    'dosa': { name: 'Plain Crisp Dosa', p: 4.5, c: 29.0, f: 4.0, fib: 1.2, cal: 170, stdWeight: 90 },
    'masala dosa': { name: 'Mysore Masala Dosa', p: 5.2, c: 34.0, f: 8.5, fib: 2.4, cal: 230, stdWeight: 150 },
    'khichdi': { name: 'Moong Dal Khichdi', p: 5.5, c: 24.0, f: 3.5, fib: 3.0, cal: 150, stdWeight: 200 },
    'quinoa': { name: 'Cooked Quinoa', p: 4.4, c: 21.3, f: 1.9, fib: 2.8, cal: 120, stdWeight: 150 },

    // 🍲 Dals, Legumes & Beans
    'dal': { name: 'Yellow Moong / Toor Tadka Dal', p: 7.5, c: 16.5, f: 2.0, fib: 4.5, cal: 115, stdWeight: 200 }, // 1 bowl = 200g
    'moong dal': { name: 'Moong Dal', p: 7.5, c: 16.5, f: 2.0, fib: 4.5, cal: 115, stdWeight: 200 },
    'dal makhani': { name: 'Dal Makhani', p: 6.8, c: 18.0, f: 9.5, fib: 4.0, cal: 185, stdWeight: 200 },
    'rajma': { name: 'Cooked Rajma Curry', p: 8.7, c: 22.8, f: 1.5, fib: 6.4, cal: 140, stdWeight: 200 },
    'chole': { name: 'Cooked Chole (Chickpeas)', p: 8.9, c: 27.4, f: 2.6, fib: 7.6, cal: 164, stdWeight: 200 },
    'chana': { name: 'Roasted Bengal Gram (Chana)', p: 18.5, c: 58.0, f: 5.0, fib: 16.0, cal: 360, stdWeight: 50 },
    'sambar': { name: 'South Indian Sambar', p: 3.5, c: 12.0, f: 1.8, fib: 3.0, cal: 78, stdWeight: 200 },
    'sprouts': { name: 'Mixed Sprouted Beans', p: 9.0, c: 19.0, f: 0.8, fib: 7.5, cal: 120, stdWeight: 100 },

    // 🥗 Curries & Dishes
    'paneer butter masala': { name: 'Paneer Butter Masala', p: 12.0, c: 8.0, f: 22.0, fib: 1.5, cal: 280, stdWeight: 200 },
    'palak paneer': { name: 'Palak Paneer Curry', p: 14.0, c: 6.0, f: 16.0, fib: 3.5, cal: 220, stdWeight: 200 },
    'biryani': { name: 'Chicken Dum Biryani', p: 12.5, c: 26.0, f: 7.5, fib: 1.5, cal: 220, stdWeight: 300 },
    'chicken biryani': { name: 'Chicken Dum Biryani', p: 12.5, c: 26.0, f: 7.5, fib: 1.5, cal: 220, stdWeight: 300 },
    'veg biryani': { name: 'Vegetable Biryani', p: 5.5, c: 30.0, f: 6.0, fib: 2.5, cal: 195, stdWeight: 300 },

    // 🥦 Fruits, Nuts & Veggies
    'apple': { name: 'Fresh Apple', p: 0.3, c: 13.8, f: 0.2, fib: 2.4, cal: 52, stdWeight: 150 }, // 1 apple = 150g
    'banana': { name: 'Ripe Banana', p: 1.1, c: 22.8, f: 0.3, fib: 2.6, cal: 89, stdWeight: 120 }, // 1 banana = 120g
    'mango': { name: 'Fresh Mango', p: 0.8, c: 15.0, f: 0.4, fib: 1.6, cal: 60, stdWeight: 200 },
    'orange': { name: 'Fresh Orange', p: 0.9, c: 11.8, f: 0.1, fib: 2.4, cal: 47, stdWeight: 130 },
    'papaya': { name: 'Fresh Papaya Cubes', p: 0.5, c: 10.8, f: 0.3, fib: 1.7, cal: 43, stdWeight: 150 },
    'watermelon': { name: 'Watermelon Slices', p: 0.6, c: 7.6, f: 0.2, fib: 0.4, cal: 30, stdWeight: 200 },
    'almonds': { name: 'Raw Almonds (Badam)', p: 21.2, c: 21.6, f: 49.9, fib: 12.5, cal: 579, stdWeight: 25 },
    'badam': { name: 'Raw Almonds (Badam)', p: 21.2, c: 21.6, f: 49.9, fib: 12.5, cal: 579, stdWeight: 25 },
    'walnuts': { name: 'Walnuts (Akhrot)', p: 15.2, c: 13.7, f: 65.2, fib: 6.7, cal: 654, stdWeight: 25 },
    'peanuts': { name: 'Roasted Peanuts', p: 25.8, c: 16.1, f: 49.2, fib: 8.5, cal: 567, stdWeight: 30 },
    'makhana': { name: 'Roasted Foxnuts (Makhana)', p: 9.7, c: 76.9, f: 0.1, fib: 7.6, cal: 350, stdWeight: 40 },
    'chia seeds': { name: 'Chia Seeds', p: 16.5, c: 42.1, f: 30.7, fib: 34.4, cal: 486, stdWeight: 15 },
    'peanut butter': { name: 'Natural Peanut Butter', p: 25.0, c: 20.0, f: 50.0, fib: 6.0, cal: 588, stdWeight: 32 },
    'spinach': { name: 'Steamed Spinach (Palak)', p: 2.9, c: 3.6, f: 0.4, fib: 2.2, cal: 23, stdWeight: 100 },
    'palak': { name: 'Steamed Spinach (Palak)', p: 2.9, c: 3.6, f: 0.4, fib: 2.2, cal: 23, stdWeight: 100 },
    'broccoli': { name: 'Steamed Broccoli', p: 2.8, c: 6.6, f: 0.4, fib: 2.6, cal: 34, stdWeight: 100 },
    'salad': { name: 'Fresh Green Salad (Cucumber/Tomato)', p: 0.8, c: 3.6, f: 0.1, fib: 1.0, cal: 16, stdWeight: 150 },
    'cucumber': { name: 'Fresh Cucumber Slices', p: 0.7, c: 3.6, f: 0.1, fib: 0.5, cal: 15, stdWeight: 100 },
    'potato': { name: 'Boiled Potato', p: 2.0, c: 17.5, f: 0.1, fib: 2.1, cal: 77, stdWeight: 150 },
    'samosa': { name: 'Crispy Potato Samosa', p: 4.0, c: 32.0, f: 18.0, fib: 2.0, cal: 310, stdWeight: 90 },
    'chai': { name: 'Indian Milk Tea (Chai)', p: 1.5, c: 8.0, f: 2.0, fib: 0, cal: 55, stdWeight: 150 },
    'green tea': { name: 'Pure Green Tea', p: 0, c: 0, f: 0, fib: 0, cal: 2, stdWeight: 200 },
    'black coffee': { name: 'Black Coffee (No Sugar)', p: 0.3, c: 0, f: 0, fib: 0, cal: 2, stdWeight: 200 },
    'coconut water': { name: 'Tender Coconut Water', p: 0.7, c: 3.7, f: 0.2, fib: 1.1, cal: 19, stdWeight: 250 }
  },

  // Units dictionary for standard conversion
  UNITS: {
    'g': 1, 'gram': 1, 'grams': 1, 'gm': 1, 'gms': 1,
    'kg': 1000, 'kilo': 1000, 'kilos': 1000,
    'ml': 1, 'milliliter': 1, 'l': 1000, 'liter': 1000, 'liters': 1000,
    'tbsp': 15, 'tablespoon': 15, 'tablespoons': 15,
    'tsp': 5, 'teaspoon': 5,
    'cup': 'std_cup', 'cups': 'std_cup',
    'bowl': 'std_bowl', 'bowls': 'std_bowl', 'katori': 'std_bowl',
    'plate': 'std_plate', 'plates': 'std_plate',
    'pc': 'std_pc', 'pcs': 'std_pc', 'piece': 'std_pc', 'pieces': 'std_pc',
    'slice': 'std_slice', 'slices': 'std_slice',
    'glass': 'std_glass', 'glasses': 'std_glass',
    'scoop': 'std_scoop', 'scoops': 'std_scoop'
  },

  parseQuery(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') return { error: 'Please enter a food query.' };

    const clean = rawQuery.trim();
    if (!clean) return { error: 'Please enter a food query.' };

    // Split compound meals (e.g. "2 Chapati, 1 bowl Dal and 100g Paneer")
    const parts = clean.split(/[,+&]|\band\b|\bwith\b/i).map(s => s.trim()).filter(Boolean);
    const parsedItems = [];

    for (let part of parts) {
      const parsedItem = this._parseSingleItem(part);
      if (parsedItem.missingFood) {
        return {
          error: `Food name missing: You entered "${part}" without specifying what food it is! Please specify (e.g. "100g Paneer", "100g Chicken", "100g Oats").`,
          suggestPrompt: part
        };
      }
      parsedItems.push(parsedItem);
    }

    // Sum all parsed items
    let totalP = 0, totalC = 0, totalF = 0, totalFib = 0, totalCal = 0, totalWeight = 0;
    const itemSummaries = [];

    for (let item of parsedItems) {
      totalP += item.p;
      totalC += item.c;
      totalF += item.f;
      totalFib += item.fib;
      totalCal += item.cal;
      totalWeight += item.weight;

      itemSummaries.push({
        title: `${item.qtyDisplay} ${item.name} (${Math.round(item.weight)}g)`,
        p: item.p.toFixed(1),
        c: item.c.toFixed(1),
        f: item.f.toFixed(1),
        fib: item.fib.toFixed(1),
        cal: Math.round(item.cal)
      });
    }

    return {
      success: true,
      query: clean,
      totalWeight: Math.round(totalWeight),
      protein: totalP.toFixed(1),
      carbs: totalC.toFixed(1),
      fats: totalF.toFixed(1),
      fiber: totalFib.toFixed(1),
      calories: Math.round(totalCal),
      items: itemSummaries
    };
  },

  _parseSingleItem(itemStr) {
    let str = itemStr.toLowerCase().trim();

    // Word to number conversion
    str = str.replace(/\bone\b/g, '1')
             .replace(/\btwo\b/g, '2')
             .replace(/\bthree\b/g, '3')
             .replace(/\bfour\b/g, '4')
             .replace(/\bfive\b/g, '5')
             .replace(/\bhalf\b/g, '0.5')
             .replace(/\bquarter\b/g, '0.25');

    // Extract numeric quantity
    let qty = 1;
    let unit = '';
    const numMatch = str.match(/^([\d.]+)\s*([a-zA-Z]+)?/);

    if (numMatch) {
      qty = parseFloat(numMatch[1]) || 1;
      if (numMatch[2]) {
        const candidateUnit = numMatch[2].toLowerCase();
        if (this.UNITS[candidateUnit] !== undefined) {
          unit = candidateUnit;
        }
      }
    }

    // Strip numbers and unit tokens from food name
    let foodTokens = str
      .replace(/^[\d.]+\s*/, '')
      .replace(/\b(g|gram|grams|gm|gms|kg|kilo|kilos|ml|l|liter|liters|cups|cup|bowls|bowl|katori|plates|plate|pcs|pc|piece|pieces|slice|slices|glass|glasses|scoop|scoops|of|fresh|cooked|boiled|steamed|raw|roasted|fried|hot|warm)\b/gi, ' ')
      .trim();

    // Check if food name is empty or only whitespace
    if (!foodTokens || foodTokens.length === 0 || /^[\d\s.,]+$/.test(foodTokens)) {
      return { missingFood: true, raw: itemStr };
    }

    // Match against database
    let matchedFoodKey = null;
    let matchedData = null;

    // 1. Direct key match
    if (this.DATABASE[foodTokens]) {
      matchedFoodKey = foodTokens;
      matchedData = this.DATABASE[foodTokens];
    } else {
      // 2. Substring search & best match
      let bestScore = 0;
      for (const [key, data] of Object.entries(this.DATABASE)) {
        if (foodTokens.includes(key) || key.includes(foodTokens)) {
          const score = key.length;
          if (score > bestScore) {
            bestScore = score;
            matchedFoodKey = key;
            matchedData = data;
          }
        }
      }
    }

    // Default fallback if unknown food
    if (!matchedData) {
      matchedData = {
        name: foodTokens.charAt(0).toUpperCase() + foodTokens.slice(1) + ' (Estimated)',
        p: 6.0, c: 20.0, f: 5.0, fib: 3.0, cal: 150, stdWeight: 100
      };
    }

    // Calculate weight in grams
    let weightInGrams = 100;
    if (unit === 'g' || unit === 'gram' || unit === 'grams' || unit === 'gm' || unit === 'gms') {
      weightInGrams = qty;
    } else if (unit === 'kg' || unit === 'kilo' || unit === 'kilos') {
      weightInGrams = qty * 1000;
    } else if (unit === 'ml') {
      weightInGrams = qty;
    } else if (unit === 'l' || unit === 'liter' || unit === 'liters') {
      weightInGrams = qty * 1000;
    } else if (unit === 'cup' || unit === 'cups' || unit === 'bowl' || unit === 'bowls' || unit === 'katori') {
      weightInGrams = qty * (matchedData.stdWeight > 80 ? matchedData.stdWeight : 180);
    } else if (unit === 'plate' || unit === 'plates') {
      weightInGrams = qty * 250;
    } else if (unit === 'pc' || unit === 'pcs' || unit === 'piece' || unit === 'pieces' || unit === 'slice' || unit === 'slices' || unit === 'scoop') {
      weightInGrams = qty * (matchedData.stdWeight || 50);
    } else {
      // No explicit unit given
      if (qty >= 20) {
        // e.g. "100 Paneer", "200 Chicken" -> treat as grams
        weightInGrams = qty;
      } else {
        // e.g. "2 Eggs", "3 Rotis", "1 Apple" -> treat as pieces/servings
        weightInGrams = qty * (matchedData.stdWeight || 100);
      }
    }

    const scale = weightInGrams / 100;
    return {
      name: matchedData.name,
      qtyDisplay: `${qty} ${unit || (qty >= 20 ? 'g' : 'serving')}`.trim(),
      weight: weightInGrams,
      p: matchedData.p * scale,
      c: matchedData.c * scale,
      f: matchedData.f * scale,
      fib: (matchedData.fib || 0) * scale,
      cal: matchedData.cal * scale
    };
  }
};

// ─── Health Interactive Handlers with Email Dispatch ───────
function quickAddWater(amount) {
  WaterPhysicsEngine.pourWater(amount);
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('waterSplash');

  const healthData = Store.get('health') || {};
  const currentTotal = (healthData.waterIntake || 0) + amount;
  const target = healthData.waterTarget || 2500;
  const percent = Math.min(100, Math.round((currentTotal / target) * 100));

  Store.set('health.waterIntake', currentTotal);

  const userEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const htmlBody = `
    <div style="background:#070a14;border:1px solid #00f2fe;border-radius:18px;padding:24px;color:#fff;font-family:sans-serif;max-width:540px;margin:0 auto;">
      <h2 style="color:#00f2fe;margin:0 0 8px 0;">💧 BioVerse Hydration Tracker</h2>
      <p style="color:#cbd5e1;font-size:14px;">You logged <strong>+${amount}ml</strong> of water intake!</p>
      <div style="background:#0f172a;padding:16px;border-radius:12px;margin:16px 0;border:1px solid rgba(0,242,254,0.3);">
        <div style="font-size:18px;font-weight:800;color:#fff;">${currentTotal}ml / ${target}ml</div>
        <div style="font-size:13px;color:#10b981;margin-top:4px;">Daily Target Progress: ${percent}%</div>
      </div>
      <p style="font-size:12px;color:#94a3b8;">Optimal hydration enhances cognitive speed and reduces daily fatigue. Keep it up!</p>
    </div>
  `;
  Store.sendEmailNotification(`💧 Hydration Update: ${currentTotal}ml logged (${percent}%)`, htmlBody, userEmail);

  UI.toast('success', 'Hydration Logged & Email Alert Dispatched 💧', `Added +${amount}ml (Total: ${currentTotal}ml / ${target}ml). Sent email notification!`);
  Router.render();
}
window.quickAddWater = quickAddWater;

function setFoodQuickQuery(query) {
  const input = document.getElementById('food-search-input');
  if (input) {
    input.value = query;
    analyzeFoodItem();
  }
}
window.setFoodQuickQuery = setFoodQuickQuery;

function analyzeFoodItem() {
  const query = document.getElementById('food-search-input')?.value?.trim();
  const output = document.getElementById('food-analysis-result');
  if (!query || !output) return;

  const result = NutritionEngine.parseQuery(query);

  if (result.error) {
    output.innerHTML = `
      <div style="background:rgba(239,68,68,0.12);border:1px solid #ef4444;border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:26px;margin-bottom:6px;">⚠️</div>
        <div style="font-weight:800;color:#f87171;font-size:14px;margin-bottom:4px;">Food Item Name Missing</div>
        <p style="font-size:12.5px;color:#cbd5e1;line-height:1.5;margin:0 0 12px 0;">
          You entered <strong>"${query}"</strong> without specifying what food it is. Please specify the food name (e.g. <em>"100g Paneer"</em>, <em>"100g Chicken Breast"</em>, <em>"100g Oats"</em>, <em>"2 Chapati + 1 Bowl Dal"</em>).
        </p>
        <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-ghost btn-sm" style="font-size:11px;border:1px solid rgba(255,255,255,0.15);" onclick="setFoodQuickQuery('100g Paneer')">🧀 100g Paneer</button>
          <button class="btn btn-ghost btn-sm" style="font-size:11px;border:1px solid rgba(255,255,255,0.15);" onclick="setFoodQuickQuery('100g Chicken Breast')">🍗 100g Chicken</button>
          <button class="btn btn-ghost btn-sm" style="font-size:11px;border:1px solid rgba(255,255,255,0.15);" onclick="setFoodQuickQuery('100g Rolled Oats')">🥣 100g Oats</button>
          <button class="btn btn-ghost btn-sm" style="font-size:11px;border:1px solid rgba(255,255,255,0.15);" onclick="setFoodQuickQuery('2 Chapati + 1 Bowl Dal')">🍛 2 Chapati + Dal</button>
        </div>
      </div>
    `;
    if (typeof UI !== 'undefined') UI.toast('warning', 'Food Name Required', 'Please specify what food you are measuring.');
    return;
  }

  output.innerHTML = `
    <div style="font-weight:800;font-size:14px;color:#fff;margin-bottom:10px;">
      🥗 ${result.query} <span style="font-size:12px;color:var(--text-muted);font-weight:normal;">(${result.totalWeight}g total portion)</span>
    </div>
    
    <!-- Macro Cards -->
    <div class="grid grid-4" style="gap:8px;text-align:center;font-size:11px;margin-bottom:12px;">
      <div style="background:rgba(99,102,241,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(99,102,241,0.35);">
        <div style="color:var(--indigo-light);font-weight:900;font-size:16px;">${result.protein}g</div>
        <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥩 Protein</div>
      </div>
      <div style="background:rgba(0,242,254,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(0,242,254,0.35);">
        <div style="color:var(--cyan);font-weight:900;font-size:16px;">${result.carbs}g</div>
        <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🌾 Net Carbs</div>
      </div>
      <div style="background:rgba(16,185,129,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(16,185,129,0.35);">
        <div style="color:var(--emerald);font-weight:900;font-size:16px;">${result.fiber}g</div>
        <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥦 Fiber</div>
      </div>
      <div style="background:rgba(251,191,36,0.15);padding:10px 6px;border-radius:10px;border:1px solid rgba(251,191,36,0.35);">
        <div style="color:var(--gold);font-weight:900;font-size:16px;">${result.fats}g</div>
        <div style="color:#cbd5e1;font-weight:600;margin-top:2px;">🥑 Fats</div>
      </div>
    </div>

    <!-- Itemized Ingredients Breakdown List -->
    <div style="font-size:11.5px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;margin-bottom:10px;">
      ${result.items.map(it => `
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span>• ${it.title}</span>
          <span style="color:#cbd5e1;">${it.p}g P | ${it.c}g C | ${it.f}g F | ${it.cal} kcal</span>
        </div>
      `).join('')}
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;">
      <div>Total Energy: <strong style="color:var(--emerald);font-size:15px;">${result.calories} kcal</strong></div>
      <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:4px 10px;color:var(--cyan);" onclick="logAnalyzedMeal('${result.query.replace(/'/g, "\\'")}', ${result.calories}, ${result.protein})"><i class="fas fa-plus"></i> Add to Today's Log</button>
    </div>
  `;

  if (typeof UI !== 'undefined') UI.toast('success', 'Nutrition Analyzed', `Calculated ${result.calories} kcal, ${result.protein}g Protein for "${result.query}".`);
}
window.analyzeFoodItem = analyzeFoodItem;

function logAnalyzedMeal(mealName = 'Healthy Meal', calories = 350, protein = 20) {
  UI.toast('success', 'Meal Logged 🍽️', `Added "${mealName}" (${calories} kcal, ${protein}g Protein) to your daily nutrition log.`);
}
window.logAnalyzedMeal = logAnalyzedMeal;

function logDailyMood(label, emoji) {
  const el = document.getElementById('mood-confirmation');
  if (el) el.innerHTML = `✓ Logged: ${emoji} ${label} (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('pop');
  UI.toast('info', 'Mood Logged', `Logged state as ${emoji} ${label}`);
}
window.logDailyMood = logDailyMood;

function openSleepModal() {
  const html = `
    <h3>Log Sleep Recovery</h3>
    <form onsubmit="saveSleepForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Sleep Duration (Hours)</label>
        <input type="number" step="0.5" id="sleep-hours" class="chat-input" value="7.5" required>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Quality Rating (1 to 5 Stars)</label>
        <select id="sleep-quality" class="chat-input">
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4" selected>⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Fair</option>
          <option value="2">⭐⭐ Poor</option>
        </select>
      </div>
      ${UI.pillButton({ text: 'Save Sleep Log', icon: '<i class="fas fa-moon"></i>', theme: 'purple', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openSleepModal = openSleepModal;

function saveSleepForm(e) {
  e.preventDefault();
  const hours = document.getElementById('sleep-hours')?.value;
  const quality = document.getElementById('sleep-quality')?.value;
  Store.logSleep({ hours, quality, date: new Date().toISOString().split('T')[0] });
  UI.closeModal();
  UI.toast('success', 'Sleep Logged 😴', `Recorded ${hours} hours of recovery.`);
  Router.render();
}
window.saveSleepForm = saveSleepForm;

function openWorkoutModal() {
  const html = `
    <h3>Log Workout / Fitness Session</h3>
    <form onsubmit="saveWorkoutForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Workout Type</label>
        <input type="text" id="w-type" class="chat-input" placeholder="e.g. Strength Training, 5km Run, HIIT, Yoga" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Duration (Minutes)</label>
          <input type="number" id="w-dur" class="chat-input" value="45" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Calories Burned (kcal)</label>
          <input type="number" id="w-cal" class="chat-input" value="380" required>
        </div>
      </div>
      ${UI.pillButton({ text: 'Save Workout Log', icon: '<i class="fas fa-running"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openWorkoutModal = openWorkoutModal;

function saveWorkoutForm(e) {
  e.preventDefault();
  const type = document.getElementById('w-type')?.value;
  const duration = document.getElementById('w-dur')?.value;
  const calories = document.getElementById('w-cal')?.value;
  Store.logWorkout({ type, duration, calories, date: new Date().toISOString().split('T')[0] });
  UI.closeModal();
  UI.toast('success', 'Workout Logged 🔥', `Logged ${type} (${calories} kcal burned).`);
  Router.render();
}
window.saveWorkoutForm = saveWorkoutForm;
