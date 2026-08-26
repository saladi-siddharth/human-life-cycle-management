/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS STORE — Reactive State Engine, Indian Ecosystem & Financial Analytics
   ═══════════════════════════════════════════════════════════════════ */

const bioChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('bioverse_sync') : null;

const Store = {
  _state: {
    user: { id: 'usr_saladi_siddharth', name: 'Saladi Siddharth', email: 'saladisiddharath@gmail.com' },
    isAuthenticated: true,
    identity: 'student',        // 'student' | 'employee' | 'business'
    onboardingStep: 0,
    onboardingComplete: true,
    profile: {
      name: 'Saladi Siddharth',
      email: 'saladisiddharath@gmail.com',
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
    // ─── Comprehensive All-India Colleges Database (All Tiers & Streams) ──────────
    indianColleges: [
      // === TIER 1 ===
      { id: 'c1', name: 'IIT Bombay (Indian Institute of Technology)', field: 'Engineering & Tech', location: 'Mumbai, Maharashtra', nirfRank: '#1 Engineering (Tier 1)', tuition: '₹2.2 Lakh/yr', avgPlacement: '₹23.5 LPA', exam: 'JEE Advanced', link: 'https://www.iitb.ac.in', applyLink: 'https://www.iitb.ac.in/en/education/admissions' },
      { id: 'c2', name: 'IIT Delhi', field: 'Engineering & Tech', location: 'New Delhi', nirfRank: '#2 Engineering (Tier 1)', tuition: '₹2.2 Lakh/yr', avgPlacement: '₹25.8 LPA', exam: 'JEE Advanced', link: 'https://home.iitd.ac.in', applyLink: 'https://home.iitd.ac.in/admissions.php' },
      { id: 'c3', name: 'IIT Madras', field: 'Engineering & Tech', location: 'Chennai, Tamil Nadu', nirfRank: '#1 Overall (Tier 1)', tuition: '₹2.1 Lakh/yr', avgPlacement: '₹21.4 LPA', exam: 'JEE Advanced', link: 'https://www.iitm.ac.in', applyLink: 'https://www.iitm.ac.in/academics/admissions' },
      { id: 'c4', name: 'IIT Kharagpur', field: 'Engineering & Tech', location: 'Kharagpur, West Bengal', nirfRank: '#5 Engineering (Tier 1)', tuition: '₹2.2 Lakh/yr', avgPlacement: '₹19.5 LPA', exam: 'JEE Advanced', link: 'https://www.iitkgp.ac.in', applyLink: 'https://www.iitkgp.ac.in/admissions' },
      { id: 'c5', name: 'AIIMS New Delhi', field: 'Medicine & Healthcare', location: 'New Delhi', nirfRank: '#1 Medical (Tier 1)', tuition: '₹1,628/yr', avgPlacement: 'Top Govt Hospitals', exam: 'NEET UG', link: 'https://www.aiims.edu', applyLink: 'https://www.aiimsexams.ac.in' },
      { id: 'c6', name: 'PGIMER Chandigarh', field: 'Medicine & Healthcare', location: 'Chandigarh', nirfRank: '#2 Medical (Tier 1)', tuition: '₹2,400/yr', avgPlacement: 'Super-Specialty R&D', exam: 'NEET PG / INI-CET', link: 'https://pgimer.edu.in', applyLink: 'https://pgimer.edu.in' },
      { id: 'c7', name: 'IIM Ahmedabad (Indian Institute of Management)', field: 'Business & Management', location: 'Ahmedabad, Gujarat', nirfRank: '#1 Management (Tier 1)', tuition: '₹25 Lakh Total', avgPlacement: '₹34.3 LPA', exam: 'CAT', link: 'https://www.iima.ac.in', applyLink: 'https://www.iima.ac.in/academics/mba' },
      { id: 'c8', name: 'IIM Bangalore', field: 'Business & Management', location: 'Bengaluru, Karnataka', nirfRank: '#2 Management (Tier 1)', tuition: '₹24.5 Lakh Total', avgPlacement: '₹33.8 LPA', exam: 'CAT', link: 'https://www.iimb.ac.in', applyLink: 'https://www.iimb.ac.in/pgp-admissions' },
      { id: 'c9', name: 'IISc Bangalore (Indian Institute of Science)', field: 'Pure Sciences', location: 'Bengaluru, Karnataka', nirfRank: '#1 University (Tier 1)', tuition: '₹30,000/yr', avgPlacement: 'Global R&D Placements', exam: 'JEE / GATE / KVPY', link: 'https://iisc.ac.in', applyLink: 'https://iisc.ac.in/admissions' },
      { id: 'c10', name: 'NLSIU Bengaluru (National Law School)', field: 'Law', location: 'Bengaluru, Karnataka', nirfRank: '#1 Law (Tier 1)', tuition: '₹3.2 Lakh/yr', avgPlacement: '₹16.0 LPA', exam: 'CLAT', link: 'https://www.nls.ac.in', applyLink: 'https://www.nls.ac.in/admissions' },
      { id: 'c11', name: 'NID Ahmedabad (National Institute of Design)', field: 'Design & Arts', location: 'Ahmedabad, Gujarat', nirfRank: '#1 Design (Tier 1)', tuition: '₹3.5 Lakh/yr', avgPlacement: '₹14.0 LPA', exam: 'NID DAT', link: 'https://www.nid.edu', applyLink: 'https://admissions.nid.edu' },

      // === TIER 2 ===
      { id: 'c12', name: 'NIT Trichy (National Institute of Technology)', field: 'Engineering & Tech', location: 'Tiruchirappalli, Tamil Nadu', nirfRank: '#9 Engineering (Tier 2)', tuition: '₹1.5 Lakh/yr', avgPlacement: '₹15.2 LPA', exam: 'JEE Main', link: 'https://www.nitt.edu', applyLink: 'https://www.nitt.edu/home/academics/admissions' },
      { id: 'c13', name: 'BITS Pilani', field: 'Engineering & Tech', location: 'Pilani, Rajasthan', nirfRank: '#25 Overall (Tier 2)', tuition: '₹5.4 Lakh/yr', avgPlacement: '₹18.5 LPA', exam: 'BITSAT', link: 'https://www.bits-pilani.ac.in', applyLink: 'https://www.bitsadmission.com' },
      { id: 'c14', name: 'DTU Delhi (Delhi Technological University)', field: 'Engineering & Tech', location: 'New Delhi', nirfRank: '#29 Engineering (Tier 2)', tuition: '₹1.9 Lakh/yr', avgPlacement: '₹15.5 LPA', exam: 'JEE Main / JAC Delhi', link: 'http://www.dtu.ac.in', applyLink: 'https://jacdelhi.admissions.nic.in' },
      { id: 'c15', name: 'IIIT Hyderabad', field: 'Engineering & Tech', location: 'Hyderabad, Telangana', nirfRank: '#55 Engineering (Tier 2)', tuition: '₹3.6 Lakh/yr', avgPlacement: '₹30.0 LPA', exam: 'JEE Main / UGEE', link: 'https://www.iiit.ac.in', applyLink: 'https://ugadmissions.iiit.ac.in' },
      { id: 'c16', name: 'KMC Manipal (Kasturba Medical College)', field: 'Medicine & Healthcare', location: 'Manipal, Karnataka', nirfRank: '#9 Medical (Tier 2)', tuition: '₹17.8 Lakh/yr', avgPlacement: '₹12.0 LPA', exam: 'NEET UG', link: 'https://manipal.edu/kmc-manipal.html', applyLink: 'https://manipal.edu/mu/admission.html' },
      { id: 'c17', name: 'Symbiosis SIBM Pune', field: 'Business & Management', location: 'Pune, Maharashtra', nirfRank: '#17 Management (Tier 2)', tuition: '₹11.5 Lakh/yr', avgPlacement: '₹23.0 LPA', exam: 'SNAP', link: 'https://www.sibm.edu', applyLink: 'https://www.sibm.edu/welcome/mba' },
      { id: 'c18', name: 'NALSAR University of Law', field: 'Law', location: 'Hyderabad, Telangana', nirfRank: '#3 Law (Tier 2)', tuition: '₹2.8 Lakh/yr', avgPlacement: '₹15.0 LPA', exam: 'CLAT', link: 'https://www.nalsar.ac.in', applyLink: 'https://www.nalsar.ac.in/admissions' },
      { id: 'c19', name: 'IISER Pune', field: 'Pure Sciences', location: 'Pune, Maharashtra', nirfRank: '#34 University (Tier 2)', tuition: '₹45,000/yr', avgPlacement: 'Global PhD Fellowships', exam: 'IAT / JEE Advanced', link: 'https://www.iiserpune.ac.in', applyLink: 'https://www.iiseradmission.in' },
      { id: 'c20', name: 'NIFT New Delhi', field: 'Design & Arts', location: 'New Delhi', nirfRank: '#1 Fashion (Tier 2)', tuition: '₹3.2 Lakh/yr', avgPlacement: '₹8.5 LPA', exam: 'NIFT Entrance', link: 'https://nift.ac.in', applyLink: 'https://nift.ac.in/admission' },

      // === TIER 3 ===
      { id: 'c21', name: 'PSG College of Technology', field: 'Engineering & Tech', location: 'Coimbatore, Tamil Nadu', nirfRank: '#63 Engineering (Tier 3)', tuition: '₹85,000/yr', avgPlacement: '₹6.8 LPA', exam: 'TNEA / JEE Main', link: 'https://www.psgtech.edu', applyLink: 'https://www.psgtech.edu/admissions.php' },
      { id: 'c22', name: 'KIIT University', field: 'Engineering & Tech', location: 'Bhubaneswar, Odisha', nirfRank: '#39 Engineering (Tier 3)', tuition: '₹3.5 Lakh/yr', avgPlacement: '₹6.5 LPA', exam: 'KIITEE', link: 'https://kiit.ac.in', applyLink: 'https://kiit.ac.in/admission' },
      { id: 'c23', name: 'VIT Vellore', field: 'Engineering & Tech', location: 'Vellore, Tamil Nadu', nirfRank: '#11 Engineering (Tier 3)', tuition: '₹1.98 Lakh/yr', avgPlacement: '₹9.2 LPA', exam: 'VITEEE', link: 'https://vit.ac.in', applyLink: 'https://viteee.vit.ac.in' },
      { id: 'c24', name: 'SRM Institute of Science & Tech', field: 'Engineering & Tech', location: 'Chennai, Tamil Nadu', nirfRank: '#28 Engineering (Tier 3)', tuition: '₹2.5 Lakh/yr', avgPlacement: '₹7.5 LPA', exam: 'SRMJEEE', link: 'https://www.srmist.edu.in', applyLink: 'https://applications.srmist.edu.in' },
      { id: 'c25', name: 'Christ University', field: 'Business & Management', location: 'Bengaluru, Karnataka', nirfRank: '#60 Management (Tier 3)', tuition: '₹3.2 Lakh/yr', avgPlacement: '₹7.5 LPA', exam: 'CUET', link: 'https://christuniversity.in', applyLink: 'https://christuniversity.in/admissions' },
      { id: 'c26', name: 'DY Patil Medical College', field: 'Medicine & Healthcare', location: 'Navi Mumbai, Maharashtra', nirfRank: '#35 Medical (Tier 3)', tuition: '₹22.0 Lakh/yr', avgPlacement: '₹9.0 LPA', exam: 'NEET UG', link: 'https://dypatil.edu', applyLink: 'https://dypatil.edu/admissions' },
      { id: 'c27', name: 'St. Xavier\'s College', field: 'Pure Sciences', location: 'Mumbai, Maharashtra', nirfRank: '#87 Overall (Tier 3)', tuition: '₹18,000/yr', avgPlacement: '₹6.0 LPA', exam: 'Merit List / XET', link: 'https://xaviers.ac', applyLink: 'https://xaviers.ac/admissions' },

      // === TIER 4 ===
      { id: 'c28', name: 'Lovely Professional University (LPU)', field: 'Engineering & Tech', location: 'Jalandhar, Punjab', nirfRank: '#50 Engineering (Tier 4)', tuition: '₹2.4 Lakh/yr', avgPlacement: '₹5.5 LPA', exam: 'LPUNEST', link: 'https://www.lpu.in', applyLink: 'https://www.lpu.in/admission' },
      { id: 'c29', name: 'Amity University Noida', field: 'Engineering & Tech', location: 'Noida, Uttar Pradesh', nirfRank: '#52 Engineering (Tier 4)', tuition: '₹3.1 Lakh/yr', avgPlacement: '₹5.2 LPA', exam: 'Amity JEE', link: 'https://amity.edu', applyLink: 'https://amity.edu/admission-procedure.aspx' },
      { id: 'c30', name: 'Chitkara University', field: 'Engineering & Tech', location: 'Rajpura, Punjab', nirfRank: '#80 Engineering (Tier 4)', tuition: '₹1.8 Lakh/yr', avgPlacement: '₹5.0 LPA', exam: 'JEE Main', link: 'https://www.chitkara.edu.in', applyLink: 'https://www.chitkara.edu.in/admissions' },
      { id: 'c31', name: 'Chandigarh University', field: 'Engineering & Tech', location: 'Mohali, Punjab', nirfRank: '#45 Engineering (Tier 4)', tuition: '₹1.6 Lakh/yr', avgPlacement: '₹6.0 LPA', exam: 'CUCET', link: 'https://www.cuchd.in', applyLink: 'https://cucet.cuchd.in' }
    ],

    // ─── Real-Time Indian Scholarships (Govt & Private CSR) ───
    indianScholarships: [
      { id: 'sch1', name: 'NSP Central Sector Scheme for College Students', type: 'Government', provider: 'Ministry of Education, Govt of India', amount: '₹20,000 / year', deadline: '31 October 2026', eligibility: 'Class 12th >80th percentile, Income <₹4.5 LPA', applyLink: 'https://scholarships.gov.in' },
      { id: 'sch2', name: 'PMSS (Prime Minister\'s Scholarship Scheme)', type: 'Government', provider: 'DESW, Ministry of Defence', amount: '₹36,000 / year', deadline: '30 November 2026', eligibility: 'Wards of Ex-Servicemen & Coast Guard', applyLink: 'https://ksb.gov.in/entry-pmss.htm' },
      { id: 'sch3', name: 'AICTE Pragati Scholarship for Girls', type: 'Government', provider: 'AICTE, Govt of India', amount: '₹50,000 / year', deadline: '15 November 2026', eligibility: 'Girl students admitted to AICTE Diploma/Degree', applyLink: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragathi' },
      { id: 'sch4', name: 'Tata Building India & Education Trust Scholarship', type: 'Private CSR', provider: 'Tata Trusts', amount: 'Up to ₹1,00,000 / year', deadline: '15 September 2026', eligibility: 'Merit-cum-means for UG Tech/Med students', applyLink: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants' },
      { id: 'sch5', name: 'Reliance Foundation Undergraduate Scholarship', type: 'Private CSR', provider: 'Reliance Foundation', amount: 'Up to ₹2,00,000 Total', deadline: '06 October 2026', eligibility: 'Undergraduate students, Household Income <₹15 LPA', applyLink: 'https://www.scholarships.reliancefoundation.org' },
      { id: 'sch6', name: 'HDFC Bank Parivartan ECSS Scholarship', type: 'Private CSR', provider: 'HDFC Bank Parivartan', amount: 'Up to ₹75,000 / year', deadline: '30 October 2026', eligibility: 'Class 1 to College students facing financial crisis', applyLink: 'https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme' },
      { id: 'sch7', name: 'Aditya Birla Capital Scholarship Scheme', type: 'Private CSR', provider: 'Aditya Birla Foundation', amount: 'Up to ₹60,000 / year', deadline: '15 October 2026', eligibility: 'School & College students facing financial crisis', applyLink: 'https://www.buddy4study.com/page/aditya-birla-capital-scholarship' },
      { id: 'sch8', name: 'DST INSPIRE Scholarship (SHE)', type: 'Government', provider: 'Dept of Science & Technology, Govt of India', amount: '₹80,000 / year', deadline: '31 December 2026', eligibility: 'Top 1% in Class 12th pursuing Basic & Natural Sciences', applyLink: 'https://online-inspire.gov.in' },
      { id: 'sch9', name: 'SBI Asha Scholarship Scheme', type: 'Private CSR', provider: 'SBI Foundation', amount: 'Up to ₹50,000 / year', deadline: '25 November 2026', eligibility: 'Meritorious students from low-income families', applyLink: 'https://www.sbifoundation.in' },
      { id: 'sch10', name: 'Kotak Kanya Scholarship', type: 'Private CSR', provider: 'Kotak Education Foundation', amount: 'Up to ₹1,50,000 / year', deadline: '30 September 2026', eligibility: 'Meritorious girl students pursuing professional UG degrees', applyLink: 'https://kotakeducation.org/kotak-kanya-scholarship/' }
    ],

    // ─── Real-Time Student Internships (Govt & Companies) ───
    indianInternships: [
      { id: 'int1', company: 'NITI Aayog, Govt of India', title: 'NITI Policy & Digital Transformation Intern', type: 'Government', location: 'New Delhi / Remote', stipend: 'Certificate + Policy Exposure', duration: '6 Weeks to 6 Months', applyLink: 'https://www.niti.gov.in/internship' },
      { id: 'int2', company: 'PM Internship Scheme 2026', title: 'National Industry Apprentice & Intern', type: 'Government', location: 'Pan-India Top 500 Companies', stipend: '₹5,000 / month + ₹6,000 Grant', duration: '12 Months', applyLink: 'https://pminternship.mca.gov.in' },
      { id: 'int3', company: 'ISRO (Indian Space Research Organisation)', title: 'Space Technology & Robotics Student Intern', type: 'Government', location: 'Bengaluru / Sriharikota', stipend: 'Govt Research Stipend', duration: '2 to 6 Months', applyLink: 'https://www.isro.gov.in/Internship.html' },
      { id: 'int4', company: 'Reserve Bank of India (RBI)', title: 'RBI Summer Internship Program', type: 'Government', location: 'Mumbai / Regional Centers', stipend: '₹20,000 / month', duration: '3 Months', applyLink: 'https://opportunities.rbi.org.in' },
      { id: 'int5', company: 'Google India', title: 'Software Engineering Intern (Summer 2026)', type: 'Corporate Tech', location: 'Bengaluru / Hyderabad', stipend: '₹1,10,000 / month', duration: '10 to 12 Weeks', applyLink: 'https://buildyourfuture.withgoogle.com/internships' },
      { id: 'int6', company: 'Microsoft India', title: 'Research & Software Development Intern', type: 'Corporate Tech', location: 'Bengaluru / Hyderabad / Noida', stipend: '₹1,00,000 / month', duration: '8 to 12 Weeks', applyLink: 'https://careers.microsoft.com/students/us/en/indiascholarships' },
      { id: 'int7', company: 'Amazon India', title: 'Software Development Engineer Intern', type: 'Corporate Tech', location: 'Bengaluru / Hyderabad', stipend: '₹95,000 / month', duration: '6 Months', applyLink: 'https://www.amazon.jobs/en/teams/internships-india' },
      { id: 'int8', company: 'Razorpay', title: 'Product & Engineering Summer Intern', type: 'Fintech Unicorn', location: 'Bengaluru, Karnataka', stipend: '₹60,000 / month', duration: '3 Months', applyLink: 'https://razorpay.com/jobs' },
      { id: 'int9', company: 'Flipkart', title: 'Runway SDE Female Intern Program', type: 'Corporate Tech', location: 'Bengaluru, Karnataka', stipend: '₹80,000 / month', duration: '2 Months', applyLink: 'https://www.flipkartcareers.com' },
      { id: 'int10', company: 'Zerodha', title: 'Fintech Systems & UI/UX Intern', type: 'Fintech Unicorn', location: 'Bengaluru / Remote', stipend: '₹45,000 / month', duration: '3 to 6 Months', applyLink: 'https://zerodha.com/careers' }
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
      moodLogs: [
        { id: 'm1', date: '2026-07-22', mood: 'Focused', score: 88, notes: 'High mental clarity after morning workout and hydration.' },
        { id: 'm2', date: '2026-07-21', mood: 'Energized', score: 92, notes: 'Completed Google interview prep milestone.' }
      ]
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

    // ─── Daily Habit Streaks ───────────────────────────────────
    habits: [
      { id: 'h1', title: 'Solve 1 LeetCode / System Design Challenge', category: 'career', streak: 14, completedToday: true },
      { id: 'h2', title: 'Drink 2.5L Water & Electrolytes', category: 'health', streak: 8, completedToday: false },
      { id: 'h3', title: 'Read 20 Mins Tech & Finance Literature', category: 'growth', streak: 21, completedToday: true },
      { id: 'h4', title: 'Evening 30-min Fitness / Cardio Session', category: 'health', streak: 5, completedToday: false },
      { id: 'h5', title: 'Audit 50/30/20 Budget & Expense Ledger', category: 'finance', streak: 12, completedToday: true }
    ],

    // ─── National Competitive Exams & Certifications ──────────
    exams: [
      { id: 'ex1', name: 'GATE CSE 2027 (IISc/IIT M.Tech & PSU)', targetDate: '2027-02-06', syllabusProgress: 68, targetScore: 'AIR < 100' },
      { id: 'ex2', name: 'CAT 2026 (IIM Ahmedabad & Bangalore)', targetDate: '2026-11-29', syllabusProgress: 52, targetScore: '99.5+ Percentile' },
      { id: 'ex3', name: 'AWS Certified Solutions Architect', targetDate: '2026-09-15', syllabusProgress: 85, targetScore: '850 / 1000' }
    ],

    // ─── Tax Profile & Exemptions (Indian IT Act) ──────────────
    taxProfile: {
      annualIncome: 1400000,
      deductions80C: 150000,
      healthInsurance80D: 25000,
      nps80CCD: 50000,
      standardDeduction: 75000,
      hraExemption: 120000
    },

    // ─── Technical & Behavioral Interview Flashcards ──────────
    interviewQuestions: [
      { id: 'iq1', category: 'System Design', title: 'Design a Real-Time Distributed Rate Limiter', difficulty: 'Hard', company: 'Google / Stripe', answer: 'Use Token Bucket or Leaky Bucket with Redis clusters. Implement sliding window logs with Lua scripts for atomicity. Handle multi-datacenter clock drift with NTP synchronizers.' },
      { id: 'iq2', category: 'Data Structures', title: 'LRU Cache Implementation with O(1) Operations', difficulty: 'Medium', company: 'Amazon / Microsoft', answer: 'Use a Doubly Linked List paired with a Hash Map. Map stores Key -> Node reference. Move accessed node to head; evict from tail upon capacity breach.' },
      { id: 'iq3', category: 'System Design', title: 'Design URL Shortener (TinyURL) at 100M Daily Queries', difficulty: 'Medium', company: 'Meta / Uber', answer: 'Base62 encoding of auto-incrementing IDs or MD5 hash prefixes. Implement Cassandra/DynamoDB for high write throughput with Redis caching for top 20% hot links.' },
      { id: 'iq4', category: 'Behavioral', title: 'Describe a Time You Resolved a Critical Production Incident', difficulty: 'Senior', company: 'All Tier 1 Tech', answer: 'Use STAR method: Situation (database deadlock during flash sale), Task (restore 99.99% availability), Action (triaged slow queries, introduced read replicas & circuit breakers), Result (zero data loss, latency reduced by 70%).' }
    ],

    soundEnabled: true,
    speechVoiceEnabled: false,
    apiSettings: { geminiKey: '' },
    notifications: [],
    theme: 'dark',
    sidebarOpen: false,
    _updatedAt: Date.now()
  },
  _listeners: [],
  _channel: typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('bioverse_state_sync') : null,

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
    this._state._updatedAt = Date.now();
    this.recalculateScores();
    this._save();
    this._notify();
    this._broadcast({ type: 'STATE_KEY_UPDATE', key, value, timestamp: this._state._updatedAt });
  },

  update(partial) {
    Object.assign(this._state, partial);
    this._state._updatedAt = Date.now();
    this.recalculateScores();
    this._save();
    this._notify();
    this._broadcast({ type: 'STATE_PARTIAL_UPDATE', partial, timestamp: this._state._updatedAt });
  },

  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  },

  _notify() { this._listeners.forEach(fn => fn(this._state)); },
  _save() {
    this._state._updatedAt = Date.now();
    try { localStorage.setItem('bioverse_state', JSON.stringify(this._state)); } catch (e) {}
    
    // Broadcast multi-tab real-time state update
    if (typeof bioChannel !== 'undefined' && bioChannel) {
      bioChannel.postMessage({ type: 'STATE_UPDATED', state: this._state });
    }
    
    this.syncWithBackend();
  },
  _load() {
    try {
      const saved = localStorage.getItem('bioverse_state');
      if (saved) {
        const data = JSON.parse(saved);
        Object.assign(this._state, data);
      }
    } catch (e) {}
  },
  _broadcast(payload) {
    try {
      if (this._channel) {
        this._channel.postMessage({ ...payload, senderId: this._instanceId });
      }
      if (typeof bioChannel !== 'undefined' && bioChannel) {
        bioChannel.postMessage({ type: 'STATE_UPDATED', state: this._state });
      }
    } catch (e) {}
  },
  _initSync() {
    this._instanceId = 'tab_' + Math.random().toString(36).substring(2, 9);
    
    // Listen on primary bioChannel
    if (typeof bioChannel !== 'undefined' && bioChannel) {
      bioChannel.onmessage = (event) => {
        if (event.data?.type === 'STATE_UPDATED' && event.data.state) {
          this._state = event.data.state;
          try { localStorage.setItem('bioverse_state', JSON.stringify(this._state)); } catch (e) {}
          this._notify();
          if (typeof Router !== 'undefined' && Router.render && Router.currentRoute) {
            Router.render();
          }
        }
      };
    }

    if (this._channel) {
      this._channel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderId === this._instanceId) return;

        if (data.type === 'STATE_KEY_UPDATE' && data.key) {
          const keys = data.key.split('.');
          let obj = this._state;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) obj[keys[i]] = {};
            obj = obj[keys[i]];
          }
          obj[keys[keys.length - 1]] = data.value;
          this._state._updatedAt = data.timestamp || Date.now();
          this.recalculateScores();
          try { localStorage.setItem('bioverse_state', JSON.stringify(this._state)); } catch (e) {}
          this._notify();
          if (typeof Router !== 'undefined' && Router.render && Router.currentRoute) {
            Router.render();
          }
        } else if (data.type === 'STATE_PARTIAL_UPDATE' && data.partial) {
          Object.assign(this._state, data.partial);
          this._state._updatedAt = data.timestamp || Date.now();
          this.recalculateScores();
          try { localStorage.setItem('bioverse_state', JSON.stringify(this._state)); } catch (e) {}
          this._notify();
          if (typeof Router !== 'undefined' && Router.render && Router.currentRoute) {
            Router.render();
          }
        }
      };
    }
  },
  async syncWithBackend() {
    try {
      fetch('/api/state/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: this._state })
      }).then(res => res.json()).catch(() => {});
    } catch (e) {}
  },
  async fetchFromBackend() {
    try {
      const res = await fetch('/api/state/get');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.state) {
          Object.assign(this._state, data.state);
          this.recalculateScores();
          this._notify();
        }
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
      id: 's_' + Date.now(),
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
  deleteWorkoutLog(id) {
    if (this._state.health && this._state.health.workoutLogs) {
      this._state.health.workoutLogs = this._state.health.workoutLogs.filter(w => w.id !== id);
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },
  deleteSleepLog(id) {
    if (this._state.health && this._state.health.sleepLogs) {
      this._state.health.sleepLogs = this._state.health.sleepLogs.filter(s => s.id !== id);
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  // ─── Backup Export / Import ──────────────────────────────
  exportJSON() {
    const jsonStr = JSON.stringify(this._state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bioverse_india_backup_${new Date().toISOString().split('T')[0]}.json`;
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
  },

  addNotification(n) {
    if (!this._state.notifications) this._state.notifications = [];
    this._state.notifications.unshift({
      type: n.type || 'general',
      icon: n.icon || '🔔',
      title: n.title,
      text: n.text,
      time: n.time || 'Just now',
      unread: true
    });
    this._save();
    this._notify();
  },

  // ─── Auth State Management ────────────────────────────────
  isLoggedIn() {
    return Boolean(this._state.user && this._state.isAuthenticated);
  },

  isOnboarded() {
    return Boolean(this._state.onboardingComplete);
  },

  hasSeenTour() {
    return Boolean(this._state.hasSeenTour);
  },

  markTourCompleted() {
    this._state.hasSeenTour = true;
    this._state.isNewUser = false;
    this._save();
    this._notify();
  },

  async login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        this._state.user = data.user;
        this._state.isAuthenticated = true;
        this._state.profile.name = data.user.name;
        this._state.profile.email = data.user.email;
        this._state.onboardingComplete = true;
        this._save();
        this._notify();

        // 🔔 Dispatch Security Login Email Notification
        this.notifyLoginSuccess(data.user.email, data.user.name);

        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (e) {
      console.warn('Login request error:', e.message);
      return { success: false, error: 'Connection error during login. Please try again.' };
    }
  },

  async notifyLoginSuccess(email, name) {
    try {
      fetch('/api/auth/login-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      }).catch(() => {});
    } catch (e) {}
  },

  async sendEmailNotification(subject, htmlBody, recipient = null) {
    try {
      const email = recipient || this._state.profile.email || this._state.user?.email || 'saladisiddharth@gmail.com';
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email, subject, body: htmlBody })
      }).catch(() => {});
    } catch (e) {}
  },

  async sendForgotPasswordOtp(email) {
    try {
      const res = await fetch('/api/auth/forgot-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async resetPassword(email, otp, newPassword) {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async loginWithGoogle(customGoogleProfile = null) {
    const defaultProfile = {
      name: 'Saladi Siddharth',
      email: 'saladisiddharath@gmail.com',
      googleId: 'google_oauth_' + Date.now(),
      picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
    };
    const profile = customGoogleProfile || defaultProfile;
    const cleanEmail = (profile.email || 'saladisiddharath@gmail.com').toLowerCase();
    const formattedName = profile.name || cleanEmail.split('@')[0];

    this._state.user = {
      id: profile.googleId || 'usr_' + Date.now(),
      email: cleanEmail,
      name: formattedName,
      picture: profile.picture || ''
    };
    this._state.isAuthenticated = true;
    this._state.profile.name = formattedName;
    this._state.profile.email = cleanEmail;
    this._state.profile.avatar = profile.picture || '';
    this._save();
    this._notify();

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formattedName,
          email: cleanEmail,
          googleId: profile.googleId,
          picture: profile.picture,
          identity: this._state.identity || 'student'
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        this._state.user = data.user;
        if (data.user.identity) this._state.identity = data.user.identity;
      }
      if (data.isNewUser) {
        if (typeof EmailService !== 'undefined') {
          EmailService.sendWelcomeEmail(formattedName, cleanEmail, true);
        }
      }
    } catch (e) {
      console.warn('Google Auth backend sync notice:', e.message);
    }

    this.notifyLoginSuccess(cleanEmail, formattedName);
    this._save();
    this._notify();
    return { success: true, user: this._state.user };
  },

  async sendRegistrationOtp(email, name = '') {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async verifyRegistrationOtp(email, otp, name, password, identity = 'student', phone = '') {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, name, password, identity, phone })
      });
      const data = await res.json();
      if (data.success && data.user) {
        this._state.user = data.user;
        this._state.isAuthenticated = true;
        this._state.identity = data.user.identity || identity || 'student';
        this._state.profile.name = data.user.name;
        this._state.profile.email = data.user.email;
        this._state.profile.phone = phone;
        this._state.isNewUser = true;
        this._state.hasSeenTour = false; // Tour runs for first-time users
        this._state.onboardingComplete = true;
        this._save();
        this._notify();

        this.notifyLoginSuccess(data.user.email, data.user.name);

        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Invalid OTP code' };
      }
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async register(name, email, password, initialIdentity = 'student', phone = '') {
    const formattedName = name || (email ? email.split('@')[0] : 'User');
    this._state.user = { email, name: formattedName, phone };
    this._state.isAuthenticated = true;
    this._state.identity = initialIdentity || 'student';
    this._state.profile.name = formattedName;
    this._state.profile.email = email;
    this._state.profile.phone = phone;
    this._state.onboardingComplete = true;
    this._state.isNewUser = true;
    this._save();
    this._notify();

    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formattedName, email, password, identity: initialIdentity, phone })
      });
    } catch (e) {
      console.warn('TiDB Register Sync notice:', e.message);
    }
    return { success: true, user: this._state.user };
  },

  completeOnboarding(customData = {}) {
    const identity = this._state.identity || 'student';
    const name = this._state.profile.name || 'User';

    // Mark as completed for one time only
    this._state.onboardingComplete = true;

    // Apply any customized profile inputs
    if (customData && typeof customData === 'object') {
      Object.assign(this._state.profile, customData);
    }

    // Synthesize personalized tasks based on user identity
    if (identity === 'student') {
      this._state.tasks = [
        { id: 't-s1', title: 'Explore NIRF Tier-1 Indian Colleges & Admission Cutoffs', domain: 'student', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-30' },
        { id: 't-s2', title: 'Submit National Scholarship Portal (NSP) Application', domain: 'student', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-09-15' },
        { id: 't-s3', title: 'Apply for PM Internship Scheme / NITI Aayog Policy Track', domain: 'career', quadrant: 'q2', priority: 'high', completed: false, dueDate: '2026-09-01' },
        { id: 't-s4', title: 'Set up ₹1,000/mo Student Micro-SIP in Nifty 50 Index Fund', domain: 'finance', quadrant: 'q2', priority: 'medium', completed: false, dueDate: '2026-08-25' },
        { id: 't-s5', title: 'Target 2500ml Daily Hydration & 7.5h Circadian Sleep', domain: 'health', quadrant: 'q2', priority: 'medium', completed: false, dueDate: '2026-08-22' }
      ];
      this._state.lifeGoals = [
        { id: 'lg-s1', category: 'Growth', title: 'Secure SDE Offer from Top Tier-1 Tech Company in India', targetYear: '2026', completed: false, progress: 50 },
        { id: 'lg-s2', category: 'Purpose', title: 'Complete Govt / AICTE Research Fellowship', targetYear: '2027', completed: false, progress: 20 },
        { id: 'lg-s3', category: 'Adventure', title: 'Himalayan Solo Expedition & Trek', targetYear: '2027', completed: false, progress: 10 }
      ];
    } else if (identity === 'employee') {
      this._state.tasks = [
        { id: 't-e1', title: 'Benchmark CTC against Indian IT Tier-1 & Startup Salary Levels', domain: 'career', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-30' },
        { id: 't-e2', title: 'Optimize Section 80C (ELSS, EPF) & Section 80D Tax Shields', domain: 'finance', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-09-10' },
        { id: 't-e3', title: 'Run 50-Minute Deep Work Sprint on High-Impact Deliverable', domain: 'work', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-23' },
        { id: 't-e4', title: 'Automate ₹25,000 Monthly SIP Compounding Routine', domain: 'finance', quadrant: 'q2', priority: 'high', completed: false, dueDate: '2026-08-28' },
        { id: 't-e5', title: 'Evening Posture & Mobility Protocol for Screen Workers', domain: 'health', quadrant: 'q2', priority: 'medium', completed: false, dueDate: '2026-08-22' }
      ];
      this._state.lifeGoals = [
        { id: 'lg-e1', category: 'Growth', title: 'Attain Staff SDE / Principal Role with ₹35+ LPA Package', targetYear: '2026', completed: false, progress: 40 },
        { id: 'lg-e2', category: 'Finance', title: 'Build ₹50 Lakh Liquid Investment Portfolio', targetYear: '2028', completed: false, progress: 25 },
        { id: 'lg-e3', category: 'Relationships', title: 'Fund Family Real Estate & Annual Retreat', targetYear: '2027', completed: false, progress: 35 }
      ];
    } else {
      this._state.tasks = [
        { id: 't-b1', title: 'Apply for Startup India DPIIT Recognition & Tax Holidays', domain: 'business', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-30' },
        { id: 't-b2', title: 'Review Institutional Pitch Deck & Cap Table Dilution Model', domain: 'business', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-09-05' },
        { id: 't-b3', title: 'Analyze Monthly Burn Rate, Unit Economics & Runway', domain: 'finance', quadrant: 'q1', priority: 'high', completed: false, dueDate: '2026-08-28' },
        { id: 't-b4', title: 'Set Weekly OKRs & Sprint Milestones for Engineering Team', domain: 'work', quadrant: 'q2', priority: 'high', completed: false, dueDate: '2026-08-25' },
        { id: 't-b5', title: 'Executive Stress Resilience & HRV Recovery Routine', domain: 'health', quadrant: 'q2', priority: 'medium', completed: false, dueDate: '2026-08-22' }
      ];
      this._state.lifeGoals = [
        { id: 'lg-b1', category: 'Growth', title: 'Scale Annual Recurring Revenue (ARR) to ₹1.5 Crore+', targetYear: '2026', completed: false, progress: 35 },
        { id: 'lg-b2', category: 'Finance', title: 'Close $500k Institutional Pre-Series A Round', targetYear: '2027', completed: false, progress: 20 },
        { id: 'lg-b3', category: 'Purpose', title: 'Create 25+ High-Impact Tech Jobs in India', targetYear: '2028', completed: false, progress: 15 }
      ];
    }

    // Add tailored welcome notification
    this.addNotification({
      type: identity,
      icon: '🎉',
      title: `Welcome to BioVerse, ${name}!`,
      text: `Your ${identity.toUpperCase()} intelligence dashboard, customized roadmaps, and AI recommendations are ready.`
    });

    this.recalculateScores();
    this._save();
    this._notify();
  },

  logout() {
    this._state.user = null;
    this._state.isAuthenticated = false;
    this._save();
    this._notify();
  },


  getInitials() {
    const name = this._state.profile?.name || this._state.user?.name || 'RS';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  },

  // ─── Career Job Applications ──────────────────────────────
  addJobApplication(job) {
    const newJ = {
      id: 'j_' + Date.now(),
      company: job.company || 'Company',
      role: job.role || 'Role',
      stage: job.stage || 'Applied',
      salary: job.salary || 'Competitive',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: job.notes || 'Tracked via BioVerse'
    };
    if (!this._state.career.jobApplications) {
      this._state.career.jobApplications = [];
    }
    this._state.career.jobApplications.unshift(newJ);
    this.recalculateScores();
    this._save();
    this._notify();
    return newJ;
  },

  updateJobStage(id, stage) {
    if (this._state.career && this._state.career.jobApplications) {
      const j = this._state.career.jobApplications.find(x => x.id === id);
      if (j) {
        j.stage = stage;
        this.recalculateScores();
        this._save();
        this._notify();
      }
    }
  },

  deleteJobApplication(id) {
    if (this._state.career && this._state.career.jobApplications) {
      this._state.career.jobApplications = this._state.career.jobApplications.filter(j => j.id !== id);
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  // ─── Indian Colleges Portal Management ─────────────────────
  addCollege(c) {
    const newC = {
      id: 'c_' + Date.now(),
      name: c.name,
      field: c.field || 'Engineering & Tech',
      location: c.location || 'India',
      nirfRank: c.nirfRank || 'Ranked Institute',
      tuition: c.tuition || 'Competitive',
      avgPlacement: c.avgPlacement || '₹8.0 LPA',
      exam: c.exam || 'Entrance Exam',
      link: c.link || 'https://www.education.gov.in',
      applyLink: c.applyLink || 'https://www.education.gov.in'
    };
    if (!this._state.indianColleges) this._state.indianColleges = [];
    this._state.indianColleges.unshift(newC);
    this._save();
    this._notify();
    return newC;
  },

  deleteCollege(id) {
    if (this._state.indianColleges) {
      this._state.indianColleges = this._state.indianColleges.filter(x => x.id !== id);
      this._save();
      this._notify();
    }
  },

  // ─── Indian Scholarships Portal Management ──────────────────
  addScholarship(s) {
    const newS = {
      id: 'sch_' + Date.now(),
      name: s.name,
      type: s.type || 'Government',
      provider: s.provider || 'Govt / CSR Trust',
      amount: s.amount || '₹25,000 / year',
      deadline: s.deadline || 'Ongoing 2026',
      eligibility: s.eligibility || 'Merit-cum-means eligible',
      applyLink: s.applyLink || 'https://scholarships.gov.in'
    };
    if (!this._state.indianScholarships) this._state.indianScholarships = [];
    this._state.indianScholarships.unshift(newS);
    this._save();
    this._notify();
    return newS;
  },

  deleteScholarship(id) {
    if (this._state.indianScholarships) {
      this._state.indianScholarships = this._state.indianScholarships.filter(x => x.id !== id);
      this._save();
      this._notify();
    }
  },

  // ─── Indian Internships Portal Management ───────────────────
  addInternship(i) {
    const newI = {
      id: 'int_' + Date.now(),
      company: i.company || 'Company / Ministry',
      title: i.title,
      type: i.type || 'Corporate Tech',
      location: i.location || 'Remote / Pan-India',
      stipend: i.stipend || '₹25,000 / month',
      duration: i.duration || '3 Months',
      applyLink: i.applyLink || 'https://internshala.com'
    };
    if (!this._state.indianInternships) this._state.indianInternships = [];
    this._state.indianInternships.unshift(newI);
    this._save();
    this._notify();
    return newI;
  },

  deleteInternship(id) {
    if (this._state.indianInternships) {
      this._state.indianInternships = this._state.indianInternships.filter(x => x.id !== id);
      this._save();
      this._notify();
    }
  },

  // ─── Habit Streaks Management ─────────────────────────────
  toggleHabit(id) {
    if (!this._state.habits) this._state.habits = [];
    const h = this._state.habits.find(x => x.id === id);
    if (h) {
      h.completedToday = !h.completedToday;
      if (h.completedToday) {
        h.streak = (h.streak || 0) + 1;
        if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('sloth');
      } else {
        h.streak = Math.max(0, (h.streak || 1) - 1);
      }
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  addHabit(habit) {
    if (!this._state.habits) this._state.habits = [];
    const newH = {
      id: 'h_' + Date.now(),
      title: habit.title,
      category: habit.category || 'growth',
      streak: 1,
      completedToday: true
    };
    this._state.habits.unshift(newH);
    this.recalculateScores();
    this._save();
    this._notify();
    return newH;
  },

  deleteHabit(id) {
    if (this._state.habits) {
      this._state.habits = this._state.habits.filter(x => x.id !== id);
      this.recalculateScores();
      this._save();
      this._notify();
    }
  },

  // ─── Competitive Exams & Milestones ───────────────────────
  addExam(exam) {
    if (!this._state.exams) this._state.exams = [];
    const newE = {
      id: 'ex_' + Date.now(),
      name: exam.name,
      targetDate: exam.targetDate || '2027-02-01',
      syllabusProgress: Number(exam.syllabusProgress) || 20,
      targetScore: exam.targetScore || 'Target Milestone'
    };
    this._state.exams.unshift(newE);
    this._save();
    this._notify();
    return newE;
  },

  updateExamProgress(id, progress) {
    if (this._state.exams) {
      const e = this._state.exams.find(x => x.id === id);
      if (e) {
        e.syllabusProgress = Math.max(0, Math.min(100, Number(progress)));
        this._save();
        this._notify();
      }
    }
  },

  deleteExam(id) {
    if (this._state.exams) {
      this._state.exams = this._state.exams.filter(x => x.id !== id);
      this._save();
      this._notify();
    }
  },

  // ─── Financial Wealth & SIP Compounding Math Engine ───────
  calculateSIP(monthlyInvestment, annualRatePercent, years) {
    const P = Number(monthlyInvestment) || 10000;
    const i = (Number(annualRatePercent) || 13.5) / 100 / 12;
    const n = (Number(years) || 10) * 12;
    
    // Future Value = P * [((1 + i)^n - 1) / i] * (1 + i)
    const futureValue = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const totalInvested = Math.round(P * n);
    const wealthCreated = futureValue - totalInvested;

    // Generate yearly data series for chart
    const labels = [];
    const investedSeries = [];
    const totalSeries = [];

    for (let yr = 1; yr <= (Number(years) || 10); yr++) {
      const months = yr * 12;
      const fv = Math.round(P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i));
      const inv = P * months;
      labels.push(`Yr ${yr}`);
      investedSeries.push(inv);
      totalSeries.push(fv);
    }

    return { futureValue, totalInvested, wealthCreated, labels, investedSeries, totalSeries };
  },

  // ─── Indian Income Tax Calculator (Old vs New Regime) ─────
  calculateTax(annualIncome = 1400000, profile = null) {
    const income = Number(annualIncome) || 1400000;
    const p = profile || this._state.taxProfile || {};

    // 1. NEW TAX REGIME (FY 2024-25 / 2025-26 Slabs)
    // Standard deduction under new regime: ₹75,000
    const newTaxable = Math.max(0, income - 75000);
    let newTax = 0;
    if (newTaxable <= 300000) newTax = 0;
    else if (newTaxable <= 700000) newTax = (newTaxable - 300000) * 0.05;
    else if (newTaxable <= 1000000) newTax = 20000 + (newTaxable - 700000) * 0.10;
    else if (newTaxable <= 1200000) newTax = 50000 + (newTaxable - 1000000) * 0.15;
    else if (newTaxable <= 1500000) newTax = 80000 + (newTaxable - 1200000) * 0.20;
    else newTax = 140000 + (newTaxable - 1500000) * 0.30;
    // Section 87A rebate for new regime up to ₹7 LPA taxable
    if (newTaxable <= 700000) newTax = 0;
    const newCess = newTax * 0.04;
    const newTotal = Math.round(newTax + newCess);

    // 2. OLD TAX REGIME
    const stdDed = Number(p.standardDeduction) || 50000;
    const ded80C = Math.min(150000, Number(p.deductions80C) || 150000);
    const ded80D = Math.min(25000, Number(p.healthInsurance80D) || 25000);
    const dedNPS = Math.min(50000, Number(p.nps80CCD) || 50000);
    const hra = Number(p.hraExemption) || 100000;
    const totalDeductions = stdDed + ded80C + ded80D + dedNPS + hra;
    const oldTaxable = Math.max(0, income - totalDeductions);

    let oldTax = 0;
    if (oldTaxable <= 250000) oldTax = 0;
    else if (oldTaxable <= 500000) oldTax = (oldTaxable - 250000) * 0.05;
    else if (oldTaxable <= 1000000) oldTax = 12500 + (oldTaxable - 500000) * 0.20;
    else oldTax = 112500 + (oldTaxable - 1000000) * 0.30;
    if (oldTaxable <= 500000) oldTax = 0;
    const oldCess = oldTax * 0.04;
    const oldTotal = Math.round(oldTax + oldCess);

    const recommendation = newTotal <= oldTotal ? 'New Tax Regime' : 'Old Tax Regime';
    const annualSavings = Math.abs(oldTotal - newTotal);

    return {
      annualIncome: income,
      newRegime: { taxableIncome: newTaxable, taxLiability: newTotal },
      oldRegime: { taxableIncome: oldTaxable, totalDeductions, taxLiability: oldTotal },
      recommendation,
      annualSavings
    };
  },

  // ─── Persona & Audio Toggle Helpers ───────────────────────
  setIdentity(identity) {
    this._state.identity = identity;
    this._save();
    this._notify();
  },

  toggleSound() {
    this._state.soundEnabled = !this._state.soundEnabled;
    this._save();
    this._notify();
    return this._state.soundEnabled;
  },

  toggleSpeechVoice() {
    this._state.speechVoiceEnabled = !this._state.speechVoiceEnabled;
    this._save();
    this._notify();
    return this._state.speechVoiceEnabled;
  }
};

Store._load();
Store._initSync();
Store.recalculateScores();
Store.generateNotifications();
