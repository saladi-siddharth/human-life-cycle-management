/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE PAN-INDIA MULTI-LANGUAGE (i18n) LOCALIZATION ENGINE
   Languages: English (en), Hindi (hi), Telugu (te), Tamil (ta), Marathi (mr)
   ═══════════════════════════════════════════════════════════════════ */

const i18n = {
  currentLang: 'en',

  LANGUAGES: {
    en: { name: 'English', flag: '🌐' },
    hi: { name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    te: { name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    ta: { name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    mr: { name: 'मराठी (Marathi)', flag: '🇮🇳' }
  },

  TRANSLATIONS: {
    en: {
      dashboard: 'Dashboard',
      career: 'Career & ATS',
      health: 'Health & Diet',
      finance: 'Finance & Wealth',
      work: 'Work & Tasks',
      life: 'Life Goals',
      coach: 'AI Life Coach',
      settings: 'Settings',
      notifications: 'Notifications',
      billing: 'Billing & Plans',
      welcome: 'Welcome',
      life_score: 'Master Life Score',
      daily_podcast: 'AI Morning Spoken Briefing',
      play_brief: 'Play Daily Brief',
      pause_brief: 'Pause Brief',
      connect_bank: 'Connect via Account Aggregator',
      net_worth: 'Total Tracked Net Worth',
      drink_water: 'Drink Water (+250ml)',
      log_sleep: 'Log Today\'s Sleep',
      snap_meal: 'Snap Meal Photo',
      upload_resume: 'Upload Resume File',
      start_focus: 'Start Deep Sprint'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      career: 'करियर और रिज्यूमे',
      health: 'स्वास्थ्य और आहार',
      finance: 'वित्त और संपत्ति',
      work: 'कार्य और प्राथमिकताएं',
      life: 'जीवन लक्ष्य',
      coach: 'एआई लाइफ कोच',
      settings: 'सेटिंग्स',
      notifications: 'सूचनाएं',
      billing: 'बिलिंग और प्लान',
      welcome: 'स्वागत है',
      life_score: 'मास्टर लाइफ स्कोर',
      daily_podcast: 'एआई दैनिक सुबह का ऑडियो पॉडकास्ट',
      play_brief: 'दैनिक ब्रीफिंग सुनें',
      pause_brief: 'रोकें',
      connect_bank: 'खाता एग्रीगेटर से बैंक जोड़ें',
      net_worth: 'कुल ट्रैक की गई संपत्ति',
      drink_water: 'पानी पिएं (+250ml)',
      log_sleep: 'आज की नींद रिकॉर्ड करें',
      snap_meal: 'भोजन की तस्वीर लें',
      upload_resume: 'रिज्यूमे अपलोड करें',
      start_focus: 'डीप वर्क शुरू करें'
    },
    te: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      career: 'కెరీర్ & రెజ్యూమ్',
      health: 'ఆరోగ్యం & ఆహారం',
      finance: 'ఆర్థికం & సంపద',
      work: 'పనులు & లక్ష్యాలు',
      life: 'జీవిత లక్ష్యాలు',
      coach: 'ఏఐ లైఫ్ కోచ్',
      settings: 'సెట్టింగ్‌లు',
      notifications: 'నోటిఫికేషన్‌లు',
      billing: 'బిల్లింగ్ & ప్లాన్‌లు',
      welcome: 'స్వాగతం',
      life_score: 'మాస్టర్ లైఫ్ స్కోర్',
      daily_podcast: 'ఏఐ ఉదయపు ఆడియో బ్రీఫింగ్',
      play_brief: 'బ్రీఫింగ్ వినండి',
      pause_brief: 'ఆపండి',
      connect_bank: 'ఖాతా అగ్రిగేటర్‌ను కనెక్ట్ చేయండి',
      net_worth: 'మొత్తం సంపద',
      drink_water: 'నీరు త్రాగండి (+250ml)',
      log_sleep: 'ఈ రోజు నిద్రను నమోదు చేయండి',
      snap_meal: 'ఆహార ఫోటో తీయండి',
      upload_resume: 'రెజ్యూమ్ అప్‌లోడ్ చేయండి',
      start_focus: 'ఫోకస్ వర్క్ ప్రారంభించండి'
    },
    ta: {
      dashboard: 'டாஷ்போர்டு',
      career: 'தொழில் & ரெஸ்யூம்',
      health: 'உடல்நலம் & உணவு',
      finance: 'நிதி & செல்வம்',
      work: 'பணிகள் & இலக்குகள்',
      life: 'வாழ்க்கை இலக்குகள்',
      coach: 'ஏஐ வாழ்க்கை பயிற்சியாளர்',
      settings: 'அமைப்புகள்',
      notifications: 'அறிவிப்புகள்',
      billing: 'பில்லிங் & திட்டங்கள்',
      welcome: 'வரவேற்பு',
      life_score: 'மாஸ்டர் வாழ்க்கை மதிப்பெண்',
      daily_podcast: 'ஏஐ காலை ஆடியோ பாட்காஸ்ட்',
      play_brief: 'செய்திச்சுருக்கம் கேளுங்கள்',
      pause_brief: 'நிறுத்து',
      connect_bank: 'வங்கிக் கணக்கை இணைக்கவும்',
      net_worth: 'மொத்த நிகர மதிப்பு',
      drink_water: 'தண்ணீர் குடிக்கவும் (+250ml)',
      log_sleep: 'தூக்கத்தை பதிவு செய்யவும்',
      snap_meal: 'உணவு புகைப்படம் எடுக்கவும்',
      upload_resume: 'ரெஸ்யூம் பதிவேற்றவும்',
      start_focus: 'கவனக் குவிப்பைத் தொடங்குங்கள்'
    },
    mr: {
      dashboard: 'डॅशबोर्ड',
      career: 'करिअर आणि रेझ्युमे',
      health: 'आरोग्य आणि आहार',
      finance: 'वित्त आणि संपत्ती',
      work: 'कामे आणि प्राधान्यक्रम',
      life: 'जीवन उद्दिष्टे',
      coach: 'एआय लाइफ कोच',
      settings: 'सेटिंग्ज',
      notifications: 'सूचना',
      billing: 'बिलिंग आणि योजना',
      welcome: 'स्वागत आहे',
      life_score: 'मास्टर लाइफ स्कोअर',
      daily_podcast: 'एआय सकाळचे ऑडिओ पॉडकास्ट',
      play_brief: 'दैनिक माहिती ऐका',
      pause_brief: 'थांबवा',
      connect_bank: 'अकाउंट एग्रीगेटर द्वारे बँक जोडा',
      net_worth: 'एकूण संपत्ती',
      drink_water: 'पाणी प्या (+250ml)',
      log_sleep: 'आजची झोप नोंदवा',
      snap_meal: 'जेवणाचा फोटो काढा',
      upload_resume: 'रेझ्युमे अपलोड करा',
      start_focus: 'एकाग्रता सत्र सुरू करा'
    }
  },

  init() {
    const saved = localStorage.getItem('bioverse_lang');
    if (saved && this.TRANSLATIONS[saved]) {
      this.currentLang = saved;
    }
  },

  setLanguage(lang) {
    if (this.TRANSLATIONS[lang]) {
      this.currentLang = lang;
      try { localStorage.setItem('bioverse_lang', lang); } catch (e) {}
      UI.toast('success', 'Language Updated', `Switched to ${this.LANGUAGES[lang].name}`);
      if (typeof Router !== 'undefined' && Router.render) {
        Router.render();
      }
    }
  },

  t(key, fallback = '') {
    const dict = this.TRANSLATIONS[this.currentLang] || this.TRANSLATIONS.en;
    return dict[key] || this.TRANSLATIONS.en[key] || fallback || key;
  },

  /**
   * Returns a compact dropdown language switcher for the topbar
   */
  renderLanguageSwitcher() {
    return `
      <div class="dropdown" style="display:inline-block;">
        <button class="btn btn-ghost btn-sm" style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:4px 10px;" onclick="this.nextElementSibling.classList.toggle('hidden')">
          <span>${this.LANGUAGES[this.currentLang]?.flag || '🌐'}</span>
          <span>${this.LANGUAGES[this.currentLang]?.name?.split(' ')[0] || 'English'}</span>
          <i class="fas fa-chevron-down" style="font-size:9px; margin-left:2px;"></i>
        </button>
        <div class="dropdown-menu hidden" style="right:0; left:auto; min-width:160px; z-index:1000;">
          ${Object.keys(this.LANGUAGES).map(code => `
            <button class="dropdown-item ${this.currentLang === code ? 'active' : ''}" style="font-size:12px; display:flex; align-items:center; gap:8px;" onclick="i18n.setLanguage('${code}')">
              <span>${this.LANGUAGES[code].flag}</span>
              <span>${this.LANGUAGES[code].name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
};

window.i18n = i18n;
i18n.init();
