/* ============================================================
   GROQ AI SERVICE — Client-Side Context Injection
   ============================================================ */

const GroqService = {
  get API_KEY() {
    return window.CONFIG?.GROQ_API_KEY || '';
  },
  ENDPOINT: 'https://api.groq.com/openai/v1/chat/completions',
  MODEL: 'llama3-70b-8192',

  async getCompletion(messages, identityType, customSystemPrompt) {
    // 1. Gather all current state from Store to create an advanced contextual "training dataset" for the chat
    const profile = Store.get('profile') || {};
    const metrics = Store.get('metrics') || {};
    const student = Store.get('student') || {};
    const employee = Store.get('employee') || {};
    const business = Store.get('business') || {};
    const tasks = Store.get('tasks') || [];
    const habits = Store.get('habits') || [];

    // Format metrics
    const metricsStr = Object.entries(metrics.lifeBalance || {})
      .map(([domain, score]) => `${domain.toUpperCase()}: ${score}/100`)
      .join(', ');

    // Format tasks and habits
    const activeTasks = tasks.filter(t => !t.completed).map(t => t.text).slice(0, 5).join(', ') || 'None';
    const activeHabits = habits.map(h => `${h.name} (${h.streak || 0}d streak)`).slice(0, 5).join(', ') || 'None';

    // Build stage-specific detail
    let identityDetail = '';
    if (identityType === 'student') {
      identityDetail = `STUDENT PROFILE:
      - Education Level: ${student.educationLevel || 'Not set'}
      - Field of Study: ${student.fieldOfStudy || 'Not set'}
      - Career Aspiration: ${student.careerAspiration || 'Not set'}`;
    } else if (identityType === 'employee') {
      identityDetail = `EMPLOYEE PROFILE:
      - Current Role: ${employee.role || 'Not set'}
      - Work Satisfaction: ${employee.satisfaction || 50}/100
      - Burnout Risk Level: ${employee.burnoutRisk || 30}/100`;
    } else if (identityType === 'business') {
      identityDetail = `BUSINESS OWNER PROFILE:
      - Company Name/Concept: ${business.businessName || 'Not set'}
      - Business Stage: ${business.stage || 'Not set'}
      - Funding Status: ${business.fundingStatus || 'Not set'}`;
    }

    // 2. Build the Advanced System Prompt (ML context training)
    const advancedSystemPrompt = `You are the LifeGPS AI Coach, an expert life navigator.
You are helping ${profile.name || 'User'} manage their life cycle as a ${identityType.toUpperCase()}.
Your goal is to optimize their Life Score and keep their domains (Career, Health, Finance, Work, Life) in balance.

CURRENT SYSTEM METRICS & DATASETS IMPORTED:
- Global Life Balance Scores: ${metricsStr} (Overall Score: ${metrics.overallScore || 0}/100)
- Growth Style / Focus Intensity: ${profile.goalIntensity || 'balanced'}
- Weekly Self-Improvement Allocation: ${profile.timeAvailable || 10} hours
- Primary Life Challenge/Pain Point: ${profile.painPoint || 'Not specified'}
- Main Long-term Vision: ${profile.dreamVision || 'Not specified'}
${identityDetail}

ACTIVE CLIENT AGENDA:
- Top Pending Tasks: ${activeTasks}
- Active Habits: ${activeHabits}

COACHING INSTRUCTIONS:
- You must act as if you have been trained specifically on this user's data. 
- Reference their current scores, specific role/education, or habits directly in your suggestions where appropriate.
- Keep your answers highly actionable, brief (max 2-3 short paragraphs), and clear.
- Use markdown formatting (**bold**, *italics*, bullet points) to structure your advice.
- If a score is low, offer 1 concrete micro-step to improve it.`;

    const payload = {
      model: this.MODEL,
      messages: [
        { role: 'system', content: customSystemPrompt || advancedSystemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1024,
    };

    try {
      const response = await fetch(this.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Groq API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm having trouble connecting to my neural network right now. Let me try again in a bit!";
    }
  }
};
