/* ============================================================
   MOCK DATA — Realistic Data for All Dashboards
   ============================================================ */

const MockData = {
  // ── CAREER DATA ──
  career: {
    student: {
      roadmap: [
        { title: 'Foundation Skills', desc: 'Build core programming & analytical skills', status: 'completed', time: 'Year 1' },
        { title: 'Specialization', desc: 'Choose your focus area and dive deep', status: 'current', time: 'Year 2' },
        { title: 'Internship Experience', desc: 'Land a summer internship at a top company', status: 'upcoming', time: 'Year 3' },
        { title: 'Portfolio & Projects', desc: 'Build 3-5 impressive showcase projects', status: 'upcoming', time: 'Year 3-4' },
        { title: 'Full-Time Position', desc: 'Secure your dream entry-level role', status: 'upcoming', time: 'Year 4' }
      ],
      skills: [
        { name: 'Technical Skills', level: 65, target: 90 },
        { name: 'Communication', level: 55, target: 80 },
        { name: 'Problem Solving', level: 70, target: 85 },
        { name: 'Leadership', level: 40, target: 70 },
        { name: 'Networking', level: 30, target: 75 }
      ],
      resources: [
        { title: 'Data Structures & Algorithms', type: 'Course', provider: 'Coursera', progress: 72 },
        { title: 'Effective Communication', type: 'Book', provider: 'Carnegie', progress: 45 },
        { title: 'Tech Interview Prep', type: 'Platform', provider: 'LeetCode', progress: 38 }
      ]
    },
    employee: {
      roadmap: [
        { title: 'Current Role Mastery', desc: 'Excel in your current position', status: 'completed', time: '0-6 months' },
        { title: 'Skill Expansion', desc: 'Learn adjacent skills for promotion', status: 'current', time: '6-12 months' },
        { title: 'Leadership Track', desc: 'Take on team lead responsibilities', status: 'upcoming', time: '1-2 years' },
        { title: 'Senior Position', desc: 'Achieve senior title with salary jump', status: 'upcoming', time: '2-3 years' },
        { title: 'Management/Principal', desc: 'Choose IC or management track', status: 'upcoming', time: '3-5 years' }
      ],
      skills: [
        { name: 'Domain Expertise', level: 78, target: 95 },
        { name: 'Leadership', level: 55, target: 85 },
        { name: 'Strategic Thinking', level: 60, target: 90 },
        { name: 'Cross-Functional Collab', level: 65, target: 85 },
        { name: 'Executive Presence', level: 35, target: 75 }
      ],
      resources: [
        { title: 'Management Essentials', type: 'Course', provider: 'HBS Online', progress: 60 },
        { title: 'Negotiation Skills', type: 'Workshop', provider: 'Internal', progress: 100 },
        { title: 'Cloud Architecture', type: 'Certification', provider: 'AWS', progress: 25 }
      ]
    },
    business: {
      roadmap: [
        { title: 'Product-Market Fit', desc: 'Validate your core offering', status: 'completed', time: '0-6 months' },
        { title: 'Revenue Growth', desc: 'Hit $10K MRR milestone', status: 'current', time: '6-12 months' },
        { title: 'Team Building', desc: 'Hire key roles (CTO, VP Sales)', status: 'upcoming', time: '1-2 years' },
        { title: 'Series A', desc: 'Raise institutional funding', status: 'upcoming', time: '2-3 years' },
        { title: 'Scale & Expand', desc: 'Enter new markets, 100+ customers', status: 'upcoming', time: '3-5 years' }
      ],
      skills: [
        { name: 'Leadership & Vision', level: 80, target: 95 },
        { name: 'Financial Management', level: 55, target: 85 },
        { name: 'Sales & Marketing', level: 60, target: 90 },
        { name: 'Product Strategy', level: 75, target: 90 },
        { name: 'Fundraising', level: 30, target: 80 }
      ],
      resources: [
        { title: 'The Hard Thing About Hard Things', type: 'Book', provider: 'Ben Horowitz', progress: 85 },
        { title: 'YC Startup School', type: 'Course', provider: 'Y Combinator', progress: 50 },
        { title: 'Financial Modeling', type: 'Course', provider: 'Wall St Prep', progress: 15 }
      ]
    }
  },

  // ── HEALTH DATA ──
  health: {
    weeklyActivity: [65, 80, 45, 90, 70, 55, 40], // Mon-Sun
    sleepData: [7.2, 6.8, 7.5, 6.5, 7.0, 8.0, 7.8],
    stressLevels: [45, 60, 55, 70, 50, 35, 30],
    habits: [
      { name: 'Morning Exercise', streak: 12, target: 30, icon: '🏃' },
      { name: 'Meditation', streak: 8, target: 21, icon: '🧘' },
      { name: '8 Glasses of Water', streak: 15, target: 30, icon: '💧' },
      { name: 'Read 30 Minutes', streak: 5, target: 14, icon: '📚' },
      { name: 'Sleep by 11 PM', streak: 3, target: 14, icon: '😴' }
    ],
    preventiveCalendar: [
      { event: 'Annual Physical', date: '2026-09-15', status: 'upcoming' },
      { event: 'Dental Checkup', date: '2026-08-20', status: 'upcoming' },
      { event: 'Eye Exam', date: '2026-11-10', status: 'scheduled' },
      { event: 'Flu Vaccination', date: '2026-10-01', status: 'pending' }
    ],
    student: { tips: ['Manage exam stress with breathing exercises', 'Take study breaks every 45 minutes', 'Walk to campus instead of driving'] },
    employee: { tips: ['Stand up every 30 minutes at your desk', 'Use 20-20-20 rule for eye strain', 'Take walking meetings when possible'] },
    business: { tips: ['Schedule non-negotiable workout time', 'Practice delegation to reduce stress', 'Annual executive health checkup'] }
  },

  // ── FINANCE DATA ──
  finance: {
    student: {
      netWorth: -24500,
      monthlyIncome: 1200,
      monthlyExpenses: 980,
      savings: 2400,
      budget: [
        { category: 'Rent', amount: 450, percent: 46, color: '#6C5CE7' },
        { category: 'Food', amount: 200, percent: 20, color: '#00D2FF' },
        { category: 'Transport', amount: 80, percent: 8, color: '#10B981' },
        { category: 'Books/Supplies', amount: 120, percent: 12, color: '#F59E0B' },
        { category: 'Entertainment', amount: 80, percent: 8, color: '#EF4444' },
        { category: 'Savings', amount: 50, percent: 5, color: '#8B5CF6' }
      ],
      loans: 26900,
      goals: [
        { name: 'Emergency Fund', target: 3000, current: 1200, icon: '🛡️' },
        { name: 'Summer Trip', target: 2000, current: 800, icon: '✈️' },
        { name: 'New Laptop', target: 1500, current: 600, icon: '💻' }
      ]
    },
    employee: {
      netWorth: 85000,
      monthlyIncome: 7500,
      monthlyExpenses: 5200,
      savings: 42000,
      budget: [
        { category: 'Housing', amount: 1800, percent: 35, color: '#6C5CE7' },
        { category: 'Food & Dining', amount: 600, percent: 12, color: '#00D2FF' },
        { category: 'Transportation', amount: 400, percent: 8, color: '#10B981' },
        { category: 'Utilities', amount: 250, percent: 5, color: '#F59E0B' },
        { category: 'Savings/Invest', amount: 1500, percent: 29, color: '#8B5CF6' },
        { category: 'Other', amount: 650, percent: 13, color: '#EF4444' }
      ],
      retirement: 32000,
      goals: [
        { name: 'House Down Payment', target: 80000, current: 35000, icon: '🏠' },
        { name: 'Emergency Fund', target: 25000, current: 18000, icon: '🛡️' },
        { name: 'Vacation Fund', target: 5000, current: 3200, icon: '🌴' }
      ]
    },
    business: {
      netWorth: 250000,
      monthlyIncome: 28000,
      monthlyExpenses: 22000,
      savings: 65000,
      budget: [
        { category: 'Payroll', amount: 12000, percent: 55, color: '#6C5CE7' },
        { category: 'Office/Rent', amount: 3000, percent: 14, color: '#00D2FF' },
        { category: 'Marketing', amount: 2500, percent: 11, color: '#10B981' },
        { category: 'Software/Tools', amount: 1500, percent: 7, color: '#F59E0B' },
        { category: 'Owner Pay', amount: 2000, percent: 9, color: '#8B5CF6' },
        { category: 'Reserves', amount: 1000, percent: 5, color: '#EF4444' }
      ],
      runway: 8,
      goals: [
        { name: 'Revenue Target', target: 500000, current: 280000, icon: '📈' },
        { name: 'Cash Reserve', target: 100000, current: 65000, icon: '🏦' },
        { name: 'Series A', target: 2000000, current: 0, icon: '🚀' }
      ]
    },
    netWorthHistory: [
      { month: 'Jan', value: 60 },
      { month: 'Feb', value: 62 },
      { month: 'Mar', value: 58 },
      { month: 'Apr', value: 65 },
      { month: 'May', value: 72 },
      { month: 'Jun', value: 78 },
      { month: 'Jul', value: 85 }
    ]
  },

  // ── WORK & PRODUCTIVITY ──
  work: {
    todayTasks: [
      { text: 'Review quarterly report', done: true, priority: 'high', time: '9:00 AM' },
      { text: 'Team standup meeting', done: true, priority: 'medium', time: '10:00 AM' },
      { text: 'Complete project proposal', done: false, priority: 'high', time: '11:00 AM' },
      { text: 'Lunch break & walk', done: false, priority: 'low', time: '12:30 PM' },
      { text: 'Client presentation prep', done: false, priority: 'high', time: '2:00 PM' },
      { text: 'Code review', done: false, priority: 'medium', time: '3:30 PM' },
      { text: 'Weekly planning', done: false, priority: 'medium', time: '4:30 PM' }
    ],
    focusScore: 73,
    meetingHours: 12,
    deepWorkHours: 18,
    weeklyProductivity: [65, 80, 72, 90, 68, 45, 30], // Mon-Sun
    energyLevels: {
      morning: 85,
      afternoon: 60,
      evening: 40
    }
  },

  // ── LIFE SUCCESS ──
  life: {
    visionBoard: [
      { emoji: '🏠', label: 'Dream Home', progress: 35 },
      { emoji: '✈️', label: 'Travel 30 Countries', progress: 20 },
      { emoji: '📖', label: 'Write a Book', progress: 10 },
      { emoji: '🎓', label: 'Masters Degree', progress: 60 },
      { emoji: '💪', label: 'Run a Marathon', progress: 45 },
      { emoji: '🌟', label: 'Mentor 10 People', progress: 30 },
      { emoji: '💰', label: 'Financial Freedom', progress: 25 },
      { emoji: '❤️', label: 'Strong Relationships', progress: 70 },
      { emoji: '🎨', label: 'Learn an Instrument', progress: 15 }
    ],
    happinessIndex: 72,
    relationshipScore: 78,
    personalGrowth: {
      booksRead: 12,
      coursesCompleted: 4,
      skillsLearned: 8,
      hobbiesPursued: 3
    },
    milestones: [
      { title: 'Completed First Certification', date: '2 weeks ago', icon: '🏆' },
      { title: 'Hit 30-Day Meditation Streak', date: '1 month ago', icon: '🧘' },
      { title: 'Paid Off Credit Card', date: '2 months ago', icon: '💳' },
      { title: 'Got Promoted to Senior', date: '3 months ago', icon: '🚀' }
    ]
  },

  // ── NOTIFICATIONS ──
  notifications: [
    { type: 'alert', title: 'Career Goal Update', message: 'You\'re 72% towards your Q3 skill target', time: '2h ago', icon: '🎯' },
    { type: 'health', title: 'Health Reminder', message: 'Time for your daily meditation session', time: '4h ago', icon: '🧘' },
    { type: 'finance', title: 'Budget Alert', message: 'Entertainment spending is 85% of monthly limit', time: '1d ago', icon: '💰' },
    { type: 'achievement', title: 'Milestone Reached!', message: 'You\'ve maintained a 7-day exercise streak!', time: '1d ago', icon: '🏆' }
  ]
};
