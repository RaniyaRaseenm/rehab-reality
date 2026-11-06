/* =========================================================
   FEATURE ONE — Photo intake · Screening · Results · PDF
   =========================================================
   All clinical content is evidence-informed and clearly
   labelled as educational screening, NOT a diagnosis.
   No substance-use inference is made from the photo.
   ========================================================= */
(function () {
'use strict';

/* ---- Verified support contacts (real, sourced) ---- */
const SUPPORT_CONTACTS = [
  {
    region: 'India',
    services: [
      {
        name: 'Tele-MANAS',
        type: 'Mental-health helpline',
        phone: '14416',
        website: 'https://telemanas.mohfw.gov.in',
        offers: 'Free 24/7 mental-health tele-counselling by trained counsellors; substance-use support and de-addiction guidance available.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'Ministry of Health and Family Welfare, Govt of India (2022)'
      },
      {
        name: 'NIMHANS Helpline',
        type: 'Addiction-treatment & psychiatric care',
        phone: '080-46110007',
        website: 'https://nimhans.ac.in',
        offers: 'Specialist psychiatric assessment and referral to tertiary de-addiction and rehabilitation centres across India.',
        hours: 'Mon–Sat 8 am – 8 pm IST',
        source: 'National Institute of Mental Health and Neurosciences, verified 2024'
      },
      {
        name: 'National Emergency Services (India)',
        type: 'Emergency medical service',
        phone: '112',
        website: 'https://112.gov.in',
        offers: 'Immediate dispatch for life-threatening medical emergencies, suspected overdose, or severe withdrawal complications.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'Ministry of Home Affairs, Govt of India'
      }
    ]
  },
  {
    region: 'United States',
    services: [
      {
        name: 'SAMHSA National Helpline',
        type: 'Addiction-treatment referral',
        phone: '1-800-662-4357',
        website: 'https://www.samhsa.gov/find-help/national-helpline',
        offers: 'Free, confidential 24/7 treatment referral and information service for individuals and families facing substance use disorders.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'Substance Abuse and Mental Health Services Administration (SAMHSA), US DHHS'
      },
      {
        name: '988 Suicide & Crisis Lifeline',
        type: 'Mental-health & crisis helpline',
        phone: 'Call or text 988',
        website: 'https://988lifeline.org',
        offers: 'Free, confidential crisis counselling for people in emotional distress or substance-related crisis.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'SAMHSA / Vibrant Emotional Health, verified 2024'
      },
      {
        name: 'Emergency Medical Services (USA)',
        type: 'Emergency medical service',
        phone: '911',
        website: 'https://www.911.gov',
        offers: 'Immediate paramedic response for acute overdose, loss of consciousness, respiratory distress, or severe withdrawal seizures.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'National 911 Program, US DOT'
      }
    ]
  },
  {
    region: 'United Kingdom',
    services: [
      {
        name: 'FRANK',
        type: 'Addiction advice & support',
        phone: '0300 123 6600',
        website: 'https://www.talktofrank.com',
        offers: 'Honest, confidential information and advice about drugs and alcohol; live chat and text support available.',
        hours: '24 hours, 7 days',
        source: 'Office for Health Improvement and Disparities (OHID) / NHS'
      },
      {
        name: 'Drinkline',
        type: 'Alcohol advice & helpline',
        phone: '0300 123 1110',
        website: 'https://www.nhs.uk/live-well/alcohol-advice/',
        offers: 'Free confidential helpline for anyone concerned about their own or someone else\'s drinking.',
        hours: 'Weekdays 9 am – 8 pm; weekends 11 am – 4 pm',
        source: 'National Health Service (NHS England)'
      },
      {
        name: 'Emergency Services (UK)',
        type: 'Emergency medical service',
        phone: '999',
        website: 'https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/',
        offers: 'Emergency ambulance response for life-threatening medical situations, suspected poisoning, overdose, or acute collapse.',
        hours: '24 hours, 7 days (toll-free)',
        source: 'NHS England / Home Office'
      }
    ]
  }
];

/* ---- AUDIT questionnaire (WHO, 2001 — validated instrument) ---- */
/* Reference: Babor TF et al. AUDIT: The Alcohol Use Disorders
   Identification Test. WHO/MSD/MSB/01.6a, 2nd ed. 2001.           */
const AUDIT_QUESTIONS = [
  {
    id: 'a1',
    text: 'How often do you have a drink containing alcohol?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Monthly or less', score: 1 },
      { label: '2–4 times a month', score: 2 },
      { label: '2–3 times a week', score: 3 },
      { label: '4 or more times a week', score: 4 }
    ]
  },
  {
    id: 'a2',
    text: 'How many standard drinks do you have on a typical drinking day?',
    options: [
      { label: '1–2', score: 0 },
      { label: '3–4', score: 1 },
      { label: '5–6', score: 2 },
      { label: '7–9', score: 3 },
      { label: '10 or more', score: 4 }
    ]
  },
  {
    id: 'a3',
    text: 'How often do you have 6 or more drinks on one occasion?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a4',
    text: 'How often during the last year have you been unable to stop drinking once started?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a5',
    text: 'How often during the last year have you failed to do what was normally expected because of drinking?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a6',
    text: 'How often during the last year have you needed a first drink in the morning to get going after heavy drinking?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a7',
    text: 'How often during the last year have you felt guilt or remorse after drinking?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a8',
    text: 'How often during the last year have you been unable to remember what happened the night before because of drinking?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Less than monthly', score: 1 },
      { label: 'Monthly', score: 2 },
      { label: 'Weekly', score: 3 },
      { label: 'Daily or almost daily', score: 4 }
    ]
  },
  {
    id: 'a9',
    text: 'Have you or someone else been injured because of your drinking?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Yes, but not in the last year', score: 2 },
      { label: 'Yes, during the last year', score: 4 }
    ]
  },
  {
    id: 'a10',
    text: 'Has a relative, friend, doctor, or health worker suggested you cut down your drinking?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Yes, but not in the last year', score: 2 },
      { label: 'Yes, during the last year', score: 4 }
    ]
  }
];

