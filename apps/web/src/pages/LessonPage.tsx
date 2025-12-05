import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check, Star } from 'lucide-react';
import { usePathStore } from '@/store/pathStore';
import DuoMascot from '@/components/DuoMascot';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { submitLesson } = usePathStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hearts, setHearts] = useState(5);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Mock questions - Replace with real data from API
  const questions: Question[] = [
    {
      id: '1',
      question: 'What does WCAG stand for?',
      options: [
        'Web Content Accessibility Guidelines',
        'World Computer Access Guide',
        'Website Coding and Graphics'
      ],
      correctAnswer: 0,
      explanation: 'WCAG = Web Content Accessibility Guidelines, the international standard for web accessibility'
    },
    {
      id: '2',
      question: 'Which is a key principle of Digital Sobriety?',
      options: [
        'Using more cloud storage',
        'Reducing unnecessary data transfer',
        'Installing more apps'
      ],
      correctAnswer: 1,
      explanation: 'Digital Sobriety aims to reduce digital waste and energy consumption by limiting unnecessary data transfers'
    },
    {
      id: '3',
      question: 'What is the main benefit of Open Source Software?',
      options: [
        'It is always free',
        'Code can be inspected and improved by anyone',
        'It has no bugs'
      ],
      correctAnswer: 1,
      explanation: 'Open Source Software allows anyone to inspect, modify, and improve the code, promoting transparency and collaboration'
    },
    {
      id: '4',
      question: 'What percentage of global CO2 emissions does digital technology represent?',
      options: ['2%', '4%', '10%'],
      correctAnswer: 1,
      explanation: 'Digital technology represents approximately 4% of global CO2 emissions, similar to the aviation industry'
    },
    {
      id: '5',
      question: 'Which HTML element is best for a primary navigation menu?',
      options: ['<div>', '<nav>', '<section>'],
      correctAnswer: 1,
      explanation: '<nav> is a semantic HTML5 element specifically designed for navigation sections, improving accessibility'
    },
    {
      id: '6',
      question: 'What is "Green Coding"?',
      options: [
        'Writing code in green color',
        'Optimizing code to reduce energy consumption',
        'Coding in nature'
      ],
      correctAnswer: 1,
      explanation: 'Green Coding is the practice of writing energy-efficient code to reduce environmental impact'
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || showFeedback || showCelebration) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up! Treat as wrong answer
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, showFeedback, showCelebration, currentQuestion]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setIsCorrect(false);
    setShowFeedback(true);
    setHearts(Math.max(0, hearts - 1));

    setTimeout(() => {
      if (hearts - 1 <= 0) {
        // Game Over
        navigate('/path');
      } else {
        goToNextQuestion();
      }
    }, 2000);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    setIsTimerActive(false);
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }

    setTimeout(() => {
      if (!correct && hearts - 1 <= 0) {
        // Game Over
        navigate('/path');
      } else if (currentQuestion < questions.length - 1) {
        goToNextQuestion();
      } else {
        // Lesson completed
        finishLesson();
      }
    }, 2000);
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const finishLesson = async () => {
    const passed = score / questions.length >= 0.6; // 60% to pass
    
    if (passed && lessonId) {
      await submitLesson(lessonId, { passed: true });
      setShowCelebration(true);
      setTimeout(() => {
        navigate('/path');
      }, 3000);
    } else {
      navigate('/path');
    }
  };

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
      navigate('/path');
    }
  };

  if (showCelebration) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <DuoMascot variant="celebrating" size="xl" animate={true} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-extrabold text-yellow-500 mb-4"
          >
            Lesson Complete!
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-2 mb-6"
          >
            {[1, 2, 3].map((_, i) => (
              <Star key={i} className="w-12 h-12 fill-yellow-400 text-yellow-500" />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-2xl text-gray-700 font-bold"
          >
            Score: {score} / {questions.length}
          </motion.p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="border-b-2 border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Close Button */}
          <button
            onClick={handleQuit}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Hearts */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-7 h-7 ${
                  i < hearts
                    ? 'fill-red-500 text-red-500'
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-green-500 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Timer */}
          <div className={`
            px-4 py-2 rounded-full font-bold text-lg min-w-[80px] text-center
            ${timeLeft <= 10 
              ? 'bg-red-100 text-red-600 animate-pulse' 
              : 'bg-gray-100 text-gray-700'
            }
          `}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          {/* Question Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            {currentQ.question}
          </h1>

          {/* Mascot */}
          <div className="flex justify-center mb-8">
            <DuoMascot variant="thinking" size="lg" animate={true} />
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQ.correctAnswer;
              const showCorrect = showFeedback && isCorrectOption;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  className={`
                    w-full p-4 rounded-2xl border-2 font-bold text-lg
                    transition-all duration-200 flex items-center justify-between
                    ${showCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : showWrong
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }
                    ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span>{option}</span>
                  <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                    ${showCorrect
                      ? 'bg-green-500 text-white'
                      : showWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {index + 1}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-2xl ${
                  isCorrect
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                <p className={`font-bold text-lg ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect ? '🎉 Correct!' : '❌ Wrong answer'}
                </p>
                {currentQ.explanation && (
                  <p className="text-gray-600 mt-2">{currentQ.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-gray-200 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null || showFeedback}
            className={`
              w-full py-4 rounded-2xl font-bold text-xl transition-all
              ${selectedAnswer !== null && !showFeedback
                ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {showFeedback ? 'Loading...' : 'Check'}
          </button>
        </div>
      </div>
    </div>
  );
}
