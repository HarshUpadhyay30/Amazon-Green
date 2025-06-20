// Mock data for Learn and Earn section
export type LearningTopic = {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'infographic' | 'text';
  content: string; // URL or text
  image: string; // New: image for the topic/quiz
  pointsToRead: string[]; // New: 5 points to read before quiz
  extraInfo: string[]; // New: extra info for each slide
  quiz: {
    questions: {
      question: string;
      options: string[];
      answer: number; // index of correct option
    }[];
    points: number;
  };
  availableDate: string; // ISO date string for when the topic/quiz unlocks
};

const learningTopics: LearningTopic[] = [
  {
    id: 'circular-economy-1',
    title: 'Circular Economy: Recycling vs Reuse',
    description: 'Learn the difference between recycling and reusing, and how upcycling helps the planet.',
    contentType: 'infographic',
    content: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    pointsToRead: [
      'The circular economy is about keeping resources in use for as long as possible.',
      'Recycling turns waste into new materials, but reusing is even better for the environment.',
      'Upcycling means creating higher-value products from waste or old items.',
      'Landfills and incineration are the least sustainable waste options.',
      'Buying products designed for reuse or upcycling helps reduce waste.',
    ],
    extraInfo: [
      'In a circular economy, products are designed to be reused, repaired, or recycled, minimizing waste and resource extraction.',
      'Reusing items saves more energy and resources than recycling, which still requires processing and energy.',
      'Upcycling transforms waste materials or unwanted products into new materials or products of better quality or for better environmental value.',
      'Landfills and incineration contribute to pollution and greenhouse gas emissions, making them the least sustainable options.',
      'Choosing products that are durable, repairable, or made from recycled materials supports the circular economy.',
    ],
    quiz: {
      questions: [
        {
          question: 'What is upcycling?',
          options: [
            'Turning waste into new products of higher value',
            'Throwing away old items',
            'Burning waste for energy',
            'Burying waste in landfills',
          ],
          answer: 0,
        },
        {
          question: 'Which is better for the environment?',
          options: [
            'Single-use products',
            'Reusing products',
            'Throwing away products',
            'None of the above',
          ],
          answer: 1,
        },
        {
          question: 'Recycling means:',
          options: [
            'Using something again as-is',
            'Processing waste into new materials',
            'Throwing away waste',
            'Burning waste',
          ],
          answer: 1,
        },
      ],
      points: 10,
    },
    availableDate: '2024-06-10',
  },
  {
    id: 'energy-efficiency-1',
    title: 'Energy Use & Efficiency',
    description: 'Discover simple ways to save energy at home and why it matters.',
    contentType: 'infographic',
    content: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    pointsToRead: [
      'Switching off appliances when not in use saves energy and money.',
      'LED bulbs use up to 80% less energy than traditional bulbs.',
      'Unplug chargers and devices when not needed to avoid phantom energy use.',
      'Washing clothes in cold water saves energy.',
      'Energy-efficient appliances have a star rating—more stars means more savings.',
    ],
    extraInfo: [
      'Many devices continue to draw power even when turned off. Switching them off at the plug can reduce your electricity bill.',
      'LED bulbs last longer and use a fraction of the energy compared to incandescent or CFL bulbs, making them both eco-friendly and cost-effective.',
      'Chargers and electronics left plugged in can consume small amounts of electricity, known as phantom or standby power.',
      'Heating water uses a lot of energy. Washing clothes in cold water is just as effective for most loads and saves energy.',
      'Look for the energy star label or similar ratings when buying appliances. More stars mean greater efficiency and lower running costs.',
    ],
    quiz: {
      questions: [
        {
          question: 'Which bulb is most energy efficient?',
          options: ['Incandescent', 'CFL', 'LED', 'Halogen'],
          answer: 2,
        },
        {
          question: 'What should you do with unused appliances?',
          options: ['Leave them on', 'Switch them off', 'Put them in sunlight', 'None of the above'],
          answer: 1,
        },
      ],
      points: 8,
    },
    availableDate: '2024-06-13',
  },
  {
    id: 'sustainable-fashion-1',
    title: 'Sustainable Fashion',
    description: 'Learn about the carbon footprint of clothing and the benefits of second-hand fashion.',
    contentType: 'infographic',
    content: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    pointsToRead: [
      'The fashion industry is responsible for 10% of global carbon emissions.',
      'Buying second-hand clothes reduces waste and saves resources.',
      'Synthetic fabrics like polyester are made from fossil fuels.',
      'Washing clothes less often saves water and energy.',
      'Choosing quality over quantity leads to a more sustainable wardrobe.',
    ],
    extraInfo: [
      'The production and transportation of clothing uses vast amounts of energy and water, contributing significantly to global emissions.',
      'Second-hand shopping extends the life of garments and reduces demand for new resources and manufacturing.',
      'Polyester and other synthetics are derived from petroleum, a non-renewable resource, and shed microplastics when washed.',
      'Frequent washing wears out clothes faster and uses more water and energy. Spot clean and air out clothes to extend their life.',
      'Investing in fewer, higher-quality pieces reduces waste and supports a more ethical, sustainable fashion industry.',
    ],
    quiz: {
      questions: [
        {
          question: 'What is a benefit of buying second-hand clothes?',
          options: [
            'Reduces waste',
            'Increases carbon emissions',
            'Uses more water',
            'None of the above',
          ],
          answer: 0,
        },
        {
          question: 'Which has a lower carbon footprint?',
          options: ['New fast fashion', 'Second-hand clothing', 'Synthetic fabrics', 'None'],
          answer: 1,
        },
      ],
      points: 8,
    },
    availableDate: '2024-06-16',
  },
];

export function getAllLearningTopics() {
  return learningTopics;
}

export function getLearningTopicById(id: string) {
  return learningTopics.find((topic) => topic.id === id);
}

// Mock Quiz type for compatibility
export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: {
    question: string;
    options: string[];
    answer: number;
  }[];
  points: number;
  image?: string;
  timeLimit?: number;
  pointsToRead: string[];
  extraInfo: string[];
};

// For now, treat learningTopics as quizzes for compatibility
const quizzes: Quiz[] = learningTopics.map((topic) => ({
  id: topic.id,
  title: topic.title,
  description: topic.description,
  category: 'sustainability', // or assign based on topic
  questions: topic.quiz.questions,
  points: topic.quiz.points,
  image: topic.image,
  pointsToRead: topic.pointsToRead,
  extraInfo: topic.extraInfo,
}));

export function getAllQuizzes() {
  return quizzes;
}

export function getQuizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}

export function getQuizzesByCategory(category: string) {
  return quizzes.filter((quiz) => quiz.category === category);
} 