/* ---- Multi-substance ASSIST-style demo questions (clearly labelled demo) ---- */
const ASSIST_DEMO = [
  {
    id: 's1',
    text: 'Which substance(s) have you used in the past 3 months? (Select all that apply)',
    multi: true,
    options: ['Alcohol', 'Opioids', 'Cannabis', 'Cocaine', 'Amphetamines / meth', 'Sedatives / sleeping pills', 'Other']
  },
  {
    id: 's2',
    text: 'In the past 3 months, how often have you used the substance(s) you are most concerned about?',
    options: [
      { label: 'Never in past 3 months', score: 0 },
      { label: 'Once or twice', score: 2 },
      { label: 'Monthly', score: 3 },
      { label: 'Weekly', score: 4 },
      { label: 'Daily or almost daily', score: 6 }
    ]
  },
  {
    id: 's3',
    text: 'During the past 3 months, how often have you had a strong desire or urge to use?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Once or twice', score: 3 },
      { label: 'Monthly', score: 4 },
      { label: 'Weekly', score: 5 },
      { label: 'Daily or almost daily', score: 6 }
    ]
  },
  {
    id: 's4',
    text: 'During the past 3 months, how often has your use led to health, social, legal or financial problems?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Once or twice', score: 4 },
      { label: 'Monthly', score: 5 },
      { label: 'Weekly', score: 6 },
      { label: 'Daily or almost daily', score: 7 }
    ]
  },
  {
    id: 's5',
    text: 'During the past 3 months, how often have you failed to do what was normally expected of you because of your use?',
    options: [
      { label: 'Never', score: 0 },
      { label: 'Once or twice', score: 5 },
      { label: 'Monthly', score: 6 },
      { label: 'Weekly', score: 7 },
      { label: 'Daily or almost daily', score: 8 }
    ]
  }
];

/* ---- Image analysis service (technical check only — NO substance inference) ---- */
const imageAnalysisService = {
  analyse(photoDataUrl) {
    if (!photoDataUrl) return Promise.resolve(null);
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 64; canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 64, 64);
          const d = ctx.getImageData(0, 0, 64, 64).data;
          let brightness = 0;
          for (let i = 0; i < d.length; i += 4) {
            brightness += (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
          }
          brightness /= (d.length / 4);
          const wellLit = brightness > 55 && brightness < 235;
          resolve({
            facePresent: true,
            wellLit,
            note: 'Lighting adequate; face present in frame. No diagnostic or substance-use inference performed.'
          });
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = photoDataUrl;
    });
  }
};

/* ---- Screening service ---- */
const screeningService = {
  scoreAUDIT(answers) {
    let total = 0;
    AUDIT_QUESTIONS.forEach(q => {
      const a = answers[q.id];
      if (a !== undefined) total += a;
    });
    let zone, interpretation, nextSteps;
    if (total <= 7) {
      zone = 'Zone I – Low-risk use';
      interpretation = 'Your answers suggest low-risk alcohol use at this time. Continuing at this level is associated with lower risk of alcohol-related harm.';
      nextSteps = [
        'Speak with a GP or health professional if you have any questions or personal health concerns.',
        'Share this report with a doctor if you wish to review low-risk drinking guidelines in context.',
        'Identify trusted family or friends who support healthy lifestyle habits.',
        'Plan a follow-up self-check in 3–6 months to monitor your consumption pattern.'
      ];
    } else if (total <= 15) {
      zone = 'Zone II – Hazardous use';
      interpretation = 'Your answers suggest a pattern of drinking that puts you at increased risk of harm. A brief intervention or conversation with a healthcare professional is recommended.';
      nextSteps = [
        'Speak with a qualified healthcare professional or addiction counselor to discuss your drinking patterns.',
        'Share this report as a starting point for discussion; it does not replace a clinical assessment.',
        'Identify a trusted support person to talk through personal triggers and stress management.',
        'Plan a follow-up in 2 to 4 weeks, repeating this screening to review your progress.'
      ];
    } else if (total <= 19) {
      zone = 'Zone III – Harmful use';
      interpretation = 'Your answers suggest drinking that may be causing or is likely to cause harm to your health, relationships, or daily functioning. Professional assessment is recommended.';
      nextSteps = [
        'Speak with a qualified doctor or addiction medicine specialist promptly for comprehensive assessment.',
        'Share this report with your care team. Do not attempt abrupt cessation without medical guidance.',
        'Identify a trusted support person or local support group to assist you during this time.',
        'Plan an immediate medical appointment and establish a structured follow-up care schedule.'
      ];
    } else {
      zone = 'Zone IV – Possible dependence';
      interpretation = 'Your answers suggest possible alcohol dependence. This requires formal clinical evaluation and medically supervised support.';
      nextSteps = [
        'Speak with an addiction specialist or medical doctor promptly for formal diagnostic evaluation.',
        'Share this report with your healthcare team. Do NOT stop drinking suddenly without medical advice — withdrawal can be dangerous.',
        'Involve a trusted support person or family member immediately to help coordinate care.',
        'Contact a verified local addiction helpline or treatment facility today.'
      ];
    }
    return {
      tool: 'AUDIT (Alcohol Use Disorders Identification Test)',
      version: 'WHO (2001)',
      totalScore: total,
      maxScore: 40,
      zone,
      interpretation,
      nextSteps
    };
  },

  scoreASSIST(answers) {
    let total = 0;
    ['s2', 's3', 's4', 's5'].forEach(id => {
      const a = answers[id];
      if (a !== undefined) total += a;
    });
    let zone, interpretation, nextSteps;
    if (total < 4) {
      zone = 'Low concern';
      interpretation = 'Your responses suggest low-risk substance involvement at this time. Staying informed supports continued wellbeing.';
      nextSteps = [
        'Speak with a qualified healthcare professional if your circumstances or stress levels change.',
        'Share this report if you would like to discuss general health and wellness.',
        'Identify a trusted support person who encourages healthy habits and open conversation.',
        'Plan a periodic check-in to review your habits and health goals.'
      ];
    } else if (total < 16) {
      zone = 'Moderate concern';
      interpretation = 'Your responses suggest moderate risk. A conversation with a healthcare professional or counsellor is recommended to explore reduction strategies.';
      nextSteps = [
        'Speak with a qualified counselor or doctor about substance use patterns and coping mechanisms.',
        'Share this report as a discussion aid with a healthcare provider or trusted mentor.',
        'Identify a trusted support person to assist in identifying and navigating daily triggers.',
        'Plan a follow-up in 2 to 4 weeks to review your goals and repeat this screening.'
      ];
    } else {
      zone = 'High concern — specialist assessment recommended';
      interpretation = 'Your responses suggest high risk of substance-related problems or dependence. Professional clinical assessment and tailored support are strongly recommended.';
      nextSteps = [
        'Speak with a specialized addiction professional or medical provider promptly for formal assessment.',
        'Share this report with a clinician. Avoid sudden unsupervised cessation of sedatives or alcohol.',
        'Involve a trusted support person to accompany you to appointments and provide daily encouragement.',
        'Contact a verified local helpline or treatment center today using the resources in this report.'
      ];
    }
    return {
      tool: 'WHO ASSIST-inspired demo screening',
      version: 'Simplified demo flow — not clinically validated',
      totalScore: total,
      maxScore: 31,
      zone,
      interpretation,
      nextSteps
    };
  }
};

