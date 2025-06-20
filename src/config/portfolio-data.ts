import type { Persona } from '@/types/portfolio';

export const portfolioData: Record<Persona['id'], Persona> = {
  'engineer': {
    id: 'engineer',
    title: 'Healthcare AI Scientist',
    emoji: '👨‍💻',
    color: 'rgba(99, 102, 241, 1)',
    description: 'Who builds intelligent systems that augment healthcare delivery with a focus on patient outcomes and clinical decision support',
    inspirations: [
      {
        name: 'Andrew Ng',
        role: 'Co-founder of Google Brain, Coursera & Stanford AI Lab',
        image: '/inspirations/Andrew-Ng.jpg',
        lessons: [
          'Democratize education and make complex knowledge accessible to millions worldwide',
          'Approach AI development with both technical excellence and practical applications',
          'Build bridges between academic research and industry implementation',
          'Lead with humility while pursuing innovations that have meaningful global impact'
        ]
      },
      {
        name: 'Fei-Fei Li',
        role: 'Co-Director of Stanford Human-Centered AI Institute',
        image: '/inspirations/Fei-Fei-Li.jpg',
        lessons: [
         'Design systems that reflect human needs and values across different contexts',
         'Balance technological innovation with ethical considerations',
         'Apply computer vision and deep learning approaches to medical imaging and diagnostics',
         'Create AI that enhances rather than replaces human judgment in healthcare'      
        ]
      },
      {
        name: 'Yoshua Bengio',
        role: 'Scientific Director of Mila, Turing Award Winner',
        image: '/inspirations/Yoshua-Bengio.jpg',
        lessons: [
          'Push the boundaries of AI research while considering societal implications',
          'Advocate for responsible AI development and deployment',
          'Apply deep learning approaches to complex healthcare challenges',
          'Maintain scientific rigor while exploring innovative applications'
        ]
      },
      {
        name: 'Demis Hassabis',
        role: 'Co-founder & CEO of DeepMind',
        image: '/inspirations/Demis-Hassabis.jpg',
        lessons: [
          'Tackle fundamental healthcare problems with novel computational approaches',
          'Combine cognitive science insights with AI development',
          'Think long-term about AI\'s transformative potential in medicine',
          'Create interdisciplinary teams that bring diverse perspectives to AI challenges'
        ]
      }
    ],
    experiences: [
      {
        title: '🧭 Patients Empowered Web Application',
        description: 'This web app leverage AI advancements to empower patients in healthcare interactions by equipping them with knowledge to understand their medical conditions, enabling effective self-advocacy and participation in treatment decisions, facilitating informed second opinions on diagnoses and treatment plans, and reducing medical errors through patient education and engagement. FastAPI Python backend (deployed on Railway), MongoDB for data storage, Supabase for sign-in and authentication, AI integrations (OpenAI, Anthropic and Perplexity APIs), React & CSS for the responsive frontend',
        date: 'April, 2025',
        tags: ['Clinical Workflow', 'AI Integration', 'Healthcare AI', 'Diagnostic System', 'Patient Empowerment'],
        link: '',
        videoUrl: 'https://www.youtube.com/embed/dNewsKw1XAU'
      },
      {
        title: '🩺 Dr. CaringAI Web Application',
        description: 'Developed a self-service medical consultation web application, enabling patients to receive AI-generated medical guidance. System workflow: symptom assessment, differential diagnosis generation, Perplexity API research integration, follow-up questions for final diagnoses, personalized treatment plans, and comprehensive pdf reports for patients to share with healthcare providers. FastAPI Python backend, MongoDB for data storage, AI integrations (OpenAI and Perplexity APIs), React 18 & Bootstrap 5 for the responsive frontend, connected through RESTful API endpoints with Axios. Dr.Caring AI web application is accessible at: https://caringai.ali-yousefli.com',
        date: 'March, 2025',
        tags: ['Web Development', 'AI Integration', 'Healthcare AI', 'Diagnostic System', 'Patient Care'],
        link: 'https://caringai.ali-yousefli.com/',
        videoUrl: 'https://www.youtube.com/embed/YmiuWOxghm4'
      },
      {
        title: '🤖 Dr. Agenticare - Agentic AI Healthcare System',
        description: 'Designed and implemented a modular healthcare system on the n8n platform featuring specialized AI agents for patient interviews, research, lab tests, medical imaging, diagnosis, treatment, and patient education. Implemented sophisticated orchestration layer using OpenAI API, creating seamless communication pathways between specialized medical AI agents.',
        date: 'February, 2025',
        tags: ['n8n Platform', 'AI Agents','System Architecture','Medical Systems', 'AI Orchestration'],
        link: '',
        videoUrl: 'https://www.youtube.com/embed/XFzZ-59zkAI'
      },
      {
        title: '🧠 Fine-tuning Llama 3.2 3B with RLHF',
        description: 'Implemented Reinforcement Learning from Human Feedback to optimize large language model responses for healthcare contexts. Engineered the system to generate responses that demonstrate empathy with patients, cultural sensitivity, and adherence to best bedside medical practices, significantly enhancing the patient experience.',
        date: 'February, 2025',
        tags: ['RLHF', 'Clinical Empathy', ' AI Ethics', 'Model Training', 'Llama 3.2'],
        link: ''
      },
      {
        title: '📚 Fine-tuning Llama 3.2 3B LoRA for Medical Diagnosis',
        description: 'Applied Low-Rank Adaptation (LoRA) techniques to efficiently fine-tune Llama 3.2 3B on the MedQA multiple-choice question dataset. Optimized model parameters for medical diagnostic reasoning while maintaining computational efficiency, resulting in improved diagnostic accuracy on complex medical cases.',
        date: 'February, 2025',
        tags: ['LoRA Fine-tuning', 'MedQA Dataset', 'Medical Diagnostics', 'Parameter-Efficient Training', 'AI Accuracy'],
        link: ''
      },
      {
        title: '📊 LLM Applications In Healthcare - Independent Study',
        description: 'Conducted comprehensive research on LLM implementation in clinical environments, resulting in a 30-page paper examining architectural approaches, performance metrics, and integration challenges. Analyzed security considerations and explored potential regulatory frameworks for AI deployment in healthcare settings.',
        date: 'September, 2024 - January, 2025',
        tags: ['LLM Research', 'Healthcare AI', 'Security Analysis', 'Performance Metrics'],
        link: 'https://www.linkedin.com/posts/aysf_large-language-model-llm-applications-in-activity-7295288078103908353-LCUH?utm_source=share&utm_medium=member_desktop&rcm=ACoAACA_j78BOEBx394mKOw861miJRoJ_D3Dj5Q',
        pdfUrl: '/pdfs/llm-applications-in-healthcare.pdf'
      },
      {
        title: '🔬 AI Scientist @ Molecular You',
        description: 'Developed and implemented a secure dual-LLM architecture with Retrieval-Augmented Generation (RAG) integration for personalized healthcare recommendations. Created sophisticated prompt engineering techniques and knowledge base integration systems running locally to ensure data privacy while delivering clinically relevant insights to patients and healthcare providers.',
        date: 'August, 2024 - December, 2024',
        tags: ['LLM Research', 'LangFlow', 'Ollama', 'Security Analysis', 'Performance Metrics'],
        link: '',
        imageUrl: '/images/molecular-you.jpg'
      }
    ]
  },
  'educator': {
    id: 'educator',
    title: 'Business Strategist',
    emoji: '📈',
    color: 'rgba(139, 92, 246, 1)',
    description: 'Who transforms healthcare innovations into commercially viable solutions with strategic market entry and sustainable growth models',
    inspirations: [
      {
        name: 'Clayton Christensen',
        role: 'Late HBS Professor, Innovation Expert',
        image: '/inspirations/Clayton-Christensen.jpg',
        lessons: [
          'Identify disruptive innovations that can transform healthcare delivery',
          'Build business models that create value for underserved healthcare markets',
          'Apply jobs-to-be-done thinking to understand patient and provider needs',
          'Challenge conventional assumptions about healthcare business structures'
        ]
      },
      {
        name: 'Judy Faulkner',
        role: 'Founder & CEO of Epic Systems',
        image: '/inspirations/Judy-Faulkner.jpg',
        lessons: [
          'Maintain unwavering focus on healthcare product excellence and usability',
          'Build technology companies with long-term vision and independence',
          'Create integrated systems that address complex healthcare challenges',
          'Prioritize customer needs over short-term business gains'
        ]
      },
      {
        name: 'David Feinberg',
        role: 'CEO of Oracle Health & Former VP of Google Health',
        image: '/inspirations/David-Feinberg.jpg',
        lessons: [
              'Bridge technology ecosystems with healthcare delivery systems',
              'Scale digital health innovations across diverse clinical environments',
              'Implement data-driven approaches to healthcare transformation',
              'Align technological capabilities with healthcare business needs'
        ]
      }
    ],
    experiences: [
      {
        title: '📱 Molecular You - Strategy & Commercialization Associate',
        description: 'Designed and evaluated business strategies for U.S. market entry through comprehensive analysis of stakeholder needs, focusing on strategic partnerships with private pay clinics and reimbursement pathways. Conducted thorough portfolio analysis of U.S. Alzheimer\'s disease market and developed data-driven insights to guide strategic decision-making for market penetration.',
        date: 'May-Aug 2024',
        tags: ['Market Analysis', 'Go-to-Market Strategy', 'Healthcare Partnerships', 'Reimbursement Models'],
        link: ''
      },
      {
        title: ' 🚀 B-ALIVE STARTUP - Business Development and Marketing Advisor',
        description: 'Conducted comprehensive market analysis of anti-CD38 antibody therapy market and antibody engineering partnerships, providing strategic revenue forecasts and competitive intelligence. Created comprehensive NPV valuation models integrating DCF analysis while identifying and prioritizing critical business workstreams including patent strategy and proof-of-concept acceleration.',
        date: 'Jan-May 2024',
        tags: ['Biotech Commercialization', 'DCF Valuation', 'Patent Strategy', 'Competitive Intelligence'],
        link: ''
      },
      {
        title: '🏥 Dartmouth Health - Healthcare Strategy Analyst',
        description: 'Conducted market research and business model development for innovative rural healthcare delivery system at Dartmouth Health System. Analyzed reimbursement pathways and stakeholder needs to create sustainable implementation strategy for extending hospital-level care to rural homes.',
        date: 'Apr-May 2024',
        tags: ['Rural Healthcare', 'Alternative Care Models', 'Market Research', 'Healthcare Access'],
        link: ''
      },
      {
        title: '⚡ Cardinal Health - Senior Specialist, Quality Assurance',
        description: 'Led Kaizen events, delivering $1M+ cost savings by strategically improving U.S. Manufacturing processes. Programmed a reusable 21-step VBA script that structured, sanitized, analyzed, and visualized vast amounts of raw data instantly, saving 100+ hours while maintaining the highest quality standards for healthcare products.',
        date: '2020-2023',
        tags: ['Kaizen', 'Cost Optimization', 'Lean Six Sigma', 'Data Automation', 'Quality Systems'],
        link: ''
      }

    ]
  },
  'movement-builder': {
    id: 'movement-builder',
    title: 'Healthcare Innovator',
    emoji: '🔬',
    color: 'rgba(236, 72, 153, 1)',
    description: 'Who reimagines healthcare delivery through technology integration and patient-centered design',
    inspirations: [
      {
        name: 'Eric Topol',
        role: 'Founder & Director of Scripps Research Translational Institute',
        image: '/inspirations/Eric-Topol.jpg',
        lessons: [
          'Reimagine healthcare delivery through thoughtful integration of AI and digital tools',
          'Challenge the status quo of medical practice with evidence-based innovation',
          'Balance technological advancement with the human elements of healthcare',
          'Advocate for patient empowerment through technology and data ownership'
        ]
      },
      {
        name: 'Paul Farmer',
        role: 'Co-founder of Partners In Health, Global Health Pioneer',
        image: '/inspirations/Paul-Farmer.jpg',
        lessons: [
            'Address healthcare disparities through pragmatic solidarity',
            'Build systems that deliver high-quality care in resource-constrained settings',
            'Combine technological innovation with social understanding',
            'Maintain unwavering commitment to healthcare as a human right'
        ]
      },
      {
        name: 'Devi Shetty',
        role: 'Founder of Narayana Health',
        image: '/inspirations/Devi-Shetty.jpg',
        lessons: [
            'Creating innovative healthcare delivery models that increase accessibility',
            'Scaling high-quality care through process innovation and efficiency',
            'Challenging conventional assumptions about healthcare costs',
            'Designing systems that combine excellence with affordability'
        ]
      },
      {
        name: 'Atul Gawande',
        role: 'Surgeon, Writer, Public Health Leader',
        image: '/inspirations/Atul-Gawande.jpg',
        lessons: [
            'Implement systematic improvements that enhance patient safety',
            'Communicate complex healthcare concepts with clarity and humanity',
            'Use simple interventions like checklists to achieve significant outcomes',
            'Approach healthcare challenges with both analytical rigor and compassion'
        ]
      }
    ],
    experiences: [
      {
        title: '🏥 Clinical AI Integration: Capstone Project (MBA/MPH Thesis)',
        description: 'Conducting in-depth research through literature review and interviews with 15+ leaders in healthcare AI to develop a structured implementation framework addressing technical infrastructure, clinical workflow integration, and business sustainability. Analyzing ethical considerations and bias mitigation strategies for AI deployment in diverse healthcare environments.',
        date: '2024-2025',
        tags: ['Clinical Workflow Integration', 'Ethical AI','Business Sustainability', 'Implementation Frameworks'],
        link: '',
        pdfUrl: '/pdfs/capstone-project.pdf'
      },
      {
        title: '🌡️ Master of Public Health - Geisel School of Medicine at Dartmouth',
        description: 'Pursuing specialized training in healthcare systems, population health, and evidence-based intervention design. Focusing on integrating technological innovation with public health approaches to create scalable solutions for healthcare challenges across diverse populations.',
        date: '2024-2025',
        tags: ['Population Health', 'Evidence-Based Medicine', 'Intervention Strategy', 'Preventive Care'],
        link: ''
      },
      {
        title: '💡Pro Bono Consultant - Windham Aging Non-profit',
        description: 'Applied business strategy and healthcare expertise to support elderly care non-profit organization through Tuck Community Consulting. Developed innovative approaches to service delivery and operational efficiency for vulnerable populations.',
        date: '2023-2024',
        tags: ['Non-profit Strategy', 'Community Health', 'Operational Efficiency', 'Social Impact'],
        link: ''
      },
      {
        title: '❤️ Patient Care Ambassador - Emergency Department, St. Boniface Hospital',
        description: 'Volunteered at the Emergency Department at St. Boniface Hospital, gaining valuable frontline healthcare experience and developing deep understanding of patient needs and healthcare delivery challenges.',
        date: '2019-2020',
        tags: ['Patient Experience', 'Healthcare Operations', 'Emergency Medicine', 'Patient Advocacy'],
        link: ''
      },
      {
        title: '🧪 Apotex Inc. - Research Scientist, R&D Chemistry Department',
        description: 'Designed and executed innovative experimental projects to advance drug development and upstream efficiencies. Led cross-functional projects to optimize production and isolation of Active Pharmaceutical Ingredients (APIs), earning multiple awards for collaboration, perseverance, quality, and successfully fulfilling third-party contracts.',
        date: '2018-2020',
        tags: ['Pharmaceutical R&D', 'Drug Development','Cross-functional Leadership', 'Process Validation'],
        link: ''
      },
      {
        title: '🥼 International Medical University - Research Assistant',
        description: 'Led two major research projects: (1) Histological Studies on Mice Myocardium - Conducted histological analysis of cardiac tissue to evaluate drug effects, managed tissue preparation, and performed H&E/Trichrome staining for pathological evaluation. (2) In-vitro Assays of Snake Venom Metalloproteases - Optimized FPLC protocols to isolate SVMPs from 13 venom samples, implemented Bradford assays for quantification, characterized properties through Zymography and SDS-PAGE, and established hemolytic activity profiles. Developed documentation including procedures, calculations, and research reports.',
        date: '2014-2015',
        tags: ['Protein Chromatography', 'Histological Analysis', 'Enzymatic Assays', 'Basic Research'],
        link: ''
      }
    ]
  }
}; 
