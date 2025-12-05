import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Lock, Check, Star, Zap, Gem, Clock, 
  ChevronRight, Trophy, Award, Flame, X
} from 'lucide-react';
import DuoMascot from '@/components/DuoMascot';

interface Mission {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  expectedResult: string;
  submissionType: 'link' | 'text' | 'file';
  domain: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  gemsReward: number;
  timeEstimate: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  requirements: string[];
  icon: string;
  color: string;
}

const MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Accessibility Audit',
    description: 'Analyze a website and identify 5 accessibility issues using WCAG guidelines',
    detailedDescription: `In this mission, you will perform a comprehensive accessibility audit on a chosen website. 
    
**Your tasks:**
1. Select a public website to audit
2. Use tools like WAVE, axe DevTools, or Lighthouse
3. Identify at least 5 accessibility issues
4. Document each issue with:
   - WCAG criterion violated
   - Severity level
   - Screenshot of the issue
   - Suggested fix

**Learning Objectives:**
- Understand WCAG 2.1 guidelines
- Use accessibility testing tools
- Identify common accessibility barriers
- Propose practical solutions`,
    expectedResult: `Submit a detailed report containing:
- Website URL audited
- List of 5+ accessibility issues found
- For each issue: WCAG criterion, severity, screenshot, and fix recommendation
- Summary of overall accessibility score
- Bonus: Implemented fixes (if you have access to the code)`,
    submissionType: 'link',
    domain: 'Accessibility',
    difficulty: 'beginner',
    xpReward: 50,
    gemsReward: 10,
    timeEstimate: '30 min',
    status: 'available',
    requirements: ['Complete Unit 1', 'Watch accessibility basics'],
    icon: '♿',
    color: '#1CB0F6'
  },
  {
    id: '2',
    title: 'Open Source Contribution',
    description: 'Make your first contribution to an open source project on GitHub',
    detailedDescription: `Contribute to an open source project and experience collaborative development.

**Your tasks:**
1. Find a beginner-friendly open source project (good-first-issue tag)
2. Fork the repository
3. Make a meaningful contribution (bug fix, documentation, feature)
4. Submit a pull request
5. Engage with project maintainers

**Learning Objectives:**
- Navigate open source communities
- Use Git workflow (fork, branch, PR)
- Write clear commit messages
- Communicate with maintainers`,
    expectedResult: `Submit:
- Link to your merged or pending Pull Request
- Brief description of your contribution
- What you learned from the experience
- Accepted PR = Full rewards, Pending PR = 50% rewards`,
    submissionType: 'link',
    domain: 'Open Source',
    difficulty: 'intermediate',
    xpReward: 100,
    gemsReward: 25,
    timeEstimate: '2 hours',
    status: 'available',
    requirements: ['Complete Unit 2', 'GitHub account'],
    icon: '🔓',
    color: '#CE82FF'
  },
  {
    id: '3',
    title: 'Green Coding Challenge',
    description: 'Optimize code to reduce energy consumption by 30%',
    detailedDescription: `Optimize an existing codebase to reduce its energy consumption.

**Your tasks:**
1. Clone the provided benchmark repository
2. Profile the code's energy consumption
3. Identify performance bottlenecks
4. Implement optimizations (algorithm improvements, caching, lazy loading)
5. Measure the new energy consumption
6. Document your optimizations

**Tools you can use:**
- PowerTOP, perf (Linux)
- Intel Power Gadget
- CodeCarbon library
- Custom profiling scripts`,
    expectedResult: `Submit:
- GitHub repository link with your optimized code
- Before/After energy consumption measurements
- Documentation explaining optimizations made
- Minimum 30% energy reduction required
- Bonus: Maintain same functionality and performance`,
    submissionType: 'link',
    domain: 'Sustainability',
    difficulty: 'advanced',
    xpReward: 150,
    gemsReward: 50,
    timeEstimate: '3 hours',
    status: 'locked',
    requirements: ['Complete Units 1-3', 'Energy profiling tools'],
    icon: '🌱',
    color: '#58CC02'
  },
  {
    id: '4',
    title: 'Digital Sobriety Analysis',
    description: 'Audit a web application and reduce its digital footprint',
    detailedDescription: `Analyze and optimize a web application's digital footprint.

**Your tasks:**
1. Choose a web application (or use provided demo)
2. Measure its digital footprint (page weight, requests, carbon emissions)
3. Identify optimization opportunities
4. Implement at least 3 optimizations
5. Re-measure and compare results

**Areas to focus on:**
- Image optimization
- JavaScript/CSS minification
- Lazy loading
- Caching strategies
- Reduce third-party scripts`,
    expectedResult: `Submit:
- Link to analysis report (Google Docs, Notion, or GitHub README)
- Before/After metrics (page weight, load time, CO2 emissions)
- List of optimizations implemented
- Live demo link (optional but recommended)
- Minimum 40% reduction in page weight`,
    submissionType: 'link',
    domain: 'Digital Sobriety',
    difficulty: 'intermediate',
    xpReward: 80,
    gemsReward: 20,
    timeEstimate: '1.5 hours',
    status: 'in_progress',
    requirements: ['Complete Unit 4'],
    icon: '💡',
    color: '#FF9600'
  },
  {
    id: '5',
    title: 'CI/CD Pipeline Setup',
    description: 'Configure a sustainable CI/CD pipeline with carbon-aware deployments',
    detailedDescription: `Build a CI/CD pipeline that considers carbon emissions.

**Your tasks:**
1. Create a sample application (or use provided template)
2. Set up GitHub Actions workflow
3. Implement carbon-aware deployment (deploying during low-carbon hours)
4. Add automated testing
5. Configure caching to reduce build times
6. Document the pipeline

**Requirements:**
- Use GitHub Actions or GitLab CI
- Schedule deployments during region's cleanest energy hours
- Implement build caching
- Add carbon emission metrics`,
    expectedResult: `Submit:
- GitHub repository with working CI/CD pipeline
- Documentation explaining the carbon-aware strategy
- Configuration files (.github/workflows)
- Evidence of successful deployment
- Carbon emission calculations (estimated)`,
    submissionType: 'link',
    domain: 'DevOps',
    difficulty: 'advanced',
    xpReward: 200,
    gemsReward: 75,
    timeEstimate: '4 hours',
    status: 'completed',
    requirements: ['Complete all units', 'Docker knowledge'],
    icon: '⚙️',
    color: '#00CD9C'
  },
];

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-700 border-green-300' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-700 border-red-300' },
};