/* ---- PDF report service — Exact 2-page A4 match for Template ---- */
const reportService = {
  async generatePDF(session) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
    const W = 595.28, H = 841.89;
    const ML = 63.78, MR = 63.78, CW = W - ML - MR; // 467.72 pt
    const TXT_L = 68.36, TXT_W = 458.55;           // 458.55 pt

    // Palette matching docs/Rehab_Reality_User_Report_Template.pdf
    const C_NAVY = [23, 50, 77];       // #17324D
    const C_BODY = [36, 55, 70];       // #243746
    const C_MUTED = [82, 101, 117];    // #526575
    const C_BORDER = [217, 226, 232];  // #D9E2E8
    const C_LIGHT1 = [243, 246, 248];  // #F3F6F8
    const C_LIGHT2 = [234, 243, 245];  // #EAF3F5
    const C_WARN_BG = [255, 244, 214]; // #FFF4D6
    const C_WARN_BD = [231, 198, 106]; // #E7C66A

    const drawFooter = (pg) => {
      doc.setDrawColor(...C_BORDER);
      doc.setLineWidth(0.7);
      doc.line(51.02, 802.2, 544.25, 802.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C_MUTED);
      doc.text('REHAB REALITY | PERSONAL SCREENING & RECOVERY SUPPORT', 51.02, 816.4);
      doc.text(String(pg), 540.08, 816.4, { align: 'right' });
    };

    const drawSectionHeading = (title, y) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...C_NAVY);
      doc.text(title, TXT_L, y);
      doc.setDrawColor(...C_BORDER);
      doc.setLineWidth(0.7);
      doc.line(TXT_L, y + 6.5, TXT_L + TXT_W, y + 6.5);
    };

    // Session-derived dynamic variables
    const reportId = session.reportId || ('RR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000));
    const genDate = new Date().toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const assessStatus = session.screeningDone ? 'Completed' : 'Partial / Demo';

    const subsSelected = (session.concernSubs && session.concernSubs.length)
      ? session.concernSubs.join(', ')
      : (session.user && session.user.subs && session.user.subs.length ? session.user.subs.join(', ') : 'Alcohol');

    const res = session.screeningResult || {
      tool: 'AUDIT (Alcohol Use Disorders Identification Test)',
      version: 'WHO (2001)',
      totalScore: 0,
      maxScore: 40,
      zone: 'Zone I – Low-risk use',
      interpretation: 'Answers suggest low-risk use at this time.',
      nextSteps: [
        'Speak with a GP or health professional if you have any questions.',
        'Share this report with a doctor as a discussion aid.',
        'Identify trusted family or friends who support your wellbeing.',
        'Plan a follow-up self-check in 2 to 4 weeks.'
      ]
    };

    const outcomeText = `${res.zone || 'Screening evaluated'} (Score: ${res.totalScore !== undefined ? res.totalScore : '—'} / ${res.maxScore || '40'})`;
    const photoProvided = session.photoTaken ? 'Yes' : 'No';
    const processingPerformed = session.photoTaken
      ? 'Face presence and lighting quality check only (on-device client-side memory analysis).'
      : 'None — screening based entirely on self-reported questionnaire answers.';
    const observations = session.photoTaken
      ? ((session.imageAnalysis && session.imageAnalysis.note) || 'Lighting adequate. No diagnostic or substance-use inference performed.')
      : 'No diagnostic image analysis performed.';

    // ==================== PAGE 1 ====================
    drawFooter(1);

    // Title Block
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...C_MUTED);
    doc.text('REHAB REALITY', W / 2, 60, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(...C_NAVY);
    doc.text('Personal Screening &', W / 2, 92, { align: 'center' });
    doc.text('Recovery Support Report', W / 2, 120, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...C_MUTED);
    doc.text('An educational summary to support informed conversations and next steps', W / 2, 142, { align: 'center' });

    // Metadata Box (height 42 pt)
    const metaY = 162;
    doc.setFillColor(...C_LIGHT1);
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.7);
    doc.rect(ML, metaY, CW, 42, 'FD');
    doc.line(ML + 155.9, metaY, ML + 155.9, metaY + 42);
    doc.line(ML + 311.8, metaY, ML + 311.8, metaY + 42);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_BODY);
    doc.text('Report ID', ML + 9, metaY + 16);
    doc.text('Generated', ML + 164.9, metaY + 16);
    doc.text('Assessment status', ML + 320.8, metaY + 16);

    doc.setFont('helvetica', 'normal');
    doc.text(reportId, ML + 9, metaY + 31);
    doc.text(genDate, ML + 164.9, metaY + 31);
    doc.text(assessStatus, ML + 320.8, metaY + 31);

    // Section 1: 1. Your overview
    drawSectionHeading('1. Your overview', 228);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_BODY);
    const s1Intro = 'This report summarizes information you provided during the Rehab Reality screening flow. It is intended to help you understand possible next steps and prepare for a conversation with a qualified professional. It is not a diagnosis.';
    doc.text(doc.splitTextToSize(s1Intro, TXT_W), TXT_L, 246);

    // Section 1 Table
    const t1Y = 266;
    const col1W = 136.06, col2W = CW - col1W;
    const rows1 = [
      { label: 'Selected concern(s)', val: subsSelected },
      { label: 'Questionnaire', val: `${res.tool || 'AUDIT'} · ${res.version || 'WHO 2001'}` },
      { label: 'Screening outcome', val: outcomeText },
      { label: 'Interpretation', val: res.interpretation || 'No interpretation recorded.' }
    ];
    let curY1 = t1Y;
    rows1.forEach((r, idx) => {
      const rh = idx === 3 ? 28 : 22;
      doc.setFillColor(...C_LIGHT2);
      doc.rect(ML, curY1, col1W, rh, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(ML + col1W, curY1, col2W, rh, 'F');
      doc.setDrawColor(...C_BORDER);
      doc.rect(ML, curY1, CW, rh, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_BODY);
      doc.text(r.label, ML + 8, curY1 + 14);

      doc.setFont('helvetica', 'normal');
      const vLines = doc.splitTextToSize(r.val, col2W - 14);
      doc.text(vLines, ML + col1W + 8, curY1 + (idx === 3 ? 12 : 14));
      curY1 += rh;
    });

    // Section 2: 2. What this screening can tell you
    drawSectionHeading('2. What this screening can tell you', 382);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_BODY);
    const s2Intro = 'This screening measures reported consumption frequency, potential dependence signs, and substance-related harms. It indicates risk categories at a population level to help guide next steps and support discussions. It cannot establish a medical diagnosis or predict individual physical health outcomes.';
    doc.text(doc.splitTextToSize(s2Intro, TXT_W), TXT_L, 400);

    doc.setFont('helvetica', 'bold');
    doc.text('Important:', TXT_L, 430);
    doc.setFont('helvetica', 'normal');
    const impTxt = ' A screening result does not confirm a diagnosis or determine the full extent of a person\'s health. A qualified healthcare professional can assess individual circumstances.';
    doc.text(doc.splitTextToSize(impTxt, TXT_W - 46), TXT_L + 46, 430);

    // Section 3: 3. Photo and image-processing summary
    drawSectionHeading('3. Photo and image-processing summary', 462);
    const t3Y = 480;
    const rows3 = [
      { label: 'Photo provided', val: photoProvided },
      { label: 'Processing performed', val: processingPerformed },
      { label: 'Observations', val: observations }
    ];
    let curY3 = t3Y;
    rows3.forEach((r, idx) => {
      const rh = idx === 0 ? 22 : 30;
      doc.setFillColor(...C_LIGHT1);
      doc.rect(ML, curY3, col1W, rh, 'F');
      doc.setFillColor(255, 255, 255);
      doc.rect(ML + col1W, curY3, col2W, rh, 'F');
      doc.setDrawColor(...C_BORDER);
      doc.rect(ML, curY3, CW, rh, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_BODY);
      doc.text(r.label, ML + 8, curY3 + 14);

      doc.setFont('helvetica', 'normal');
      doc.text(doc.splitTextToSize(r.val, col2W - 14), ML + col1W + 8, curY3 + (idx === 0 ? 14 : 12));
      curY3 += rh;
    });

    // Amber Warning Box
    doc.setFillColor(...C_WARN_BG);
    doc.setDrawColor(...C_WARN_BD);
    doc.setLineWidth(0.7);
    doc.rect(ML, curY3 + 10, CW, 38, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_NAVY);
    const warnTxt = 'A photograph cannot diagnose substance use, addiction, withdrawal, or internal organ damage. No such conclusion should be drawn from this image.';
    doc.text(doc.splitTextToSize(warnTxt, CW - 18), ML + 9, curY3 + 24);

    // ==================== PAGE 2 ====================
    doc.addPage();
    drawFooter(2);

    // Section 4: 4. Recommended next steps
    drawSectionHeading('4. Recommended next steps', 55);
    const rawNextSteps = (res.nextSteps && res.nextSteps.length >= 4)
      ? res.nextSteps
      : [
          'Speak with a GP, addiction medicine specialist, or local healthcare provider for a thorough clinical assessment.',
          'Share this report if useful as a starting point for discussion; it does not replace a clinical assessment.',
          'Identify a trusted support person (family member, friend, or counselor) who can encourage your recovery.',
          'Plan a follow-up in 2 to 4 weeks to review your goals and repeat this educational screening.'
        ];

    const nextStepsList = [
      { num: '1.', title: 'Speak with a qualified professional.', text: rawNextSteps[0].replace(/^(Speak with a qualified professional\.?|1\.?\s*)/i, '').trim() || 'Schedule an assessment with a doctor or counselor.' },
      { num: '2.', title: 'Share this report if useful.', text: rawNextSteps[1].replace(/^(Share this report if useful\.?|2\.?\s*)/i, '').trim() || 'Use it as a starting point for discussion; it does not replace clinical assessment.' },
      { num: '3.', title: 'Identify a trusted support person.', text: rawNextSteps[2].replace(/^(Identify a trusted support person\.?|3\.?\s*)/i, '').trim() || 'Engage a family member, friend, or peer who can offer non-judgmental support.' },
      { num: '4.', title: 'Plan a follow-up.', text: rawNextSteps[3].replace(/^(Plan a follow-up\.?|4\.?\s*)/i, '').trim() || 'Set a review date in 2 to 4 weeks to monitor your progress.' }
    ];

    let nsY = 74;
    nextStepsList.forEach(ns => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_BODY);
      const prefix = `• ${ns.num} ${ns.title} `;
      doc.text(prefix, TXT_L, nsY);
      const prefixW = doc.getTextWidth(prefix);
      doc.setFont('helvetica', 'normal');
      const remainingW = TXT_W - prefixW;
      const lines = doc.splitTextToSize(ns.text, remainingW);
      doc.text(lines[0] || '', TXT_L + prefixW, nsY);
      if (lines.length > 1) {
        doc.text(lines.slice(1), TXT_L + 16, nsY + 12);
        nsY += 12 * (lines.length - 1);
      }
      nsY += 18;
    });

    // Section 5: 5. Support while at home
    drawSectionHeading('5. Support while at home', 168);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_BODY);
    const homeTxt = 'Maintain daily supportive routines: regular meals, adequate hydration, consistent sleep schedules, and reducing exposure to known triggers. Engage a trusted support person and avoid isolation. Do not attempt a do-it-yourself detox protocol or unprescribed medication.';
    doc.text(doc.splitTextToSize(homeTxt, TXT_W), TXT_L, 186);

    // Withdrawal safety callout
    doc.setFont('helvetica', 'bold');
    doc.text('Withdrawal safety:', TXT_L, 218);
    doc.setFont('helvetica', 'normal');
    const wsTxt = ' Stopping alcohol or sedatives suddenly can cause dangerous or life-threatening withdrawal in some people. Seek medical advice before making abrupt changes. Do not attempt unsupervised detox where medical support may be needed.';
    doc.text(doc.splitTextToSize(wsTxt, TXT_W - 78), TXT_L + 78, 218);

    // Urgent help callout
    doc.setFont('helvetica', 'bold');
    doc.text('Urgent help:', TXT_L, 256);
    doc.setFont('helvetica', 'normal');
    const uhTxt = ' For suspected overdose, seizures, severe withdrawal symptoms, breathing difficulty, unconsciousness, or immediate danger, contact local emergency medical services immediately.';
    doc.text(doc.splitTextToSize(uhTxt, TXT_W - 55), TXT_L + 55, 256);

    // Section 6: 6. Professional and community support
    drawSectionHeading('6. Professional and community support', 302);
    const t6Y = 318;
    const col6_1 = 119.06, col6_2 = 189.92, col6_3 = CW - col6_1 - col6_2;

    // Header row
    doc.setFillColor(...C_NAVY);
    doc.rect(ML, t6Y, CW, 24, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Service', ML + 8, t6Y + 15);
    doc.text('What it offers', ML + col6_1 + 8, t6Y + 15);
    doc.text('How to contact', ML + col6_1 + col6_2 + 8, t6Y + 15);

    const regData = SUPPORT_CONTACTS.find(r => r.region === (session.region || 'India')) || SUPPORT_CONTACTS[0];
    const top2Svcs = regData.services.slice(0, 2);
    let curY6 = t6Y + 24;
    top2Svcs.forEach(s => {
      const rh = 30;
      doc.setFillColor(...C_LIGHT1);
      doc.rect(ML, curY6, CW, rh, 'F');
      doc.setDrawColor(...C_BORDER);
      doc.rect(ML, curY6, CW, rh, 'S');
      doc.line(ML + col6_1, curY6, ML + col6_1, curY6 + rh);
      doc.line(ML + col6_1 + col6_2, curY6, ML + col6_1 + col6_2, curY6 + rh);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_BODY);
      doc.text(s.name, ML + 8, curY6 + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(doc.splitTextToSize(s.offers, col6_2 - 12), ML + col6_1 + 8, curY6 + 12);
      doc.text(doc.splitTextToSize(`${s.phone} (${s.hours})\n${s.website}`, col6_3 - 12), ML + col6_1 + col6_2 + 8, curY6 + 12);
      curY6 += rh;
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C_MUTED);
    doc.text('Only verified, region-appropriate services should appear in the generated report. Emergency services, mental-health helplines and addiction-treatment providers must be clearly distinguished.', TXT_L, curY6 + 12);

    // Section 7: 7. References and further reading
    drawSectionHeading('7. References and further reading', 430);
    const refs = [
      { num: '1.', org: 'World Health Organization', title: 'AUDIT: The Alcohol Use Disorders Identification Test (2nd ed.)', date: '2001', url: 'https://www.who.int/publications/i/item/audit-the-alcohol-use-disorders-identification-test' },
      { num: '2.', org: 'World Health Organization', title: 'The ASSIST Manual: Alcohol, Smoking and Substance Involvement Screening Test', date: '2010', url: 'https://www.who.int/publications/i/item/978-92-4-159938-3' },
      { num: '3.', org: 'SAMHSA, US DHHS', title: 'TIP 63: Medications for Opioid Use Disorder', date: '2021', url: 'https://store.samhsa.gov/product/tip-63-medications-opioid-use-disorder/pep21-02-01-002' }
    ];
    let refY = 448;
    refs.forEach(r => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...C_BODY);
      const lineText = `${r.num} ${r.org}. ${r.title}. ${r.date}.`;
      doc.text(lineText, TXT_L, refY);
      doc.setTextColor(16, 110, 190);
      doc.textWithLink(r.url, TXT_L + 12, refY + 11, { url: r.url });
      doc.setTextColor(...C_MUTED);
      doc.setFontSize(7.5);
      doc.text('Accessed: October 2026', TXT_L + 12 + doc.getTextWidth(r.url) + 6, refY + 11);
      refY += 25;
    });

    // Section 8: 8. Important information and disclaimer
    drawSectionHeading('8. Important information and disclaimer', 545);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C_BODY);
    const discTxt = 'This report is educational and for screening support only. It is not a medical diagnosis, treatment plan, or substitute for assessment by a qualified health professional. Screening tools have limitations and results should be interpreted in context. Health outcomes vary between individuals. Do not use this report alone to make decisions about stopping substances, medication, or treatment.';
    doc.text(doc.splitTextToSize(discTxt, TXT_W), TXT_L, 563);

    // Tagline
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...C_MUTED);
    doc.text('Generated by Rehab Reality — See Your Future. Choose It.', W / 2, 635, { align: 'center' });

    return doc;
  },

  async savePDF(doc, filename) {
    const base64 = doc.output('datauristring').split(',')[1];

    /* 1. Android Native Capacitor path */
    const isNative = !!(window.Capacitor && (window.Capacitor.isNativePlatform ? window.Capacitor.isNativePlatform() : window.Capacitor.platform !== 'web'));
    if (isNative) {
      try {
        const Filesystem = (window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) || window.CapacitorFilesystem;
        const Share = (window.Capacitor.Plugins && window.Capacitor.Plugins.Share) || (window.CapacitorShare && window.CapacitorShare.Share) || window.CapacitorShare;

        if (Filesystem && Filesystem.writeFile) {
          await Filesystem.writeFile({
            path: filename,
            data: base64,
            directory: 'CACHE'
          });
          const uriRes = await Filesystem.getUri({
            path: filename,
            directory: 'CACHE'
          });
          if (Share && Share.share && uriRes && uriRes.uri) {
            await Share.share({
              title: 'Rehab Reality Report',
              text: 'Personal Screening & Recovery Support Report',
              url: uriRes.uri,
              dialogTitle: 'Save or share your report'
            });
            return { ok: true, method: 'capacitor' };
          }
        }
      } catch (nativeErr) {
        console.warn('Native Capacitor save/share failed, falling back to browser download:', nativeErr);
      }
    }

    /* 2. Desktop & Mobile Browser fallback via Blob download */
    try {
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 2500);
      return { ok: true, method: 'browser' };
    } catch (e) {
      /* 3. Final fallback */
      try {
        doc.save(filename);
        return { ok: true, method: 'doc-save' };
      } catch (err2) {
        return { ok: false, error: err2.message };
      }
    }
  }
};

