/* ==========================================================================
   Black Hawk Academy — CONTENT DATA
   --------------------------------------------------------------------------
   • missions     — the 14 Center missions (source: “أكاديمية بلاك هوك - مهام المركز.pptx”)
   • instructors  — the Academy's panel of experts (text as supplied by the Academy)
   • ui           — small interface labels used by the scripts.
   Every entry has Arabic (ar) and English (en) text.
   `icon` must match a <symbol id="i-…"> in the SVG sprite at the top of each page.
   ========================================================================== */

window.BHA_DATA = {
  ui: {
    ar: {
      mission: 'المهمة',
      role: 'دور المركز',
      axes: 'المحاور التدريبية',
      outcomes: 'المخرجات المتوقعة',
      prev: 'المهمة السابقة',
      next: 'المهمة التالية',
      enquire: 'استفسر عن هذه المهمة',
      viewProfile: 'عرض الملف',
      qualifications: 'المؤهلات',
      specializations: 'مجالات التخصص',
      placeholder: 'ملف قيد الإعداد',
      experience: 'عامًا من الخبرة',
      close: 'إغلاق',
      instructorEnquire: 'استفسر الآن',
      of: 'من'
    },
    en: {
      mission: 'Mission',
      role: 'Center’s Role',
      axes: 'Training Tracks',
      outcomes: 'Expected Outcomes',
      prev: 'Previous mission',
      next: 'Next mission',
      enquire: 'Enquire about this mission',
      viewProfile: 'View profile',
      qualifications: 'Qualifications',
      specializations: 'Specializations',
      placeholder: 'Profile pending',
      experience: 'years of experience',
      close: 'Close',
      instructorEnquire: 'Enquire now',
      of: 'of'
    }
  },

  missions: [
    {
      icon: 'i-rank',
      ar: {
        title: 'تأهيل موظفين رفيعي المستوى',
        summary: 'إعداد قيادات وكوادر نخبوية بمعايير احترافية عالمية',
        role: ['انتقاء وتأهيل القيادات وفق معايير النخبة', 'غرس قيم الانضباط والمسؤولية القيادية'],
        axes: ['القيادة الاستراتيجية وإدارة فرق العمل', 'اتخاذ القرار تحت الضغط وإدارة الأولويات'],
        outcomes: ['قيادات قادرة على التوجيه وصناعة القرار', 'كفاءات معتمدة دولياً في الإدارة العليا']
      },
      en: {
        title: 'Elite Personnel Qualification',
        summary: 'Preparing elite leaders and personnel to world-class professional standards',
        role: ['Selecting and qualifying leaders to elite standards', 'Instilling discipline and leadership responsibility'],
        axes: ['Strategic leadership and team management', 'Decision-making under pressure and managing priorities'],
        outcomes: ['Leaders able to guide teams and make decisions', 'Internationally accredited competencies in senior management']
      }
    },
    {
      icon: 'i-radar',
      ar: {
        title: 'إدارة الأزمات والمخاطر',
        summary: 'منهجيات الاستجابة السريعة وإدارة المخاطر بكفاءة واحترافية',
        role: ['بناء غرف عمليات ومنظومات إنذار مبكر', 'تطوير بروتوكولات الجاهزية والاستجابة'],
        axes: ['تحليل المخاطر وتقييم التهديدات', 'محاكاة السيناريوهات وإدارة غرف الأزمات'],
        outcomes: ['فرق قادرة على احتواء الأزمات بسرعة', 'خطط طوارئ معتمدة وقابلة للتفعيل الفوري']
      },
      en: {
        title: 'Crisis & Risk Management',
        summary: 'Rapid-response methodologies and efficient, professional risk management',
        role: ['Building operations rooms and early-warning systems', 'Developing readiness and response protocols'],
        axes: ['Risk analysis and threat assessment', 'Scenario simulation and crisis-room management'],
        outcomes: ['Teams able to contain crises quickly', 'Approved emergency plans ready for immediate activation']
      }
    },
    {
      icon: 'i-dialogue',
      ar: {
        title: 'التفاوض',
        summary: 'التفاوض يحسم المواقف الحساسة بالحوار',
        role: ['بناء قدرة تفاوضية تحفظ المصالح تحت الضغط', 'ترسيخ منهجية الحوار كأداة لإدارة الأزمات'],
        axes: ['تقنيات التفاوض والإقناع ولغة الجسد', 'إدارة الحوار في المواقف الحساسة والرهائن'],
        outcomes: ['مفاوضون محترفون يديرون الأزمات بهدوء', 'حلول توافقية تقلل التصعيد وتحفظ الأمن']
      },
      en: {
        title: 'Negotiation',
        summary: 'Negotiation resolves sensitive situations through dialogue',
        role: ['Building negotiating capability that protects interests under pressure', 'Establishing dialogue as a tool for crisis management'],
        axes: ['Negotiation, persuasion and body-language techniques', 'Managing dialogue in sensitive and hostage situations'],
        outcomes: ['Professional negotiators who manage crises calmly', 'Consensual solutions that de-escalate and preserve security']
      }
    },
    {
      icon: 'i-podium',
      ar: {
        title: 'عقد المؤتمرات',
        summary: 'تنظيم وإدارة المؤتمرات والفعاليات الكبرى باحترافية',
        role: ['التخطيط الشامل للمؤتمرات وإدارة فعالياتها', 'ضمان التمثيل المشرف وإدارة البروتوكولات'],
        axes: ['إدارة الفعاليات والتنسيق اللوجستي المتكامل', 'مهارات الإلقاء وإدارة الجلسات الحوارية'],
        outcomes: ['كوادر قادرة على تنظيم فعاليات بمستوى دولي', 'مؤتمرات تحقق أهدافها بكفاءة وتأثير عالٍ']
      },
      en: {
        title: 'Conference Management',
        summary: 'Organizing and managing major conferences and events professionally',
        role: ['Comprehensive conference planning and event management', 'Ensuring distinguished representation and managing protocol'],
        axes: ['Event management and integrated logistics coordination', 'Public speaking and moderating panel sessions'],
        outcomes: ['Personnel able to run events at an international level', 'Conferences that achieve their goals with efficiency and impact']
      }
    },
    {
      icon: 'i-globe',
      ar: {
        title: 'أسلوب العمل مع المنظمات الدولية',
        summary: 'بروتوكولات التعاون والتنسيق مع المنظمات الدولية',
        role: ['بناء جسور التعاون والشراكة مع المنظمات الدولية', 'تمثيل مؤسسي راقٍ يعكس احترافية الأكاديمية'],
        axes: ['البروتوكول الدبلوماسي وفنون التفاوض الدولي', 'إدارة المشاريع المشتركة وآليات التنسيق'],
        outcomes: ['كوادر مؤهلة للعمل ضمن الفرق الدولية', 'شراكات فاعلة واتفاقيات تعاون مستدامة']
      },
      en: {
        title: 'Working with International Organizations',
        summary: 'Protocols for cooperation and coordination with international organizations',
        role: ['Building bridges of cooperation and partnership with international organizations', 'Refined institutional representation that reflects the Academy’s professionalism'],
        axes: ['Diplomatic protocol and the art of international negotiation', 'Joint project management and coordination mechanisms'],
        outcomes: ['Personnel qualified to work within international teams', 'Effective partnerships and sustainable cooperation agreements']
      }
    },
    {
      icon: 'i-peace',
      ar: {
        title: 'بناء السلم والأمن',
        summary: 'استراتيجيات صناعة السلام وتعزيز الأمن المجتمعي',
        role: ['ترسيخ ثقافة السلام المجتمعي ونبذ العنف', 'بناء جسور الثقة بين المؤسسات والمجتمع'],
        axes: ['إدارة النزاعات ومهارات الوساطة المجتمعية', 'بناء التحالفات ودبلوماسية الوقاية'],
        outcomes: ['كوادر قادرة على قيادة مبادرات المصالحة', 'بيئة مجتمعية آمنة ومستقرة ومتماسكة']
      },
      en: {
        title: 'Peacebuilding & Security',
        summary: 'Strategies for making peace and strengthening community security',
        role: ['Promoting a culture of community peace and rejecting violence', 'Building trust between institutions and society'],
        axes: ['Conflict management and community mediation skills', 'Coalition building and preventive diplomacy'],
        outcomes: ['Personnel able to lead reconciliation initiatives', 'A safe, stable and cohesive community environment']
      }
    },
    {
      icon: 'i-plan',
      ar: {
        title: 'التخطيط الاستراتيجي لمكافحة الإرهاب',
        summary: 'خطط استباقية ومنهجيات مواجهة التهديدات الإرهابية',
        role: ['بناء منظومة استخبارية وتحليلية استباقية', 'توحيد الجهود الوطنية في مواجهة الإرهاب'],
        axes: ['تحليل التهديدات وتتبع الخلايا المتطرفة', 'التخطيط لعمليات المواجهة وإدارة ما بعد الحدث'],
        outcomes: ['كوادر قادرة على التفكيك المبكر للمخاطر', 'خطط ردع استباقية تحفظ الأمن الوطني']
      },
      en: {
        title: 'Counter-Terrorism Strategic Planning',
        summary: 'Proactive plans and methodologies for confronting terrorist threats',
        role: ['Building a proactive intelligence and analysis system', 'Unifying national efforts against terrorism'],
        axes: ['Threat analysis and tracking extremist cells', 'Planning response operations and post-incident management'],
        outcomes: ['Personnel able to dismantle risks early', 'Proactive deterrence plans that safeguard national security']
      }
    },
    {
      icon: 'i-mind',
      ar: {
        title: 'خطط الوقاية من العمليات النفسية',
        summary: 'التحصين الفكري ومواجهة الحرب النفسية والدعاية',
        role: ['تحصين الكوادر ضد الحرب النفسية والدعاية المضللة', 'بناء مناعة فكرية تحفظ التماسك المؤسسي'],
        axes: ['تحليل الدعاية وكشف التضليل الإعلامي', 'إدارة السردية وبناء الخطاب المضاد'],
        outcomes: ['كوادر واعية تصمد أمام الاستقطاب الفكري', 'خطط وقائية استباقية لإدارة الرأي العام']
      },
      en: {
        title: 'Psychological Operations Prevention',
        summary: 'Intellectual resilience against psychological warfare and propaganda',
        role: ['Protecting personnel against psychological warfare and disinformation', 'Building intellectual immunity that preserves institutional cohesion'],
        axes: ['Propaganda analysis and exposing media disinformation', 'Narrative management and building counter-messaging'],
        outcomes: ['Aware personnel who withstand ideological polarization', 'Proactive preventive plans for managing public opinion']
      }
    },
    {
      icon: 'i-growth',
      ar: {
        title: 'تنمية الموارد البشرية',
        summary: 'تطوير الكفاءات وبناء القدرات البشرية بمنهجية مستدامة',
        role: ['اكتشاف الطاقات وتوجيهها نحو التخصص الأمثل', 'بناء مسارات مهنية تحفز التميز والاستمرارية'],
        axes: ['تخطيط القوى العاملة وتقييم الأداء الحديث', 'التدريب القيادي وبناء فرق العمل الفاعلة'],
        outcomes: ['كوادر بشرية مؤهلة ومحفزة على الإنجاز', 'بيئة عمل احترافية تدعم النمو المؤسسي']
      },
      en: {
        title: 'Human Resources Development',
        summary: 'Developing competencies and building human capacity sustainably',
        role: ['Discovering talent and directing it to the right specialization', 'Building career paths that drive excellence and continuity'],
        axes: ['Workforce planning and modern performance appraisal', 'Leadership training and building effective teams'],
        outcomes: ['Qualified, motivated personnel driven to achieve', 'A professional work environment that supports institutional growth']
      }
    },
    {
      icon: 'i-medical',
      ar: {
        title: 'الإسعافات الأولية',
        summary: 'المهارات الأساسية للاستجابة الطبية الطارئة وإنقاذ الأرواح',
        role: ['نشر ثقافة الاستجابة الطبية السريعة في الميدان', 'إعداد مسعفين قادرين على التدخل الفوري'],
        axes: ['الإنعاش القلبي ووقف النزيف وإصابات الميدان', 'الفرز الطبي وإدارة الإخلاء في الطوارئ'],
        outcomes: ['كوادر تجيد التعامل مع الإصابات الحرجة', 'رفع نسب النجاة وتقليل مضاعفات الإصابة']
      },
      en: {
        title: 'First Aid',
        summary: 'Core skills for emergency medical response and saving lives',
        role: ['Spreading a culture of rapid medical response in the field', 'Preparing first responders capable of immediate intervention'],
        axes: ['CPR, bleeding control and field injuries', 'Medical triage and emergency evacuation management'],
        outcomes: ['Personnel proficient in handling critical injuries', 'Higher survival rates and fewer injury complications']
      }
    },
    {
      icon: 'i-eye',
      ar: {
        title: 'العلوم السلوكية',
        summary: 'فهم السلوك الإنساني وتحليل الشخصيات',
        role: ['توظيف علم النفس السلوكي في العمل الأمني', 'بناء قدرة على قراءة الدوافع والنوايا'],
        axes: ['تحليل الشخصيات ولغة الجسد', 'إدارة السلوك الجماهيري في الأزمات'],
        outcomes: ['كوادر تتقن التقييم السلوكي الدقيق', 'قرارات مبنية على فهم عميق للسلوك']
      },
      en: {
        title: 'Behavioral Sciences',
        summary: 'Understanding human behavior and analyzing personalities',
        role: ['Applying behavioral psychology to security work', 'Building the ability to read motives and intentions'],
        axes: ['Personality analysis and body language', 'Managing crowd behavior during crises'],
        outcomes: ['Personnel skilled in precise behavioral assessment', 'Decisions grounded in a deep understanding of behavior']
      }
    },
    {
      icon: 'i-flame',
      ar: {
        title: 'الحماية المدنية',
        summary: 'إجراءات الحماية المدنية والسلامة العامة',
        role: ['ترسيخ منظومة الحماية المدنية والوقاية من الكوارث', 'رفع جاهزية المجتمع للتعامل مع الطوارئ'],
        axes: ['الإطفاء والإنقاذ وإدارة عمليات الإخلاء', 'السلامة العامة والتعامل مع المواد الخطرة'],
        outcomes: ['فرق حماية مدنية محترفة وسريعة الاستجابة', 'مجتمع واعٍ بإجراءات السلامة والوقاية']
      },
      en: {
        title: 'Civil Protection',
        summary: 'Civil protection procedures and public safety',
        role: ['Establishing a civil protection and disaster-prevention system', 'Raising community readiness to handle emergencies'],
        axes: ['Firefighting, rescue and evacuation operations', 'Public safety and handling hazardous materials'],
        outcomes: ['Professional, rapid-response civil protection teams', 'A community aware of safety and prevention procedures']
      }
    },
    {
      icon: 'i-guard',
      ar: {
        title: 'الدفاع عن النفس',
        summary: 'تقنيات الدفاع عن النفس واللياقة القتالية والجاهزية البدنية',
        role: ['بناء قدرة بدنية وقتالية تحفظ سلامة الفرد', 'غرس الثقة والانضباط في المواجهات الميدانية'],
        axes: ['فنون الاشتباك والدفاع ضد التهديدات', 'اللياقة القتالية وإدارة المواجهة الآمنة'],
        outcomes: ['كوادر تجيد حماية النفس والآخرين باحتراف', 'جاهزية بدنية عالية وثقة ميدانية راسخة']
      },
      en: {
        title: 'Self-Defense',
        summary: 'Self-defense techniques, combat fitness and physical readiness',
        role: ['Building physical and combat capability that keeps individuals safe', 'Instilling confidence and discipline in field confrontations'],
        axes: ['Engagement techniques and defense against threats', 'Combat fitness and safe confrontation management'],
        outcomes: ['Personnel who protect themselves and others professionally', 'High physical readiness and steadfast field confidence']
      }
    },
    {
      icon: 'i-supply',
      ar: {
        title: 'تخطيط وإدارة سلاسل الإمداد',
        summary: 'إدارة اللوجستيات وسلاسل الإمداد بكفاءة استراتيجية',
        role: ['بناء منظومة إمداد مرنة تضمن استمرارية العمليات', 'ترسيخ مفاهيم الكفاءة والشفافية اللوجستية'],
        axes: ['التخطيط اللوجستي وإدارة المخزون والمشتريات', 'إدارة النقل والتوزيع في البيئات الصعبة'],
        outcomes: ['كوادر تدير سلاسل الإمداد باحترافية عالية', 'عمليات ميدانية مدعومة دون انقطاع']
      },
      en: {
        title: 'Supply Chain Planning & Management',
        summary: 'Managing logistics and supply chains with strategic efficiency',
        role: ['Building a resilient supply system that ensures operational continuity', 'Establishing logistical efficiency and transparency'],
        axes: ['Logistics planning, inventory and procurement management', 'Transport and distribution in challenging environments'],
        outcomes: ['Personnel who run supply chains with high professionalism', 'Field operations supported without interruption']
      }
    }
  ],

  /* ------------------------------------------------------------------------
     INSTRUCTORS — the Academy's panel of experts.
     • image: portrait in assets/images/instructors/ (640×800, 4:5, WebP)
     • badge: short label shown on the photo (e.g. the person's role in the Center)
     • years: optional number, shown as "+20 years of experience"
     • specializations: the first three appear on the card, all of them in the profile
     Order here = order on the page. Add or remove objects to add or remove cards.
     ------------------------------------------------------------------------ */
  instructors: [
    {
      image: 'assets/images/instructors/ahmed-hassan-abdelshafi.webp',
      years: 20,
      ar: {
        name: 'عميد/ أحمد حسن عبد الشافي',
        badge: 'مدير عام المركز',
        role: 'خبير أمني وعسكري ومدرب معتمد TOT',
        bio: 'خبرة تزيد عن 20 عامًا في المجال الأمني والعسكري، ومتخصص في تأمين المنشآت، الأمن الجنائي، إدارة العمليات، حماية الشخصيات والحراسة اللصيقة، والتعامل مع الأزمات والحوادث الإرهابية.',
        qualifications: [
          'بكالوريوس العلوم العسكرية',
          'دورات متخصصة في التفاوض مع الحوادث الإرهابية',
          'فنون وأساليب الاستجواب',
          'دراسة مسرح الجريمة',
          'العمليات النفسية',
          'الأمن القومي',
          'اعتماد TOT في مجال التدريب'
        ],
        specializations: ['تأمين المنشآت', 'الأمن الجنائي', 'حماية الشخصيات والحراسة اللصيقة', 'إدارة العمليات', 'إدارة الأزمات والحوادث الإرهابية']
      },
      en: {
        name: 'Brig. Ahmed Hassan Abdel-Shafi',
        badge: 'General Manager of the Center',
        role: 'Security & Military Expert · Certified TOT Trainer',
        bio: 'More than 20 years of experience in the security and military field, specializing in facility security, criminal security, operations management, VIP and close protection, and handling crises and terrorist incidents.',
        qualifications: [
          'Bachelor of Military Sciences',
          'Specialized courses in negotiation during terrorist incidents',
          'Interrogation techniques and methods',
          'Crime-scene investigation',
          'Psychological operations',
          'National security',
          'TOT certification in training'
        ],
        specializations: ['Facility Security', 'Criminal Security', 'VIP & Close Protection', 'Operations Management', 'Crisis & Terrorist-Incident Management']
      }
    },
    {
      image: 'assets/images/instructors/mohamed-abdelbasset.webp',
      ar: {
        name: 'لواء أركان حرب (م) دكتور/ محمد عبد الباسط محمد علي',
        badge: 'مستشار المركز',
        role: 'مستشار السلم والأمن الدولي ومكافحة الإرهاب — أفريقيا والشرق الأوسط',
        bio: 'يشغل حاليًا منصب المدير العام لمركز الساحل والصحراء لمكافحة الإرهاب بالاتحاد الأفريقي. ضابط أركان وقائد سابق بمهام السلام بالأمم المتحدة، وقائد سابق بالقوات المسلحة والقوات الخاصة المصرية، ومؤهل علميًا وخبراتيًا من مصر وأمريكا وإيطاليا والأمم المتحدة في مجال الأمن والتعاون الدولي ومكافحة الإرهاب.',
        qualifications: [
          'دكتوراه في الإعلام السياسي — جامعة قناة السويس (مكافحة الإرهاب)',
          'زميل كلية الحرب العليا (العمليات النفسية)',
          'مؤهل علميًا وخبراتيًا من مصر وأمريكا وإيطاليا والأمم المتحدة'
        ],
        specializations: ['السلم والأمن الدولي', 'مكافحة الإرهاب', 'العمليات النفسية', 'التعاون الدولي']
      },
      en: {
        name: 'Staff Maj. Gen. (Ret.) Dr. Mohamed Abdel-Basset Mohamed Ali',
        badge: 'Advisor to the Center',
        role: 'Advisor on International Peace, Security & Counter-Terrorism — Africa and the Middle East',
        bio: 'Currently Director General of the Sahel and Sahara Center for Counter-Terrorism at the African Union. A former staff officer and commander in United Nations peace missions and a former commander in the Egyptian Armed Forces and Special Forces, with academic and professional qualifications from Egypt, the United States, Italy and the United Nations in security, international cooperation and counter-terrorism.',
        qualifications: [
          'PhD in Political Media (Counter-Terrorism) — Suez Canal University',
          'Fellow of the Higher War College (Psychological Operations)',
          'Academic and professional qualifications from Egypt, the USA, Italy and the United Nations'
        ],
        specializations: ['International Peace & Security', 'Counter-Terrorism', 'Psychological Operations', 'International Cooperation']
      }
    },
    {
      image: 'assets/images/instructors/ahmed-sayed.webp',
      years: 20,
      ar: {
        name: 'عقيد (م)/ أحمد سيد',
        badge: 'هيئة الخبراء',
        role: 'خبير ومدرب معتمد في الحماية المدنية ومكافحة الحرائق وأنظمة الحماية من الحريق والسلامة والصحة المهنية',
        bio: 'خبرة تزيد عن 20 عامًا في مجالات الحماية المدنية، مكافحة الحرائق، أنظمة الحماية والإنذار من الحريق، والسلامة والصحة المهنية، في المجالات المدنية والعسكرية. متخصص في تدريب وتأهيل فرق الإطفاء والسلامة، وتقييم المخاطر، وخطط الطوارئ والإخلاء والاستجابة للحوادث، بالإضافة إلى تنفيذ واختبار وصيانة أنظمة الحماية من الحريق والتفتيش على المنشآت.',
        qualifications: [
          'مدرب معتمد في الحماية المدنية ومكافحة الحرائق',
          'خبرة تزيد عن 20 عامًا في المجالات المدنية والعسكرية'
        ],
        specializations: ['الحماية المدنية', 'مكافحة الحرائق', 'السلامة والصحة المهنية', 'أنظمة الإنذار والحماية من الحريق', 'خطط الطوارئ والإخلاء', 'تقييم المخاطر']
      },
      en: {
        name: 'Col. (Ret.) Ahmed Sayed',
        badge: 'Panel of Experts',
        role: 'Certified Expert & Trainer in Civil Protection, Firefighting, Fire Protection Systems and Occupational Safety & Health',
        bio: 'More than 20 years of experience in civil protection, firefighting, fire protection and alarm systems, and occupational safety and health, across civilian and military sectors. Specializes in training and qualifying firefighting and safety teams, risk assessment, emergency, evacuation and incident-response plans, as well as installing, testing and maintaining fire protection systems and inspecting facilities.',
        qualifications: [
          'Certified trainer in civil protection and firefighting',
          'More than 20 years of experience in civilian and military sectors'
        ],
        specializations: ['Civil Protection', 'Firefighting', 'Occupational Safety & Health', 'Fire Alarm & Protection Systems', 'Emergency & Evacuation Plans', 'Risk Assessment']
      }
    },
    {
      image: 'assets/images/instructors/nermeen-ahmed-saeed.webp',
      ar: {
        name: 'د/ نرمين أحمد سعيد',
        badge: 'هيئة الخبراء',
        role: 'خبيرة ومدربة في إدارة الموارد البشرية والتنمية البشرية والصحة النفسية والإرشاد الأسري والتربوي',
        bio: 'متخصصة في الموارد البشرية والتدريب والتطوير، حاصلة على مؤهلات أكاديمية ومهنية، واعتماد HRCI في إدارة الموارد البشرية. مدرب دولي متقدم ومستشار أسري وتربوي وممارس NLP، وباحثة أكاديمية في الموارد البشرية، التدريب، التحول الرقمي والذكاء الاصطناعي والصحة النفسية.',
        qualifications: [
          'اعتماد HRCI في إدارة الموارد البشرية',
          'مدرب دولي متقدم',
          'ممارس NLP',
          'مستشار أسري وتربوي',
          'باحثة أكاديمية في الموارد البشرية والتحول الرقمي والذكاء الاصطناعي والصحة النفسية'
        ],
        specializations: ['الموارد البشرية', 'التدريب والتطوير', 'الصحة النفسية', 'الإرشاد الأسري والتربوي']
      },
      en: {
        name: 'Dr. Nermeen Ahmed Saeed',
        badge: 'Panel of Experts',
        role: 'Expert & Trainer in Human Resources Management, Human Development, Mental Health, and Family & Educational Counseling',
        bio: 'A specialist in human resources, training and development, holding academic and professional qualifications and HRCI certification in human resources management. An advanced international trainer, family and educational counselor and NLP practitioner, and an academic researcher in human resources, training, digital transformation, artificial intelligence and mental health.',
        qualifications: [
          'HRCI certification in Human Resources Management',
          'Advanced International Trainer',
          'NLP Practitioner',
          'Family & Educational Counselor',
          'Academic researcher in HR, digital transformation, AI and mental health'
        ],
        specializations: ['Human Resources', 'Training & Development', 'Mental Health', 'Family & Educational Counseling']
      }
    }
  ]
};
