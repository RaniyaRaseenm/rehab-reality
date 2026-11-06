# REHAB REALITY --- ANTIGRAVITY IMPLEMENTATION SPECIFICATION

**Input:** `Rehab Reality.html` (existing prototype)\
**Goal:** Implement the photo-based intake/screening/PDF report and the
educational AR timeline directly in the existing app. This document is
intended to be uploaded to AntiGravity together with the HTML file.

## 1. Instructions to AntiGravity

Read the entire existing `Rehab Reality.html` before editing. Modify the
existing project; do not rebuild it from scratch or replace its
framework, visual design, navigation, state model, or event-delegation
pattern. Preserve all existing screens and working features: onboarding,
profile, scan, analysis, result, AR, recovery tracker, wellness
hub/coach, community, SOS, guardian view, and settings.

Reuse the current camera/gallery upload flow and photo state (the
existing code uses `S.scan.photo`, or its equivalent after inspection).
Keep camera-denied, camera-unavailable, and no-photo fallbacks working.
Test all changed flows.

**Critical accuracy rule:** the current scan score, confidence, feature
scores, and analysis animation are simulated. Do not present them as
real ML inference. The current AR face projection is illustrative, not a
scientifically validated future-face model or live body scan. Remove or
correct copy that claims a real model or face-aging GAN exists unless
you actually integrate one.

Do not invent a trained model, dataset, accuracy, confidence, medical
result, contact, citation, or rehabilitation facility. If no validated
model is present, implement a transparent screening questionnaire and
clearly label it as a prototype/educational screening, not a diagnosis.

## 2. Feature One --- Photo intake, screening, guidance and PDF report

### User flow

1.  User opens the existing scan/intake screen.
2.  User chooses **Take photo** or **Upload from gallery**.
3.  Show a preview with retake and remove options.
4.  Explain why the photo is requested, how it is processed, whether it
    leaves the device, and obtain consent before processing or upload.
5.  Ask the user which substance(s) they are concerned about and
    complete an evidence-informed screening questionnaire.
6.  Generate a results dashboard.
7.  Provide professional support options, safe general guidance, and a
    **Download detailed PDF report** button.

### ML and clinical requirements

-   A selfie cannot reliably identify alcohol/drug use, diagnose
    addiction, determine substance-use-disorder severity, or predict
    internal organ damage.
-   Never map facial appearance to alcohol/opioid/cannabis/stimulant
    use. Never show "substance detected", "probability of addiction", or
    a medical severity score derived from a face.
-   A validated questionnaire may be used where its exact wording,
    scoring, suitability and use are verified. Examples to evaluate
    include AUDIT/AUDIT-C for alcohol and WHO ASSIST for multi-substance
    screening. Do not invent questions or scoring thresholds.
-   If validated scoring cannot be implemented correctly in time, label
    the questionnaire a **demo screening flow** and do not claim
    clinical validation.
-   State clearly: screening is not diagnosis; a qualified professional
    should assess concerns.
-   Image processing, if implemented, must be limited to technically
    supported tasks such as face presence, landmarks, blur, lighting,
    and positioning. Do not infer substance use, addiction, organ
    health, or future appearance from facial features.
-   If no reliable image analysis is available, use the photo only for
    preview/demo and do not fabricate image observations.

Use small, replaceable modules/functions such as `screeningService`,
`imageAnalysisService`, and `reportService`. If a Python FastAPI backend
is genuinely needed, keep API calls isolated, provide a fallback if it
is unavailable, keep secrets server-side in environment variables, and
never hardcode API keys in frontend JavaScript.

### Results dashboard

Include: - Screening summary: selected concern(s), questionnaire
name/version, date, outcome and plain-language interpretation. - Clear
distinction between user-reported answers and any computed image
observations. - Limitations: what screening can and cannot tell the
user; not a diagnosis. - Recommended next steps based on the user's
reported concern, not a selfie-derived diagnosis. - Professional support
contacts relevant to the user's selected country/region. - Safe, general
at-home support guidance. - PDF download action.

### Support contacts

Only show real, verified services. For each, include service name, what
it offers, phone/website, operating hours if verified, and source.
Distinguish emergency services, mental-health helplines and
addiction-treatment services. Do not describe a general mental-health
helpline as a dedicated rehab service unless verified. If location is
unknown, ask the user to choose a region or link to an authoritative
service directory. Never invent contacts or availability.

### At-home guidance safety

Give general supportive guidance only: encourage professional
assessment, a trusted support person, regular meals, hydration, sleep
routine, safer surroundings, trigger planning and follow-up. Do not
provide medication dosing or a DIY detox schedule. Do not advise
abruptly stopping alcohol or sedatives without medical advice:
withdrawal can be dangerous or life-threatening and may require
medically supervised care. For suspected overdose, seizures, severe
withdrawal, breathing difficulty, unconsciousness or immediate danger,
direct the user to emergency medical services.

### PDF report

Generate a downloadable PDF from the actual current session, not static
demo data. Include: 1. App name, report title and creation date/time. 2.
Only necessary user-entered profile details, where consented. 3.
Selected substance concern(s). 4. Questionnaire name/version and an
answer summary. 5. Screening result and limitations. 6. Image-processing
details, if any, with a statement that this is not a substance-use
diagnosis. Do not embed the photo by default; obtain consent if
including it. 7. Recommended next steps and safe at-home support
information. 8. Withdrawal/overdose warning. 9. Verified local support
contacts and emergency information. 10. References with source title,
organization, URL and access date. 11. Disclaimer: "This report is
educational and for screening support only. It is not a medical
diagnosis or a substitute for assessment by a qualified health
professional."

