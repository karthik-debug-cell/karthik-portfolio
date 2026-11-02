export type Project = {
  slug: string
  title: string
  fullTitle: string
  displayTitle: string
  projectNumber: string
  category: string
  cats: string[]
  year: string
  duration: string
  role: string
  tech: string[]
  summary: string
  subtitle: string
  alt: string
  images: string[]
  overview: string
  problem: string
  objectives: string[]
  roleDetails: string
  approach: string
  modelDevelopment: string[]
  contributions: string[]
  results: string
  metrics?: { label: string; val: string }[]
  implementation: string[]
  learnings: string[]
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const img = (s: string) => [1, 2, 3].map((n) => `${basePath}/assets/projects/${s}-${n}.jpg`)

export const projects: Project[] = [
  {
    slug: 'forest-fire-detection',
    title: 'Forest Fire Detection',
    fullTitle: 'Forest Fire Detection using Satellite Imagery',
    displayTitle: 'FOREST FIRE DETECTION',
    projectNumber: 'PROJECT 01',
    category: 'Machine Learning / Computer Vision',
    cats: ['Machine Learning', 'Computer Vision'],
    duration: 'March 2026 – April 2026',
    year: '2026',
    role: 'Satellite Imagery Data & Model Training (Team Project)',
    tech: ['Python', 'PyTorch', 'Torchvision', 'Transfer Learning', 'ResNet', 'Streamlit', 'Pandas'],
    summary: 'Developed a deep learning-based forest fire detection system using satellite imagery to identify fire-affected zones.',
    subtitle: 'Satellite Imagery / Deep Learning',
    alt: 'High-resolution satellite view of forest landscape with active wildfire detection',
    images: img('forest-fire-detection'),
    overview: 'Developed a deep learning-based forest fire detection system using satellite imagery to identify fire-affected zones.',
    problem: 'Forest fires spread rapidly across vast wilderness areas where early visual discovery from the ground is difficult. High-resolution satellite observation provides wide surveillance, but baseline or uncalibrated models often generate high false-positive detection rates that hinder prompt response.',
    objectives: [
      'Fine-tune a ResNet image classifier on satellite imagery to identify fire-affected zones',
      'Optimize the transfer-learning model to reduce false-positive detections by 18%',
      'Evaluate model performance and achieve an F1 score of 0.88',
    ],
    roleDetails: 'Satellite Imagery Data & Model Training (Team Project) — responsible for satellite imagery data preparation, preprocessing pipelines, transfer learning model training, and fine-tuning evaluation to minimize false-positive classifications.',
    approach: 'Applied transfer learning using a convolutional ResNet architecture pretrained on visual representations and fine-tuned on satellite imagery to identify fire-affected zones with high precision.',
    modelDevelopment: [
      'Developed a PyTorch ResNet image classifier fine-tuned on satellite data.',
      'Utilized Torchvision for data preprocessing, augmentations, and transfer learning workflows.',
      'Built an interactive inference application with Streamlit and processed tabular evaluation metrics using Pandas.',
    ],
    contributions: [
      'Developed a PyTorch ResNet image classifier fine-tuned on satellite data.',
      'Evaluated model performance using an F1 score.',
      'Achieved an F1 score of 0.88.',
      'Reduced false-positive detections by 18% during evaluation.',
    ],
    results: 'Achieved an F1 score of 0.88 and reduced false-positive detections by 18% during evaluation.',
    metrics: [
      { label: 'F1 Score', val: '0.88' },
      { label: 'False-Positive Reduction', val: '18%' },
    ],
    implementation: [
      'Preprocessed and managed satellite imagery datasets in Python and Pandas',
      'Fine-tuned a pretrained PyTorch ResNet classifier with Torchvision transfer learning',
      'Deployed an interactive demonstration app in Streamlit for inference evaluation',
    ],
    learnings: [
      'Transfer learning with ResNet effectively captures complex satellite terrain features',
      'Reducing false-positive detections by 18% significantly improves operational reliability',
      'Rigorous evaluation metrics like F1 score are essential for mission-critical environmental monitoring',
    ],
  },
  {
    slug: 'tomato-disease-classification',
    title: 'Tomato Disease Classification',
    fullTitle: 'Tomato Disease Classification using Transfer Learning',
    displayTitle: 'TOMATO DISEASE CLASSIFICATION',
    projectNumber: 'PROJECT 02',
    category: 'Deep Learning / Computer Vision',
    cats: ['Deep Learning', 'Computer Vision'],
    duration: 'November 2025 – December 2025',
    year: '2025',
    role: 'Deep Learning & Computer Vision Research',
    tech: ['Python', 'Google Colab', 'TensorFlow', 'PyTorch', 'Transfer Learning', 'ResNet-50', 'Vision Transformer (ViT)', 'NumPy', 'Pandas'],
    summary: 'Developed a deep learning-based image classification system to identify tomato leaf diseases by applying transfer learning on pretrained ResNet-50 and Vision Transformer (ViT) architectures.',
    subtitle: 'Computer Vision / Transfer Learning',
    alt: 'Botanical macro visual of tomato plant foliage and leaf disease classification',
    images: img('tomato-disease-classification'),
    overview: 'Developed a deep learning-based image classification system to identify tomato leaf diseases by applying transfer learning on pretrained ResNet-50 and Vision Transformer (ViT) architectures.',
    problem: 'Tomato leaf diseases cause substantial crop damage if undetected in early stages. Manual visual inspection by farmers across expansive crop canopies is labor-intensive and subjective, necessitating automated, reliable computer-vision diagnostics.',
    objectives: [
      'Perform image preprocessing and data augmentation across tomato leaf imagery',
      'Prepare and manage the experimental dataset using Google Colab',
      'Train and evaluate pretrained ResNet-50 and Vision Transformer (ViT) models',
      'Compare model performance to identify the most effective transfer-learning approach',
    ],
    roleDetails: 'End-to-end model development and comparative research: image preprocessing, dataset curation in Google Colab, and transfer learning training across convolutional and transformer architectures.',
    approach: 'Applied transfer learning on pretrained convolutional ResNet-50 and attention-based Vision Transformer (ViT) architectures, evaluating comparative feature extraction efficacy on augmented tomato leaf disease images.',
    modelDevelopment: [
      'Prepared the dataset and executed image preprocessing pipelines using Google Colab.',
      'Performed comprehensive data augmentation to handle varied illumination, scale, and lesion orientations.',
      'Trained and evaluated pretrained ResNet-50 and Vision Transformer (ViT) models using PyTorch and TensorFlow.',
      'Compared model performance to identify the most effective transfer-learning approach for the classification task.',
    ],
    contributions: [
      'Performed image preprocessing and data augmentation.',
      'Prepared the dataset using Google Colab.',
      'Trained and evaluated pretrained ResNet-50 and ViT models.',
      'Compared model performance to identify the most effective transfer-learning approach for the classification task.',
    ],
    results: 'Trained and evaluated pretrained ResNet-50 and ViT models, comparing convolutional and transformer feature representations to determine the most effective transfer-learning architecture for tomato leaf disease identification.',
    metrics: undefined,
    implementation: [
      'Preprocessed leaf images and applied data augmentations with NumPy and OpenCV transforms',
      'Configured Google Colab training environments for PyTorch and TensorFlow model fine-tuning',
      'Evaluated convolutional and vision transformer representations against diverse disease categories',
    ],
    learnings: [
      'Data augmentation is essential for generalizing across diverse greenhouse and field conditions',
      'Transfer learning drastically reduces training convergence time for specialized plant pathology tasks',
      'Comparing ViT and CNN architectures provides complementary insights into local vs global lesion patterns',
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
