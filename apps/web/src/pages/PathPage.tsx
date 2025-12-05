import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePathStore } from '@/store/pathStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, Star, Trophy, Crown, Shield, ChevronDown } from 'lucide-react';
import type { NIRDDomain } from '@podium/shared';
import DuoMascot from '@/components/DuoMascot';

// Duolingo-style colors - Plus contrastés
const COLORS = {
  primary: '#58CC02',
  primaryDark: '#46A302',
  gold: '#FFC800',
  goldDark: '#D9A000',
  blue: '#1CB0F6',
  purple: '#CE82FF',
  orange: '#FF9600',
  gray: '#777777',
  lightGray: '#E5E5E5',
  white: '#FFFFFF',
  textDark: '#3C3C3C',
  textLight: '#777777',
};

const domainInfo: Record<NIRDDomain, { emoji: string; color: string; name: string }> = {
  ACCESSIBILITY: { emoji: '♿', color: '#1CB0F6', name: 'Accessibilité' },
  OPEN_SOURCE: { emoji: '🔓', color: '#CE82FF', name: 'Logiciels Libres' },
  SUSTAINABILITY: { emoji: '🌱', color: '#58CC02', name: 'Durabilité' },
  DIGITAL_SOBRIETY: { emoji: '💡', color: '#FF9600', name: 'Sobriété' },
  RESPONSIBLE_DEVOPS: { emoji: '⚙️', color: '#00CD9C', name: 'DevOps' },
};

const lessonTypeInfo: Record<string, { emoji: string; label: string }> = {
  QUIZ: { emoji: '📝', label: 'Quiz' },
  PRACTICE: { emoji: '⚡', label: 'Pratique' },
  STORY: { emoji: '📖', label: 'Histoire' },
  READING: { emoji: '📚', label: 'Lecture' },
};

