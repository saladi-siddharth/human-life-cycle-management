/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS STORE — Reactive State Engine, Indian Ecosystem & Financial Analytics
   ═══════════════════════════════════════════════════════════════════ */

const Store = {
  _state: {
    user: null,
    isAuthenticated: false,
    identity: 'student',        // 'student' | 'employee' | 'business'
    onboardingStep: 0,
    onboardingComplete: true,
    profile: {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@lifegps.in',
      avatar: '',
      lifeStage: 'Higher Education & Career Build',
      goalIntensity: 'ambitious',
      riskTolerance: 65,
      weeklyHours: 15,
      painPoint: 'Securing top tech internship & managing financial growth',
      dreamVision: 'Build an AI startup in India & achieve financial independence',
      // Student Specific
      educationLevel: 'Undergraduate B.Tech',
      fieldOfStudy: 'Engineering & Tech',
      gpa: '8.9 / 10',
      dreamCompanies: ['Google India', 'ISRO', 'Microsoft', 'Razorpay'],
      // Employee Specific
      currentCompany: 'Apex Tech Solutions',
      currentRole: 'Software Development Engineer',
      salary: '14,00,000',
      yearsExperience: 2,
      jobSatisfaction: 80,
      // Business Specific
      businessName: 'InnovateAI India',
      businessStage: 'Early Seed Stage',
      revenue: '2,50,000',
      teamSize: 4,
      fundingStatus: 'Startup India Incubated'
    },
    scores: {
      life: 78,
      career: 75,
      health: 82,
      finance: 70,
      work: 80,
      success: 77
    },

    // ─── Tasks & Work Items ──────────────────────────────────
    tasks: [
      { id: 't1', title: 'Prepare for Google Software Engineer Internship Interview', domain: 'career', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-05' },
      { id: 't2', title: 'Apply for NITI Aayog Policy & Tech Internship', domain: 'student', quadrant: 'q1', priority: 'high', completed: true, dueDate: '2026-07-20' },
      { id: 't3', title: 'Complete PMSS & NSP Scholarship Application Verification', domain: 'student', quadrant: 'q2', priority: 'high', completed: false, dueDate: '2026-08-10' },
      { id: 't4', title: '30-min Evening Cardio & Fitness Session', domain: 'health', quadrant: 'q2', priority: 'medium', completed: false, dueDate: '2026-07-23' },
      { id: 't5', title: 'Automate monthly SIP investment in Nifty 50 Index Fund', domain: 'finance', quadrant: 'q2', priority: 'high', completed: true, dueDate: '2026-07-15' }
    ],

    // ─── Life Goals & Bucket List ────────────────────────────
    lifeGoals: [
      { id: 'lg1', category: 'Growth', title: 'Publish 2 Research Papers on Applied Machine Learning', targetYear: '2026', completed: false, progress: 60 },
      { id: 'lg2', category: 'Relationships', title: 'Take parents on a 10-day Himalayan retreat', targetYear: '2027', completed: false, progress: 30 },
      { id: 'lg3', category: 'Purpose', title: 'Mentor 50 underprivileged students in coding', targetYear: '2026', completed: true, progress: 100 },
      { id: 'lg4', category: 'Adventure', title: 'Complete Solo Trek to Everest Base Camp', targetYear: '2028', completed: false, progress: 15 }
    ],

    // ─── Financial Ledger & Analytics ─────────────────────────
    finances: {
      monthlyIncome: 75000, // in INR (or USD equivalent)
      savingsTarget: 25000,
      emergencyFund: 180000,
      emergencyFundTarget: 300000,
      transactions: [
        { id: 'f1', type: 'income', amount: 75000, category: 'Stipend / Income', date: '2026-07-01', note: 'Monthly Internship Stipend / Salary' },
        { id: 'f2', type: 'expense', amount: 18000, category: 'Housing & Rent', date: '2026-07-02', note: 'PG / Flat Rent & Maintenance' },
        { id: 'f3', type: 'expense', amount: 8500, category: 'Food & Mess', date: '2026-07-05', note: 'Mess & Food Expenses' },
        { id: 'f4', type: 'expense', amount: 3500, category: 'Utilities & Books', date: '2026-07-08', note: 'Wifi, Electricity & Study Materials' },
        { id: 'f5', type: 'expense', amount: 20000, category: 'Savings & Mutual Funds', date: '2026-07-10', note: 'SIP Direct Mutual Funds' },
        { id: 'f6', type: 'expense', amount: 4500, category: 'Dining & Outing', date: '2026-07-14', note: 'Weekend Outings with Friends' }
      ],
      assets: [
        { id: 'a1', name: 'High-Yield Bank Savings', amount: 120000, category: 'Cash' },
        { id: 'a2', name: 'Mutual Funds & Equity SIP', amount: 240000, category: 'Investments' }
      ],
      liabilities: [
        { id: 'l1', name: 'Education Loan Balance', amount: 85000, category: 'Loans' }
      ]
    },

    // ─── Comprehensive Indian Colleges Database ──────────────
    indianColleges: [
      // === TIER 1 ===
      { id: 'c1', name: 'IIT Bombay (Indian Institute of Technology)', field: 'Engineering & Tech', location: 'Mumbai, Maharashtra', nirfRank: '#1 Engineering (Tier 1)', tuition: '₹2.2 Lakh/yr', avgPlacement: '₹23.5 LPA', exam: 'JEE Advanced', link: 'https://www.iitb.ac.in', applyLink: 'https://www.iitb.ac.in/en/education/admissions' },
      { id: 'c2', name: 'IIT Delhi', field: 'Engineering & Tech', location: 'New Delhi', nirfRank: '#2 Engineering (Tier 1)', tuition: '₹2.2 Lakh/yr', avgPlacement: '₹25.8 LPA', exam: 'JEE Advanced', link: 'https://home.iitd.ac.in', applyLink: 'https://home.iitd.ac.in/admissions.php' },
      { id: 'c3', name: 'AIIMS New Delhi', field: 'Medicine & Healthcare', location: 'New Delhi', nirfRank: '#1 Medical (Tier 1)', tuition: '₹1,628/yr', avgPlacement: 'Top Govt Hospitals', exam: 'NEET UG', link: 'https://www.aiims.edu', applyLink: 'https://www.aiimsexams.ac.in' },
      { id: 'c4', name: 'IIM Ahmedabad (Indian Institute of Management)', field: 'Business & Management', location: 'Ahmedabad, Gujarat', nirfRank: '#1 Management (Tier 1)', tuition: '₹25 Lakh Total', avgPlacement: '₹34.3 LPA', exam: 'CAT', link: 'https://www.iima.ac.in', applyLink: 'https://www.iima.ac.in/academics/mba' },
      { id: 'c5', name: 'IISc Bangalore (Indian Institute of Science)', field: 'Pure Sciences', location: 'Bengaluru, Karnataka', nirfRank: '#1 University (Tier 1)', tuition: '₹30,000/yr', avgPlacement: 'Global R&D Placements', exam: 'JEE / GATE', link: 'https://iisc.ac.in', applyLink: 'https://iisc.ac.in/admissions' },
      { id: 'c6', name: 'NLSIU Bengaluru (National Law School)', field: 'Law', location: 'Bengaluru, Karnataka', nirfRank: '#1 Law (Tier 1)', tuition: '₹3.2 Lakh/yr', avgPlacement: '₹16.0 LPA', exam: 'CLAT', link: 'https://www.nls.ac.in', applyLink: 'https://www.nls.ac.in/admissions' },

      // === TIER 2 ===
      { id: 'c7', name: 'NIT Trichy (National Institute of Technology)', field: 'Engineering & Tech', location: 'Tiruchirappalli, Tamil Nadu', nirfRank: '#9 Engineering (Tier 2)', tuition: '₹1.5 Lakh/yr', avgPlacement: '₹15.2 LPA', exam: 'JEE Main', link: 'https://www.nitt.edu', applyLink: 'https://www.nitt.edu/home/academics/admissions' },
      { id: 'c8', name: 'BITS Pilani', field: 'Engineering & Tech', location: 'Pilani, Rajasthan', nirfRank: '#25 Overall (Tier 2)', tuition: '₹5.4 Lakh/yr', avgPlacement: '₹18.5 LPA', exam: 'BITSAT', link: 'https://www.bits-pilani.ac.in', applyLink: 'https://www.bitsadmission.com' },
      { id: 'c9', name: 'Manipal Academy of Higher Education', field: 'Medicine & Healthcare', location: 'Manipal, Karnataka', nirfRank: '#6 Medical (Tier 2)', tuition: '₹17.8 Lakh/yr', avgPlacement: '₹12.0 LPA', exam: 'MET', link: 'https://manipal.edu', applyLink: 'https://manipal.edu/mu/admission.html' },
      { id: 'c10', name: 'Symbiosis Institute of Business Management', field: 'Business & Management', location: 'Pune, Maharashtra', nirfRank: '#17 Management (Tier 2)', tuition: '₹11.5 Lakh/yr', avgPlacement: '₹23.0 LPA', exam: 'SNAP', link: 'https://www.sibm.edu', applyLink: 'https://www.sibm.edu/welcome/mba' },
      { id: 'c11', name: 'ILSU Pune (ILS Law College)', field: 'Law', location: 'Pune, Maharashtra', nirfRank: '#5 Law (Tier 2)', tuition: '₹42,000/yr', avgPlacement: '₹8.5 LPA', exam: 'MH CET Law', link: 'https://ilslaw.edu', applyLink: 'https://ilslaw.edu/admissions' },

      // === TIER 3 ===
      { id: 'c12', name: 'PSG College of Technology', field: 'Engineering & Tech', location: 'Coimbatore, Tamil Nadu', nirfRank: '#63 Engineering (Tier 3)', tuition: '₹85,000/yr', avgPlacement: '₹6.8 LPA', exam: 'TNEA / JEE Main', link: 'https://www.psgtech.edu', applyLink: 'https://www.psgtech.edu/admissions.php' },
      { id: 'c13', name: 'Kalinga Institute of Industrial Technology', field: 'Engineering & Tech', location: 'Bhubaneswar, Odisha', nirfRank: '#39 Engineering (Tier 3)', tuition: '₹3.5 Lakh/yr', avgPlacement: '₹6.5 LPA', exam: 'KIITEE', link: 'https://kiit.ac.in', applyLink: 'https://kiit.ac.in/admission' },
      { id: 'c14', name: 'Christ University', field: 'Business & Management', location: 'Bengaluru, Karnataka', nirfRank: '#60 Management (Tier 3)', tuition: '₹3.2 Lakh/yr', avgPlacement: '₹7.5 LPA', exam: 'CUET', link: 'https://christuniversity.in', applyLink: 'https://christuniversity.in/admissions' },
      { id: 'c15', name: 'DY Patil Medical College', field: 'Medicine & Healthcare', location: 'Navi Mumbai, Maharashtra', nirfRank: '#35 Medical (Tier 3)', tuition: '₹22.0 Lakh/yr', avgPlacement: '₹9.0 LPA', exam: 'NEET UG', link: 'https://dypatil.edu', applyLink: 'https://dypatil.edu/admissions' },

      // === TIER 4 ===
      { id: 'c16', name: 'Lovely Professional University (LPU)', field: 'Engineering & Tech', location: 'Jalandhar, Punjab', nirfRank: '#50 Engineering (Tier 4)', tuition: '₹2.4 Lakh/yr', avgPlacement: '₹5.5 LPA', exam: 'LPUNEST', link: 'https://www.lpu.in', applyLink: 'https://www.lpu.in/admission' },
      { id: 'c17', name: 'Amity University Noida', field: 'Engineering & Tech', location: 'Noida, Uttar Pradesh', nirfRank: '#52 Engineering (Tier 4)', tuition: '₹3.1 Lakh/yr', avgPlacement: '₹5.2 LPA', exam: 'Amity JEE', link: 'https://amity.edu', applyLink: 'https://amity.edu/admission-procedure.aspx' },
      { id: 'c18', name: 'Chitkara University', field: 'Engineering & Tech', location: 'Rajpura, Punjab', nirfRank: '#80 Engineering (Tier 4)', tuition: '₹1.8 Lakh/yr', avgPlacement: '₹5.0 LPA', exam: 'JEE Main', link: 'https://www.chitkara.edu.in', applyLink: 'https://www.chitkara.edu.in/admissions' }
    ],

    // ─── Real-Time Indian Scholarships (Govt & Private) ──────
    indianScholarships: [
      { id: 'sch1', name: 'NSP Central Sector Scheme for College Students', type: 'Government', provider: 'Ministry of Education, Govt of India', amount: '₹20,000 / year', deadline: '31 October 2026', eligibility: 'Class 12th >80th percentile, Income <₹4.5 LPA', applyLink: 'https://scholarships.gov.in' },
      { id: 'sch2', name: 'PMSS (Prime Minister\'s Scholarship Scheme)', type: 'Government', provider: 'DESW, Ministry of Defence', amount: '₹36,000 / year', deadline: '30 November 2026', eligibility: 'Wards of Ex-Servicemen & Coast Guard', applyLink: 'https://ksb.gov.in/entry-pmss.htm' },
      { id: 'sch3', name: 'Tata Building India & Education Trust Scholarship', type: 'Private CSR', provider: 'Tata Trusts', amount: 'Up to ₹1,00,000 / year', deadline: '15 September 2026', eligibility: 'Merit-cum-means for UG Tech/Med students', applyLink: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants' },
      { id: 'sch4', name: 'Reliance Foundation Undergraduate Scholarship', type: 'Private CSR', provider: 'Reliance Foundation', amount: 'Up to ₹2,00,000 Total', deadline: '06 October 2026', eligibility: 'Undergraduate students, Household Income <₹15 LPA', applyLink: 'https://www.scholarships.reliancefoundation.org' },
      { id: 'sch5', name: 'Aditya Birla Capital Scholarship Scheme', type: 'Private CSR', provider: 'Aditya Birla Foundation', amount: 'Up to ₹60,000 / year', deadline: '15 October 2026', eligibility: 'School & College students facing financial crisis', applyLink: 'https://www.buddy4study.com/page/aditya-birla-capital-scholarship' },
      { id: 'sch6', name: 'DST INSPIRE Scholarship (SHE)', type: 'Government', provider: 'Dept of Science & Technology, Govt of India', amount: '₹80,000 / year', deadline: '31 December 2026', eligibility: 'Top 1% in Class 12th pursuing Basic & Natural Sciences', applyLink: 'https://online-inspire.gov.in' }
    ],

    // ─── Real-Time Student Internships (Govt & Companies) ───
    indianInternships: [
      { id: 'int1', company: 'NITI Aayog, Govt of India', title: 'NITI Policy & Digital Transformation Intern', type: 'Government', location: 'New Delhi / Remote', stipend: 'Certificate + Policy Exposure', duration: '6 Weeks to 6 Months', applyLink: 'https://www.niti.gov.in/internship' },
      { id: 'int2', company: 'PM Internship Scheme 2026', title: 'National Industry Apprentice & Intern', type: 'Government', location: 'Pan-India Top 500 Companies', stipend: '₹5,000 / month + ₹6,000 Grant', duration: '12 Months', applyLink: 'https://pminternship.mca.gov.in' },
      { id: 'int3', company: 'ISRO (Indian Space Research Organisation)', title: 'Space Technology & Robotics Student Intern', type: 'Government', location: 'Bengaluru / Sriharikota', stipend: 'Govt Research Stipend', duration: '2 to 6 Months', applyLink: 'https://www.isro.gov.in/Internship.html' },
      { id: 'int4', company: 'Google India', title: 'Software Engineering Intern (Summer 2026)', type: 'Corporate Tech', location: 'Bengaluru / Hyderabad', stipend: '₹1,10,000 / month', duration: '10 to 12 Weeks', applyLink: 'https://buildyourfuture.withgoogle.com/internships' },
      { id: 'int5', company: 'Microsoft India', title: 'Research & Software Development Intern', type: 'Corporate Tech', location: 'Bengaluru / Hyderabad / Noida', stipend: '₹1,00,000 / month', duration: '8 to 12 Weeks', applyLink: 'https://careers.microsoft.com/students/us/en/indiascholarships' },
      { id: 'int6', company: 'Razorpay', title: 'Product & Engineering Summer Intern', type: 'Fintech Unicorn', location: 'Bengaluru, Karnataka', stipend: '₹60,000 / month', duration: '3 Months', applyLink: 'https://razorpay.com/jobs' }
    ],

    health: {
      waterIntake: 2000,
      waterTarget: 2500,
      sleepLogs: [
        { date: '2026-07-21', hours: 7.5, quality: 4, bedtime: '23:00', wakeTime: '06:30' },
        { date: '2026-07-20', hours: 8.0, quality: 5, bedtime: '22:30', wakeTime: '06:30' }
      ],
      workoutLogs: [
        { id: 'w1', date: '2026-07-21', type: 'Gym Resistance Training', duration: 45, calories: 350 }
      ],
      macroLogs: { protein: 135, carbs: 220, fat: 60, calorieTarget: 2200 },
      moodLogs: [{ date: '2026-07-22', mood: 'Focused', score: 88 }]
    },

    career: {
      skills: [
        { name: 'Data Structures & Algorithms', level: 4, target: 5 },
        { name: 'System Design & Distributed Systems', level: 3, target: 4 },
        { name: 'Full-Stack Web (React & Node.js)', level: 5, target: 5 },
        { name: 'Machine Learning & Python', level: 3, target: 4 }
      ],
      resumeText: 'Undergraduate Engineering student specializing in scalable full-stack applications, algorithms, and distributed AI systems.',
      jobApplications: [
        { id: 'j1', company: 'Google India', role: 'SWE Intern 2026', stage: 'Interviewing', salary: '13,20,00,00', appliedDate: '2026-06-15', notes: 'Coding Round Passed' },
        { id: 'j2', company: 'Razorpay', role: 'Backend Engineer Intern', stage: 'Offer', salary: '7,20,000', appliedDate: '2026-05-20', notes: 'Offer Received: ₹60k/month stipend' }
      ]
    },

    apiSettings: { geminiKey: '' },
    notifications: [],
    theme: 'dark',
    sidebarOpen: false
  },
  _listeners: [],

  getState() { return this._state; },
  get(key) { return key.split('.').reduce((obj, k) => obj?.[k], this._state); },

  set(key, value) {
    const keys = key.split('.');
    let obj = this._state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.recalculateScores();
    this._save();
    this._notify();
  },

  update(partial) {
    Object.assign(this._state, partial);
    this.recalculateScores();
    this._save();
    this._notify();
  },

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  },

  _notify() { this._listeners.forEach(fn => fn(this._state)); },
  _save() {
    try { localStorage.setItem('lifegps_state', JSON.stringify(this._state)); } catch (e) {}
  },
  _load() {
    try {
      const saved = localStorage.getItem('lifegps_state');
      if (saved) {
        const data = JSON.parse(saved);
        Object.assign(this._state, data);
      }
    } catch (e) {}
  },

  // ─── Reactive Score Engine ───────────────────────────────
  recalculateScores() {
    // 1. Health Score
    const waterRatio = Math.min(1, (this._state.health.waterIntake || 0) / (this._state.health.waterTarget || 2500));
    const recentSleep = this._state.health.sleepLogs.slice(0, 3);
    const avgSleep = recentSleep.length ? (recentSleep.reduce((a, b) => a + b.hours, 0) / recentSleep.length) : 7.5;
    const sleepRatio = Math.min(1, avgSleep / 8.0);
    const workoutCount = this._state.health.workoutLogs.length;
    const workoutRatio = Math.min(1, workoutCount / 3.0);
    const healthScore = Math.round((waterRatio * 30) + (sleepRatio * 40) + (workoutRatio * 30));

    // 2. Finance Score (Dynamic Income Re-Analysis)
    const income = Number(this._state.finances.monthlyIncome) || 75000;
    const totalExpenses = this._state.finances.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const netSavings = Math.max(0, income - totalExpenses);
    const savingsRate = Math.min(1, netSavings / (income * 0.3)); // Target 30% savings rate
    const emergencyFund = Number(this._state.finances.emergencyFund) || 180000;
    const emergencyMonths = emergencyFund / Math.max(1, totalExpenses);
    const emergencyRatio = Math.min(1, emergencyMonths / 6.0); // Target 6 months
    const financeScore = Math.round((savingsRate * 50) + (emergencyRatio * 50));

    // 3. Work Score
    const workTasks = this._state.tasks.filter(t => t.domain === 'work' || t.domain === 'career' || t.domain === 'student');
    const completedWork = workTasks.filter(t => t.completed).length;
    const taskRatio = workTasks.length ? (completedWork / workTasks.length) : 0.75;
    const workScore = Math.round(50 + (taskRatio * 45));

    // 4. Career & Student Score
    const skills = this._state.career.skills || [];
    const avgSkillLevel = skills.length ? (skills.reduce((a, b) => a + b.level, 0) / (skills.length * 5)) : 0.8;
    const apps = this._state.career.jobApplications || [];
    const activeAppsRatio = Math.min(1, apps.length / 2.0);
    const careerScore = Math.round((avgSkillLevel * 60) + (activeAppsRatio * 40));

    // 5. Life Goals Score
    const goals = this._state.lifeGoals || [];
    const completedGoals = goals.filter(g => g.completed).length;
    const goalRatio = goals.length ? (completedGoals / goals.length) : 0.5;
    const successScore = Math.round(60 + (goalRatio * 38));

    // Master Life Score
    const lifeScore = Math.round((healthScore + financeScore + workScore + careerScore + successScore) / 5);

    this._state.scores = {
      life: Math.max(35, Math.min(99, lifeScore)),
      career: Math.max(35, Math.min(99, careerScore)),
      health: Math.max(35, Math.min(99, healthScore)),
      finance: Math.max(35, Math.min(99, financeScore)),
      work: Math.max(35, Math.min(99, workScore)),
      success: Math.max(35, Math.min(99, successScore))
    };
  },

  // ─── Task & Work Management ──────────────────────────────
  addTask(task) {
    const newTask = {
      id: 't_' + Date.now(),
      title: task.title,
      domain: task.domain || 'work',
      quadrant: task.quadrant || 'q2',
      priority: task.priority || 'medium',
      completed: false,
      dueDate: task.dueDate || new Date().toISOString().split('T')[0]
    };
    this._state.tasks.unshift(newTask);
    this.recalculateScores();
    this._save();
    this._notify();
    return newTask;
  },

  toggleTask(id) {
    const t = this._state.tasks.find(x => x.id === id);
    if (t) {
      t.completed = !t.completed;
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  deleteTask(id) {
    this._state.tasks = this._state.tasks.filter(x => x.id !== id);
    this.recalculateScores();
    this._save();
    this._notify();
  },

  // ─── Life Goals Management ──────────────────────────────
  addLifeGoal(goal) {
    const newG = {
      id: 'lg_' + Date.now(),
      category: goal.category || 'Growth',
      title: goal.title,
      targetYear: goal.targetYear || '2026',
      completed: false,
      progress: Number(goal.progress) || 10
    };
    this._state.lifeGoals.unshift(newG);
    this.recalculateScores();
    this._save();
    this._notify();
    return newG;
  },

  toggleLifeGoal(id) {
    const g = this._state.lifeGoals.find(x => x.id === id);
    if (g) {
      g.completed = !g.completed;
      g.progress = g.completed ? 100 : 50;
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  deleteLifeGoal(id) {
    this._state.lifeGoals = this._state.lifeGoals.filter(x => x.id !== id);
    this.recalculateScores();
    this._save();
    this._notify();
  },

  // ─── Finance Transactions & Dynamic Income Update ─────────
  addTransaction(t) {
    const amountNum = Number(t.amount) || 0;
    const isIncome = t.type === 'income';

    const newT = {
      id: 'f_' + Date.now(),
      type: t.type || 'expense',
      amount: amountNum,
      category: t.category || (isIncome ? 'Salary / Income' : 'General'),
      date: t.date || new Date().toISOString().split('T')[0],
      note: t.note || ''
    };

    // Automatically update monthly Income state if transaction is an income addition
    if (isIncome) {
      this._state.finances.monthlyIncome = amountNum;
    }

    this._state.finances.transactions.unshift(newT);
    this.recalculateScores();
    this._save();
    this._notify();
    return newT;
  },

  deleteTransaction(id) {
    this._state.finances.transactions = this._state.finances.transactions.filter(x => x.id !== id);
    this.recalculateScores();
    this._save();
    this._notify();
  },

  // ─── Health Helpers ──────────────────────────────────────
  logWater(amountMl) {
    this._state.health.waterIntake = Math.max(0, (this._state.health.waterIntake || 0) + amountMl);
    this.recalculateScores();
    this._save();
    this._notify();
  },
  logWorkout(workout) {
    this._state.health.workoutLogs.unshift({
      id: 'w_' + Date.now(),
      date: workout.date || new Date().toISOString().split('T')[0],
      type: workout.type || 'Exercise',
      duration: Number(workout.duration) || 30,
      calories: Number(workout.calories) || 200
    });
    this.recalculateScores();
    this._save();
    this._notify();
  },
  logSleep(sleep) {
    this._state.health.sleepLogs.unshift({
      date: sleep.date || new Date().toISOString().split('T')[0],
      hours: Number(sleep.hours) || 7.5,
      quality: Number(sleep.quality) || 4,
      bedtime: sleep.bedtime || '23:00',
      wakeTime: sleep.wakeTime || '06:30'
    });
    this.recalculateScores();
    this._save();
    this._notify();
  },

  // ─── Backup Export / Import ──────────────────────────────
  exportJSON() {
    const jsonStr = JSON.stringify(this._state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifegps_india_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
  importJSON(jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed && typeof parsed === 'object') {
        Object.assign(this._state, parsed);
        this.recalculateScores();
        this._save();
        this._notify();
        return true;
      }
    } catch (e) {}
    return false;
  },

  generateNotifications() {
    this._state.notifications = [
      { type: 'student', icon: '🇮🇳', title: 'PM Internship Scheme 2026 Open', text: 'Application portal for top 500 Indian companies is live.', time: '10m ago', unread: true },
      { type: 'student', icon: '🏆', title: 'NSP Scholarship Deadline', text: 'Central Sector Scheme application verification ends soon.', time: '1h ago', unread: true },
      { type: 'finance', icon: '💰', title: 'Income & Budget Re-analyzed', text: 'Your monthly savings rate is optimized for Nifty index SIP.', time: '3h ago', unread: false }
    ];
  }
};

Store._load();
Store.recalculateScores();
Store.generateNotifications();