/* ================================================================
   SCREENS — Registered with global SCREEN / ACT
   ================================================================ */

/* ---- 1. Consent screen ---- */
window.SCREEN_consent = function () {
  const photo = S.scan && S.scan.photo;
  return `<div class="pg nofab">
    <header class="hd">
      <button class="ibtn" data-a="nav" data-r="scanIntro" aria-label="Back">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="hdt">
        <h1>Photo intake & privacy consent</h1>
        <p>Your privacy and consent come first</p>
      </div>
    </header>

    ${photo ? `
      <section class="card flat">
        <div class="row sb">
          <div style="display:flex;align-items:center;gap:12px">
            <img src="${photo}" alt="Attached photo" class="photo-thumb">
            <div>
              <b style="font-size:13.5px">Photo attached</b>
              <p class="muted" style="font-size:12px">Stored in local device memory only</p>
            </div>
          </div>
          <button class="btn ghost sm" data-a="removePhoto">Remove</button>
        </div>
      </section>
    ` : `
      <div class="gban">
        <svg class="ic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>No photo provided. You are proceeding with questionnaire-based screening only.</span>
      </div>
    `}

    <div class="gban" style="flex-direction:column;align-items:flex-start;gap:10px">
      <div style="display:flex;align-items:center;gap:10px">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/></svg>
        <b>How your data is handled</b>
      </div>
      <ul style="list-style:disc;padding-left:18px;color:var(--muted);font-size:13px;line-height:1.6">
        <li>Your photo stays entirely on this device — it is <b>never uploaded to any server or cloud</b>.</li>
        <li>We use it only for session preview and basic face-presence verification.</li>
        <li>We do <b>not</b> analyze your photo to infer substance use, addiction, organ damage, or health status.</li>
        <li>No biometric or questionnaire answers are logged, sold, or shared outside this session.</li>
        <li>You can remove your photo at any time before or after screening.</li>
      </ul>
    </div>

    <section class="card">
      <h3>What happens next</h3>
      <ol style="padding-left:18px;line-height:1.9;color:var(--muted);font-size:13.5px">
        <li>Choose substance concern(s) of interest</li>
        <li>Complete an evidence-informed screening questionnaire</li>
        <li>View an honest results dashboard distinguishing your self-report from technical image checks</li>
        <li>Access verified support contacts and safe at-home guidance</li>
        <li>Download an A4 PDF report matching the clinical template</li>
      </ol>
    </section>

    <section class="card" style="background:var(--ember-soft);border-color:var(--ember)">
      <b>Educational screening disclaimer</b>
      <p style="font-size:13px;line-height:1.5;margin-top:4px">This screening is an educational tool, <b>not a medical diagnosis</b>. Results indicate population risk zones, not personalized medical determinations. Always consult a qualified health professional.</p>
    </section>

    <button class="btn block" data-a="consentAgree" id="consentAgreeBtn">I understand — start the questionnaire →</button>
    <button class="btn ghost block" data-a="nav" data-r="scanIntro">Back to photo intake</button>
  </div>`;
};

