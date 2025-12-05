import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { Map, Trophy, Users, Target, TrendingUp, Award, Flame, Gem, Zap, Heart } from 'lucide-react';
import DuoMascot from '@/components/DuoMascot';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const quickActions = [
    { name: 'Continuer', path: '/path', icon: Map, color: 'nird-primary', gradient: 'from-[#2DD4BF] to-[#5EEAD4]' },
    { name: 'Missions', path: '/missions', icon: Target, color: 'nird-accent', gradient: 'from-[#F59E0B] to-[#FBBF24]' },
    { name: 'Équipe', path: '/team', icon: Users, color: 'nird-secondary', gradient: 'from-[#8B5CF6] to-[#A78BFA]' },
    { name: 'Classement', path: '/leaderboard', icon: Trophy, color: 'nird-success', gradient: 'from-[#10B981] to-[#34D399]' },
  ];

  const leagueName = user?.league || 'BRONZE';
  const leagueColors: Record<string, string> = {
    BRONZE: '#CD7F32',
    SILVER: '#C0C0C0',
    GOLD: '#FFD700',
    PLATINUM: '#E5E4E2',
    RESILIENCE: '#00CED1',
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-6"
        >
          <DuoMascot variant="happy" size="lg" animate={true} />
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-display font-bold mb-3">
          <span className="text-gray-700">Salut, </span>
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">{user?.name}</span>
          <span className="text-gray-700"> !</span>
        </h1>
        <p className="text-gray-800 text-2xl md:text-3xl font-bold">
          Village Numérique Résistant
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {/* XP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-nird-primary/20 to-nird-primary/5 border-2 border-nird-primary/30"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-nird-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Total XP</p>
                <p className="text-3xl font-bold text-nird-primary">{user?.xpTotal || 0}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Niveau {Math.floor((user?.xpTotal || 0) / 100) + 1}
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Zap className="w-32 h-32 text-nird-primary" />
          </div>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-nird-accent/20 to-nird-accent/5 border-2 border-nird-accent/30"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="w-12 h-12 rounded-full bg-nird-accent flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Série</p>
                <p className="text-3xl font-bold text-nird-accent">{user?.streak || 0}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              jours consécutifs
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Flame className="w-32 h-32 text-nird-accent" />
          </div>
        </motion.div>

        {/* Gems Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-nird-secondary/20 to-nird-secondary/5 border-2 border-nird-secondary/30"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-nird-secondary flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Gems</p>
                <p className="text-3xl font-bold text-nird-secondary">{user?.gems || 0}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              à dépenser
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Gem className="w-32 h-32 text-nird-secondary" />
          </div>
        </motion.div>

        {/* League Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-nird-success/20 to-nird-success/5 border-2 border-nird-success/30"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-nird-success flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Ligue</p>
                <p className="text-2xl font-bold" style={{ color: leagueColors[leagueName] }}>
                  {leagueName}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Continue à grimper !
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Trophy className="w-32 h-32 text-nird-success" />
          </div>
        </motion.div>
      </div>

      {/* Daily Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10 card-glass p-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">Objectif Quotidien</h3>
            <p className="text-gray-600 font-semibold text-lg">Continue ton progrès aujourd'hui !</p>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-nird-danger fill-nird-danger" />
            <span className="text-3xl font-bold text-nird-danger">{user?.hearts || 0}</span>
            <span className="text-gray-400">/ 5</span>
          </div>
        </div>

        <div className="relative h-6 bg-nird-dark-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((user?.hearts || 0) / 5) * 100}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-nird-danger to-pink-500 rounded-full"
          />
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-24"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-4xl font-display font-bold mb-6 text-gray-800">Actions Rapides</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={action.path}
                  className={`
                    block relative overflow-hidden rounded-3xl p-8
                    bg-gradient-to-br ${action.gradient} 
                    border-2 border-white/20
                    transition-all duration-300
                    group
                  `}
                >
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="mb-4"
                    >
                      <Icon className="w-16 h-16 text-white mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-white">{action.name}</h3>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    className="absolute inset-0 bg-white"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* NIRD Mission Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border-4 border-white"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header with badge */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Award className="w-12 h-12 text-white" />
            </div>
            <div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block mb-2 border border-white/30">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                NIRD
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Village Numérique Résistant
          </h3>

          {/* Description */}
          <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-4xl font-medium">
            Face à l'<strong className="text-yellow-200">Empire Numérique</strong> opaque et énergivore, 
            construis un village résilient basé sur{' '}
            <strong className="text-cyan-200">l'accessibilité</strong>, 
            le <strong className="text-purple-200">logiciel libre</strong>, 
            la <strong className="text-green-200">sobriété</strong> et 
            la <strong className="text-emerald-200">durabilité</strong> numérique.
          </p>

          {/* NIRD Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '♿', label: 'Accessibilité', color: 'from-cyan-400 to-cyan-600', borderColor: 'border-cyan-300' },
              { icon: '🔓', label: 'Libre & OSS', color: 'from-purple-400 to-purple-600', borderColor: 'border-purple-300' },
              { icon: '🌱', label: 'Durabilité', color: 'from-green-400 to-green-600', borderColor: 'border-green-300' },
              { icon: '💡', label: 'Sobriété', color: 'from-yellow-400 to-yellow-600', borderColor: 'border-yellow-300' },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`
                  text-center p-6 rounded-2xl 
                  bg-gradient-to-br ${pillar.color}
                  border-3 ${pillar.borderColor}
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300
                `}
              >
                <div className="text-5xl mb-3">{pillar.icon}</div>
                <p className="text-sm md:text-base font-bold text-white leading-tight">
                  {pillar.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
