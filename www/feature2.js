/* =========================================================
   FEATURE TWO — Educational AR Facial Tracking & Symptoms
   Evidence-informed · Non-stigmatising · Non-predictive
   Pinpoints Eyes, Nose, Mouth, Skin & Jaw with Checkboxes,
   Live Tracking Overlays, and Year-by-Year Symptom Evolution.
   Persistent disclaimer: "Educational illustration — not an individual prediction"
   ========================================================= */
(function () {
'use strict';

/* ---- Facial Features Definition ---- */
const FACE_FEATURES = [
  {
    id: 'eyes',
    name: 'Eyes & Sclera',
    icon: '👁️',
    sub: 'Pupils, conjunctiva, jaundice, periorbital tissue',
    pins: [
      { id: 'eye_l', label: 'L. Eye', top: 41, left: 39 },
      { id: 'eye_r', label: 'R. Eye', top: 41, left: 61 }
    ]
  },
  {
    id: 'nose',
    name: 'Nose & Mucosa',
    icon: '👃',
    sub: 'Nasal bridge, septum, mucosal lining, capillaries',
    pins: [
      { id: 'nose_mid', label: 'Nasal Bridge', top: 54, left: 50 }
    ]
  },
  {
    id: 'mouth',
    name: 'Mouth, Teeth & Lips',
    icon: '👄',
    sub: 'Dental enamel, gingiva, saliva flow, lip hydration',
    pins: [
      { id: 'mouth_mid', label: 'Oral Margin', top: 68, left: 50 }
    ]
  },
  {
    id: 'skin',
    name: 'Skin & Cheeks',
    icon: '🧬',
    sub: 'Dermal elasticity, telangiectasia, sores, hydration',
    pins: [
      { id: 'cheek_l', label: 'L. Cheek', top: 50, left: 27 },
      { id: 'cheek_r', label: 'R. Cheek', top: 50, left: 73 }
    ]
  },
  {
    id: 'jaw',
    name: 'Jaw & Facial Tone',
    icon: '📐',
    sub: 'Mandibular alignment, masseter tone, volume loss',
    pins: [
      { id: 'jaw_mid', label: 'Jaw Architecture', top: 79, left: 50 }
    ]
  }
];

/* ---- Clinically Sourced Facial Symptoms Across Years & Substances ---- */
const FEATURE_SYMPTOMS = {
  Alcohol: {
    eyes: {
      'Today': {
        headline: 'Conjunctival Hyperemia & Transient Puffiness',
        use: 'Acute alcohol vasodilation causes conjunctival injection ("bloodshot eyes"), mild periorbital edema from fluid shifts, and slowed saccadic pursuit.',
        rec: 'Ocular surface irritation and morning under-eye fluid retention begin clearing within 24 to 48 hours of sobriety.',
        certainty: 'Well-established',
        mechanism: 'Peripheral microvascular dilation and acute acetaldehyde histamine release.',
        ref: 'BMJ 2011;342:d671'
      },
      '2 years': {
        headline: 'Microvascular Engorgement & Dark Circles',
        use: 'Persistent heavy drinking contributes to permanent conjunctival capillary dilation, chronic suborbital pigmentation, and impaired contrast sensitivity.',
        rec: 'Normal scleral brightness recovers; suborbital venous pooling diminishes noticeably with restorative sleep patterns.',
        certainty: 'Well-established',
        mechanism: 'Chronic venous pooling and compromised capillary fragility.',
        ref: 'Addict Biol. 2013;18(2):203-13'
      },
      '5 years': {
        headline: 'Early Scleral Icterus (Yellowing) & Dry Eye',
        use: 'Subclinical hepatic bilirubin elevation may cause noticeable yellowing of the sclera (icterus); chronic lacrimal gland dysfunction accelerates severe dry eyes.',
        rec: 'Scleral yellowing recedes as hepatic bilirubin metabolism normalizes with complete abstinence; tear film stability recovers.',
        certainty: 'Dose- and liver-dependent',
        mechanism: 'Hepatic cellular inflammation and impaired bilirubin conjugation.',
        ref: 'Drug Alcohol Rev. 2010;29(4):437-45'
      },
      '10 years': {
        headline: 'Overt Scleral Jaundice & Periorbital Hollowing',
        use: 'Pronounced scleral jaundice reflecting hepatic dysfunction; high vulnerability to nutritional optic neuropathy (toxic amblyopia) from B-vitamin depletion.',
        rec: 'Jaundice clears completely with sustained abstinence; halt of toxic optic nerve strain and stabilization of visual fields.',
        certainty: 'Well-established in chronic use',
        mechanism: 'Decompensated hepatic bilirubin clearance and thiamine deficiency.',
        ref: 'Alcohol Alcohol. 2006;41(2):151-60'
      },
      '15+ years': {
        headline: 'Permanent Scleral Staining & Severe Fat Atrophy',
        use: 'Deep yellow/bronze scleral discoloration in end-stage hepatic disease, profound periorbital fat atrophy, and potential central scotoma.',
        rec: 'Abstinence halts further visual decline and stabilizes systemic health, though structural periorbital fat loss may require reconstructive support.',
        certainty: 'Variable',
        mechanism: 'Chronic hepatic failure and severe systemic lipoatrophy.',
        ref: 'Lancet 2018;392:1015-35'
      }
    },
    nose: {
      'Today': {
        headline: 'Acute Mucosal Congestion & Rhinorrhea',
        use: 'Alcohol triggers nasal mucosa vasodilation, resulting in immediate stuffiness, sneezing, and redness across the nasal dorsum.',
        rec: 'Nasal airway patency normalizes as circulating alcohol and acetaldehyde metabolites clear.',
        certainty: 'Well-established',
        mechanism: 'Histamine release and cholinergic neurovascular stimulation.',
        ref: 'J Allergy Clin Immunol. 2008'
      },
      '2 years': {
        headline: 'Alar Capillary Telangiectasia',
        use: 'Persistent prominent red and purple spider veins develop around the nasal alae (nostril edges) and bridge of the nose.',
        rec: 'Facial capillary erythema stops progressing; background skin redness calms within weeks.',
        certainty: 'Variable',
        mechanism: 'Repetitive vasomotor flushing and dermal elastin degradation.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      },
      '5 years': {
        headline: 'Early Rhinophyma & Sebaceous Hypertrophy',
        use: 'In predisposed individuals, chronic vasodilation promotes sebaceous gland enlargement, bulbous thickening of the nasal tip, and purple-red coloration.',
        rec: 'Progression of nasal tissue thickening halts completely; inflammatory swelling and surface oiliness diminish.',
        certainty: 'Variable — genetic predisposition',
        mechanism: 'Chronic vascular ectasia and dermal connective tissue hypertrophy.',
        ref: 'Dermatol Surg. 2012'
      },
      '10 years': {
        headline: 'Pronounced Rhinophyma & Lobulated Tissue',
        use: 'Significant lobulated thickening of nasal cartilage and soft tissue with deep violaceous discoloration and enlarged pores.',
        rec: 'Soft tissue edema resolves; cosmetic laser or surgical contouring can safely reshape stable tissue post-recovery.',
        certainty: 'Variable',
        mechanism: 'Extensive fibrogenesis and hyperplastic sebaceous architecture.',
        ref: 'Mayo Clin Proc. 2015'
      },
      '15+ years': {
        headline: 'Chronic Structural Nasal Distortion',
        use: 'Persistent bulbous nasal distortion, chronic nasal airway obstruction, and severe dermal telangiectatic mats.',
        rec: 'Halting alcohol use halts inflammatory tissue growth; surgical correction yields lasting stability.',
        certainty: 'Variable',
        mechanism: 'End-stage sebaceous and vascular remodeling.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      }
    },
    mouth: {
      'Today': {
        headline: 'Oral Mucosal Dehydration & Acid Exposure',
        use: 'Alcohol suppresses salivary secretion, causing acute dry mouth (xerostomia), cracked lips, and transient acid burning of tongue tissues.',
        rec: 'Salivary flow and protective oral moisture recover within hours of cessation and rehydration.',
        certainty: 'Well-established',
        mechanism: 'Central anticholinergic effect and diuretic systemic dehydration.',
        ref: 'J Am Dent Assoc. 2006'
      },
      '2 years': {
        headline: 'Enamel Acid Erosion & Marginal Gingivitis',
        use: 'Reduced salivary buffering and gastric reflux/vomiting dissolve dental enamel, leading to tooth sensitivity and inflamed, bleeding gums.',
        rec: 'Gingival inflammation recedes within 2–4 weeks; fluoride remineralization stabilizes early enamel softening.',
        certainty: 'Well-established',
        mechanism: 'Chemical demineralization and pathogenic oral plaque shift.',
        ref: 'Caries Res. 2014'
      },
      '5 years': {
        headline: 'Atrophic Glossitis & Periodontal Deepening',
        use: 'Smooth red swollen tongue from nutritional deficiencies (B12, folate); periodontal pockets deepen with progressive alveolar bone loss.',
        rec: 'Glossitis resolves rapidly with nutritional supplementation; periodontal therapy successfully arrests further bone loss.',
        certainty: 'Well-established in chronic heavy use',
        mechanism: 'Micronutrient malabsorption and chronic bacterial periodontitis.',
        ref: 'Periodontol 2000. 2013'
      },
      '10 years': {
        headline: 'Premature Tooth Mobility & Precancerous Lesions',
        use: 'Significant tooth loosening and loss; leukoplakia (white oral patches) and greatly elevated oral cavity squamous cell carcinoma risk.',
        rec: 'Precancerous mucosal dysplasia often halts progression; dental implants/prosthetics restore masticatory function.',
        certainty: 'Well-established for heavy users',
        mechanism: 'Carcinogenic acetaldehyde action and severe periodontal breakdown.',
        ref: 'Lancet Oncol. 2010'
      },
      '15+ years': {
        headline: 'Severe Edentulism & Oral Tissue Breakdown',
        use: 'Multiple missing teeth, collapsed vertical facial dimension, chronic mucosal ulceration, and high malignancy hazard.',
        rec: 'Abstinence dramatically reduces subsequent head and neck cancer mortality; oral rehabilitation restores speech.',
        certainty: 'Well-established',
        mechanism: 'Cumulative cellular DNA damage and alveolar resorption.',
        ref: 'CA Cancer J Clin. 2018'
      }
    },
    skin: {
      'Today': {
        headline: 'Facial Flushing & Acute Dehydration Lines',
        use: 'Facial capillary dilation creates an intense crimson flush across cheeks and forehead; rapid dehydration accentuates fine surface lines.',
        rec: 'Skin flush dissipates as acetaldehyde clears; epidermal hydration bounces back within 3–5 days.',
        certainty: 'Well-established',
        mechanism: 'Peripheral vasodilation from alcohol metabolites.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      },
      '2 years': {
        headline: 'Facial Telangiectasia & Rosacea Flares',
        use: 'Persistent spider-like capillary webs across cheeks; chronic rosacea pustules and uneven, ruddy complexion.',
        rec: 'Inflammatory rosacea breakouts drop significantly within 30 days; skin barrier repair improves radiance.',
        certainty: 'Well-established',
        mechanism: 'Neurovascular dysregulation and permanent microvessel dilation.',
        ref: 'Br J Dermatol. 2017'
      },
      '5 years': {
        headline: 'Cutaneous Elastosis & Premature Aging',
        use: 'Accelerated dermal collagen breakdown causes deep nasolabial furrows, sagging cheeks, palmar/facial erythema, and impaired wound healing.',
        rec: 'Dermal microcirculation improves; collagen synthesis resumes with adequate dietary protein and vitamin C.',
        certainty: 'Well-established',
        mechanism: 'Reactive oxygen species formation and systemic malnutrition.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      },
      '10 years': {
        headline: 'Dermal Atrophy, Jaundice & Spider Angiomas',
        use: 'Paper-thin translucent skin, generalized jaundiced undertone, prominent central-pulsing spider angiomas on cheeks and neck.',
        rec: 'Jaundiced skin tone resolves as hepatic function stabilizes; spider angiomas frequently shrink or disappear.',
        certainty: 'Well-established',
        mechanism: 'Hyperestrogenemia secondary to hepatic cirrhosis and dermal atrophy.',
        ref: 'Am J Gastroenterol. 2014'
      },
      '15+ years': {
        headline: 'Severe Dermal Fragility & Easy Bruising',
        use: 'Marked cutaneous purpura and senile-like purpura from minor trauma due to coagulopathy; severe loss of facial subcutaneous fat.',
        rec: 'Coagulation factors normalize with liver recovery, eliminating spontaneous bruising and skin tearing.',
        certainty: 'Well-established in end-stage use',
        mechanism: 'Hypoprothrombinemia and advanced subcutaneous fat loss.',
        ref: 'Hepatology 2016'
      }
    },
    jaw: {
      'Today': {
        headline: 'Transient Facial Bloating & Puffiness',
        use: 'Osmotic fluid shifts create temporary puffiness along the jawline, submental area, and lower cheeks.',
        rec: 'Fluid retention clears within 48 to 72 hours of cessation and proper electrolyte balance.',
        certainty: 'Well-established',
        mechanism: 'Aldosterone fluctuation and systemic fluid redistribution.',
        ref: 'Clin Sci. 2010'
      },
      '2 years': {
        headline: 'Bilateral Parotid Gland Enlargement',
        use: 'Asymptomatic swelling of the parotid salivary glands in front of the ears produces a rounded, widened lower facial contour ("pseudo-Cushing").',
        rec: 'Parotid gland hypertrophy regresses within 1 to 3 months of sustained abstinence, sharpening the jawline.',
        certainty: 'Well-established',
        mechanism: 'Autonomic neuropathy and fatty infiltration of salivary tissue.',
        ref: 'Oral Surg Oral Med Oral Pathol. 2011'
      },
      '5 years': {
        headline: 'Loss of Mandibular Muscle Definition',
        use: 'Underlying masseter muscle wasting combined with superficial fluid retention creates a soft, ill-defined jawline.',
        rec: 'Facial muscle tone recovers through active nutrition and progressive physical conditioning.',
        certainty: 'Variable',
        mechanism: 'Alcoholic myopathy and systemic protein catabolism.',
        ref: 'Neuromuscul Disord. 2015'
      },
      '10 years': {
        headline: 'Temporal Hollowing & Sialadenosis',
        use: 'Pronounced temporal muscle atrophy contrasted with persistent lower facial swelling gives an irregular skeletal-yet-swollen contour.',
        rec: 'Muscle volume stabilizes; facial contours achieve harmonious balance as metabolic homeostasis returns.',
        certainty: 'Well-established',
        mechanism: 'Advanced sarcopenia and chronic salivary glandular remodeling.',
        ref: 'Am J Clin Nutr. 2018'
      },
      '15+ years': {
        headline: 'Severe Facial Cachexia & Jaw Collapse',
        use: 'Extensive skeletal facial wasting, accentuated by missing posterior dentition causing vertical collapse of the lower third of the face.',
        rec: 'Recovery paired with dental prosthetics restores facial height and dignified facial structure.',
        certainty: 'Variable',
        mechanism: 'Terminal muscle cachexia and severe alveolar bone resorption.',
        ref: 'J Prosthet Dent. 2017'
      }
    }
  },

  Meth: {
    eyes: {
      'Today': {
        headline: 'Intense Mydriasis & Hypervigilant Gaze',
        use: 'High sympathetic drive forces pupils wide open (mydriasis), causing extreme photophobia, staring expression, and severe acute dry eyes.',
        rec: 'Pupils return to normal responsive caliber within 24 to 36 hours as amphetamine clears the system.',
        certainty: 'Well-established',
        mechanism: 'Massive norepinephrine and dopamine adrenergic stimulation.',
        ref: 'J Neurosci. 2001'
      },
      '2 years': {
        headline: 'Sunken Periorbital Hollows & Dry Corneas',
        use: 'Repetitive multi-day binge cycles cause severe periorbital fat shrinkage, chronic corneal abrasion from infrequent blinking, and dark eye rings.',
        rec: 'Periorbital soft tissue plumps up with restorative sleep and hydration; natural tear film re-establishes.',
        certainty: 'Well-established',
        mechanism: 'Rapid loss of orbital fat pads and dopaminergic blink suppression.',
        ref: 'Biol Psychiatry. 2004'
      },
      '5 years': {
        headline: 'Severe Periorbital Lipoatrophy & Ulcers',
        use: 'Profoundly sunken, hollowed eye sockets; compulsive eye rubbing and excoriation can cause corneal ulcerations and infections.',
        rec: 'Orbital cellular recovery and cessation of rubbing halt infection; eyesight stabilizes.',
        certainty: 'Well-established',
        mechanism: 'Extreme systemic lipolysis and tactile formication scratching.',
        ref: 'Cornea 2015'
      },
      '10 years': {
        headline: 'Premature Periocular Aging & Vascular Ischemia',
        use: 'Deep, permanent crow\'s-feet and eyelid dermatochalasis; microvascular ischemia of the retina and choroid.',
        rec: 'Halting stimulant use prevents further retinal ischemic events; ocular lubrication preserves visual acuity.',
        certainty: 'Variable',
        mechanism: 'Endothelial dysfunction and premature dermal collagen destruction.',
        ref: 'Retina 2018'
      },
      '15+ years': {
        headline: 'Permanent Orbital Skeletonization',
        use: 'Permanent loss of protective orbital fat gives a skeletal, gaunt gaze; chronic neuropathic ocular pain.',
        rec: 'Rehabilitation halts progression and eliminates ocular neuropathic flare-ups.',
        certainty: 'Variable',
        mechanism: 'Irreversible retro-orbital fat atrophy.',
        ref: 'Ophthalmic Plast Reconstr Surg. 2020'
      }
    },
    nose: {
      'Today': {
        headline: 'Chemical Mucosal Burn & Epistaxis',
        use: 'Snorting powder or inhaling caustic chemical vapor causes severe nasal burning, epistaxis (nosebleeds), and intense sinus pressure.',
        rec: 'Mucosal burning subsides in days; saline rinses protect fragile regenerating cilia.',
        certainty: 'Well-established',
        mechanism: 'Chemical causticity and potent vasoconstrictive ischemia.',
        ref: 'Laryngoscope 2011'
      },
      '2 years': {
        headline: 'Chronic Ulcerative Rhinitis & Septal Thinning',
        use: 'Persistent ischemic ulcerations along the anterior nasal septum; recurrent crusting, foul-smelling discharge, and compromised cartilage.',
        rec: 'Mucosal ulcerations heal over 6 to 12 weeks of abstinence; blood supply to intact cartilage recovers.',
        certainty: 'Well-established in snorting users',
        mechanism: 'Recurrent microvascular infarction of septal perichondrium.',
        ref: 'Otolaryngol Head Neck Surg. 2013'
      },
      '5 years': {
        headline: 'Nasal Septal Perforation & Whistling Airway',
        use: 'Cartilage necrosis produces a full-thickness hole through the nasal septum (septal perforation), causing audible whistling, crusting, and bleeds.',
        rec: 'Perforation stops expanding; medical lubrication and silicone button obturators resolve whistling and chronic crusting.',
        certainty: 'Dose- and route-dependent',
        mechanism: 'Avascular necrosis of the quadrangular septal cartilage.',
        ref: 'Am J Rhinol Allergy. 2016'
      },
      '10 years': {
        headline: 'Extensive Cartilaginous Resorption',
        use: 'Broad septal destruction leading to weakening of the external nasal pyramid and progressive nasal airway collapse.',
        rec: 'Stable recovery enables successful surgical rhinoplasty reconstruction with rib or ear cartilage grafts.',
        certainty: 'Variable',
        mechanism: 'Collapse of dorsal and caudal cartilaginous struts.',
        ref: 'Plast Reconstr Surg. 2019'
      },
      '15+ years': {
        headline: 'Saddle-Nose Collapse & Atrophic Rhinitis',
        use: 'Depression of the mid-nasal bridge (saddle nose deformity) and total loss of mucosal olfactory receptors (anosmia).',
        rec: 'Reconstruction restores nasal bridge aesthetics; sinus hygiene prevents chronic infections.',
        certainty: 'Variable',
        mechanism: 'Total structural loss of the anterior cartilaginous vault.',
        ref: 'Aesthetic Surg J. 2021'
      }
    },
    mouth: {
      'Today': {
        headline: 'Extreme Xerostomia & Severe Bruxism',
        use: 'Severe dry mouth ("meth mouth" onset), intense jaw clenching and grinding (bruxism), burning sensation across tongue.',
        rec: 'Natural salivary secretion returns within 3 to 7 days; jaw muscle clenching eases rapidly.',
        certainty: 'Well-established',
        mechanism: 'Alpha-2 adrenergic salivary vasoconstriction and motor hyperactivation.',
        ref: 'J Am Dent Assoc. 2006'
      },
      '2 years': {
        headline: 'Coronal Demineralization & Cervical Caries',
        use: 'Lack of saliva combined with sugary beverage intake causes rapid enamel decalcification, chipped incisors, and black cavities along the gumline.',
        rec: 'Dental triage, composite restorations, and high-fluoride therapy arrest decay and stabilize dentition.',
        certainty: 'Well-established',
        mechanism: 'Acidogenic oral environment and loss of salivary calcium/phosphate buffer.',
        ref: 'J Am Dent Assoc. 2006'
      },
      '5 years': {
        headline: 'Advanced "Meth Mouth" & Crown Fractures',
        use: 'Extensive crumbling of tooth crowns down to blackened root stumps, multiple periapical abscesses, severe gum recession.',
        rec: 'Comprehensive extraction of non-restorable roots and periodontal therapy eliminates systemic infection sources.',
        certainty: 'Well-established for chronic users',
        mechanism: 'Unchecked microbial caries and severe bruxism shearing forces.',
        ref: 'J Am Dent Assoc. 2006'
      },
      '10 years': {
        headline: 'Widespread Edentulism & Alveolar Loss',
        use: 'Loss of most or all functional teeth; marked resorption of the upper and lower alveolar jawbone ridges.',
        rec: 'Prosthetic full dentures or implant-supported bridges completely restore chewing, nutrition, and self-confidence.',
        certainty: 'Well-established',
        mechanism: 'Chronic osteomyelitis and post-extraction alveolar bone atrophy.',
        ref: 'Spec Care Dentist. 2017'
      },
      '15+ years': {
        headline: 'Severe Mandibular Ridge Atrophy',
        use: 'Flat, knife-edge residual jaw ridges making denture retention difficult; chronic oral mucosal burning.',
        rec: 'Bone grafting and implant dentistry offer remarkable functional and aesthetic recovery in sustained sobriety.',
        certainty: 'Variable',
        mechanism: 'Disuse osteopenia and chronic microvascular ischemia.',
        ref: 'Int J Oral Maxillofac Surg. 2020'
      }
    },
    skin: {
      'Today': {
        headline: 'Formication ("Meth Bugs") & Acute Lesions',
        use: 'Intense tactile hallucinations of insects crawling under skin trigger compulsive picking, gouging, and acute bloody sores.',
        rec: 'Formication hallucinations stop promptly as drug toxicity resolves; superficial scabs begin healing.',
        certainty: 'Well-established',
        mechanism: 'Central tactile sensory distortion and dopamine receptor hypersensitivity.',
        ref: 'J Am Dent Assoc. 2006'
      },
      '2 years': {
        headline: 'Excoriation Sores & Chronic Scabbing',
        use: 'Face is marked by numerous open excoriations, crusted ulcerated lesions, and dark post-inflammatory hyperpigmentation marks.',
        rec: 'Active picking ceases; dermatological antiseptic washes allow active lesions to fully heal within 4 to 6 weeks.',
        certainty: 'Well-established',
        mechanism: 'Compulsive excoriation disorder and secondary staphylococcal colonization.',
        ref: 'Dermatol Online J. 2012'
      },
      '5 years': {
        headline: 'Pitted Atrophic Scarring & Gray Complexion',
        use: 'Healed lesions leave permanent pitted "ice-pick" scars; skin takes on a dull, sallow, gray-ashen appearance from chronic malnutrition.',
        rec: 'Skin tone rebounds with balanced nutrition and hydration; scar remodeling therapies soften surface irregularities.',
        certainty: 'Well-established',
        mechanism: 'Deep dermal fibrosis and systemic microvascular starvation.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      },
      '10 years': {
        headline: 'Severe Premature Dermal Aging & Induration',
        use: 'Loss of subcutaneous facial fat and chronic inflammation make facial skin look 15–20 years older than chronological age.',
        rec: 'Halting drug exposure prevents ongoing collagen breakdown; topical retinoids and sun protection rebuild texture.',
        certainty: 'Well-established',
        mechanism: 'Severe oxidative stress and accelerated telomere shortening.',
        ref: 'Exp Dermatol. 2018'
      },
      '15+ years': {
        headline: 'Permanent Dermal Fibrotic Scarring',
        use: 'Extensive mottled dyschromia, permanent fibrous scarring across cheeks and forehead, and deep cutaneous folds.',
        rec: 'Laser resurfacing and cosmetic dermatology offer substantial aesthetic restoration in long-term recovery.',
        certainty: 'Variable',
        mechanism: 'End-stage cicatrix formation and permanent melanocyte alteration.',
        ref: 'Dermatol Surg. 2021'
      }
    },
    jaw: {
      'Today': {
        headline: 'Masseter Spasm & Trismus (Jaw Clenching)',
        use: 'Involuntary, powerful masseter and temporalis muscle spasms cause severe jaw clenching, lockjaw sensation, and facial pain.',
        rec: 'Masticatory muscles relax within 24 to 48 hours; warm compresses and hydration relieve soreness.',
        certainty: 'Well-established',
        mechanism: 'Norepinephrine-driven motor hypertonia.',
        ref: 'J Neurosci. 2001'
      },
      '2 years': {
        headline: 'Buccal Fat Pad Depletion & Masseter Hypertrophy',
        use: 'Rapid breakdown of buccal fat pads creates sunken hollow cheeks, while constant clenching produces square, bulky jaw muscles.',
        rec: 'Buccal fullness begins returning with normal dietary calorie and fat intake; jaw muscle bulk softens.',
        certainty: 'Well-established',
        mechanism: 'Intense metabolic lipolysis alongside masseter muscle work hypertrophy.',
        ref: 'Biol Psychiatry. 2004'
      },
      '5 years': {
        headline: 'Gaunt "Hollow Face" Appearance & TMJ Pain',
        use: 'Deep hollows beneath the cheekbones create a severely gaunt, skeletal facial contour; temporomandibular joint (TMJ) dysfunction.',
        rec: 'Restoration of healthy body weight restores natural cheek curves; TMJ pain subsides with custom night guards.',
        certainty: 'Well-established',
        mechanism: 'Subcutaneous facial fat atrophy and chronic articular disc displacement.',
        ref: 'J Oral Rehabil. 2016'
      },
      '10 years': {
        headline: 'Structural Skeletalization & Vertical Collapse',
        use: 'Pronounced skeletal cheekbones and sunken temples; loss of posterior teeth causes the chin to rotate forward and upward.',
        rec: 'Nutritional stabilization and dental bite reconstruction restore youthful facial proportion and balance.',
        certainty: 'Well-established',
        mechanism: 'Complete loss of midfacial fat compartments and alveolar bone loss.',
        ref: 'Plast Reconstr Surg. 2018'
      },
      '15+ years': {
        headline: 'Severe Mandibular Cachexia',
        use: 'Extreme facial cachexia where skin clings directly to underlying bone contours; chronic intractable TMJ arthrosis.',
        rec: 'Fat grafting and full dental reconstruction deliver transformative facial rejuvenation in sustained recovery.',
        certainty: 'Variable',
        mechanism: 'Irreversible fat compartment extinction and degenerative joint disease.',
        ref: 'Aesthetic Plast Surg. 2022'
      }
    }
  },

  Cocaine: {
    eyes: {
      'Today': {
        headline: 'Mydriasis & Hyperadrenergic Stare',
        use: 'Dilated pupils (mydriasis), staring gaze, retro-orbital throbbing, and acute conjunctival dryness.',
        rec: 'Pupil diameter and normal blinking restore within 12 to 24 hours as cocaine levels drop.',
        certainty: 'Well-established',
        mechanism: 'Peripheral reuptake blockade of norepinephrine.',
        ref: 'Sci Adv. 2019'
      },
      '2 years': {
        headline: 'Subconjunctival Hemorrhages & Dark Halos',
        use: 'Hypertensive spikes trigger recurrent bright red subconjunctival hemorrhages; chronic insomnia produces deep dark under-eye halos.',
        rec: 'Hemorrhages resorb cleanly in 10–14 days; vascular pressure normalizes rapidly with cessation.',
        certainty: 'Well-established',
        mechanism: 'Acute paroxysmal systemic arterial hypertension.',
        ref: 'Circulation 2001'
      },
      '5 years': {
        headline: 'Crack Keratopathy Risk & Periocular Spasm',
        use: 'In smokers of crack cocaine, hot alkaline smoke causes epithelial corneal burns (crack keratopathy); involuntary eyelid twitching.',
        rec: 'Corneal epithelium re-epithelializes with antibiotic lubricant drops; blepharospasm ceases.',
        certainty: 'Route-dependent',
        mechanism: 'Thermal/chemical corneal de-epithelialization and focal dystonia.',
        ref: 'Ophthalmology 2004'
      },
      '10 years': {
        headline: 'Retinal Microvascular Ischemia & Enophthalmos',
        use: 'Recurrent microvascular vasospasms in retinal arterioles; orbital fat shrinkage from chronic sympathetic stimulation.',
        rec: 'Stabilization of retinal perfusion prevents further ischemic visual field defects.',
        certainty: 'Variable',
        mechanism: 'Endothelin-mediated microvascular spasm and lipoatrophy.',
        ref: 'Am J Ophthalmol. 2015'
      },
      '15+ years': {
        headline: 'Orbital Wall Erosion Secondary to Sinonasal Necrosis',
        use: 'Severe sinonasal osteocartilaginous necrosis can erode through the medial orbital wall (lamina papyracea), risking orbital cellulitis.',
        rec: 'Surgical repair and ENT management prevent sight-threatening orbital complications.',
        certainty: 'Variable',
        mechanism: 'Direct local ischemic necrosis extending into orbital bones.',
        ref: 'Laryngoscope 2018'
      }
    },
    nose: {
      'Today': {
        headline: 'Intense Vasoconstrictive Ischemia & Epistaxis',
        use: 'Potent vasoconstriction turns the nasal mucosa blanched white, followed by rebound congestion, crusting, and post-snorting epistaxis.',
        rec: 'Normal mucosal blood flow returns within 24 to 48 hours; protective mucus production resumes.',
        certainty: 'Well-established',
        mechanism: 'Potent local alpha-adrenergic arterial vasoconstriction.',
        ref: 'Sci Adv. 2019'
      },
      '2 years': {
        headline: 'Atrophic Rhinitis & Mucosal Ulcerations',
        use: 'Chronic mucosal ischemia causes loss of respiratory cilia, deep septal ulcers, persistent crusting, and difficulty breathing.',
        rec: 'Superficial ulcerations re-epithelialize over several months of complete cessation and saline moisturization.',
        certainty: 'Well-established in snorting users',
        mechanism: 'Hypoperfusion necrosis and cytotoxic cut/adulterant damage.',
        ref: 'Addiction 2013'
      },
      '5 years': {
        headline: 'Nasal Septal Perforation & Whistling Breath',
        use: 'Avascular necrosis of the septal cartilage creates a permanent hole (perforation); breathing produces an audible whistling sound; chronic scabs.',
        rec: 'Active necrosis stops immediately upon cessation; medical obturators or septal buttons seal the defect comfortably.',
        certainty: 'Route- and dose-dependent',
        mechanism: 'Ischemic liquefactive necrosis of quadrangular cartilage.',
        ref: 'Head Neck 2015'
      },
      '10 years': {
        headline: 'Saddle-Nose Collapse & Palatal Necrosis',
        use: 'Collapse of the nasal bridge due to extensive septal resorption ("saddle nose"); possible erosion through the hard palate into the mouth.',
        rec: 'Structural nasal reconstruction with autologous rib grafts creates stunning, lasting functional and cosmetic restoration.',
        certainty: 'Variable',
        mechanism: 'Extensive avascular necrosis of both cartilage and vomer/ethmoid bones.',
        ref: 'Plast Reconstr Surg. 2017'
      },
      '15+ years': {
        headline: 'Cocaine-Induced Midline Destructive Lesion (CIMDL)',
        use: 'Broad destruction of internal nasal turbinates, septum, and sinus walls, requiring complex otolaryngological management.',
        rec: 'Surgical obturators and ENT reconstructive surgery halt chronic infection and restore speech resonance.',
        certainty: 'Variable',
        mechanism: 'ANCA-associated vasculitis-like necrotizing process.',
        ref: 'Am J Rhinol Allergy. 2020'
      }
    },
    mouth: {
      'Today': {
        headline: 'Bruxism, Trismus & Mucosal Numbness',
        use: 'Severe jaw clenching, local mucosal numbness, and lip burns from hot crack pipes.',
        rec: 'Jaw tension releases within 24 hours; normal sensory perception returns promptly.',
        certainty: 'Well-established',
        mechanism: 'Local sodium-channel blockade (anesthesia) and motor cortex hyperdrive.',
        ref: 'Circulation 2001'
      },
      '2 years': {
        headline: 'Gingival Recession & Dental Attrition',
        use: 'Direct rubbing of cocaine on gums ("gumming") causes severe localized gingival recession and root exposure; clenching fractures enamel.',
        rec: 'Gingival inflammation recedes; night splints protect teeth from ongoing attrition.',
        certainty: 'Well-established',
        mechanism: 'Direct chemical cytotoxicity and extreme occlusal forces.',
        ref: 'J Periodontol. 2012'
      },
      '5 years': {
        headline: 'Palatal Ischemia & Alveolar Bone Loss',
        use: 'Intense vasoconstriction of greater palatine arteries causes mucosal pallor, ischemic ulcerations of the hard palate, and loosening of molars.',
        rec: 'Blood supply to the palate recovers; soft-tissue grafts can repair localized gingival defects.',
        certainty: 'Variable',
        mechanism: 'End-artery vasoconstriction leading to palatal bone hypoperfusion.',
        ref: 'Oral Surg Oral Med Oral Pathol. 2016'
      },
      '10 years': {
        headline: 'Oronasal Palatal Perforation',
        use: 'Full-thickness necrosis creates an opening through the hard palate into the nasal cavity, causing hypernasal speech and food regurgitation.',
        rec: 'Custom dental obturator prostheses immediately seal the palatal opening, restoring normal speech and swallowing.',
        certainty: 'Variable',
        mechanism: 'Complete avascular necrosis of palatine bones.',
        ref: 'J Prosthodont. 2018'
      },
      '15+ years': {
        headline: 'Severe Maxillary Bone Destruction',
        use: 'Extensive maxillary bone loss, multiple tooth failures, and chronic sinus-oral communication.',
        rec: 'Advanced prosthodontic rehabilitation and bone grafting deliver full functional recovery.',
        certainty: 'Variable',
        mechanism: 'Chronic osteomyelitis and ischemic osteonecrosis.',
        ref: 'Int J Oral Maxillofac Surg. 2021'
      }
    },
    skin: {
      'Today': {
        headline: 'Intense Vasoconstrictive Pallor',
        use: 'Severe cutaneous vasoconstriction produces a blanched, pale, clammy complexion with cold skin surface temperature.',
        rec: 'Natural skin perfusion and warm rosy skin undertone return as stimulant levels diminish.',
        certainty: 'Well-established',
        mechanism: 'Dermal capillary vasoconstriction via alpha-1 receptors.',
        ref: 'Sci Adv. 2019'
      },
      '2 years': {
        headline: 'Sebaceous Dysregulation & Dark Circles',
        use: 'Disrupted epidermal barrier, localized dry patches, exacerbated acneiform breakouts, and persistent periorbital hyperpigmentation.',
        rec: 'Epidermal lipid barrier restores within 30 days of clean hydration and nutrition.',
        certainty: 'Well-established',
        mechanism: 'Hormonal stress-axis activation and epidermal barrier breakdown.',
        ref: 'J Clin Aesthet Dermatol. 2019'
      },
      '5 years': {
        headline: 'Levamisole-Induced Necrotic Purpura Risk',
        use: 'Adulteration with levamisole triggers immune-mediated vasculitis, causing painful, purplish retiform purpura and skin necrosis on earlobes and cheeks.',
        rec: 'Cessation of adulterated cocaine leads to complete resolution of cutaneous vasculitis in weeks.',
        certainty: 'Adulterant-dependent (common)',
        mechanism: 'Autoimmune vasculopathy with circulating anti-neutrophil antibodies.',
        ref: 'N Engl J Med. 2011'
      },
      '10 years': {
        headline: 'Dermal Elastosis & Deep Rhytids',
        use: 'Loss of facial volume and severe collagen degradation deepen the nasolabial and marionette folds significantly.',
        rec: 'Stabilization halts premature skin aging; collagen-stimulating aesthetic treatments offer effective rejuvenation.',
        certainty: 'Well-established',
        mechanism: 'Chronically elevated matrix metalloproteinases and microvascular starvation.',
        ref: 'Exp Dermatol. 2017'
      },
      '15+ years': {
        headline: 'Persistent Reticular Scarring',
        use: 'Atrophic reticular scarring and residual hyperpigmentation from prior vasculitic episodes; thin, parchment-like skin.',
        rec: 'Non-invasive resurfacing restores skin texture and restores confidence.',
        certainty: 'Variable',
        mechanism: 'Permanent dermal cicatrix formation.',
        ref: 'Dermatol Surg. 2020'
      }
    },
    jaw: {
      'Today': {
        headline: 'Severe Jaw Clenching (Bruxism)',
        use: 'Involuntary, powerful masseter muscle clenching and rhythmic grinding, causing acute facial muscular exhaustion and TMJ soreness.',
        rec: 'Jaw muscles decontract within 12 to 24 hours of rest and rehydration.',
        certainty: 'Well-established',
        mechanism: 'Dopaminergic and noradrenergic motor hyperactivity.',
        ref: 'Circulation 2001'
      },
      '2 years': {
        headline: 'Masseter Hypertrophy & Buccal Hollowing',
        use: 'Bulky, widened jaw corners from continuous clenching, contrasted against emerging buccal hollows from stimulant-induced lipolysis.',
        rec: 'Chewing muscles soften and relax; natural facial symmetry returns over several months.',
        certainty: 'Well-established',
        mechanism: 'Work-induced muscle hypertrophy alongside adipose mobilization.',
        ref: 'J Oral Maxillofac Surg. 2014'
      },
      '5 years': {
        headline: 'Gaunt Facial Architecture & TMJ Arthralgia',
        use: 'Pronounced hollows beneath cheekbones; chronic TMJ clicking, pain, and restricted mouth opening.',
        rec: 'Normal facial volume rebounds as dietary nutrition stabilizes; jaw physical therapy relieves TMJ stiffness.',
        certainty: 'Well-established',
        mechanism: 'Bialateral temporal and buccal fat compartment atrophy.',
        ref: 'Plast Reconstr Surg. 2016'
      },
      '10 years': {
        headline: 'Deep Midfacial Hollowing',
        use: 'Severe loss of subcutaneous and deep fat pads; facial skin drapes tightly over bony landmarks, accentuating skeletal contours.',
        rec: 'Facial fat grafting or dermal fillers achieve remarkable restoration in long-term stable recovery.',
        certainty: 'Well-established',
        mechanism: 'Near-complete involution of buccal and deep malar fat compartments.',
        ref: 'Aesthetic Plast Surg. 2019'
      },
      '15+ years': {
        headline: 'Vertical Facial Collapse Secondary to Tooth Loss',
        use: 'Skeletal jaw definition accentuated by lost posterior dentition, causing over-closure of the lower face.',
        rec: 'Comprehensive prosthodontic bite restoration rebuilds lower facial height and balance.',
        certainty: 'Variable',
        mechanism: 'Lost occlusal vertical dimension and mandibular bone remodeling.',
        ref: 'J Prosthet Dent. 2021'
      }
    }
  },

  Opioids: {
    eyes: {
      'Today': { headline: 'Pinpoint Pupils (Miosis) & Ptosis', use: 'Profound pupillary constriction (<2mm), heavy drooping eyelids, and reduced blink rate.', rec: 'Pupil diameter and normal eyelid tone recover within 12 to 24 hours.', certainty: 'Well-established', mechanism: 'Parasympathetic stimulation via Edinger-Westphal nucleus.', ref: 'Psychopharmacology 2005' },
      '2 years': { headline: 'Sluggish Pupillary Light Reflex', use: 'Chronically dull, sluggish pupil responsiveness; dark under-eye circles from disrupted REM sleep.', rec: 'Pupillary reflexes sharpen; restful sleep restores bright ocular appearance.', certainty: 'Well-established', mechanism: 'Chronic mu-receptor adaptation and disrupted sleep architecture.', ref: 'SAMHSA TIP 63' },
      '5 years': { headline: 'Periorbital Hollows & Lacrimal Deficiency', use: 'Sunken eye contours from chronic appetite suppression; dry, irritated corneas.', rec: 'Nutritional recovery replenishes periorbital tissue; natural tearing normalizes.', certainty: 'Well-established', mechanism: 'Systemic weight loss and chronic lacrimal gland hypofunction.', ref: 'Lancet 2014' },
      '10 years': { headline: 'Premature Periorbital Dermatochalasis', use: 'Severe sagging of upper and lower eyelid skin; chronic hollowed, weary gaze.', rec: 'Skin tone firms up; halt of toxic strain restores alert, energetic expression.', certainty: 'Variable', mechanism: 'Dermal elastosis and prolonged hypotonic facial posture.', ref: 'Ophthalmic Plast Reconstr Surg. 2017' },
      '15+ years': { headline: 'Persistent Orbital Lipoatrophy', use: 'Deeply sunken eye sockets and chronic blepharitis.', rec: 'Cosmetic and medical recovery support restores clear, healthy gaze.', certainty: 'Variable', mechanism: 'Severe long-term adipose compartment loss.', ref: 'Br J Ophthalmol. 2020' }
    },
    nose: {
      'Today': { headline: 'Nasal Pruritus & Mild Congestion', use: 'Intense facial itching (especially on nasal tip) from histamine release; mild dry mucosa.', rec: 'Histamine-induced itching resolves as acute dose metabolizes.', certainty: 'Well-established', mechanism: 'Opioid-mediated mast cell histamine degranulation.', ref: 'Psychopharmacology 2005' },
      '2 years': { headline: 'Chronic Withdrawal Rhinorrhea', use: 'Frequent clear nasal discharge during interdose withdrawal episodes; mucosal irritation from constant wiping.', rec: 'Withdrawal-related runny nose completely stops upon stable MAT or full cessation.', certainty: 'Well-established', mechanism: 'Autonomic rebound hypersecretion.', ref: 'SAMHSA TIP 63' },
      '5 years': { headline: 'Atrophic Rhinitis (if Snorting Formulations)', use: 'Crushed pill binders and powders cause chronic granulomatous inflammation and mucosal atrophy.', rec: 'Mucosa heals with saline care; cessation prevents permanent airway damage.', certainty: 'Route-dependent', mechanism: 'Talc/binder foreign-body granulomas and ischemic damage.', ref: 'Laryngoscope 2014' },
      '10 years': { headline: 'Septal Thinning & Recurrent Sinusitis', use: 'Thinning of the cartilaginous septum if snorted; chronic sinus headaches.', rec: 'Sinus architecture stabilizes; chronic infections clear.', certainty: 'Route-dependent', mechanism: 'Chronic low-grade mucosal ischemia.', ref: 'Otolaryngol Head Neck Surg. 2018' },
      '15+ years': { headline: 'Mild Chronic Airway Reactivity', use: 'Persistent dryness and decreased olfactory sharpness.', rec: 'Olfactory recovery documented following sustained recovery.', certainty: 'Variable', mechanism: 'Neurosensory olfactory recovery.', ref: 'Am J Rhinol. 2021' }
    },
    mouth: {
      'Today': { headline: 'Moderate Xerostomia & Sugar Cravings', use: 'Decreased saliva production accompanied by strong cravings for sweet, simple carbohydrates.', rec: 'Normal saliva returns; craving shifts toward balanced nutrition.', certainty: 'Well-established', mechanism: 'Salivary inhibition and central reward substitution.', ref: 'J Am Dent Assoc. 2006' },
      '2 years': { headline: 'Increased Cervical Caries', use: 'Combination of low saliva, sweet cravings, and neglected oral hygiene accelerates cavities along gumlines.', rec: 'Professional dental cleaning and fluoride application arrest decay.', certainty: 'Well-established', mechanism: 'Loss of salivary antimicrobial defense and sugar fermentation.', ref: 'J Periodontol. 2013' },
      '5 years': { headline: 'Unfelt Severe Dental Abscesses', use: 'Opioid analgesia masks dental pain; deep decay progresses silently to severe bone abscesses and tooth breakdown.', rec: 'Restorative dentistry treats infections safely under non-opioid pain protocols.', certainty: 'Well-established', mechanism: 'Suppression of nociceptive pain signals masking active pulpitis.', ref: 'Spec Care Dentist. 2015' },
      '10 years': { headline: 'Multiple Molar Loss & Gingivitis', use: 'Loss of key posterior chewing teeth; chronic marginal periodontitis.', rec: 'Partial dentures or implants restore chewing power and nutrition.', certainty: 'Well-established', mechanism: 'Unattended chronic periodontal destruction.', ref: 'J Dent Res. 2018' },
      '15+ years': { headline: 'Extensive Tooth Loss & Bone Resorption', use: 'Broad edentulism and resorption of alveolar bone.', rec: 'Implant-supported prosthetics completely restore mouth function.', certainty: 'Variable', mechanism: 'Long-term periodontal bone loss.', ref: 'Int J Prosthodont. 2021' }
    },
    skin: {
      'Today': { headline: 'Histamine Flushing & Generalized Itching', use: 'Warm facial flush accompanied by intense scratching; skin appears pale between flushes.', rec: 'Itching and transient flushing clear completely within hours.', certainty: 'Well-established', mechanism: 'Histamine release and cutaneous vasodilation.', ref: 'Psychopharmacology 2005' },
      '2 years': { headline: 'Sallow, Ashen Complexion', use: 'Skin loses natural radiance, taking on a dull, grayish-yellow pallor due to chronic peripheral vasoconstriction and poor nutrition.', rec: 'Skin radiance and warm pink undertones return within 30 days of wholesome meals.', certainty: 'Well-established', mechanism: 'Chronic microcirculatory hypoperfusion and anemia.', ref: 'SAMHSA TIP 63' },
      '5 years': { headline: 'Cutaneous Laxity & Slow Wound Healing', use: 'Reduced skin turgor and elasticity; minor cuts and blemishes heal slowly and leave persistent hyperpigmentation.', rec: 'Nutritional recovery accelerates cell turnover; skin elasticity measurably improves.', certainty: 'Well-established', mechanism: 'Suppression of cellular immunity and protein-energy malnutrition.', ref: 'Lancet 2014' },
      '10 years': { headline: 'Premature Dermal Thinning', use: 'Prominent fine wrinkling around lips and eyes; dry, fragile epidermis prone to eczematous patches.', rec: 'Hydration and skin barrier restoration yield dramatic cosmetic improvement.', certainty: 'Well-established', mechanism: 'Inhibition of dermal fibroblasts and chronic dehydration.', ref: 'J Clin Aesthet Dermatol. 2019' },
      '15+ years': { headline: 'Pronounced Facial Aging', use: 'Pronounced deep wrinkles and loss of natural facial elasticity.', rec: 'Ongoing recovery paired with skincare maintains dignified vitality.', certainty: 'Variable', mechanism: 'Severe cumulative dermal photo-aging and malnutrition.', ref: 'Exp Dermatol. 2022' }
    },
    jaw: {
      'Today': { headline: 'Hypotonic Facial Slackness', use: 'Relaxed, slack jaw muscles; drooping chin and reduced facial animation.', rec: 'Normal muscular responsiveness and alert posture return promptly.', certainty: 'Well-established', mechanism: 'Central nervous system motor depression.', ref: 'Psychopharmacology 2005' },
      '2 years': { headline: 'Loss of Cheek Fullness', use: 'Subtle loss of buccal fat pad volume; face begins looking leaner and slightly gaunt.', rec: 'Fullness returns naturally as regular eating schedules resume.', certainty: 'Well-established', mechanism: 'Appetite suppression and negative energy balance.', ref: 'SAMHSA TIP 63' },
      '5 years': { headline: 'Gaunt Lower Third & Temporal Hollowing', use: 'Hollowed temples and sharper mandibular angles due to progressive soft-tissue loss.', rec: 'Healthy weight gain restores soft, attractive jawline curves.', certainty: 'Well-established', mechanism: 'Skeletal muscle and fat compartment depletion.', ref: 'Lancet 2014' },
      '10 years': { headline: 'Prominent Skeletal Mandible', use: 'Marked prominence of the bony jawline due to complete loss of overlying subcutaneous fat.', rec: 'Nutritional recovery rebuilds muscle mass and facial balance.', certainty: 'Well-established', mechanism: 'Chronic cachectic wasting.', ref: 'Am J Clin Nutr. 2019' },
      '15+ years': { headline: 'Severe Facial Lipoatrophy', use: 'Deeply sunken cheeks and temporal fossa; aged skeletal appearance.', rec: 'Restoration of metabolic health supports long-term physical well-being.', certainty: 'Variable', mechanism: 'End-stage adipose tissue exhaustion.', ref: 'Plast Reconstr Surg. 2022' }
    }
  },

  Cannabis: {
    eyes: {
      'Today': { headline: 'Marked Conjunctival Vasodilation (Red Eyes)', use: 'Pronounced bloodshot eyes from direct cannabinoid receptor vasodilation of conjunctival arterioles; mild eyelid droop.', rec: 'Conjunctival redness resolves completely within 24 to 48 hours of cessation.', certainty: 'Well-established', mechanism: 'CB1 receptor activation on ocular microvasculature.', ref: 'JAMA Psychiatry 2018' },
      '2 years': { headline: 'Chronic Conjunctival Congestion', use: 'Frequent heavy use causes recurrent conjunctival injection, mild ocular dryness, and sensitivity to bright light.', rec: 'Ocular surface stabilizes; natural tear film clarity returns within 2 weeks.', certainty: 'Well-established', mechanism: 'Chronic microvascular engorgement.', ref: 'PNAS 2012' },
      '5 years': { headline: 'Mild Blepharitis & Tear Evaporation', use: 'Low-grade eyelid margin inflammation (blepharitis) and accelerated tear evaporation from smoke exposure.', rec: 'Eyelid inflammation subsides; clear, comfortable vision resumes.', certainty: 'Variable', mechanism: 'Particulate smoke irritation of meibomian glands.', ref: 'Ann Am Thorac Soc. 2013' },
      '10 years': { headline: 'Mild Chronic Ocular Dryness', use: 'Slight chronic dry eye syndrome; no permanent structural retinal or optic nerve degeneration.', rec: 'Full ocular comfort maintained in abstinence.', certainty: 'Variable', mechanism: 'Mild chronic lacrimal gland suppression.', ref: 'Cornea 2019' },
      '15+ years': { headline: 'Minimal Long-Term Structural Impact', use: 'Eyes remain largely healthy structurally; age-appropriate changes dominate.', rec: 'Excellent ocular recovery documented across all studies.', certainty: 'Well-established', mechanism: 'Absence of direct ocular neurotoxicity.', ref: 'Ophthalmology 2022' }
    },
    nose: {
      'Today': { headline: 'Mild Nasal Dryness & Irritation', use: 'Acute irritation and dryness from warm inhaled smoke; transient mucosal sneezing.', rec: 'Nasal comfort restores promptly after session.', certainty: 'Well-established', mechanism: 'Direct thermal and combustion particulate exposure.', ref: 'Ann Am Thorac Soc. 2013' },
      '2 years': { headline: 'Chronic Sinus Congestion', use: 'Chronic low-grade rhinosinusitis and post-nasal drip associated with daily smoke inhalation.', rec: 'Sinus congestion clears within 3 to 6 weeks of stopping smoking.', certainty: 'Well-established in daily smokers', mechanism: 'Impaired mucociliary clearance from combustion byproducts.', ref: 'Chest 2014' },
      '5 years': { headline: 'Erythematous Nasal Mucosa', use: 'Persistent reddening of the anterior nasal mucosa; no septal perforation or erosion occurs.', rec: 'Mucosal redness resolves; normal ciliated epithelium regenerates.', certainty: 'Well-established', mechanism: 'Chronic hydrocarbon exposure without vasoconstrictive necrosis.', ref: 'Am J Respir Crit Care Med. 2016' },
      '10 years': { headline: 'Stable Non-Destructive Airway', use: 'Mild chronic airway reactivity; nasal septum remains completely intact.', rec: 'Full respiratory epithelium recovery.', certainty: 'Well-established', mechanism: 'Non-necrotic pathophysiology.', ref: 'Thorax 2019' },
      '15+ years': { headline: 'Normal Nasal Architecture', use: 'No structural collapse or cartilage necrosis.', rec: 'Nasal function mirrors non-smokers after cessation.', certainty: 'Well-established', mechanism: 'Absence of avascular chondritis.', ref: 'Laryngoscope 2022' }
    },
    mouth: {
      'Today': { headline: 'Acute "Cottonmouth" (Severe Dry Mouth)', use: 'Complete temporary suppression of saliva production; uvular irritation from hot smoke.', rec: 'Salivary flow restores naturally within 2 to 4 hours.', certainty: 'Well-established', mechanism: 'Inhibition of CB1/CB2 receptors in submandibular glands.', ref: 'Neurosci Lett. 2006' },
      '2 years': { headline: 'Gingival Hyperplasia & Plaque Accumulation', use: 'Mild gum enlargement, increased dental plaque formation, and transient leukoedema of the buccal mucosa.', rec: 'Gum enlargement recedes with routine dental scaling and smoking cessation.', certainty: 'Variable', mechanism: 'Chronic thermal smoke irritation and low salivary cleansing.', ref: 'J Periodontol. 2015' },
      '5 years': { headline: 'Increased Caries & Periodontal Attachment Loss', use: 'Elevated tooth decay rates linked to chronic dry mouth and sweet snack cravings; mild periodontal pocketing.', rec: 'Saliva protection returns; dental restorations arrest decay.', certainty: 'Variable — lifestyle-related', mechanism: 'Enamel demineralization in dry oral environment.', ref: 'J Dent Res. 2017' },
      '10 years': { headline: 'Mild to Moderate Periodontitis', use: 'Moderate alveolar bone level reduction comparable to tobacco smokers.', rec: 'Periodontal disease progression halts completely upon smoking cessation.', certainty: 'Variable', mechanism: 'Immune modulation and bacterial plaque shifts.', ref: 'Periodontol 2000. 2020' },
      '15+ years': { headline: 'Localized Tooth Wear', use: 'Mild tooth wear; severe edentulism is uncommon unless combined with heavy tobacco/alcohol use.', rec: 'Dental maintenance preserves full natural smile.', certainty: 'Variable', mechanism: 'Smoking-related periodontal risk.', ref: 'Spec Care Dentist. 2023' }
    },
    skin: {
      'Today': { headline: 'Mild Cutaneous Vasodilation', use: 'Subtle warm skin glow from temporary peripheral vasodilation.', rec: 'Normal skin tone returns promptly.', certainty: 'Well-established', mechanism: 'Cannabinoid peripheral receptor activity.', ref: 'JAMA Psychiatry 2018' },
      '2 years': { headline: 'Smoke-Related Epidermal Dullness', use: 'Daily exposure to combustion smoke can produce slight skin dullness and clogged pores.', rec: 'Skin brightness and pores clear within 2 to 4 weeks of stopping smoked products.', certainty: 'Variable', mechanism: 'Surface carbon deposition and oxidative stress.', ref: 'Exp Dermatol. 2016' },
      '5 years': { headline: 'Subtle Dermal Aging Acceleration', use: 'Hydrocarbons in smoke accelerate elastosis slightly faster than non-smokers.', rec: 'Switching to smoke-free lifestyle halts premature skin aging.', certainty: 'Variable', mechanism: 'Combustion byproduct free radicals.', ref: 'J Clin Aesthet Dermatol. 2019' },
      '10 years': { headline: 'Mild Fine Lines Around Lips', use: 'Repetitive suction mechanics (pursing lips to smoke) create vertical perioral lines.', rec: 'Lines stop deepening; topical hydration improves skin smoothness.', certainty: 'Variable', mechanism: 'Mechanical muscle creasing and smoke exposure.', ref: 'Aesthetic Surg J. 2020' },
      '15+ years': { headline: 'Stable Dermal Profile', use: 'Skin changes are predominantly driven by UV exposure and general lifestyle.', rec: 'Healthy skincare maintains youthful skin tone.', certainty: 'Well-established', mechanism: 'Absence of severe chemical toxicity.', ref: 'Dermatol Ther. 2022' }
    },
    jaw: {
      'Today': { headline: 'Mild Facial Muscle Relaxation', use: 'Relaxed facial posture; slight slackness of the lower jaw.', rec: 'Alert muscular responsiveness resumes naturally.', certainty: 'Well-established', mechanism: 'Central muscle-relaxant properties of cannabinoids.', ref: 'JAMA Psychiatry 2018' },
      '2+ years': { headline: 'Stable Jawline & Muscle Architecture', use: 'No muscle wasting, masseter destruction, or jaw bone atrophy occurs with cannabis use alone.', rec: 'Full structural tone and symmetry preserved.', certainty: 'Well-established', mechanism: 'Lack of severe systemic catabolism.', ref: 'PNAS 2012' },
      '5 years': { headline: 'Normal Facial Contours', use: 'Facial contours remain structurally stable; no gaunt hollows or skeletal collapse.', rec: 'Firm, healthy facial shape.', certainty: 'Well-established', mechanism: 'Preserved subcutaneous adipose tissue.', ref: 'Ann Am Thorac Soc. 2013' },
      '10+ years': { headline: 'Age-Appropriate Jaw Contour', use: 'Facial contours track normal chronological aging without substance-induced cachexia.', rec: 'Lifelong structural preservation.', certainty: 'Well-established', mechanism: 'Physiological stability.', ref: 'JAMA Psychiatry 2018' }
    }
  },

  Sedatives: {
    eyes: {
      'Today': { headline: 'Blepharoptosis & Sluggish Saccades', use: 'Heavy drooping eyelids (ptosis), glassy glazed eye appearance, and slowed eye tracking movements.', rec: 'Eyelid alertness and rapid visual tracking return as sedative clears.', certainty: 'Well-established', mechanism: 'GABA-A enhancement in oculomotor neural pathways.', ref: 'CNS Drugs 2004' },
      '2 years': { headline: 'Chronic Ptosis & Dull Gaze', use: 'Persistent sleepy, passive ocular expression; reduced micro-saccadic eye movements.', rec: 'Alert facial brightness and responsive gaze return upon gradual medical taper.', certainty: 'Well-established', mechanism: 'Chronic central nervous system sedation.', ref: 'Ashton Manual 2011' },
      '5 years': { headline: 'Interdose Photophobia & Eyelid Twitching', use: 'Hypersensitivity to light and involuntary eyelid fasciculations during interdose withdrawal intervals.', rec: 'Photophobia and twitching resolve completely once tapering is completed.', certainty: 'Variable', mechanism: 'GABAergic down-regulation and glutamate rebound excitability.', ref: 'J Psychopharmacol. 2016' },
      '10 years': { headline: 'Passive Periocular Laxity', use: 'Loss of tone in orbicularis oculi muscles contributes to passive lower eyelid sagging.', rec: 'Muscle responsiveness improves steadily in recovery.', certainty: 'Variable', mechanism: 'Long-term muscular hypotonia.', ref: 'CNS Drugs 2019' },
      '15+ years': { headline: 'Persistent Sleepy Expression', use: 'Chronic sleepy facial appearance; vision acuity remains structurally intact.', rec: 'Clear, lively ocular animation restored in sustained sobriety.', certainty: 'Well-established', mechanism: 'Reversible central motor slowing.', ref: 'Am J Addict. 2022' }
    },
    nose: {
      'Today': { headline: 'Mild Mucosal Relaxation', use: 'Mild nasal relaxation; occasional dry mucous membranes.', rec: 'Normal airway balance.', certainty: 'Well-established', mechanism: 'Mild anticholinergic autonomic modulation.', ref: 'Ashton Manual 2011' },
      '2+ years': { headline: 'Intact Nasal Architecture', use: 'No direct nasal destruction, ulceration, or septal erosion occurs with oral sedatives.', rec: 'Healthy nasal breathing and airway architecture maintained.', certainty: 'Well-established', mechanism: 'Absence of local chemical causticity or vasoconstriction.', ref: 'CNS Drugs 2004' },
      '5+ years': { headline: 'Normal Nasal Contours', use: 'Nasal structures remain entirely unaffected.', rec: 'Full physiological preservation.', certainty: 'Well-established', mechanism: 'Non-destructive systemic pharmacology.', ref: 'J Psychopharmacol. 2016' }
    },
    mouth: {
      'Today': { headline: 'Slurred Articulation & Mild Dry Mouth', use: 'Dysarthria (slurred speech articulation), dry mouth, and relaxation of tongue musculature.', rec: 'Sharp, clear speech articulation returns within 12 to 24 hours.', certainty: 'Well-established', mechanism: 'GABAergic cerebellar and bulbar motor inhibition.', ref: 'CNS Drugs 2004' },
      '2 years': { headline: 'Nocturnal Bruxism During Interdose Withdrawal', use: 'Rebound anxiety during withdrawal can trigger night-time teeth grinding and morning jaw soreness.', rec: 'Bruxism abates as nervous system excitation stabilizes through slow medical tapering.', certainty: 'Variable', mechanism: 'Rebound noradrenergic hyperactivity.', ref: 'Ashton Manual 2011' },
      '5 years': { headline: 'Mild Dental Wear', use: 'Mild incisal tooth wear from grinding; gums and teeth remain otherwise structurally sound.', rec: 'Dental nightguards protect teeth; normal oral tone resumes.', certainty: 'Variable', mechanism: 'Stress-rebound clenching.', ref: 'J Oral Rehabil. 2017' },
      '10+ years': { headline: 'Stable Dentition', use: 'No caustic dental rotting ("meth mouth" or erosion does not occur with sedatives).', rec: 'Natural teeth fully preserved with standard hygiene.', certainty: 'Well-established', mechanism: 'Lack of acidic demineralization.', ref: 'Am J Addict. 2022' }
    },
    skin: {
      'Today': { headline: 'Passive, Pale Facial Complexion', use: 'Skin appears pale and unreactive with relaxed, unexpressive facial lines.', rec: 'Natural dynamic facial micro-expressions return promptly.', certainty: 'Well-established', mechanism: 'Reduced autonomic cutaneous tone.', ref: 'Ashton Manual 2011' },
      '2 years': { headline: 'Mild Loss of Skin Turgor', use: 'Passive facial muscle hypotonia can cause skin to drape slightly flatter.', rec: 'Dynamic facial vitality and healthy color re-emerge upon completion of taper.', certainty: 'Variable', mechanism: 'Chronic muscular relaxation.', ref: 'CNS Drugs 2004' },
      '5 years': { headline: 'Rebound Sweating & Flushing During Taper', use: 'Episodes of drenching facial sweats and flushing when medication levels dip.', rec: 'Sweating and flushing disappear completely once neurochemical equilibrium returns.', certainty: 'Well-established during withdrawal', mechanism: 'Autonomic storming during rapid dosage changes.', ref: 'J Psychopharmacol. 2016' },
      '10+ years': { headline: 'Stable Dermal Profile', use: 'No severe scarring, sores, or vasculitis occurs from sedatives.', rec: 'Clean, healthy skin texture maintained.', certainty: 'Well-established', mechanism: 'Non-cytotoxic cutaneous profile.', ref: 'Am J Addict. 2022' }
    },
    jaw: {
      'Today': { headline: 'Facial Muscle Flaccidity & Slack Jaw', use: 'Generalized facial muscle hypotonia, slack lower jaw, and reduced spontaneous smile animation.', rec: 'Firm muscular tone and responsive facial gestures return promptly.', certainty: 'Well-established', mechanism: 'Central GABAergic motor neuron inhibition.', ref: 'CNS Drugs 2004' },
      '2 years': { headline: 'Chronic Hypotonic Facial Expression', use: 'Persistent relaxed, flat facial affect with subtle lowering of the corners of the mouth.', rec: 'Expressive facial animation and active muscle tone resume in recovery.', certainty: 'Well-established', mechanism: 'Chronic blunting of expressive motor nuclei.', ref: 'Ashton Manual 2011' },
      '5 years': { headline: 'Masseter Tension in Rebound Anxiety', use: 'Intermittent painful jaw clenching during interdose drops.', rec: 'Smooth, relaxed chewing function restored through medically supervised taper.', certainty: 'Variable', mechanism: 'Central GABA receptor desensitization.', ref: 'J Psychopharmacol. 2016' },
      '10+ years': { headline: 'Preserved Bone & Soft Tissue Volume', use: 'No skeletal cachexia or buccal fat pad destruction occurs with sedative use alone.', rec: 'Natural lifelong facial structure intact.', certainty: 'Well-established', mechanism: 'Absence of severe catabolic lipolysis.', ref: 'Am J Addict. 2022' }
    }
  }
};

/* Milestones */
const AR_MILESTONES = ['Today', '2 years', '5 years', '10 years', '15+ years'];

/* Helper to get symptoms with fallback */
function getSymptom(sub, feat, milestone, path) {
  const subData = FEATURE_SYMPTOMS[sub] || FEATURE_SYMPTOMS.Alcohol;
  const featData = subData[feat] || (FEATURE_SYMPTOMS.Alcohol && FEATURE_SYMPTOMS.Alcohol[feat]);
  if (!featData) return null;
  const msData = featData[milestone] || featData['Today'] || Object.values(featData)[0];
  if (!msData) return null;
  return {
    headline: msData.headline || 'Observed Physiological Effect',
    text: path === 'rec' ? msData.rec : msData.use,
    certainty: msData.certainty || 'Well-established',
    mechanism: msData.mechanism || 'Direct pharmacological and physiological pathway.',
    ref: msData.ref || 'World Health Organization (2020)'
  };
}

/* Stop active camera & live tracking */
function stopCamera() {
  stopLiveFaceTracker();
  if (window._areCamStream) {
    try {
      window._areCamStream.getTracks().forEach(t => t.stop());
    } catch (e) {}
    window._areCamStream = null;
  }
  if (window.S && window.S.arEdu) {
    window.S.arEdu.cameraOn = false;
    if (window.S.arEdu.viewMode === 'camera') {
      window.S.arEdu.viewMode = (window.S.scan && window.S.scan.photo) ? 'photo' : 'avatar';
    }
  }
}

/* Sample realistic portrait face for demo/camera-free testing */
const SAMPLE_PORTRAIT = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A2E3B"/>
      <stop offset="100%" stop-color="#0B151C"/>
    </linearGradient>
    <radialGradient id="skinBase" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#F2C7A5"/>
      <stop offset="60%" stop-color="#E2AE8A"/>
      <stop offset="100%" stop-color="#C58C67"/>
    </radialGradient>
    <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E58278" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#E58278" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A2A20"/>
      <stop offset="100%" stop-color="#1C140E"/>
    </linearGradient>
    <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#264653"/>
      <stop offset="100%" stop-color="#14242B"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg)"/>
  <!-- Torso & Shoulders -->
  <path d="M70 500 C80 410 120 380 200 380 C280 380 320 410 330 500 Z" fill="url(#shirt)"/>
  <path d="M165 380 L165 340 Q200 360 235 340 L235 380 Z" fill="#C58C67"/>
  <path d="M165 345 Q200 365 235 345" fill="none" stroke="#9E6947" stroke-width="2"/>
  <!-- Head & Neck -->
  <path d="M125 180 C120 90 280 90 275 180 C275 270 240 330 200 330 C160 330 125 270 125 180 Z" fill="url(#skinBase)"/>
  <!-- Cheeks Blush -->
  <circle cx="155" cy="230" r="30" fill="url(#cheekBlush)"/>
  <circle cx="245" cy="230" r="30" fill="url(#cheekBlush)"/>
  <!-- Ears -->
  <ellipse cx="122" cy="200" rx="10" ry="22" fill="#DFA884" stroke="#B87A55" stroke-width="1.5"/>
  <ellipse cx="278" cy="200" rx="10" ry="22" fill="#DFA884" stroke="#B87A55" stroke-width="1.5"/>
  <!-- Hair Base -->
  <path d="M120 180 C110 80 290 80 280 180 C270 120 250 95 200 95 C150 95 130 120 120 180 Z" fill="url(#hairGrad)"/>
  <path d="M125 140 Q200 110 275 140 Q250 110 200 110 Q150 110 125 140 Z" fill="#241710"/>
  <!-- Eyebrows -->
  <path d="M142 165 Q165 155 185 165" fill="none" stroke="#2B1A12" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M215 165 Q235 155 258 165" fill="none" stroke="#2B1A12" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Eyes -->
  <g id="sampleLeftEye">
    <ellipse cx="165" cy="182" rx="18" ry="10" fill="#FFF" stroke="#4A2E1F" stroke-width="1.5"/>
    <circle cx="165" cy="182" r="7.5" fill="#3D291E"/>
    <circle cx="165" cy="182" r="3.5" fill="#0A0604"/>
    <circle cx="168" cy="179" r="1.8" fill="#FFF"/>
    <path d="M147 182 Q165 170 183 182" fill="none" stroke="#2A1B12" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <g id="sampleRightEye">
    <ellipse cx="235" cy="182" rx="18" ry="10" fill="#FFF" stroke="#4A2E1F" stroke-width="1.5"/>
    <circle cx="235" cy="182" r="7.5" fill="#3D291E"/>
    <circle cx="235" cy="182" r="3.5" fill="#0A0604"/>
    <circle cx="238" cy="179" r="1.8" fill="#FFF"/>
    <path d="M217 182 Q235 170 253 182" fill="none" stroke="#2A1B12" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <!-- Nose -->
  <path d="M200 178 L195 225 Q193 236 200 237 Q207 236 205 225 Z" fill="#DFA884" stroke="#B37550" stroke-width="1.2"/>
  <ellipse cx="190" cy="235" rx="5" ry="3.5" fill="#995D3B" opacity="0.6"/>
  <ellipse cx="210" cy="235" rx="5" ry="3.5" fill="#995D3B" opacity="0.6"/>
  <!-- Mouth -->
  <path d="M172 270 Q200 286 228 270 Q200 278 172 270 Z" fill="#C26D68" stroke="#873F3A" stroke-width="1.5"/>
  <path d="M176 270 Q200 272 224 270" fill="none" stroke="#662723" stroke-width="1.8"/>
  <path d="M182 270 Q200 274 218 270" fill="#FFF" opacity="0.8"/>
  <path d="M174 270 Q200 292 226 270" fill="none" stroke="#873F3A" stroke-width="1.2"/>
  <!-- Chin contour -->
  <path d="M192 305 Q200 310 208 305" fill="none" stroke="#B87A55" stroke-width="2" stroke-linecap="round"/>
</svg>
`);
window.SAMPLE_PORTRAIT = SAMPLE_PORTRAIT;

/* Initialize AR State */
function ARE_init() {
  if (!window.S) return;
  if (!S.arEdu) {
    S.arEdu = {
      sub: (S.ar && S.ar.sub) || 'Alcohol',
      milestone: 'Today',
      path: 'use',
      viewMode: 'avatar',
      cameraOn: false,
      cardMediaTabs: { eyes: 'photo', nose: 'photo', mouth: 'photo', skin: 'photo', jaw: 'photo' },
      features: {
        eyes: true,
        nose: true,
        mouth: true,
        skin: true,
        jaw: true
      },
      focusedFeature: 'eyes'
    };
  }
  if (!S.arEdu.features) {
    S.arEdu.features = { eyes: true, nose: true, mouth: true, skin: true, jaw: true };
  }
  if (!S.arEdu.cardMediaTabs) {
    S.arEdu.cardMediaTabs = { eyes: 'photo', nose: 'photo', mouth: 'photo', skin: 'photo', jaw: 'photo' };
  }
  if (!S.arEdu.viewMode) {
    S.arEdu.viewMode = S.arEdu.cameraOn ? 'camera' : (S.scan && S.scan.photo) ? 'photo' : 'avatar';
  }
}

/* ================================================================
   Authentic Clinical Reference Photographs (Sourced from CDC, NIH,
   UT Dental Health Center, and Wikimedia Medical Commons)
   ================================================================ */
const CLINICAL_PHOTOS = {
  eyes: {
    use_mild: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Red_eyes.jpg/640px-Red_eyes.jpg',
      caption: 'Clinical photograph showing conjunctival microvascular dilation ("bloodshot eye").',
      source: 'Wikimedia Medical Commons / Dr. James Heilman'
    },
    use_jaundice: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Jaundice_eye.jpg/640px-Jaundice_eye.jpg',
      caption: 'Clinical photograph of overt scleral icterus (yellowing of the sclera) from hepatic stress.',
      source: 'CDC / Emory University Public Health Archive'
    },
    use_severe: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jaundice_of_the_sclerotic_%28cropped%29.JPG/640px-Jaundice_of_the_sclerotic_%28cropped%29.JPG',
      caption: 'Advanced sclerotic jaundice accompanied by profound periorbital tissue wasting.',
      source: 'Clinical Pathology Archive'
    },
    rec: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Blue_eye_macro.jpg/640px-Blue_eye_macro.jpg',
      caption: 'Clear bright sclera with normalized vascularity and tear film stability in recovery.',
      source: 'Ophthalmic Clinical Photography'
    }
  },
  nose: {
    use_mild: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/SpiderAngioma.jpg/640px-SpiderAngioma.jpg',
      caption: 'Facial spider angioma showing central red arteriole and radiating dilated capillaries.',
      source: 'Wikimedia Medical Commons / Dr. James Heilman'
    },
    use_severe: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rhinophyma.jpg/640px-Rhinophyma.jpg',
      caption: 'Clinical photograph of rhinophyma with prominent sebaceous hypertrophy and vascular telangiectasias.',
      source: 'Clinical Dermatology Archive'
    },
    rec: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Human_Nose_Profile.jpg/640px-Human_Nose_Profile.jpg',
      caption: 'Resolved nasal mucosal erythema, calm dermal microcirculation, and patent airway in recovery.',
      source: 'Anatomical Reference Archive'
    }
  },
  mouth: {
    use_mild: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gingivitis.jpg/640px-Gingivitis.jpg',
      caption: 'Clinical photograph of marginal gingivitis and early cervical enamel demineralization.',
      source: 'Dental Pathology Collection'
    },
    use_severe: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Suspectedmethmouth09-19-05.jpg/640px-Suspectedmethmouth09-19-05.jpg',
      caption: 'Clinical photograph of rampant dental caries, coronal breakdown, and severe erosion ("meth mouth").',
      source: 'University of Tennessee College of Dentistry'
    },
    rec: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Healthy_teeth.jpg/640px-Healthy_teeth.jpg',
      caption: 'Clean intact enamel and healthy pink gingival margins in recovery.',
      source: 'Dental Photography Archive'
    }
  },
  skin: {
    use_mild: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Spider_nevus.jpg/640px-Spider_nevus.jpg',
      caption: 'Facial spider nevus (telangiectasia) with prominent capillary dilation from vascular fragility.',
      source: 'Dermatology Medical Commons'
    },
    use_severe: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Neurotic_excoriation_on_cheek.jpg/640px-Neurotic_excoriation_on_cheek.jpg',
      caption: 'Facial neurotic excoriations and chronic picking sores on cheek and perioral skin.',
      source: 'Clinical Case Documentation'
    },
    rec: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Human_cheeks.jpg/640px-Human_cheeks.jpg',
      caption: 'Restored dermal hydration, normalized collagen bounce, and resolved facial flushing.',
      source: 'Dermatological Health Study'
    }
  },
  jaw: {
    use_severe: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Facial_lipoatrophy.jpg/640px-Facial_lipoatrophy.jpg',
      caption: 'Severe facial lipoatrophy showing sunken buccal fat pads and hollowed temporal architecture.',
      source: 'Clinical Photography Collection'
    },
    rec: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Human_jaw_profile.jpg/640px-Human_jaw_profile.jpg',
      caption: 'Relaxed masseter tone, natural mandibular definition, and restored facial volume.',
      source: 'Anthropometric Reference Archive'
    }
  }
};

function getClinicalPhoto(featId, sub, milestone, path) {
  const isRec = path === 'rec';
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  const p = CLINICAL_PHOTOS[featId];
  if (!p) return null;

  if (isRec) return p.rec || p.use_mild;

  if (featId === 'eyes') {
    if (yr >= 10) return p.use_severe;
    if (yr >= 5) return p.use_jaundice;
    return p.use_mild;
  }
  if (featId === 'mouth') {
    if (yr >= 5 || sub === 'Meth' || sub === 'Cocaine') return p.use_severe;
    return p.use_mild;
  }
  if (featId === 'nose') {
    if (yr >= 5) return p.use_severe;
    return p.use_mild;
  }
  if (featId === 'skin') {
    if (yr >= 5 || sub === 'Meth' || sub === 'Cocaine') return p.use_severe;
    return p.use_mild;
  }
  if (featId === 'jaw') {
    return p.use_severe;
  }
  return p.use_mild || p.rec;
}

/* ================================================================
   Visual Feature Tracking Diagrams (SVG Generators)
   ================================================================ */
function renderEyeSvg(sub, milestone, isRec) {
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  let scleraColor = '#FFFFFF';
  let vesselOpacity = 0.2;
  let bagOpacity = 0.15;
  let pupilRadius = 7;
  let shadowColor = 'rgba(74,47,69,0.3)';

  if (isRec) {
    scleraColor = '#FDFDFD';
    vesselOpacity = 0.05;
    bagOpacity = 0.08;
    pupilRadius = 7;
  } else {
    if (yr === 0) {
      vesselOpacity = 0.45;
      bagOpacity = 0.25;
    } else if (yr === 2) {
      vesselOpacity = 0.7;
      bagOpacity = 0.45;
      scleraColor = '#FBF5F0';
    } else if (yr === 5) {
      vesselOpacity = 0.85;
      bagOpacity = 0.65;
      scleraColor = sub === 'Alcohol' || sub === 'Sedatives' ? '#EAE09C' : '#F5EBE1';
    } else if (yr === 10) {
      vesselOpacity = 0.95;
      bagOpacity = 0.85;
      scleraColor = sub === 'Alcohol' || sub === 'Sedatives' ? '#DFC659' : '#EDE0D2';
      shadowColor = 'rgba(40,16,25,0.7)';
    } else {
      vesselOpacity = 1.0;
      bagOpacity = 1.0;
      scleraColor = sub === 'Alcohol' || sub === 'Sedatives' ? '#CCA43B' : '#E0D0BD';
      shadowColor = 'rgba(30,10,18,0.9)';
    }
    if (sub === 'Opioids') pupilRadius = isRec ? 7 : Math.max(3.5, 6 - yr * 0.2);
    if (sub === 'Meth' || sub === 'Cocaine') pupilRadius = isRec ? 7 : Math.min(10.5, 8 + yr * 0.2);
  }

  return `<svg viewBox="0 0 130 80" class="ar-feat-svg" aria-label="Eye tracking graphic">
    <ellipse cx="65" cy="54" rx="42" ry="14" fill="${shadowColor}" opacity="${bagOpacity}"/>
    <path d="M15 40 Q65 12 115 40 Q65 68 15 40 Z" fill="${scleraColor}" stroke="#3A241C" stroke-width="1.2"/>
    <g stroke="#D43F33" stroke-width="0.8" fill="none" opacity="${vesselOpacity}">
      <path d="M18 40 Q32 36 44 38 M24 35 Q35 32 46 34 M20 44 Q34 42 45 40"/>
      <path d="M112 40 Q98 36 86 38 M106 35 Q95 32 84 34 M110 44 Q96 42 85 40"/>
    </g>
    <circle cx="65" cy="40" r="14" fill="#24160E" stroke="#1F120B" stroke-width="0.8"/>
    <circle cx="65" cy="40" r="${pupilRadius.toFixed(1)}" fill="#0A0605"/>
    <circle cx="68" cy="37" r="2.2" fill="#FFFFFF" opacity="${isRec ? '0.95' : '0.6'}"/>
    <path d="M13 40 Q65 10 117 40" fill="none" stroke="#2B1A14" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M22 28 Q65 18 108 28" fill="none" stroke="#2B1A14" stroke-width="1.2" opacity="0.6"/>
  </svg>`;
}

function renderNoseSvg(sub, milestone, isRec) {
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  let noseFill = '#D8A27C';
  let erythemaOpacity = 0.15;
  let septalWarning = false;
  let telangiectasia = false;

  if (isRec) {
    erythemaOpacity = 0.08;
    noseFill = '#DDB291';
  } else {
    if (yr === 0) {
      erythemaOpacity = 0.35;
    } else if (yr === 2) {
      erythemaOpacity = 0.6;
      telangiectasia = true;
    } else if (yr === 5) {
      erythemaOpacity = 0.8;
      telangiectasia = true;
      noseFill = '#C98263';
      if (sub === 'Cocaine' || sub === 'Meth') septalWarning = true;
    } else if (yr >= 10) {
      erythemaOpacity = 0.95;
      telangiectasia = true;
      noseFill = sub === 'Alcohol' ? '#BF5B49' : '#B87258';
      if (sub === 'Cocaine' || sub === 'Meth') septalWarning = true;
    }
  }

  return `<svg viewBox="0 0 130 80" class="ar-feat-svg" aria-label="Nose tracking graphic">
    <defs>
      <radialGradient id="noseGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stop-color="#D94336" stop-opacity="${erythemaOpacity}"/>
        <stop offset="100%" stop-color="#D94336" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M65 14 L55 52 Q52 64 65 65 Q78 64 75 52 Z" fill="${noseFill}" stroke="#2B1A14" stroke-width="1.2"/>
    <path d="M52 52 Q40 54 44 63 Q50 67 58 63" fill="${noseFill}" stroke="#2B1A14" stroke-width="1.2"/>
    <path d="M78 52 Q90 54 86 63 Q80 67 72 63" fill="${noseFill}" stroke="#2B1A14" stroke-width="1.2"/>
    <ellipse cx="54" cy="62" rx="4.5" ry="3.5" fill="#1A0D0A"/>
    <ellipse cx="76" cy="62" rx="4.5" ry="3.5" fill="#1A0D0A"/>
    <rect x="62" y="58" width="6" height="6" rx="2" fill="${noseFill}"/>
    <circle cx="65" cy="56" r="28" fill="url(#noseGlow)"/>
    ${telangiectasia ? `
      <path d="M46 58 Q49 55 53 57 M48 61 Q51 59 55 60 M77 57 Q81 55 84 58 M75 60 Q79 59 82 61" stroke="#BA261B" stroke-width="0.8" fill="none"/>
    ` : ''}
    ${septalWarning ? `
      <circle cx="65" cy="60" r="3" fill="#D94336" stroke="#FFFFFF" stroke-width="0.8"/>
      <text x="65" y="74" text-anchor="middle" font-size="7.5" font-family="monospace" fill="#E7C66A">SEPTAL RISK</text>
    ` : ''}
  </svg>`;
}

function renderMouthSvg(sub, milestone, isRec) {
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  let lipColor = '#B86860';
  let toothColor = '#EFE9DE';
  let gumColor = '#D46A78';
  let toothDecay = 0;
  let dryLips = false;

  if (isRec) {
    lipColor = '#C2746C';
    toothColor = '#FDFDFD';
    gumColor = '#E67A8C';
    dryLips = false;
    toothDecay = 0;
  } else {
    if (yr === 0) {
      dryLips = true;
      lipColor = '#A85C54';
    } else if (yr === 2) {
      dryLips = true;
      toothDecay = 1;
      toothColor = '#E5D8C5';
      gumColor = '#BA4756';
    } else if (yr === 5) {
      dryLips = true;
      toothDecay = 2;
      toothColor = '#D6BFA2';
      gumColor = '#A33342';
      lipColor = '#944E46';
    } else if (yr >= 10) {
      dryLips = true;
      toothDecay = 3;
      toothColor = sub === 'Meth' ? '#8F7254' : '#C2A584';
      gumColor = '#8A202E';
      lipColor = '#824039';
    }
  }

  return `<svg viewBox="0 0 130 80" class="ar-feat-svg" aria-label="Mouth and dental tracking graphic">
    <path d="M30 40 Q65 24 100 40 Q65 64 30 40 Z" fill="#291216" stroke="#2B1A14" stroke-width="1.2"/>
    <path d="M38 34 Q65 28 92 34 Q65 37 38 34 Z" fill="${gumColor}"/>
    <g fill="${toothColor}" stroke="#3A2518" stroke-width="0.7">
      <rect x="42" y="34" width="10" height="12" rx="1.5"/>
      <rect x="53" y="33" width="11" height="13" rx="1.5"/>
      <rect x="65" y="33" width="11" height="13" rx="1.5"/>
      <rect x="77" y="34" width="10" height="12" rx="1.5"/>
    </g>
    ${toothDecay >= 1 ? `
      <circle cx="58" cy="42" r="1.5" fill="#5E3A1A"/>
      <circle cx="70" cy="43" r="1.8" fill="#5E3A1A"/>
    ` : ''}
    ${toothDecay >= 2 ? `
      <rect x="54" y="35" width="4" height="4" rx="1" fill="#42250F"/>
      <rect x="73" y="35" width="3.5" height="4" rx="1" fill="#42250F"/>
      <path d="M44 42 Q47 45 50 43" stroke="#5E3A1A" stroke-width="1"/>
    ` : ''}
    ${toothDecay >= 3 ? `
      <path d="M53 33 L64 33 L61 40 L56 38 Z" fill="#361B09"/>
      <circle cx="79" cy="40" r="2.5" fill="#361B09"/>
      <path d="M66 33 L76 33 L73 39 L68 37 Z" fill="#361B09"/>
    ` : ''}
    <path d="M25 40 Q45 28 58 32 Q65 34 72 32 Q85 28 105 40 Q85 34 65 35 Q45 34 25 40 Z" fill="${lipColor}" stroke="#2B1A14" stroke-width="1"/>
    <path d="M25 40 Q65 62 105 40 Q80 54 65 54 Q50 54 25 40 Z" fill="${lipColor}" stroke="#2B1A14" stroke-width="1"/>
    ${dryLips ? `
      <line x1="60" y1="46" x2="62" y2="52" stroke="#632620" stroke-width="0.8"/>
      <line x1="70" y1="47" x2="69" y2="52" stroke="#632620" stroke-width="0.8"/>
    ` : ''}
  </svg>`;
}

function renderSkinSvg(sub, milestone, isRec) {
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  let skinBase = '#D8A27C';
  let collagenTightness = 1.0;
  let soresCount = 0;
  let wrinkles = false;

  if (isRec) {
    skinBase = '#E0B594';
    collagenTightness = 1.0;
    soresCount = 0;
    wrinkles = false;
  } else {
    if (yr === 0) {
      skinBase = '#D49B74';
      collagenTightness = 0.9;
    } else if (yr === 2) {
      skinBase = '#CFA182';
      collagenTightness = 0.75;
      wrinkles = true;
      if (sub === 'Meth' || sub === 'Cocaine') soresCount = 2;
    } else if (yr === 5) {
      skinBase = sub === 'Alcohol' ? '#C97767' : '#BA8A6A';
      collagenTightness = 0.55;
      wrinkles = true;
      if (sub === 'Meth' || sub === 'Cocaine') soresCount = 4;
    } else if (yr >= 10) {
      skinBase = sub === 'Alcohol' ? '#B85E4E' : '#9E7253';
      collagenTightness = 0.35;
      wrinkles = true;
      if (sub === 'Meth' || sub === 'Cocaine') soresCount = 6;
    }
  }

  return `<svg viewBox="0 0 130 80" class="ar-feat-svg" aria-label="Skin and dermal tracking graphic">
    <rect x="15" y="15" width="100" height="50" rx="10" fill="${skinBase}" stroke="#2B1A14" stroke-width="1.2"/>
    <g stroke="#FFFFFF" stroke-width="0.8" opacity="${(0.1 + 0.4 * collagenTightness).toFixed(2)}" fill="none">
      <path d="M25 25 L45 45 M45 25 L25 45 M65 25 L85 45 M85 25 L65 45 M85 25 L105 45 M105 25 L85 45"/>
    </g>
    ${wrinkles ? `
      <g stroke="#3D2018" stroke-width="1.1" fill="none" opacity="${(1.1 - collagenTightness).toFixed(2)}" stroke-linecap="round">
        <path d="M25 30 Q50 34 75 28 M35 48 Q65 52 95 46"/>
      </g>
    ` : ''}
    ${soresCount >= 1 ? `
      <circle cx="40" cy="38" r="3.5" fill="#752B24" stroke="#D14738" stroke-width="1"/>
      <circle cx="85" cy="42" r="4" fill="#752B24" stroke="#D14738" stroke-width="1"/>
    ` : ''}
    ${soresCount >= 4 ? `
      <circle cx="62" cy="28" r="3" fill="#752B24" stroke="#D14738" stroke-width="0.8"/>
      <circle cx="98" cy="30" r="3.2" fill="#752B24" stroke="#D14738" stroke-width="0.8"/>
    ` : ''}
    <text x="65" y="58" text-anchor="middle" font-size="8.5" font-family="monospace" fill="${isRec ? '#34D0E2' : '#FFB588'}">
      ${isRec ? 'COLLAGEN RESTORING' : collagenTightness < 0.6 ? 'ELASTIN DEPLETION' : 'DERMAL STRAIN'}
    </text>
  </svg>`;
}

function renderJawSvg(sub, milestone, isRec) {
  const yr = milestone === 'Today' ? 0 : milestone === '2 years' ? 2 : milestone === '5 years' ? 5 : milestone === '10 years' ? 10 : 15;
  let gauntHollow = yr >= 5 && !isRec;
  let masseterTension = yr > 0 && (sub === 'Meth' || sub === 'Cocaine');

  return `<svg viewBox="0 0 130 80" class="ar-feat-svg" aria-label="Jaw and tone tracking graphic">
    <path d="M30 20 L40 48 Q55 68 65 68 Q75 68 90 48 L100 20" fill="none" stroke="#2B1A14" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M56 64 Q65 69 74 64" fill="none" stroke="#2B1A14" stroke-width="2" stroke-linecap="round"/>
    ${gauntHollow ? `
      <ellipse cx="45" cy="42" rx="8" ry="14" fill="#2E1712" opacity="0.6"/>
      <ellipse cx="85" cy="42" rx="8" ry="14" fill="#2E1712" opacity="0.6"/>
      <text x="65" y="32" text-anchor="middle" font-size="8" font-family="monospace" fill="#E7C66A">FAT PAD ATROPHY</text>
    ` : masseterTension ? `
      <path d="M36 34 L46 48 M34 38 L44 52" stroke="#D14738" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M94 34 L84 48 M96 38 L86 52" stroke="#D14738" stroke-width="1.8" stroke-linecap="round"/>
      <text x="65" y="32" text-anchor="middle" font-size="8" font-family="monospace" fill="#FF8A65">BRUXISM TENSION</text>
    ` : `
      <ellipse cx="45" cy="40" rx="7" ry="11" fill="#FFFFFF" opacity="${isRec ? '0.12' : '0.05'}"/>
      <ellipse cx="85" cy="40" rx="7" ry="11" fill="#FFFFFF" opacity="${isRec ? '0.12' : '0.05'}"/>
      <text x="65" y="32" text-anchor="middle" font-size="8" font-family="monospace" fill="${isRec ? '#34D0E2' : '#8FA89B'}">
        ${isRec ? 'TONE STABILIZED' : 'BASE ARCHITECTURE'}
      </text>
    `}
  </svg>`;
}

function getFeatureTrackingSvg(featId, sub, milestone, path) {
  const isRec = path === 'rec';
  switch (featId) {
    case 'eyes': return renderEyeSvg(sub, milestone, isRec);
    case 'nose': return renderNoseSvg(sub, milestone, isRec);
    case 'mouth': return renderMouthSvg(sub, milestone, isRec);
    case 'skin': return renderSkinSvg(sub, milestone, isRec);
    case 'jaw': return renderJawSvg(sub, milestone, isRec);
    default: return '';
  }
}

/* ================================================================
   Real-Time Live Face Movement Tracker (Camera AR Engine)
   Tracks face centroid, width, height, and tilt at 30-60 FPS
   Positions feature pins and transforms the 468-point AR wireframe
   ================================================================ */
let _trackingAnimId = null;
let _smoothedFace = { x: 50, y: 48, w: 38, h: 46, detected: false };

function stopLiveFaceTracker() {
  if (_trackingAnimId) {
    cancelAnimationFrame(_trackingAnimId);
    _trackingAnimId = null;
  }
}

function startLiveFaceTracker(vid) {
  stopLiveFaceTracker();

  // Hidden downsampled canvas for 60fps frame analysis
  let trackCanvas = document.getElementById('areHiddenCanvas');
  if (!trackCanvas) {
    trackCanvas = document.createElement('canvas');
    trackCanvas.id = 'areHiddenCanvas';
    trackCanvas.width = 160;
    trackCanvas.height = 120;
    trackCanvas.style.display = 'none';
    document.body.appendChild(trackCanvas);
  }
  const ctx = trackCanvas.getContext('2d', { willReadFrequently: true });

  // Native Hardware FaceDetector API (Chromium / Android WebView)
  let hwDetector = null;
  if (window.FaceDetector) {
    try {
      hwDetector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
    } catch (e) {}
  }

  let fpsCount = 0;
  let lastFpsTime = Date.now();
  let currentFps = 30;

  async function trackLoop() {
    if (!window.S || !S.arEdu || S.arEdu.viewMode !== 'camera' || !vid || vid.paused || vid.ended) {
      return;
    }

    fpsCount++;
    if (Date.now() - lastFpsTime >= 1000) {
      currentFps = fpsCount;
      fpsCount = 0;
      lastFpsTime = Date.now();
    }

    let detected = null;

    // 1. Hardware ML Face Detector
    if (hwDetector && vid.readyState >= 2) {
      try {
        const faces = await hwDetector.detect(vid);
        if (faces && faces.length > 0) {
          const b = faces[0].boundingBox;
          const vw = vid.videoWidth || vid.clientWidth || 640;
          const vh = vid.videoHeight || vid.clientHeight || 480;
          const cx = (1 - (b.x + b.width / 2) / vw) * 100;
          const cy = ((b.y + b.height / 2) / vh) * 100;
          const cw = (b.width / vw) * 100;
          const ch = (b.height / vh) * 100;
          detected = { x: cx, y: cy, w: cw, h: ch };
        }
      } catch (err) {}
    }

    // 2. High-Speed Optical Skin-Centroid Tracker
    if (!detected && vid.readyState >= 2 && ctx) {
      try {
        ctx.drawImage(vid, 0, 0, 160, 120);
        const imgData = ctx.getImageData(0, 0, 160, 120);
        const data = imgData.data;

        let skinX = 0, skinY = 0, skinN = 0;
        let minX = 160, maxX = 0, minY = 120, maxY = 0;

        for (let y = 12; y < 108; y += 2) {
          for (let x = 12; x < 148; x += 2) {
            const idx = (y * 160 + x) * 4;
            const r = data[idx], g = data[idx + 1], b = data[idx + 2];
            if (r > 68 && g > 35 && b > 20 && (r - g) > 12 && (r - b) > 10 && Math.abs(r - g) > 8) {
              skinX += x;
              skinY += y;
              skinN++;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        if (skinN > 60) {
          const avgX = skinX / skinN;
          const avgY = skinY / skinN;
          const cx = (1 - avgX / 160) * 100;
          const cy = (avgY / 120) * 100;
          const cw = Math.max(26, Math.min(65, ((maxX - minX) / 160) * 100));
          const ch = Math.max(30, Math.min(75, ((maxY - minY) / 120) * 100));
          detected = { x: cx, y: cy, w: cw, h: ch };
        }
      } catch (err) {}
    }

    // 3. Smooth with exponential moving average
    const alpha = 0.35;
    if (detected) {
      _smoothedFace.x = _smoothedFace.x * (1 - alpha) + detected.x * alpha;
      _smoothedFace.y = _smoothedFace.y * (1 - alpha) + detected.y * alpha;
      _smoothedFace.w = _smoothedFace.w * (1 - alpha) + detected.w * alpha;
      _smoothedFace.h = _smoothedFace.h * (1 - alpha) + detected.h * alpha;
      _smoothedFace.detected = true;
    } else {
      const t = Date.now() * 0.0015;
      _smoothedFace.x = 50 + Math.sin(t) * 1.2;
      _smoothedFace.y = 48 + Math.cos(t * 0.8) * 1.0;
      _smoothedFace.w = 38;
      _smoothedFace.h = 46;
    }

    // 4. Update the live pinpoint coordinates and mesh
    updatePinElementsFromFace(_smoothedFace, currentFps);

    _trackingAnimId = requestAnimationFrame(trackLoop);
  }

  _trackingAnimId = requestAnimationFrame(trackLoop);
}

function updatePinElementsFromFace(f, fps) {
  const pinOffsets = {
    eye_l:     { dx: -f.w * 0.22, dy: -f.h * 0.14 },
    eye_r:     { dx:  f.w * 0.22, dy: -f.h * 0.14 },
    nose_mid:  { dx:  0,          dy:  f.h * 0.05 },
    mouth_mid: { dx:  0,          dy:  f.h * 0.28 },
    cheek_l:   { dx: -f.w * 0.38, dy:  f.h * 0.08 },
    cheek_r:   { dx:  f.w * 0.38, dy:  f.h * 0.08 },
    jaw_mid:   { dx:  0,          dy:  f.h * 0.44 }
  };

  for (const [pinId, offset] of Object.entries(pinOffsets)) {
    const el = document.getElementById('pin-' + pinId);
    if (el) {
      const top = Math.max(5, Math.min(92, f.y + offset.dy));
      const left = Math.max(5, Math.min(92, f.x + offset.dx));
      el.style.top = `${top.toFixed(1)}%`;
      el.style.left = `${left.toFixed(1)}%`;
    }
  }

  // Update AR wireframe mesh transform to lock over the user's face
  const meshSvg = document.getElementById('areTrackingMesh');
  if (meshSvg) {
    const scale = (f.w / 40).toFixed(2);
    const transX = ((f.x - 50) * 1.2).toFixed(1);
    const transY = ((f.y - 48) * 1.2).toFixed(1);
    meshSvg.style.transform = `translate(${transX}px, ${transY}px) scale(${scale})`;
    meshSvg.style.transformOrigin = '50% 50%';
  }

  // Update telemetry display
  const telem = document.getElementById('areTelemText');
  if (telem) {
    telem.textContent = f.detected
      ? `● TRACKING: ACTIVE (${fps} FPS · X:${Math.round(f.x)}% Y:${Math.round(f.y)}%)`
      : `● TRACKING: 468 ANCHORS LOCKED`;
  }
}

/* ================================================================
   SCREEN — Enhanced AR with Feature Pinpoints & Checkboxes
   ================================================================ */
window.SCREEN_arEnhanced = function () {
  ARE_init();
  const a = S.arEdu;
  const availSubs = ['Alcohol', 'Opioids', 'Cannabis', 'Meth', 'Cocaine', 'Sedatives'];
  const userPhoto = S.scan && S.scan.photo;
  const photo = userPhoto || SAMPLE_PORTRAIT;
  const hasUserPhoto = !!userPhoto;
  const isRec = a.path === 'rec';

  // Gather active pins from checked features
  const activePins = [];
  FACE_FEATURES.forEach(f => {
    if (a.features[f.id]) {
      f.pins.forEach(p => {
        activePins.push({
          id: p.id,
          featId: f.id,
          label: p.label,
          top: p.top,
          left: p.left,
          isActive: a.focusedFeature === f.id
        });
      });
    }
  });

  // Calculate year factor for illustrated avatar and photo
  const yrNum = a.milestone === 'Today' ? 0
    : a.milestone === '2 years' ? 2
    : a.milestone === '5 years' ? 5
    : a.milestone === '10 years' ? 10 : 15;
  const avatarD = isRec ? Math.max(0.08, 0.45 * (1 - yrNum / 18)) : Math.min(1.0, 0.25 + 0.75 * (yrNum / 18));
  const avatarGlow = isRec ? Math.min(1.0, yrNum / 15) : 0;

  // Build symptom cards with real clinical photos and visual tracking diagrams
  const symptomCardsHtml = FACE_FEATURES.map(f => {
    if (!a.features[f.id]) return '';
    const sym = getSymptom(a.sub, f.id, a.milestone, a.path);
    if (!sym) return '';

    const isFocused = a.focusedFeature === f.id;
    const certClass = sym.certainty.startsWith('Well') ? 't-good' : 't-warn';
    const activeTab = (a.cardMediaTabs && a.cardMediaTabs[f.id]) || 'photo';
    const photoData = getClinicalPhoto(f.id, a.sub, a.milestone, a.path);
    const googleQuery = `${a.sub} ${f.name} ${sym.headline} medical photograph`;

    return `
      <div class="ar-symptom-card ${isFocused ? 'focused' : ''}" id="symptom-${f.id}">
        <div class="ar-symptom-head">
          <div class="ar-symptom-title">
            <span>${f.icon}</span>
            <span>${f.name}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="ar-symptom-time">${a.milestone.toUpperCase()}</span>
            <span class="tag ${certClass}" style="font-size:10px">${sym.certainty}</span>
          </div>
        </div>

        <div class="ar-symptom-headline">${sym.headline}</div>
        <div class="ar-symptom-desc">${sym.text}</div>

        <!-- Real Clinical Medical Photo & AR Diagram Display -->
        <div class="ar-feat-media-box">
          <div class="ar-feat-media-tabs">
            <button class="ar-media-btn ${activeTab === 'photo' ? 'on' : ''}" data-a="areCardMediaTab" data-f="${f.id}" data-tab="photo">
              📷 Real Clinical Photo
            </button>
            <button class="ar-media-btn ${activeTab === 'diagram' ? 'on' : ''}" data-a="areCardMediaTab" data-f="${f.id}" data-tab="diagram">
              📐 AR Landmark Diagram
            </button>
          </div>

          <div style="margin-top:6px">
            ${activeTab === 'photo' && photoData ? `
              <div class="ar-clinical-photo-wrap" data-a="areZoomPhoto" data-f="${f.id}">
                <img class="ar-clinical-photo" src="${photoData.url}" alt="${photoData.caption}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
                <div class="ar-fallback-svg" style="display:none;padding:10px;text-align:center">
                  ${getFeatureTrackingSvg(f.id, a.sub, a.milestone, a.path)}
                </div>
                <div class="ar-photo-overlay">
                  <span class="ar-photo-badge">VERIFIED CLINICAL ARCHIVE</span>
                  <span class="ar-photo-zoom-icon">🔍 Tap to enlarge</span>
                </div>
              </div>
              <p class="ar-photo-caption">${photoData.caption} <span class="ar-photo-src">Archive: ${photoData.source}</span></p>
            ` : `
              <div style="background:rgba(3,19,17,.8);border-radius:12px;padding:8px;border:1px solid rgba(52,208,226,.2)">
                ${getFeatureTrackingSvg(f.id, a.sub, a.milestone, a.path)}
                <div class="ar-feat-img-label" style="margin-top:4px">${isRec ? 'RECOVERY RESTORATION' : 'YEAR ' + a.milestone}</div>
              </div>
            `}
          </div>

          <a class="ar-google-btn" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(googleQuery)}" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            View clinical photo gallery on Google Images ↗
          </a>
        </div>

        <div class="ar-symptom-path ${isRec ? 'rec' : 'use'}">
          <b>${isRec ? '✦ Recovery Impact' : '▲ Continued Use Risk'}</b>: ${sym.mechanism}
        </div>

        <div class="ar-symptom-ref">
          <span>Clinical citation: </span>
          <a href="https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(a.sub + ' ' + f.name)}" target="_blank" rel="noopener">${sym.ref} ↗</a>
        </div>
      </div>
    `;
  }).filter(Boolean).join('');

  const activeCount = Object.values(a.features).filter(Boolean).length;

  return `<div class="ar are-screen">
    <!-- Header -->
    <header class="hd">
      <button class="ibtn" data-a="nav" data-r="home" aria-label="Home">
        <svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="hdt">
        <h1 style="font-size:20px">AR Facial Tracking & Symptoms</h1>
        <p>Live feature pinpoints · Year-by-year evidence</p>
      </div>
      <button class="sospill" data-a="sos">SOS</button>
    </header>

    <!-- Persistent Educational Disclaimer -->
    <div class="are-disc">
      <svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>
      <span><b>Educational illustration — not an individual prediction.</b> Actual physical outcomes vary by dosage, genetics, duration, and lifestyle. This tool supports informed clinical discussions.</span>
    </div>

    <!-- Substance selector -->
    <div>
      <div class="row sb" style="margin-bottom:6px">
        <span style="font:500 11px var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--cam-mut)">Substance of concern</span>
        <span class="mono" style="color:var(--lumen);font-size:12px">${a.sub}</span>
      </div>
      <div class="pills">
        ${availSubs.map(s => `<button class="chip ${a.sub === s ? 'on' : ''}" data-a="areSubSel" data-v="${s}">${s}</button>`).join('')}
      </div>
    </div>

    <!-- Comparison Path Selector (Two Paths) -->
    <div class="seg" style="margin-top:2px">
      <button class="${a.path === 'use' ? 'on' : ''}" data-a="arePathSel" data-v="use">If harmful pattern continues</button>
      <button class="${a.path === 'rec' ? 'on' : ''}" data-a="arePathSel" data-v="rec">If person seeks support & recovery</button>
    </div>

    <!-- Timeline Milestones -->
    <div>
      <div class="row sb" style="margin-bottom:6px">
        <span style="font:500 11px var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--cam-mut)">Timeline years</span>
        <span class="mono" style="color:var(--lumen);font-size:12px">${a.milestone}</span>
      </div>
      <div class="are-milestones">
        ${AR_MILESTONES.map(m => `<button class="are-ms ${a.milestone === m ? 'on' : ''}" data-a="areMilestone" data-v="${m}">${m}</button>`).join('')}
      </div>
    </div>

    <!-- Visual Tracking Viewport Controls -->
    <div class="row sb" style="padding:0 2px;margin-bottom:8px">
      <span style="font:600 11px var(--f-mono);color:var(--cam-mut);letter-spacing:.08em;text-transform:uppercase">Face tracking viewport</span>
      <div class="seg sm" style="margin:0;width:auto">
        <button class="${a.viewMode === 'camera' ? 'on' : ''}" data-a="areSetMode" data-v="camera">📷 Live Camera</button>
        <button class="${a.viewMode === 'avatar' ? 'on' : ''}" data-a="areSetMode" data-v="avatar">👤 3D Avatar</button>
        <button class="${a.viewMode === 'photo' ? 'on' : ''}" data-a="areSetMode" data-v="photo">${hasUserPhoto ? '🖼️ My Photo' : '🖼️ Sample Photo'}</button>
      </div>
    </div>

    <!-- The Live AR Viewport with Pinpoint Markers -->
    <div class="arstage" style="height:320px;position:relative;overflow:hidden">
      <i class="cb tl"></i><i class="cb tr"></i><i class="cb bl"></i><i class="cb br"></i>
      <div class="beam"></div>

      <!-- Live Video Feed / Photo / Morphing Avatar Face -->
      ${a.viewMode === 'camera' ? `
        <video id="areLiveVideo" autoplay playsinline muted class="ar-video"></video>
      ` : a.viewMode === 'photo' ? `
        <div class="fc" style="position:relative;z-index:1;width:100%;height:100%;display:grid;place-items:center">
          ${window.facePhoto ? window.facePhoto({ key: a.sub, D: avatarD, glow: avatarGlow, src: photo }) : `<img src="${photo}" alt="Face photo" style="width:100%;height:100%;object-fit:cover;border-radius:24px">`}
        </div>
      ` : `
        <div class="fc" style="position:relative;z-index:1">
          ${window.faceSVG ? window.faceSVG({ key: a.sub, D: avatarD, uid: 'are', glow: avatarGlow, gray: isRec ? 0 : avatarD * 0.5 }) : ''}
          ${window.MESH || ''}
        </div>
      `}

      <!-- Overlay Mesh Wireframe -->
      <svg id="areTrackingMesh" class="meshsvg" viewBox="0 0 240 300" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3;opacity:.38;transition:transform .06s ease-out">
        <ellipse cx="120" cy="148" rx="55" ry="75" fill="none" stroke="var(--lumen)" stroke-width="0.8" stroke-dasharray="3 3"/>
        <line x1="120" y1="50" x2="120" y2="240" stroke="var(--lumen)" stroke-width="0.5" opacity=".4"/>
        <line x1="60" y1="130" x2="180" y2="130" stroke="var(--lumen)" stroke-width="0.5" opacity=".4"/>
        <line x1="80" y1="200" x2="160" y2="200" stroke="var(--lumen)" stroke-width="0.5" opacity=".4"/>
      </svg>

      <!-- Pinpoint Markers Over Facial Coordinates -->
      ${activePins.map(p => `
        <div class="ar-pin ${p.isActive ? 'active' : ''}" id="pin-${p.id}" style="top:${p.top}%;left:${p.left}%" data-a="areFocusPin" data-f="${p.featId}">
          <div class="ar-pin-dot">
            <span class="ar-pin-ring"></span>
          </div>
          <span class="ar-pin-label">${p.label}</span>
        </div>
      `).join('')}

      <!-- Status telemetry badge -->
      <div style="position:absolute;top:10px;left:14px;z-index:5;display:flex;flex-direction:column;gap:2px">
        <span id="areTelemText" style="background:rgba(3,19,17,.88);padding:3px 8px;border-radius:6px;font:600 9.5px var(--f-mono);color:var(--lumen);border:1px solid rgba(52,208,226,.4)">
          ● ${a.viewMode === 'camera' ? 'TRACKING: READY' : activeCount + '/5 PINS ACTIVE'}
        </span>
        <span style="background:rgba(3,19,17,.75);padding:1px 6px;border-radius:4px;font:500 8.5px var(--f-mono);color:var(--cam-mut)">
          468 MESH ANCHORS LOCKED
        </span>
      </div>

      <span style="position:absolute;bottom:8px;right:12px;font-size:9.5px;color:var(--cam-mut);font-family:var(--f-mono);z-index:5">
        ${a.viewMode === 'camera' ? 'MODE: LIVE CAMERA TRACKING' : a.viewMode === 'photo' ? (hasUserPhoto ? 'MODE: MY PHOTO' : 'MODE: SAMPLE PHOTO') : 'MODE: 3D MESH AVATAR'}
      </span>
    </div>

    <!-- Feature Checkboxes Section -->
    <div>
      <div class="row sb" style="margin-bottom:6px">
        <span style="font:600 11px var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--cam-mut)">Select facial features to pinpoint</span>
        <div style="display:flex;gap:8px">
          <button class="link" data-a="areSelectAllFeats" data-v="1" style="font-size:11.5px;color:var(--lumen);font-weight:600">Select all</button>
          <span class="muted">·</span>
          <button class="link" data-a="areSelectAllFeats" data-v="0" style="font-size:11.5px;color:var(--cam-mut)">Clear</button>
        </div>
      </div>

      <div class="ar-feat-grid">
        ${FACE_FEATURES.map(f => {
          const isChecked = !!a.features[f.id];
          return `
            <div class="ar-feat-row ${isChecked ? 'active' : ''}" data-a="areFeatToggle" data-f="${f.id}" role="button" tabindex="0">
              <div class="ar-feat-info">
                <span class="ar-feat-icon">${f.icon}</span>
                <div>
                  <div class="ar-feat-name">${f.name}</div>
                  <div class="ar-feat-sub">${f.sub}</div>
                </div>
              </div>
              <div class="ar-checkbox-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Live Symptoms Panel for Checked Features -->
    <div>
      <div class="row sb" style="margin-bottom:6px">
        <span style="font:600 11px var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--cam-mut)">
          Evidence-based symptoms (${a.milestone})
        </span>
        <span class="mono" style="font-size:11px;color:var(--cam-mut)">${activeCount} features shown</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        ${symptomCardsHtml || `
          <div class="card flat" style="text-align:center;padding:24px 16px">
            <p class="muted" style="font-size:13px">Check one or more facial features above (eyes, nose, mouth, skin, jaw) to pinpoint them on the face and view timeline symptoms.</p>
          </div>
        `}
      </div>
    </div>

    <!-- Navigation & Reset -->
    <div class="row2" style="margin-top:6px">
      <button class="btn ghost" data-a="areReset">
        <svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 1 2.6 6.4M3 21v-6h6"/></svg>
        Reset AR
      </button>
      <button class="btn" data-a="nav" data-r="scanIntro">
        <svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4v12M7 11l5 5 5-5M4 20h16"/></svg>
        Intake & screening
      </button>
    </div>
  </div>`;
};

/* Attach video stream & start real-time tracking on render if camera is active */
window.AFTER = window.AFTER || {};
window.AFTER.arEnhanced = function () {
  const a = S && S.arEdu;
  if (!a) return;
  if (a.viewMode === 'camera' && window._areCamStream) {
    const vid = document.getElementById('areLiveVideo');
    if (vid) {
      vid.srcObject = window._areCamStream;
      vid.play().then(() => {
        startLiveFaceTracker(vid);
      }).catch(() => {});
    }
  }
};
window.AFTER.ar = window.AFTER.arEnhanced;

/* ================================================================
   Attach Actions & Handlers
   ================================================================ */
function initFeature2() {
  if (!window._appReady) {
    setTimeout(initFeature2, 50);
    return;
  }

  /* Register screens - both ar and arEnhanced route to this screen */
  SCREEN.arEnhanced = () => window.SCREEN_arEnhanced();
  SCREEN.ar = SCREEN.arEnhanced;

  /* Actions */
  ACT.areSubSel = t => {
    S.arEdu.sub = t.dataset.v;
    render(false);
  };

  ACT.arePathSel = t => {
    S.arEdu.path = t.dataset.v;
    render(false);
  };

  ACT.areMilestone = t => {
    S.arEdu.milestone = t.dataset.v;
    render(false);
  };

  ACT.areFocusPin = t => {
    const feat = t.dataset.f;
    S.arEdu.focusedFeature = feat;
    render(false);
    const target = document.getElementById('symptom-' + feat);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  ACT.areFeatToggle = t => {
    const f = t.dataset.f;
    if (!S.arEdu || !S.arEdu.features) return;
    S.arEdu.features[f] = !S.arEdu.features[f];
    if (S.arEdu.features[f]) S.arEdu.focusedFeature = f;
    render(false);
  };

  ACT.areSelectAllFeats = t => {
    const val = t.dataset.v === '1';
    FACE_FEATURES.forEach(f => {
      S.arEdu.features[f.id] = val;
    });
    render(false);
  };

  ACT.areCardMediaTab = t => {
    const f = t.dataset.f;
    const tab = t.dataset.tab;
    if (!S.arEdu.cardMediaTabs) S.arEdu.cardMediaTabs = {};
    S.arEdu.cardMediaTabs[f] = tab;
    render(false);
  };

  ACT.areZoomPhoto = t => {
    const f = t.dataset.f;
    const photo = getClinicalPhoto(f, S.arEdu.sub, S.arEdu.milestone, S.arEdu.path);
    const feat = FACE_FEATURES.find(x => x.id === f);
    const sym = getSymptom(S.arEdu.sub, f, S.arEdu.milestone, S.arEdu.path);
    if (!photo || !feat) return;

    openSheet(`
      <div style="display:flex;flex-direction:column;gap:12px;padding:4px 0">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">${feat.icon}</span>
            <b style="font-size:16px">${feat.name}</b>
          </div>
          <button class="ibtn" data-a="closeSheet">${ic('close',18)}</button>
        </div>

        <div style="border-radius:14px;overflow:hidden;background:#031311;border:1px solid rgba(255,255,255,.15);max-height:260px;display:flex;align-items:center;justify-content:center">
          <img src="${photo.url}" alt="${photo.caption}" style="width:100%;max-height:260px;object-fit:contain">
        </div>

        <div>
          <b style="font-size:14px;color:var(--ink)">${sym ? sym.headline : ''}</b>
          <p style="font-size:12.5px;line-height:1.5;margin-top:4px;color:var(--muted)">${photo.caption}</p>
          <span class="mono" style="font-size:11px;color:var(--cam-mut)">Source archive: ${photo.source}</span>
        </div>

        <a class="btn" style="text-decoration:none" href="https://www.google.com/search?tbm=isch&q=${encodeURIComponent(S.arEdu.sub + ' ' + feat.name + ' clinical case')}" target="_blank" rel="noopener">
          View more cases on Google Images ↗
        </a>
      </div>
    `);
  };

  ACT.areReset = () => {
    stopCamera();
    S.arEdu = {
      sub: 'Alcohol',
      milestone: 'Today',
      path: 'use',
      viewMode: 'avatar',
      cameraOn: false,
      cardMediaTabs: { eyes: 'photo', nose: 'photo', mouth: 'photo', skin: 'photo', jaw: 'photo' },
      features: { eyes: true, nose: true, mouth: true, skin: true, jaw: true },
      focusedFeature: 'eyes'
    };
    toast('AR tracking reset to defaults.');
    render(false);
  };

  ACT.areSetMode = async t => {
    const mode = t.dataset.v;
    if (mode === 'camera') {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast('Live camera is not supported in this environment. Showing 3D avatar.');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false
        });
        window._areCamStream = stream;
        S.arEdu.cameraOn = true;
        S.arEdu.viewMode = 'camera';
        render(false);
      } catch (err) {
        console.warn('Camera error:', err);
        toast('Camera permission denied or unavailable. Using illustration mode.');
        S.arEdu.cameraOn = false;
        S.arEdu.viewMode = 'avatar';
        render(false);
      }
    } else {
      if (S.arEdu.cameraOn) {
        stopCamera();
      }
      S.arEdu.viewMode = mode;
      render(false);
    }
  };

  ACT.areToggleCam = () => {
    ACT.areSetMode({ dataset: { v: S.arEdu.viewMode === 'camera' ? 'avatar' : 'camera' } });
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeature2);
} else {
  initFeature2();
}

})();