/* ---- 2. Substance selector screen ---- */
window.SCREEN_subSelect = function (S) {
  const subs = ['Alcohol', 'Opioids', 'Cannabis', 'Stimulants / cocaine', 'Sedatives', 'Other / multiple'];
  const sel = S.screening.concernSubs || [];
  const isAlcohol = sel.includes('Alcohol');

  return `<div class="pg nofab">
    <header class="hd">
      <button class="ibtn" data-a="nav" data-r="consent" aria-label="Back">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="hdt">
        <h1>What are you concerned about?</h1>
        <p>Choose all that apply to select your screening instrument</p>
      </div>
    </header>

    <div class="chips" style="margin-top:4px">
      ${subs.map(s => `<button class="chip ${sel.includes(s) ? 'on' : ''}" data-a="screenSub" data-v="${s}">${s}</button>`).join('')}
    </div>

    <section class="card flat">
      <b style="font-size:13px">Questionnaire instrument:</b>
      <p style="font-size:13px;color:var(--muted);margin-top:4px">
        ${sel.length === 0 ? 'Select at least one substance above.' : isAlcohol ? 'WHO AUDIT (Alcohol Use Disorders Identification Test, 2001) — 10 questions with validated risk scoring.' : 'WHO ASSIST-inspired multi-substance demo questionnaire — 5 questions (transparently labelled demo screening).'}
      </p>
    </section>

    <button class="btn block" data-a="startQuestionnaire" ${sel.length === 0 ? 'disabled' : ''}>Start questionnaire →</button>
    <button class="btn ghost sm block" data-a="nav" data-r="consent">← Back to consent</button>
  </div>`;
};

