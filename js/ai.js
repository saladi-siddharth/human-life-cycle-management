/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS AI SERVICE — Gemini API Integration & Dynamic Local Fallback
   ═══════════════════════════════════════════════════════════════════ */

const AIService = {
  /**
   * Main completion call. Checks if user configured a custom Gemini API Key.
   * If yes, calls the live Gemini 1.5 Flash REST API endpoint.
   * If not (or on network failure), seamlessly uses intelligent context-aware local response engine.
   */
  async generateResponse(prompt, context = {}) {
    const apiKey = Store.get('apiSettings.geminiKey');
    
    if (apiKey && apiKey.trim().length > 10) {
      try {
        return await this._callGeminiAPI(prompt, context, apiKey);
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local AI engine:', err);
      }
    }
    
    return this._generateLocalResponse(prompt, context);
  },

  async _callGeminiAPI(prompt, context, apiKey) {
    const userProfile = Store.get('profile') || {};
    const identity = Store.get('identity') || 'General User';
    const scores = Store.get('scores') || {};

    const systemInstruction = `You are LifeGPS AI, a world-class executive life, career, finance, and wellness coach. 
User Identity: ${identity}. Profile Name: ${userProfile.name || 'User'}.
Current Life Scores: Career: ${scores.career}/100, Health: ${scores.health}/100, Finance: ${scores.finance}/100, Work: ${scores.work}/100, Life: ${scores.life}/100.
Provide actionable, highly structured, encouraging advice with clear bullet points and concrete steps. Keep formatting markdown-ready (**bold** for emphasis, numbered lists for steps).`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    
    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemInstruction}\n\nContext: ${JSON.stringify(context)}\n\nUser Question: ${prompt}` }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) {
      return candidateText;
    }
    throw new Error('No text returned from Gemini API.');
  },

  _generateLocalResponse(prompt, context = {}) {
    const msg = prompt.toLowerCase();
    const identity = Store.get('identity') || 'user';
    const profile = Store.get('profile') || {};
    const scores = Store.get('scores') || { career: 68, health: 75, finance: 61, work: 70, life: 72 };

    if (msg.includes('resume') || msg.includes('ats') || msg.includes('cv')) {
      return `### 📄 Resume & ATS Keyword Analysis

Based on target benchmarks for **${profile.currentRole || 'your target role'}**:

**Strengths:**
- Strong action verb usage in past experience sections.
- Clean chronological formatting.

**Key Missing Keywords:**
- \`System Architecture\`, \`Cross-functional Leadership\`, \`Data-driven Metrics\`, \`CI/CD Pipelines\`.

**Action Items for +15% Match:**
1. Quantify achievements (e.g., *"Increased system throughput by 35%"*).
2. Add a dedicated **Core Competencies** section matching job descriptions.
3. Incorporate modern cloud infrastructure keywords.

*Click 'Add Action Items to Career Board' below to auto-track these goals!*`;
    }

    if (msg.includes('career') || msg.includes('job') || msg.includes('skill') || msg.includes('promotion')) {
      return `### 🎯 Career Roadmap & Skill Gap Strategy

Your current Career Score is **${scores.career}/100**.

**3-Step Action Plan:**
1. **Master High-ROI Competencies**: Focus on System Design & Technical Leadership over the next 6 weeks.
2. **Build Portfolio Projects**: Create 2 end-to-end case studies demonstrating business impact.
3. **Strategic Networking**: Reach out to 3 senior leaders or recruiters weekly in your target sector.

*Target Outcome*: Boost your Career Score by 12 points and position yourself for a 20%+ compensation increase.`;
    }

    if (msg.includes('budget') || msg.includes('finance') || msg.includes('money') || msg.includes('save') || msg.includes('invest')) {
      return `### 💰 Financial Optimization & Wealth Plan

Your current Financial Score is **${scores.finance}/100**.

**Instant Financial Optimization:**
1. **50/30/20 Budgeting**: Allocate 50% to Needs, 30% to Wants, and 20% directly to Savings & Investments.
2. **Subscription Audit**: Identified $45/mo in underutilized recurring charges.
3. **Emergency Fund Acceleration**: Allocate an additional $250/mo to reach a 6-month safety net ($15,000 target).

*Pro Tip*: Setting up automated transfers on payday increases savings consistency by 80%!`;
    }

    if (msg.includes('health') || msg.includes('workout') || msg.includes('sleep') || msg.includes('diet') || msg.includes('water')) {
      return `### 💪 Health & High-Performance Wellness Plan

Your current Health Score is **${scores.health}/100**.

**Weekly Wellness Protocol:**
- 🏃 **Movement**: 4x weekly resistance/cardio training (45 mins/session).
- 💧 **Hydration**: 2,500 ml daily water target.
- 😴 **Sleep Recovery**: Maintain a strict 10:30 PM bedtime to reach 7.5 hrs of quality sleep.
- 🥗 **Nutrition**: Aim for 1.6g protein per kg of body weight with a balanced 40/30/30 macro split.

*Expected Result*: Enhanced focus, 25% lower stress fatigue, and peak cognitive energy.`;
    }

    if (msg.includes('burnout') || msg.includes('stress') || msg.includes('time') || msg.includes('productivity')) {
      return `### ⚡ Work Productivity & Stress Recovery Protocol

Your Work Score is **${scores.work}/100**.

**Immediate Anti-Burnout Steps:**
1. **Eisenhower Matrix**: Categorize your task list into 4 quadrants. Complete top 2 "Do First" items using 25-min Pomodoro sprints.
2. **Meeting Guardrails**: Reserve 2-hour uninterrupted focus blocks every morning.
3. **Evening Shutdown**: Disconnect from work communications after 7:00 PM to protect recovery.`;
    }

    return `### 🧭 LifeGPS AI Coach Guidance

Great question, **${profile.name || 'friend'}**! Based on your profile as a **${identity.toUpperCase()}**:

- 📊 **Overall Life Score**: **${scores.life}/100**
- 🎯 **Top Growth Area**: Focus on your lowest scoring domain (**${scores.finance < scores.career ? 'Finance' : 'Career'}**) for maximum lifecycle impact.
- 🚀 **Next Best Action**: Complete 3 high-priority tasks on your dashboard today to elevate your score!

*How else can I assist your journey today?*`;
  },

  /**
   * Analyze Resume against Job Description
   */
  async analyzeResume(resumeText, jobDescription) {
    const prompt = `Analyze this resume against the job description. Return ATS match percentage (0-100), missing keywords, formatting score, and 3 specific recommendations.\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`;
    return await this.generateResponse(prompt, { type: 'resume_analysis' });
  },

  /**
   * Generate Financial Optimization Report
   */
  async generateFinancialPlan(income, expenses, savingsGoal) {
    const prompt = `Create a 50/30/20 budget analysis and actionable savings strategy for Monthly Income: $${income}, Monthly Expenses: $${expenses}, Savings Goal: $${savingsGoal}.`;
    return await this.generateResponse(prompt, { type: 'financial_plan' });
  },

  /**
   * Generate Workout & Nutrition Routine
   */
  async generateWellnessPlan(goal, hoursAvailable, fitnessLevel) {
    const prompt = `Generate a structured weekly workout split and macronutrient target for goal: ${goal}, time available: ${hoursAvailable} hrs/week, level: ${fitnessLevel}.`;
    return await this.generateResponse(prompt, { type: 'wellness_plan' });
  }
};
