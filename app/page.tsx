'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Trophy, ArrowRight, TrendingUp, Award, BarChart3, BookOpen, Zap, Crown } from 'lucide-react';
import { useQuizStore, DifficultyLevel } from '@/lib/store';

const careerOptions = [
  // Technology & Software
  'Software Development',
  'Software Engineering',
  'Web Development',
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'iOS Development',
  'Android Development',
  'Game Development',
  'DevOps Engineering',
  'Site Reliability Engineering',
  'Cloud Engineering',
  'Cloud Architecture',
  'Solutions Architecture',
  'System Administration',
  'Network Engineering',
  'Database Administration',
  'Quality Assurance',
  'QA Engineering',
  'Test Automation',
  'Performance Engineering',
  
  // Data & AI
  'Data Science',
  'Data Engineering',
  'Data Analytics',
  'Business Intelligence',
  'Machine Learning Engineering',
  'AI Engineering',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'MLOps Engineering',
  'Data Architecture',
  
  // Security
  'Cybersecurity',
  'Information Security',
  'Security Engineering',
  'Penetration Testing',
  'Ethical Hacking',
  'Security Analysis',
  'Cloud Security',
  'Application Security',
  
  // Design & UX
  'UI/UX Design',
  'User Experience Design',
  'User Interface Design',
  'Product Design',
  'Graphic Design',
  'Visual Design',
  'Interaction Design',
  'Motion Design',
  'Brand Design',
  '3D Design',
  
  // Product & Management
  'Product Management',
  'Product Owner',
  'Project Management',
  'Program Management',
  'Technical Program Management',
  'Agile Coach',
  'Scrum Master',
  'Business Analysis',
  'Business Analyst',
  
  // Marketing & Sales
  'Digital Marketing',
  'Content Marketing',
  'Social Media Marketing',
  'SEO Specialist',
  'SEM Specialist',
  'Email Marketing',
  'Growth Marketing',
  'Marketing Analytics',
  'Brand Marketing',
  'Product Marketing',
  'Sales Engineering',
  'Account Management',
  
  // Specialized Tech
  'Blockchain Development',
  'Smart Contract Development',
  'IoT Engineering',
  'Embedded Systems',
  'Robotics Engineering',
  'AR/VR Development',
  'Quantum Computing',
  
  // Creative & Content
  'Technical Writing',
  'Content Strategy',
  'UX Writing',
  'Documentation',
  'Video Production',
  'Animation',
  'Photography',
  
  // Business & Finance
  'Financial Analysis',
  'Investment Banking',
  'Accounting',
  'Risk Management',
  'Compliance',
  'Operations Management',
  'Supply Chain Management',
  'Human Resources',
  'Recruitment',
  'Training & Development',
  
  // Research & Academia
  'Research Scientist',
  'Data Scientist',
  'Academic Research',
  'Clinical Research',
  'Market Research',
  
  // Healthcare Tech
  'Health Informatics',
  'Medical Software Development',
  'Telemedicine',
  'Healthcare Data Analysis',
  
  // E-commerce & Retail
  'E-commerce Management',
  'Retail Analytics',
  'Customer Success',
  'Customer Support',
  
  // Media & Entertainment
  'Audio Engineering',
  'Sound Design',
  'Music Production',
  'Broadcasting',
  'Journalism',
  
  // Education
  'Instructional Design',
  'Educational Technology',
  'Online Course Development',
  'Training Specialist',
  'Teacher',
  
  // Legal & Compliance
  'Legal Technology',
  'Legal Research',
  'Regulatory Affairs',
  'Patent Law',
  
  // Other Professional
  'Consulting',
  'Strategy Consulting',
  'IT Consulting',
  'Management Consulting',
  'Environmental Science',
  'Architecture',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
];
const difficultyOptions = [
  {
    level: 'beginner' as DifficultyLevel,
    icon: BarChart3,
    title: 'Beginner',
    description: 'Fundamental concepts and basic knowledge',
    gradientColor: 'from-emerald-400 to-emerald-600',
    iconColor: 'text-white',
    borderColor: 'border-emerald-500',
    glowColor: 'emerald-400',
  },
  {
    level: 'intermediate' as DifficultyLevel,
    icon: TrendingUp,
    title: 'Intermediate',
    description: 'Practical applications and real-world scenarios',
    gradientColor: 'from-blue-400 to-blue-600',
    iconColor: 'text-white',
    borderColor: 'border-blue-500',
    glowColor: 'blue-400',
  },
  {
    level: 'advanced' as DifficultyLevel,
    icon: Award,
    title: 'Advanced',
    description: 'Complex problem-solving and expertise',
    gradientColor: 'from-violet-400 to-violet-600',
    iconColor: 'text-white',
    borderColor: 'border-violet-500',
    glowColor: 'violet-400',
  },
];