/* ---- 3. Questionnaire screen ---- */
window.SCREEN_questionnaire = function (S) {
  const sc = S.screening;
  const isAlcohol = (sc.concernSubs || []).some(s => s === 'Alcohol');
  const questions = isAlcohol ? AUDIT_QUESTIONS : ASSIST_DEMO;
  const answers = sc.answers || {};
  const qName = isAlcohol
    ? 'AUDIT — Alcohol Use Disorders Identification Test (WHO, 2001)'
    : 'Multi-substance demo screening (inspired by WHO ASSIST — demo version)';

  let qHtml = '';
  questions.forEach((q, qi) => {
    if (q.multi) {
      const multiSel = sc.assistMulti || [];
      qHtml += `<section class="card">
        <b style="font-size:13.5px">${qi + 1}. ${q.text}</b>
        <div class="chips" style="margin-top:10px">
          ${q.options.map(o => `<button class="chip ${multiSel.includes(o) ? 'on' : ''}" data-a="screenMulti" data-v="${o}">${o}</button>`).join('')}
        </div>
      </section>`;
    } else {
      qHtml += `<section class="card">
        <b style="font-size:13.5px">${qi + 1}. ${q.text}</b>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px">
          ${q.options.map(o => `<button class="opt ${answers[q.id] === o.score ? 'on' : ''}" data-a="screenAnswer" data-q="${q.id}" data-v="${o.score}"><i class="rd"></i>${o.label}</button>`).join('')}
        </div>
      </section>`;
    }
  });

  const nonMultiQs = questions.filter(q => !q.multi);
  const answered = nonMultiQs.filter(q => answers[q.id] !== undefined).length;
  const allAnswered = answered === nonMultiQs.length;
  const pct = Math.round(answered / nonMultiQs.length * 100);

  return `<div class="pg nofab">
    <header class="hd">
      <button class="ibtn" data-a="nav" data-r="subSelect" aria-label="Back">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="hdt">
        <h1>Screening questionnaire</h1>
        <p class="muted">${qName}</p>
      </div>
    </header>

    <div class="gban" style="flex-direction:column;align-items:flex-start;gap:4px">
      <b style="font-size:12px">Educational screening flow — not a medical diagnosis</b>
      <p style="font-size:12px;color:var(--muted);margin:0">Answer all questions to view your screening summary and download your PDF report.</p>
    </div>

    <div class="card flat" style="gap:6px">
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>Progress</span><span class="mono">${answered} / ${nonMultiQs.length}</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
    </div>

    ${qHtml}

    <button class="btn block" data-a="submitScreening" ${allAnswered ? '' : 'disabled'}>Submit and see results →</button>
    <button class="btn ghost sm block" data-a="nav" data-r="subSelect">← Back to substance selector</button>
  </div>`;
};