PDF must download on desktop and mobile, contain current session data,
have readable non-clipped text, and clickable links where supported.
Omit missing fields or mark "Not provided"; never invent values. Show a
useful error and print-friendly fallback if generation fails.

## 3. Feature Two --- Educational AR timeline

### Purpose and framing

Extend the existing AR screen into an impactful, evidence-informed
educational tool for rehabilitation professionals to explain possible
long-term consequences of continued substance use and the potential
benefits of seeking support. It must be non-stigmatizing and honest
about uncertainty. Do not use shame or fear tactics. Do not present a
deterministic "this is what your face/body will look like" prediction.

### Required controls

-   Camera start/stop with permission handling.
-   Camera-free demo/illustration mode.
-   Substance selector using only supported options and clinically
    relevant content.
-   Timeline milestones such as **Today, 2 years, 5 years, 10 years**.
    Add further milestones only where sources support them.
-   Two paths: **If the harmful pattern continues** and **If the person
    seeks support and recovery**.
-   Reset control.
-   Persistent disclaimer: **Educational illustration --- not an
    individual prediction**.

### Live camera mode

If feasible, use browser camera APIs and MediaPipe Face Landmarker or
another supported landmark library to position subtle callouts. Camera
frames should remain on-device wherever possible. Do not claim that face
tracking detects disease or measures organ damage. If camera or library
setup fails, show the camera-free illustration mode rather than a broken
screen.

### Body-region callouts

Allow the user to select a region/system where supported by evidence for
the selected substance. Candidate regions include eyes/vision, skin,
mouth/teeth, brain/cognition, heart/circulation, liver/digestive system,
lungs/respiratory system, nervous system and overall functioning.

Each callout must show: 1. Body region/system. 2. Concise plain-language
explanation of a possible effect. 3. Whether the effect is
well-established, variable, or dependent on dose/duration/other factors.
4. A note that outcomes vary and are not guaranteed. 5. At least one
reputable reference link.

Do not imply every substance affects every region. Only show effects
supported by references for the selected substance. Do not claim a
specific effect will occur at exactly year 2 or year 5 unless a source
supports that time estimate. Otherwise treat the slider as educational
stages, not a clinical countdown.

### Reference images and comparison

Use legitimate medical/educational illustrations with captions, source
organization and links. No graphic shock imagery, stigmatizing
before/after photos, unverified social-media images, or images presented
as the user's predicted future appearance. If verified images are
unavailable, use labelled diagrams/icons plus reference links.

The comparison should explain that continued use may increase health
risks, while seeking support can reduce risks and improve
health/functioning; outcomes depend on substance, pattern, duration and
individual factors. Do not claim all harm is reversible or guarantee a
particular recovery outcome. Reuse the existing split-screen and
timeline controls where possible.

## 4. Privacy and security

-   Explain photo purpose, processing, transmission and retention.
-   Obtain explicit consent before camera use and before any server
    upload.
-   Prefer local processing for camera frames and face landmarks.
-   If uploading is necessary, transmit only what is required, avoid
    logging images or sensitive answers, and delete temporary files
    promptly.
-   Do not store photos, screening answers or reports publicly.
-   Do not put secrets/API keys in client-side code.
-   Provide a way to remove the photo and reset the session.
-   Update privacy statements to match actual data handling. Never
    promise "never uploaded" if the code uploads it.

## 5. Implementation order for the presentation

**Must work:** camera/gallery upload and preview; consent; transparent
questionnaire; honest result dashboard; safe guidance; verified support
links; PDF download using current session data; AR timeline, region
callouts, comparison paths and citations.

**If time permits:** live face-landmark overlay, verified reference
images, region-specific visual highlighting, enhanced PDF styling.

Prioritize a reliable end-to-end demo over visual effects. Do not fake a
medical AI predictor.

## 6. Acceptance checklist

### Existing app

-   Existing screens, navigation, styling and responsive layout still
    work.
-   No unrelated feature is removed.

### Feature One

-   Camera and gallery upload work where supported.
-   Preview, retake and remove work.
-   Consent/privacy copy matches actual data handling.
-   Questionnaire can be completed and validated.
-   No diagnosis or substance classification comes from the selfie.
-   Results distinguish user answers from image observations.
-   Contacts and references are real and verified.
-   Guidance includes withdrawal/overdose safety warnings.
-   PDF downloads and contains current session information.

### Feature Two

-   Camera mode and camera-free fallback work.
-   Timeline milestones are selectable.
-   Substance selection updates relevant content.
-   Region callouts update the information panel.
-   Reference links work.
-   Comparison paths work.
-   Educational/non-predictive disclaimer remains visible.
-   No unsupported deterministic future-face/body prediction is shown.

### Handoff

-   Test on the intended presentation device/browser.
-   Provide exact setup/run instructions.
-   List files changed and dependencies added.
-   State which features are real, illustrative, or pending.
-   State internet, backend and camera-permission requirements.

## 7. Final instruction

Implement these features directly in the existing `Rehab Reality.html`
project. Do not stop at a plan or mockup: make the code changes, test
the flows, and provide a concise change log and exact run instructions.
If a clinical feature cannot be safely implemented or validated with
available assets/data, implement the transparent educational alternative
and document the limitation.
