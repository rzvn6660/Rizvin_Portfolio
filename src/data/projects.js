export const projects = [
  {
    slug: 'orma-ai',
    title: 'ORMA AI',
    tagline: 'Voice-first AI memory & daily living companion for older adults.',
    status: 'PUBLIC BETA',
    statusColor: 'shipped',
    stack: ['FastAPI', 'React 19', 'Whisper ASR', 'Groq Llama 3.3', 'Gemini 2.5 Flash', 'PostgreSQL/SQLite'],
    github: 'https://github.com/rzvn6660/orma-ai',
    demo: 'https://app-orma-ai.onrender.com',
    docs: 'https://github.com/rzvn6660/orma-ai/releases/tag/v0.1.0-beta.1',
    featured: true,
    summary: 'An assistive, voice-first AI memory and daily living companion for older adults. Combines multilingual Whisper speech recognition with deterministic medication tracking, emergency caregiver alert dispatch, and personal memory recall (OCME).',
    progressItems: [
      { label: 'Multilingual Voice (Whisper)', status: 'Shipped' },
      { label: 'Medication Safety Engine', status: 'Shipped' },
      { label: 'Deterministic Emergency Routing', status: 'Shipped' },
      { label: 'Caregiver Linkage & OCME', status: 'Shipped' }
    ],
    problem: 'Aging seniors face cognitive fatigue, complex nested smartphone menus, multi-dose medication regimens, and language barriers. Mainstream voice assistants lack regional language fluency and fail to provide deterministic safety guardrails or caregiver visibility when urgent health events occur.',
    research: 'Evaluated speech latency tolerances and safety failure modes with older adults. Established a hybrid architecture: deterministic backend services handle safety-critical workflows (medications, emergency dispatch) without LLM hallucination risk, while conversational memory relies on fast multilingual inference.',
    architectureDescription: '1. Spoken / Touch Input -> 2. Client Audio Preprocessing (Web Audio API) -> 3. Multilingual Whisper ASR -> 4. Deterministic Intent & Safety Classifier -> 5. Emergency Safety Bypass (Caregiver Alerts) OR Medication Engine / OCME Context Retrieval -> 6. Dual-LLM Orchestration (Groq Llama 3.3 70B with Gemini 2.5 Flash Fallback) -> 7. Speech Synthesis & Accessible React UI -> 8. Caregiver Telemetry & Escalation.',
    architectureSteps: [
      'Spoken / Touch Input via Senior-friendly Interface',
      'Client Audio Preprocessing (Web Audio API)',
      'Multilingual Whisper ASR Engine',
      'Deterministic Intent & Safety Classifier',
      'Emergency Safety Bypass (Caregiver Alerts) OR Medication Engine / OCME Context Retrieval',
      'Dual-LLM Orchestration (Groq Llama 3.3 70B with Gemini 2.5 Flash Fallback)',
      'Speech Synthesis & Accessible React UI',
      'Caregiver Telemetry & Escalation Dispatch'
    ],
    architectureImage: '/orma-architecture.png',
    engineeringDecisions: [
      {
        title: 'Deterministic Emergency Safety Bypass',
        reasoning: 'Critical emergency keywords ("Help me", "I fell") completely bypass generative LLM reasoning to immediately trigger deterministic caregiver alerts, preventing hallucinations and latency during emergencies.'
      },
      {
        title: 'Dual-LLM Automated Failover',
        reasoning: 'Configured Groq Llama 3.3 70B as primary for sub-second conversational latency, backed by automated fallback to Gemini 2.5 Flash to guarantee high availability.'
      }
    ],
    tradeoffs: 'Balancing a hands-free voice interface with high-contrast visual accessibility. While voice removes touchscreen friction for seniors, medication logging incorporates touch confirmation as a deterministic safeguard against misheard speech.',
    lessonsLearned: 'Assistive healthcare AI demands strict boundaries between probabilistic generation and deterministic safety. Isolating safety-critical workflows into rule-based engines ensures user trust and caregiver reliability.',
    roadmap: 'Beta 1 is publicly released and deployed. Upcoming engineering focuses on on-device offline voice models for zero-connectivity environments, wearable biometric sensors, and localized dialect adaptation.'
  },
  {
    slug: 'triem',
    title: 'TRIEM',
    tagline: 'Multilingual voice assistant for tribal & low-resource languages.',
    status: 'SHIPPED',
    statusColor: 'shipped',
    stack: ['IndicConformer', 'IndicTrans2', 'Groq Llama 3', 'Gemini 1.5', 'Flask', 'Docker', 'SQLite'],
    github: 'https://github.com/rzvn6660/Multilingual-AI',
    demo: null,
    docs: 'https://github.com/rzvn6660/Multilingual-AI#readme',
    featured: false,
    summary: 'An advanced, multilingual voice assistant designed specifically to bridge language barriers for tribal communities, focusing on Santali. It leverages ASR, MT, Generative AI Agents, and TTS to provide a seamless conversational interface.',
    problem: 'Tribal communities face significant barriers accessing digital services and healthcare information due to language constraints. Non-technical users need an intuitive voice interface in their native language (like Santali) to bridge this gap.',
    research: 'Architected and implemented a Hybrid AI Intelligence pipeline, combining local offline-first SQLite FAQ caching with advanced LLMs (Groq, Gemini, Ollama) to ensure both reliability in low-connectivity environments and lightning-fast responses when online.',
    architectureDescription: '1. Voice Input (Santali) -> 2. ASR Module (IndicConformer) -> 3. Translation Module (IndicTrans Santali-to-English) -> 4. Cache Checking. If Query/Response Found: 5. Reverse Translation (IndicTrans) -> 6. Output Module (IndicParler TTS). If Not in Cache: 5. Intelligence Layer (Groq, Gemini, Ollama) -> 6. Reverse Translation (IndicTrans) -> 7. Output Module (IndicParler TTS).',
    architectureSteps: [
      'Voice Input (Santali / Tribal Speech)',
      'ASR Module (AI4Bharat IndicConformer)',
      'Translation Module (IndicTrans Santali-to-English)',
      'Cache Checking (Offline-first SQLite FAQ Lookup)',
      'Conditional Routing: If Cached, immediate reverse translation; If Miss, query Intelligence Layer (Groq Llama 3, Gemini 1.5, Ollama fallback)',
      'Reverse Translation (IndicTrans English-to-Santali)',
      'Output Module & Speech Synthesis (IndicParler TTS to User Audio)'
    ],
    architectureImage: '/triem-architecture.png',
    engineeringDecisions: [
      {
        title: 'Hybrid Brain Engine with Local Caching',
        reasoning: 'Implemented an offline-first SQLite caching mechanism before querying external LLMs to reduce latency, ensure robustness, and lower API costs for common queries.'
      },
      {
        title: 'Model Selection Architecture',
        reasoning: 'Built a dynamic intelligence layer that falls back seamlessly between Groq (Llama 3/Mixtral) for speed, Gemini 1.5 Flash, and Ollama (local Llama 3) for complete offline redundancy.'
      }
    ],
    tradeoffs: 'While translating Santali to English as a pivot language introduces potential semantic shifts, it enables the system to leverage the massive reasoning power of state-of-the-art English LLMs (Groq, Gemini) that lack native Santali support.',
    lessonsLearned: 'Building for low-resource languages requires a multi-agent pipeline where each step (ASR -> MT -> LLM -> MT -> TTS) must be tightly optimized, as compounding latency is the biggest threat to a natural user experience.',
    roadmap: 'The core multilingual voice assistant pipeline (Santali ASR, MT, dynamic LLM failover, TTS, and local SQLite caching) is fully implemented and containerized. Planned future research focuses on lighter on-device quantized models to eliminate external cloud dependencies entirely.'
  },
  {
    slug: 'medi-fy',
    title: 'Medi-Fy',
    tagline: 'AI medicine chatbot parsing prescriptions via OCR & OpenFDA.',
    status: 'SHIPPED',
    statusColor: 'shipped',
    stack: ['Python', 'OpenCV', 'Pytesseract', 'NLP', 'OpenFDA API', 'Gradio'],
    github: 'https://github.com/rzvn6660/Medi-fy',
    demo: null,
    docs: 'https://github.com/rzvn6660/Medi-fy#readme',
    featured: false,
    summary: 'An AI-based chatbot system extracting crucial information from medicine labels using OCR and NLP, providing structured data through a Gradio interface.',
    problem: 'Elderly individuals and visually impaired people often have difficulty reading printed medicine labels, making vital information like dosage, usage, and side effects inaccessible.',
    research: 'Evaluated image preprocessing techniques and various OCR tools before selecting Pytesseract for extraction and OpenCV/PIL for noise reduction to improve text detection clarity.',
    architectureDescription: '1. Image Upload via Gradio UI. 2. Image Preprocessing (grayscale conversion, noise reduction via OpenCV). 3. OCR Extraction (Pytesseract). 4. NLP-based cleaning and filtering. 5. Data Retrieval from OpenFDA API or Local Dataset fallback. 6. Results formatting and UI display.',
    architectureSteps: [
      'Image Upload via Gradio UI',
      'Image Preprocessing (Grayscale conversion, noise reduction via OpenCV & PIL)',
      'OCR Text Extraction (Pytesseract)',
      'NLP-based Cleaning and Dosage/Usage Filtering',
      'Data Retrieval from OpenFDA API (with Local Dataset Fallback)',
      'Results Formatting & Accessible Chatbot UI Display'
    ],
    architectureImage: '/medify-architecture.png',
    engineeringDecisions: [
      {
        title: 'Local Dataset Fallback',
        reasoning: 'Integrated a local dataset as a fallback mechanism to ensure the chatbot remains functional even when the OpenFDA API is unreachable or rate-limited.'
      },
      {
        title: 'Gradio Interface',
        reasoning: 'Chose Gradio to rapidly build a simple, interactive, and highly accessible user interface suitable for testing image uploads and chatbot interactions.'
      }
    ],
    tradeoffs: 'Relying on Pytesseract introduces challenges with highly curved or degraded physical labels. Extensive OpenCV preprocessing was required, trading off some processing speed for higher accuracy.',
    lessonsLearned: 'Robust NLP filtering is essential when bridging physical-world OCR extraction with strict external APIs like OpenFDA, as even minor misspellings cause API failures.',
    roadmap: 'The complete medicine information pipeline—including OpenCV preprocessing, OCR text extraction, OpenFDA API integration, local dataset fallback, and the interactive Gradio interface—is fully completed and shipped. Future research focuses on evaluating multimodal vision LLMs for direct text extraction from distorted or curved physical packaging.'
  }
];