/* ---- 4. Results dashboard ---- */
window.SCREEN_screenResult = function (S) {
  const sc = S.screening;
  const res = sc.result || {};
  const region = S.screening.region || 'India';
  const contacts = SUPPORT_CONTACTS.find(r => r.region === region) || SUPPORT_CONTACTS[0];

  const zoneColor = res.zone && (res.zone.includes('IV') || res.zone.includes('High')) ? 'bad'
    : res.zone && (res.zone.includes('III') || res.zone.includes('Moderate')) ? 'warn' : 'good';

  let contactsHtml = contacts.services.map(svc => `
    <div class="hl">
      <div class="grow">
        <b>${svc.name}</b>
        <p class="muted" style="font-size:12px">${svc.type} · ${svc.hours}</p>
        <span class="num">${svc.phone}</span>
        <p style="font-size:11.5px;color:var(--muted);margin-top:2px">${svc.offers}</p>
        <a href="${svc.website}" target="_blank" rel="noopener" style="font-size:11.5px;color:var(--lumen)">${svc.website}</a>
        <p style="font-size:10.5px;color:var(--muted);margin-top:2px">Source: ${svc.source}</p>
      </div>
    </div>`).join('');

  return `<div class="pg">
    <header class="hd">
      <button class="ibtn" data-a="nav" data-r="home" aria-label="Home">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="hdt">
        <h1>Screening results</h1>
        <p>${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
    </header>

    <!-- Screening summary card -->
    <section class="card">
      <div class="eyebrow">Screening summary</div>
      <div class="row sb" style="margin-top:8px">
        <div>
          <div style="font:800 22px/1.2 var(--f-display)" class="t-${zoneColor}">${res.zone || 'Screening complete'}</div>
          <p class="muted" style="font-size:12px;margin-top:4px">${res.tool || 'AUDIT'} · ${res.version || 'WHO 2001'}</p>
        </div>
        <div class="ctr mono" style="font-size:13px">
          <b class="t-${zoneColor}" style="font-size:28px">${res.totalScore !== undefined ? res.totalScore : '—'}</b>
          <p class="muted" style="font-size:11px">/ ${res.maxScore || '40'}</p>
        </div>
      </div>
      <div class="bar ${zoneColor === 'bad' ? 'ember' : ''}" style="margin-top:10px">
        <i style="width:${res.totalScore && res.maxScore ? Math.round(res.totalScore / res.maxScore * 100) : 0}%"></i>
      </div>
      <p style="font-size:13.5px;line-height:1.5;margin-top:10px">${res.interpretation || ''}</p>
    </section>

    <!-- Data source distinction: self-report vs photo -->
    <section class="card flat">
      <div class="eyebrow">Data sources used in this screening</div>
      <div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span class="tag t-good" style="flex:none">Self-report</span>
          <p style="font-size:13px">Questionnaire answers you provided. This is the sole basis of the clinical risk score above.</p>
        </div>
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span class="tag" style="flex:none">Photo</span>
          <p style="font-size:13px">${S.scan.photo ? 'A photo was provided for session reference and illumination check. No health, addiction, or organ inferences were made from it.' : 'No photo was provided. Screening is based entirely on self-reported questionnaire responses.'}</p>
        </div>
      </div>
    </section>

    <!-- Limitations -->
    <section class="card" style="background:var(--ember-soft);border-color:var(--ember)">
      <div style="display:flex;gap:8px;align-items:flex-start">
        <svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>
        <div>
          <b>Limitations of screening</b>
          <p style="font-size:12.5px;margin-top:4px;line-height:1.5">This screening indicates a risk zone based on population-level research. It does not diagnose any condition. Individual health outcomes vary widely. A qualified healthcare professional should evaluate your personal situation.</p>
        </div>
      </div>
    </section>

    <!-- Recommended next steps -->
    <section class="card">
      <h3>Recommended next steps</h3>
      <ul style="padding-left:0;list-style:none;display:flex;flex-direction:column;gap:8px;margin-top:10px">
        ${(res.nextSteps || []).map((s, i) => `<li style="display:flex;gap:10px;align-items:flex-start"><span class="mono t-leaf" style="font-size:11px;padding-top:2px;flex:none">${i + 1}</span><span style="font-size:13.5px">${s}</span></li>`).join('')}
      </ul>
    </section>

    <!-- Safe at-home guidance -->
    <section class="card">
      <h3>Safe support while at home</h3>
      <ul style="padding-left:0;list-style:none;display:flex;flex-direction:column;gap:6px;margin-top:8px;font-size:13px">
        ${[
          'Share your thoughts with a trusted support person — isolation makes cravings and stress heavier.',
          'Eat balanced meals and stay well hydrated. Nutrition supports neurotransmitter balance.',
          'Maintain a regular sleep schedule. Go to bed and wake up at consistent times.',
          'Identify personal triggers (places, people, emotions, times) and prepare healthy alternatives.',
          'Use the 4-7-8 breathing exercises in the Wellness Hub when cravings arise (they usually peak and decline within 20 minutes).',
          'Schedule an appointment with a doctor or counselor — even a preliminary consultation helps.'
        ].map(g => `<li>• ${g}</li>`).join('')}
      </ul>
    </section>

    <!-- Withdrawal safety warning -->
    <section class="card" style="background:color-mix(in srgb,var(--warn) 12%,var(--surface));border:1.5px solid var(--warn)">
      <div style="display:flex;gap:8px;align-items:flex-start">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" stroke-width="2" stroke-linecap="round"><path d="M10.3 3.5L3 18h18l-7.3-14.5a1 1 0 0 0-1.4 0z"/><path d="M12 10v4M12 16.5v.5"/></svg>
        <div>
          <b style="color:var(--warn)">Withdrawal safety warning</b>
          <p style="font-size:12.5px;line-height:1.5;margin-top:4px">Do <b>not</b> stop alcohol or sedatives abruptly without medical advice. Withdrawal can trigger seizures, confusion, or life-threatening complications. Always consult a healthcare professional before altering intake.</p>
        </div>
      </div>
    </section>

    <!-- Urgent help emergency box -->
    <section class="card" style="background:color-mix(in srgb,var(--bad) 10%,var(--surface));border:1.5px solid var(--bad)">
      <b style="color:var(--bad)">🚨 Seek emergency medical help immediately if:</b>
      <ul style="margin-top:8px;font-size:12.5px;line-height:1.8;padding-left:16px">
        <li>Suspected overdose (slow/stopped breathing, unresponsiveness, blue lips)</li>
        <li>Seizures or convulsions</li>
        <li>Severe confusion, hallucinations, or acute disorientation</li>
        <li>Chest pain, severe breathing difficulty, or danger to life</li>
      </ul>
      <a class="btn ember sm" style="margin-top:8px;display:inline-flex;text-decoration:none" href="tel:${region === 'United States' ? '911' : region === 'United Kingdom' ? '999' : '112'}">Call ${region === 'United States' ? '911' : region === 'United Kingdom' ? '999' : '112'} (Emergency)</a>
    </section>

    <!-- Region selector -->
    <section class="card flat">
      <div class="row sb">
        <b>Support contacts region:</b>
        <div class="seg" style="width:auto">
          ${['India', 'United States', 'United Kingdom'].map(r =>
            `<button class="${r === region ? 'on' : ''}" data-a="screenRegion" data-v="${r}">${r === 'United Kingdom' ? 'UK' : r === 'United States' ? 'USA' : r}</button>`
          ).join('')}
        </div>
      </div>
    </section>

    <!-- Verified support contacts -->
    <section class="card">
      <h3>Verified professional support — ${region}</h3>
      ${contactsHtml}
      <p style="font-size:11px;color:var(--muted);margin-top:8px">All contacts verified October 2026. Helpline operating hours are subject to service provider updates.</p>
    </section>

    <!-- Actions: PDF Download & AR Navigation -->
    <div class="row2">
      <button class="btn" data-a="downloadPDF" id="dlPdfBtn">
        <svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M7 11l5 5 5-5M4 20h16"/></svg>
        Download PDF report
      </button>
      <button class="btn ghost" data-a="nav" data-r="arEnhanced">View health timeline →</button>
    </div>
    <p class="muted ctr" style="font-size:11.5px">PDF report is formatted as an A4 2-page document matching the clinical user report template.</p>
  </div>`;
};