export default function DifficultySelectionPage() {
  const router = useRouter();
  const { setCareerPath, isQuizActive } = useQuizStore();
  const [careerPathInput, setCareerPathInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCareers, setFilteredCareers] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Redirect to quiz if already active
  useEffect(() => {
    if (isQuizActive) {
      router.push('/quiz');
    }
  }, [isQuizActive, router]);

  const handleContinue = async () => {
    setError('');

    // Check career path
    if (!careerPathInput.trim()) {
      setError('Please enter a career path');
      return;
    }
    
    // Trigger animation
    setIsButtonClicked(true);
    
    // Wait for animation to complete before navigation
    setTimeout(() => {
      setCareerPath(careerPathInput.trim());
      router.push('/quiz');
    }, 1800);
  };

  const handleCareerChange = (value: string) => {
    setCareerPathInput(value);
    setError('');
    
    if (value.trim().length > 0) {
      const filtered = careerOptions.filter(career =>
        career.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCareers(filtered);
      setShowSuggestions(true);
    } else {
      // Show all options when input is empty
      setFilteredCareers(careerOptions);
      setShowSuggestions(true);
    }
  };

  const handleSelectCareer = (career: string) => {
    setCareerPathInput(career);
    setShowSuggestions(false);
    setError('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl h-full max-h-[95vh] flex flex-col justify-center py-6"
      >
        {/* Header */}
        <div className="text-center mb-6 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-20 rounded-full"></div>
              <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 text-blue-600 relative" strokeWidth={1.5} />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          >
            <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Mock Test Platform
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium"
          >
            Test your skills with AI-generated questions tailored to your career path
          </motion.p>
        </div>

        {/* Content Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-5 sm:p-6 flex-1 mb-5">
          {/* Career Path Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Select Your Career Path
              </h2>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={careerPathInput}
                onChange={(e) => handleCareerChange(e.target.value)}
                onFocus={() => {
                  if (careerPathInput.trim().length > 0) {
                    const filtered = careerOptions.filter(career =>
                      career.toLowerCase().includes(careerPathInput.toLowerCase())
                    );
                    setFilteredCareers(filtered);
                  } else {
                    setFilteredCareers(careerOptions);
                  }
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder="e.g., Software Development, Data Science..."
                className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-slate-700 bg-white text-sm placeholder:text-slate-400 shadow-sm"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && filteredCareers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl overflow-hidden"
                  style={{ maxHeight: '180px', overflowY: 'auto' }}
                >
                  {filteredCareers.map((career, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectCareer(career);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 active:bg-blue-100 transition-colors text-slate-700 text-sm border-b border-slate-100 last:border-b-0 cursor-pointer font-medium"
                    >
                      {career}
                    </button>
                  ))}
                </motion.div>
              )}
              
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Type to search from {careerOptions.length}+ options
              </p>
            </div>
            
            {/* Quiz Information */}
            <div className="mt-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quiz Structure
              </h3>
              <div className="space-y-1.5">
                <p className="text-sm text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span><strong>10 Mixed Questions</strong> - Covering various topics and complexity levels</span>
                </p>
                <p className="text-sm text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span><strong>Dynamic Timing</strong> - Each question has appropriate time limits</span>
                </p>
                <p className="text-sm text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span><strong>Comprehensive Assessment</strong> - Tests knowledge across multiple areas</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error Message & Continue Button - Outside card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center gap-3 flex-shrink-0 min-h-[100px] justify-end"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md px-4 py-2.5 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-medium text-sm flex items-center gap-2 shadow-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              {error}
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.button
            onClick={handleContinue}
            disabled={isButtonClicked}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-10 sm:px-14 py-3 rounded-xl text-base font-bold transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-90 disabled:cursor-wait overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
            </div>
            
            <motion.span 
              className="relative z-10 inline-flex items-center gap-2"
              animate={isButtonClicked ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Continue
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </motion.span>
            
            {/* Animated Arrow with Glow Effect */}
            <AnimatePresence>
              {isButtonClicked && (
                <>
                  {/* Glow effect */}
                  <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ 
                      x: '120%', 
                      opacity: [0, 0.2, 0.4, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ filter: 'blur(12px)' }}
                  />
                  
                  {/* Arrow Icon */}
                  <motion.div
                    initial={{ x: '-150%', opacity: 0, scale: 0.3 }}
                    animate={{ 
                      x: '150%', 
                      opacity: [0, 1, 1, 1, 0.8, 0],
                      scale: [0.3, 0.8, 1, 1.1, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <ArrowRight className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={3} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
