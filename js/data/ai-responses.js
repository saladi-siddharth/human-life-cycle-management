/* ============================================================
   AI COACH RESPONSES — Context-Aware Simulated AI
   ============================================================ */

const AIResponses = {
  greetings: {
    student: [
      "Hey there! 🎓 I'm your Life GPS AI Coach. I see you're on your academic journey — let's make sure you're building the right skills for your dream career while keeping everything else in balance.",
      "Welcome back! I noticed you've been crushing your study sessions. Let's talk about what's next on your roadmap.",
      "Good to see you! Your career score is looking strong. Want to explore some internship opportunities I found for you?"
    ],
    employee: [
      "Welcome back! 💼 I've been analyzing your career trajectory — I have some insights on your path to that next promotion.",
      "Hey! Your work-life balance score improved this week. Let's keep that momentum going while also pushing your career forward.",
      "Good to see you! I noticed your burnout risk has decreased. The changes you made to your schedule are working."
    ],
    business: [
      "Welcome back, founder! 🚀 Your business metrics are looking interesting — let's review your growth trajectory together.",
      "Hey! I've been tracking your burn rate and revenue trends. I have some strategic recommendations for you.",
      "Good to see you! Your team is growing and so is your revenue. Let's make sure your personal health keeps up with the business growth."
    ]
  },

  responses: {
    'career': {
      student: "Based on your profile, I'd recommend focusing on **practical projects** this semester. Your technical skills are at 65%, but employers want to see real-world application. Here's what I suggest:\n\n1. 🎯 Start a side project using your field of study\n2. 📝 Contribute to an open-source project\n3. 🤝 Join a hackathon in the next 30 days\n\nThis will boost your portfolio strength by an estimated 25%.",
      employee: "Looking at your career trajectory, you're well-positioned for a **promotion within 12-18 months**. Here's the gap analysis:\n\n1. 📈 Leadership skills need the biggest jump (+30%)\n2. 🎤 Executive presence is your hidden accelerator\n3. 💡 One high-visibility project could fast-track this\n\nI'd recommend volunteering for the next cross-functional initiative.",
      business: "Your business is at an exciting inflection point. To hit your next milestone:\n\n1. 📊 Focus on reducing churn before acquiring new customers\n2. 💰 Your burn rate suggests 8 months of runway — start fundraising talks now\n3. 👥 Your next hire should be a VP of Sales\n\nShall I create a 90-day growth sprint plan?"
    },
    'health': {
      student: "Your health data shows **exam stress is your biggest challenge**. Here's a science-backed plan:\n\n1. 🧘 5-minute breathing exercises before study sessions\n2. 🚶 15-minute walk between study blocks (your retention will improve 23%)\n3. 😴 Aim for 7.5 hours of sleep — your current average is 6.8\n\nSmall changes, big impact on both health AND grades!",
      employee: "I'm seeing a pattern: **your stress spikes mid-week** and your sleep drops. Let's fix this:\n\n1. 💺 Set a standing desk reminder every 30 minutes\n2. 🏃 Move your workout to mornings (your energy data shows 85% morning energy)\n3. 📱 No screens 1 hour before bed\n\nYour health score could jump from 58% to 75% in 30 days.",
      business: "Founder burnout is real, and your numbers are showing early signs:\n\n1. 🔴 Your stress levels have been above 60% for 3 weeks\n2. 😴 Sleep is averaging 6.2 hours (need 7.5+)\n3. 🏃 Only 2 exercise sessions this week\n\nI'm prescribing: block 1 hour daily for exercise, delegate 3 tasks from your plate, and take one full day off this week."
    },
    'finance': {
      student: "Let's optimize your student budget. I see opportunities:\n\n1. 💰 Your food spending could drop 15% with meal prep\n2. 📚 Check if your library has digital textbook access\n3. 🏆 You qualify for 3 scholarships I found — deadlines in 6 weeks\n\nAlso, your emergency fund is at $1,200 of $3,000 target. Let's set up auto-save of $50/week.",
      employee: "Great news — your savings rate is strong at 20%! Here's how to optimize further:\n\n1. 🏠 Your house down payment is at 44% — on track for next year\n2. 📈 Increase 401(k) contribution by 2% to maximize employer match\n3. 💳 Your subscription audit found $127/month in unused services\n\nProjected net worth at this pace: **$125K by year-end**.",
      business: "Critical business finance insights:\n\n1. 📉 Revenue growth is 12% MoM but CAC increased 20% — investigate\n2. 💰 With 8-month runway, start Series A conversations now\n3. 📊 Your gross margin (35%) should target 60%+ for SaaS\n\nI've prepared a financial model with 3 scenarios. Want to review?"
    },
    'plan my week': {
      student: "Here's your optimized week plan based on your energy patterns and deadlines:\n\n**Monday**: Deep study session (your peak focus day)\n**Tuesday**: Group project work + networking event\n**Wednesday**: Lighter study + exercise\n**Thursday**: Career development (applications, LinkedIn)\n**Friday**: Review & catch up + social time\n**Weekend**: Rest, hobbies, light review\n\nI've blocked time for your 3 active habits too. Shall I adjust anything?",
      employee: "Based on your calendar and energy data, here's your optimized week:\n\n**Monday**: Strategic planning + deep work AM, meetings PM\n**Tuesday**: Collaborative work + 1:1s\n**Wednesday**: Skills development + team standup only\n**Thursday**: Project delivery + cross-functional work\n**Friday**: Weekly review + career development hour\n\nI've protected 3 hours of deep work daily and scheduled gym at 7 AM (your peak energy).",
      business: "Here's your founder-optimized week:\n\n**Monday**: Team alignment + weekly metrics review\n**Tuesday**: Customer calls + product decisions\n**Wednesday**: Deep work on strategy (NO meetings!)\n**Thursday**: Sales pipeline + partner meetings\n**Friday**: Team 1:1s + weekly retrospective\n\n⚠️ I've blocked 6-7 AM for exercise and 8-9 PM for family time. Non-negotiable."
    },
    'motivate me': {
      student: "You've already accomplished more than you realize:\n\n🏆 **12 skills** gained this year\n📚 **4 courses** completed\n💪 **12-day** exercise streak\n\nRemember: every expert was once a beginner. You're building the foundation for an incredible career. The skills you're developing right now will compound — in 5 years, you'll look back and thank yourself for the work you're putting in today.\n\n*\"The best time to plant a tree was 20 years ago. The second best time is now.\"*",
      employee: "Look at what you've built:\n\n🚀 You got **promoted** just 3 months ago\n💰 Your net worth grew **18%** this year  \n📈 Your career score is in the **top 30%** of peers\n\nYou're not just surviving — you're thriving. Keep pushing on that leadership track. In 18 months, you'll be exactly where you want to be.\n\n*\"Success is the sum of small efforts repeated day in and day out.\"*",
      business: "Founder, look at your journey:\n\n🏢 You built something from **nothing**\n📈 Revenue is growing **12% monthly**\n👥 You have a team that believes in your vision\n\nEvery great company started exactly where you are. The doubt you feel? That's the price of ambition. Keep going — your runway gives you time, and your metrics show momentum.\n\n*\"The only way to do great work is to love what you do.\"*"
    }
  },

  getGreeting(identityType) {
    const greetings = this.greetings[identityType] || this.greetings.student;
    return greetings[Math.floor(Math.random() * greetings.length)];
  },

  getResponse(query, identityType) {
    const type = identityType || 'student';
    const queryLower = query.toLowerCase();

    // Find best matching response
    for (const [key, responses] of Object.entries(this.responses)) {
      if (queryLower.includes(key)) {
        return responses[type] || responses.student;
      }
    }

    // Default contextual response
    return this._getDefaultResponse(query, type);
  },

  _getDefaultResponse(query, type) {
    const defaults = [
      `That's a great question! Based on your ${type} profile, I'd recommend taking a balanced approach. Let me analyze your current metrics and create a personalized action plan.\n\nYour top priorities right now:\n1. 🎯 Focus on your highest-impact goal\n2. 📊 Track progress weekly\n3. 🔄 Adjust based on results\n\nWant me to dive deeper into any specific area?`,
      `I've thought about this in the context of your overall life balance. Here's my take:\n\nYour strongest area is your **career score** — use that momentum. Your **health** needs the most attention right now.\n\nHere's a quick win: spend 15 minutes today on your weakest metric. Small, consistent actions beat grand plans every time.\n\nShall I create a specific action plan for this?`,
      `Great thinking! Let me connect this to your broader goals.\n\nBased on your 5-year vision, this aligns well with your trajectory. I'd suggest:\n\n1. ✅ Set a 30-day mini-goal related to this\n2. 📅 Schedule dedicated time in your calendar\n3. 🤝 Find an accountability partner\n\nI can help you break this down into daily actions. Just say the word!`
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
  }
};