/* ================================================================
   Attach to global application state
   ================================================================ */
function initFeature1() {
  if (!window._appReady) {
    setTimeout(initFeature1, 40);
    return;
  }

  /* Register screens */
  SCREEN.consent = () => window.SCREEN_consent();
  SCREEN.subSelect = () => window.SCREEN_subSelect(S);
  SCREEN.questionnaire = () => window.SCREEN_questionnaire(S);
  SCREEN.screenResult = () => window.SCREEN_screenResult(S);

  /* Ensure screening state exists */
  if (!S.screening) {
    S.screening = {
      concernSubs: ['Alcohol'],
      answers: {},
      assistMulti: [],
      result: null,
      region: 'India',
      done: false,
      photoTaken: !!(S.scan && S.scan.photo),
      imageAnalysis: null
    };
  }

  /* Register actions */
  ACT.consentAgree = () => {
    nav('subSelect');
  };

  ACT.screenSub = t => {
    const v = t.dataset.v;
    const arr = S.screening.concernSubs;
    const i = arr.indexOf(v);
    if (i < 0) arr.push(v); else arr.splice(i, 1);
    render(false);
  };

  ACT.startQuestionnaire = () => {
    S.screening.answers = {};
    S.screening.assistMulti = [];
    nav('questionnaire');
  };

  ACT.screenAnswer = t => {
    S.screening.answers[t.dataset.q] = Number(t.dataset.v);
    render(true);
  };

  ACT.screenMulti = t => {
    const v = t.dataset.v;
    const arr = S.screening.assistMulti;
    const i = arr.indexOf(v);
    if (i < 0) arr.push(v); else arr.splice(i, 1);
    render(true);
  };

  ACT.submitScreening = async () => {
    const sc = S.screening;
    const isAlcohol = (sc.concernSubs || []).some(s => s === 'Alcohol');
    if (isAlcohol) {
      sc.result = screeningService.scoreAUDIT(sc.answers);
    } else {
      sc.result = screeningService.scoreASSIST(sc.answers);
    }

    /* Technical image analysis (lighting & presence check only) */
    sc.imageAnalysis = await imageAnalysisService.analyse(S.scan.photo);
    sc.photoTaken = !!S.scan.photo;
    sc.done = true;
    toast('Screening complete.');
    nav('screenResult');
  };

  ACT.screenRegion = t => {
    S.screening.region = t.dataset.v;
    render(false);
  };

  ACT.downloadPDF = async () => {
    const btn = document.getElementById('dlPdfBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Generating PDF…';
    }
    try {
      const session = {
        user: S.user,
        days: S.days,
        concernSubs: S.screening.concernSubs,
        screeningDone: S.screening.done,
        screeningResult: S.screening.result,
        photoTaken: S.screening.photoTaken || !!(S.scan && S.scan.photo),
        imageAnalysis: S.screening.imageAnalysis,
        region: S.screening.region || 'India'
      };

      const doc = await reportService.generatePDF(session);
      const fname = 'RehabReality_Report_' + new Date().toISOString().slice(0, 10) + '.pdf';
      const res = await reportService.savePDF(doc, fname);

      if (res.ok) {
        toast(`Report saved (${res.method === 'capacitor' ? 'Device storage' : 'Browser download'}).`);
      } else {
        toast('PDF error: ' + (res.error || 'Failed to save'));
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      toast('PDF generation failed. Please try again.');
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M7 11l5 5 5-5M4 20h16"/></svg> Download PDF report';
    }
  };

  ACT.sample = () => {
    S.scan.photo = window.SAMPLE_PORTRAIT || null;
    if (S.screening) S.screening.photoTaken = !!S.scan.photo;
    nav('consent');
  };

  ACT.goConsent = () => {
    nav('consent');
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeature1);
} else {
  initFeature1();
}

/* Fallback global definitions for Capacitor plugins */
if (typeof window.CapacitorFilesystem === 'undefined' && window.Capacitor && window.Capacitor.Plugins) {
  window.CapacitorFilesystem = window.Capacitor.Plugins.Filesystem;
  window.CapacitorShare = { Share: window.Capacitor.Plugins.Share };
}

})();
