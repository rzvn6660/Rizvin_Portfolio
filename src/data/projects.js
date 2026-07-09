export const projects = [
  {
    slug: 'orma-ai',
    title: 'ORMA AI',
    tagline: 'Malayalam-native voice assistant for elderly care.',
    status: 'IN ACTIVE DEVELOPMENT',
    statusColor: 'progress', // maps to color-status-progress
    stack: ['Speech AI', 'ASR/NMT', 'LLM Orchestration', 'Python'],
    github: null, 
    demo: null,
    docs: null,
    featured: true,
    summary: 'A voice assistant built to tackle aging population care, native-language accessibility, and low-resource-language AI. Features include medicine reminders, appointment recall, emergency detection, and emotion recognition.',
    progressItems: [
      { label: 'ASR Pipeline', status: 'Prototype' },
      { label: 'Reminder Engine', status: 'In Progress' },
      { label: 'Emergency Detection', status: 'Planned' },
      { label: 'Emotion Recognition', status: 'Planned' }
    ],
    problem: 'Elderly individuals in Kerala face isolation and difficulty managing health routines due to technology barriers. Most voice assistants lack robust native Malayalam support and are not tailored for geriatric accessibility (medicine reminders, emergency detection). Without native-language tools, they lose independence.',
    research: 'Evaluated mainstream ASR solutions (Whisper, Google Cloud Speech) vs Indic models. Mainstream models struggle with Malayalam dialectal nuances and latency. Decided to build around specialized low-resource models to ensure accurate voice recognition for elderly speakers.',
    architectureDescription: 'The system flows through a multi-stage pipeline: Audio capture -> Voice Activity Detection -> ASR -> NMT (if pivot needed) -> LLM Reasoning -> NMT -> TTS. A local caching layer manages scheduled reminders securely.',
    engineeringDecisions: [
      {
        title: 'Choice of ASR',
        reasoning: 'Prioritizing local/Indic-specific models over generalized APIs to reduce latency and improve accuracy on colloquial Malayalam.'
      },
      {
        title: 'State Management for Reminders',
        reasoning: 'Using a lightweight database over a heavy distributed queue for early iterations to keep the architecture simple and the footprint low.'
      }
    ],
    tradeoffs: 'Focusing heavily on backend orchestration means the frontend interface is deprioritized—the primary interface is voice. Latency is the biggest challenge; doing sequential ASR -> LLM -> TTS inherently adds delay, requiring clever local caching and streaming TTS solutions to maintain a natural conversation flow.',
    lessonsLearned: 'Building empathy-driven AI requires deeply understanding the latency tolerance of the end user. Elderly users interpret long pauses as system failure, so optimizing the time-to-first-audio-byte is a technical necessity, not just a nice-to-have.',
    roadmap: 'Phase 1 (Completed): Initial ASR/LLM pipeline proof of concept. Phase 2 (Current): Hardening the reminder state engine and reducing latency. Phase 3 (Next): Integrating emergency voice detection and physical-environment aware emotional recognition.'
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
    research: 'Explored a Hybrid AI Intelligence approach, combining local offline-first SQLite FAQ caching with advanced LLMs (Groq, Gemini, Ollama) to ensure both reliability in low-connectivity areas and lightning-fast responses when online.',
    architectureDescription: '1. Voice Input (Santali) -> 2. ASR Module (IndicConformer) -> 3. Translation Module (IndicTrans Santali-to-English) -> 4. Cache Checking. If Query/Response Found: 5. Reverse Translation (IndicTrans) -> 6. Output Module (IndicParler TTS). If Not in Cache: 5. Intelligence Layer (Groq, Gemini, Ollama) -> 6. Reverse Translation (IndicTrans) -> 7. Output Module (IndicParler TTS).',
    architectureImage: 'https://raw.githubusercontent.com/rzvn6660/Multilingual-AI/main/docs/images/architecture.png',
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
    roadmap: 'Further optimization of local caching mechanisms and expanding the offline inference capabilities using lighter on-device models to fully remove cloud dependencies.'
  },
  {
    slug: 'medi-fy',
    title: 'Medi-Fy',
    tagline: 'AI medicine chatbot parsing prescriptions via OCR & OpenFDA.',
    status: 'SHIPPED',
    statusColor: 'shipped',
    stack: ['Python', 'OCR', 'NLP', 'OpenFDA API'],
    github: 'https://github.com/rzvn6660/Medi-fy',
    demo: null,
    docs: 'https://github.com/rzvn6660/Medi-fy#readme',
    featured: false,
    summary: 'An AI-based chatbot system extracting crucial information from medicine labels using OCR and NLP, providing structured data through a Gradio interface.',
    problem: 'Elderly individuals and visually impaired people often have difficulty reading printed medicine labels, making vital information like dosage, usage, and side effects inaccessible.',
    research: 'Evaluated image preprocessing techniques and various OCR tools before selecting Pytesseract for extraction and OpenCV/PIL for noise reduction to improve text detection clarity.',
    architectureDescription: '1. Image Upload via Gradio UI. 2. Image Preprocessing (grayscale conversion, noise reduction via OpenCV). 3. OCR Extraction (Pytesseract). 4. NLP-based cleaning and filtering. 5. Data Retrieval from OpenFDA API or Local Dataset fallback. 6. Results formatting and UI display.',
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
    roadmap: 'Enhancing the image preprocessing pipeline to better handle curved pill bottles and exploring LLM-based vision models for direct text extraction.'
  }
];