export default function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('all');

  const filteredMissions = MISSIONS.filter(mission => {
    if (filter === 'all') return true;
    if (filter === 'available') return mission.status === 'available' || mission.status === 'in_progress';
    if (filter === 'completed') return mission.status === 'completed';
    return true;
  });

  const stats = {
    completed: MISSIONS.filter(m => m.status === 'completed').length,
    total: MISSIONS.length,
    totalXP: MISSIONS.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.xpReward, 0),
    totalGems: MISSIONS.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.gemsReward, 0),
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <DuoMascot variant="excited" size="lg" animate={true} />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">🎯 Missions NIRD</h1>
          <p className="text-gray-700 text-2xl font-semibold">
            Réalise des missions pratiques pour gagner des points et des gems
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200"
          >
            <Trophy className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-3xl font-bold text-blue-900">{stats.completed}/{stats.total}</p>
            <p className="text-sm text-blue-700 font-semibold">Missions Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200"
          >
            <Zap className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-3xl font-bold text-yellow-900">{stats.totalXP}</p>
            <p className="text-sm text-yellow-700 font-semibold">XP Earned</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200"
          >
            <Gem className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-3xl font-bold text-purple-900">{stats.totalGems}</p>
            <p className="text-sm text-purple-700 font-semibold">Gems Collected</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200"
          >
            <Target className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-3xl font-bold text-green-900">{MISSIONS.filter(m => m.status === 'available').length}</p>
            <p className="text-sm text-green-700 font-semibold">Available Now</p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 justify-center">
          {['all', 'available', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-6 py-3 rounded-xl font-bold capitalize transition-all
                ${filter === f
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission, index) => {
            const isLocked = mission.status === 'locked';
            const isCompleted = mission.status === 'completed';
            const difficultyConfig = DIFFICULTY_CONFIG[mission.difficulty];

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                className={`
                  bg-white rounded-3xl shadow-lg border-2 overflow-hidden
                  ${isLocked ? 'opacity-50' : 'hover:shadow-2xl'}
                  ${isCompleted ? 'border-green-400' : 'border-gray-200'}
                  transition-all duration-300
                `}
              >
                {/* Header */}
                <div 
                  className="p-6 relative"
                  style={{ backgroundColor: `${mission.color}20` }}
                >
                  <div className="absolute top-4 right-4">
                    {isCompleted && (
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-lg"
                    style={{ backgroundColor: mission.color }}
                  >
                    {mission.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{mission.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{mission.description}</p>

                  {/* Difficulty Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${difficultyConfig.color}`}>
                    {difficultyConfig.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rewards */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold text-gray-800">+{mission.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="w-5 h-5 text-purple-500" />
                      <span className="font-bold text-gray-800">+{mission.gemsReward} Gems</span>
                    </div>
                  </div>

                  {/* Time Estimate */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600 font-semibold">{mission.timeEstimate}</span>
                  </div>

                  {/* Requirements */}
                  {isLocked && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-bold mb-2">Requirements:</p>
                      <ul className="space-y-1">
                        {mission.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                            <Lock className="w-3 h-3" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => !isLocked && setSelectedMission(mission)}
                    disabled={isLocked}
                    className={`
                      w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                      ${isLocked
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : isCompleted
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                      }
                    `}
                  >
                    {isLocked ? 'Locked' : isCompleted ? 'View Details' : 'Start Mission'}
                    {!isLocked && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMissions.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <DuoMascot variant="thinking" size="xl" animate={false} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No missions found</h3>
            <p className="text-gray-600">Try changing the filter to see more missions</p>
          </div>
        )}
      </div>

      {/* Mission Detail Modal */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMission(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8"
            >
              {/* Header */}
              <div 
                className="p-8 rounded-t-3xl relative"
                style={{ backgroundColor: `${selectedMission.color}20` }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-4 border-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: selectedMission.color }}
                  >
                    {selectedMission.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMission.title}</h2>
                        <p className="text-gray-600 font-semibold">{selectedMission.domain}</p>
                      </div>
                      <button
                        onClick={() => setSelectedMission(null)}
                        className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
                      >
                        <X className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Rewards */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">Rewards</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-yellow-50 px-6 py-3 rounded-xl border-2 border-yellow-200">
                      <Zap className="w-6 h-6 text-yellow-500" />
                      <span className="font-bold text-yellow-900">+{selectedMission.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 px-6 py-3 rounded-xl border-2 border-purple-200">
                      <Gem className="w-6 h-6 text-purple-500" />
                      <span className="font-bold text-purple-900">+{selectedMission.gemsReward} Gems</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xl border-2 border-gray-200">
                      <Clock className="w-6 h-6 text-gray-500" />
                      <span className="font-bold text-gray-900">{selectedMission.timeEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Mission Description
                  </h3>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-600 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
{selectedMission.detailedDescription}
                    </pre>
                  </div>
                </div>

                {/* Expected Result */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Expected Result
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <pre className="whitespace-pre-wrap font-sans text-blue-900">
{selectedMission.expectedResult}
                    </pre>
                  </div>
                </div>

                {/* Submission Form */}
                {selectedMission.status !== 'locked' && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                      <ChevronRight className="w-5 h-5" />
                      Submit Your Solution
                    </h3>
                    <div className="space-y-4">
                      {selectedMission.submissionType === 'link' && (
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            {selectedMission.domain === 'Open Source' || selectedMission.domain === 'DevOps' 
                              ? 'GitHub Repository URL'
                              : 'Solution Link (GitHub, Google Docs, etc.)'}
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/username/repo or https://docs.google.com/..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none font-semibold"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          placeholder="Share any additional information about your submission..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none font-semibold resize-none"
                        />
                      </div>

                      {selectedMission.status === 'completed' && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <Check className="w-6 h-6 text-green-600" />
                            <div>
                              <p className="font-bold text-green-900">Mission Completed!</p>
                              <p className="text-sm text-green-700">You've already submitted this mission</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-8 border-t-2 border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMission(null)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                {selectedMission.status !== 'locked' && selectedMission.status !== 'completed' && (
                  <button
                    className="px-6 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Submit Solution
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