export default function PathPage() {
  const { units, fetchPath, isLoading } = usePathStore();
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  useEffect(() => {
    fetchPath();
  }, []);

  if (isLoading && units.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-700 text-lg font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <DuoMascot variant="happy" size="lg" animate={true} />
        </div>

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Ton Parcours NIRD</h1>
          <p className="text-gray-700 text-2xl font-semibold">Apprends le numérique responsable !</p>
        </div>

        {/* Path Container */}
        <div className="relative">
          {/* Vertical Path Line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200"
            aria-hidden="true"
          />

          {/* Units - Zigzag Layout */}
          <div className="space-y-12">
            {units.map((unit, unitIndex) => {
              const isUnlocked = unitIndex === 0 || units[unitIndex - 1]?.completed;
              const info = domainInfo[unit.domain];
              const isExpanded = expandedUnit === unit.id;
              
              return (
                <div key={unit.id} className="relative">
                  {/* Unit Header Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <button
                      onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                      disabled={!isUnlocked}
                      className={`
                        w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border-2 p-6
                        transition-all duration-300
                        ${isUnlocked 
                          ? 'border-gray-300 hover:border-gray-400 hover:shadow-xl cursor-pointer' 
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        {/* Unit Icon */}
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 border-4 border-white shadow-lg"
                          style={{ backgroundColor: info.color }}
                        >
                          {info.emoji}
                        </div>

                        {/* Unit Info */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold text-gray-800">
                              {unit.title}
                            </h2>
                            {unit.completed && (
                              <Check className="w-6 h-6 text-green-500" />
                            )}
                            {unit.isCheckpoint && (
                              <Crown className="w-6 h-6 text-yellow-500" />
                            )}
                          </div>
                          <p className="text-gray-600 font-medium mb-2">
                            {unit.description}
                          </p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500 font-semibold">
                              {unit.lessons.filter(l => l.completed).length} / {unit.lessons.length} leçons
                            </span>
                            {isUnlocked && (
                              <div className="flex-1 max-w-xs">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${(unit.lessons.filter(l => l.completed).length / unit.lessons.length) * 100}%`,
                                      backgroundColor: info.color
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expand Icon */}
                        {isUnlocked && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                          </motion.div>
                        )}

                        {/* Lock Icon */}
                        {!isUnlocked && (
                          <Lock className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                    </button>
                  </motion.div>

                  {/* Lessons Grid - Expandable */}
                  <AnimatePresence>
                    {isExpanded && isUnlocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-12"
                      >
                        <div className="space-y-16">
                          {unit.lessons.map((lesson, lessonIndex) => {
                            const lessonUnlocked = isUnlocked && (lessonIndex === 0 || unit.lessons[lessonIndex - 1]?.completed);
                            const isLeft = lessonIndex % 2 === 0;
                            const typeInfo = lessonTypeInfo[lesson.type] || { emoji: '📝', label: 'Leçon' };

                            return (
                              <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: lessonIndex * 0.1 }}
                                className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                              >
                                <div className={`${isLeft ? 'mr-auto' : 'ml-auto'} relative`} style={{ width: '300px' }}>
                                  {/* Lesson Node */}
                                  <Link
                                    to={lessonUnlocked ? `/lesson/${lesson.id}` : '#'}
                                    className={`block ${!lessonUnlocked && 'pointer-events-none'}`}
                                  >
                                    <motion.div
                                      whileHover={lessonUnlocked ? { scale: 1.05, y: -5 } : {}}
                                      whileTap={lessonUnlocked ? { scale: 0.95 } : {}}
                                      className="relative mx-auto w-28 h-28"
                                    >
                                      {/* Main Circle */}
                                      <div
                                        className={`
                                          w-full h-full rounded-full flex items-center justify-center
                                          border-4 transition-all duration-300 relative
                                          ${lesson.completed
                                            ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 border-yellow-600 shadow-xl'
                                            : lessonUnlocked
                                              ? 'border-white shadow-xl'
                                              : 'bg-gray-200 border-gray-300'
                                          }
                                        `}
                                        style={{
                                          backgroundColor: lesson.completed 
                                            ? undefined 
                                            : lessonUnlocked 
                                              ? info.color 
                                              : undefined
                                        }}
                                      >
                                        {/* Icon */}
                                        {lesson.completed ? (
                                          <Trophy className="w-14 h-14 text-white" />
                                        ) : !lessonUnlocked ? (
                                          <Lock className="w-10 h-10 text-gray-400" />
                                        ) : (
                                          <span className="text-4xl">{typeInfo.emoji}</span>
                                        )}

                                        {/* Stars for completed */}
                                        {lesson.completed && (
                                          <div className="absolute -top-2 -right-2 flex gap-1">
                                            {[1, 2, 3].map(star => (
                                              <Star
                                                key={star}
                                                className="w-4 h-4 fill-yellow-400 text-yellow-600"
                                              />
                                            ))}
                                          </div>
                                        )}
                                      </div>

                                      {/* Bottom shadow */}
                                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-3 rounded-full blur-sm bg-gray-400/40" />
                                    </motion.div>

                                    {/* Lesson Info */}
                                    {lessonUnlocked && (
                                      <div className="mt-4 text-center">
                                        <h3 className="font-bold text-gray-800 mb-1 text-lg">
                                          {lesson.title}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                                          <span className="text-gray-600">
                                            {typeInfo.emoji} {typeInfo.label}
                                          </span>
                                          {lesson.xpReward > 0 && (
                                            <>
                                              <span className="text-gray-400">•</span>
                                              <span className="text-yellow-600 font-bold">
                                                +{lesson.xpReward} XP
                                              </span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </Link>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Completion Trophy */}
          {units.length > 0 && units.every(u => u.completed) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-20 text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center border-8 border-yellow-600 mx-auto shadow-2xl mb-6">
                <Trophy className="w-20 h-20 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Parcours Complété ! 🎉
              </h2>
              <p className="text-xl text-gray-600">
                Tu es maintenant un expert NIRD !
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
