export const skillCategories = [
  {
    id: 'core-ai',
    title: 'Core AI & ML',
    subtitle: 'Specialized capabilities in generative, speech, language, and vision systems.',
    skills: [
      'Generative AI',
      'AI Agents / LLM Agents',
      'Speech AI (ASR & TTS)',
      'Neural Machine Translation (NMT)',
      'NLP (Natural Language Processing)',
      'Computer Vision (OCR)',
      'Prompt Engineering',
      'Machine Learning'
    ]
  },
  {
    id: 'frameworks-tooling',
    title: 'Frameworks & AI Tooling',
    subtitle: 'Model libraries, orchestration frameworks, and multimodal tools.',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Hugging Face',
      'LangGraph',
      'IndicConformer & IndicTrans2',
      'OpenCV & Pytesseract'
    ]
  },
  {
    id: 'backend-infrastructure',
    title: 'Backend & Infrastructure',
    subtitle: 'Production services, containerization, and data layers.',
    skills: [
      'Python',
      'FastAPI & Flask',
      'Docker',
      'PostgreSQL & SQLite',
      'REST APIs',
      'React'
    ]
  }
];

export const skills = skillCategories.flatMap(c => c.skills);
