import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Trophy, Crown, Users, User, TrendingUp, Flame } from 'lucide-react';

type LeaderboardType = 'individual' | 'team';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LeaderboardType>('individual');

  useEffect(() => {
    loadLeaderboard();
  }, [activeTab]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === 'team' ? '/leaderboard/teams' : '/leaderboard';
      const { data } = await api.get(endpoint);
      setLeaderboard(data.data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Chargement du classement...</p>
        </div>
      </div>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-500" />
          Classement Global
        </h1>
        <p className="text-gray-600 text-lg">
          Qui sera le champion du numérique responsable ?
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('individual')}
            className={`
              px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2
              ${activeTab === 'individual' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <User className="w-5 h-5" />
            <span>Par Membre</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`
              px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2
              ${activeTab === 'team' 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <Users className="w-5 h-5" />
            <span>Par Équipe</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      {top3.length >= 3 && (
        <div className="mb-12">
          <div className="flex items-end justify-center gap-6 mb-8">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Trophy Icon */}
              <div className="mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-4xl">🥈</span>
                </div>
              </div>
              
              {/* Podium */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl p-6 w-52 h-44 flex flex-col items-center justify-center border-4 border-white shadow-xl">
                <div className="text-center w-full">
                  <p className="font-extrabold text-gray-800 text-lg mb-1 truncate">{top3[1]?.userName}</p>
                  <p className="text-gray-600 text-xs mb-3 font-semibold">{top3[1]?.teamName || 'Solo'}</p>
                  
                  <div className="bg-white rounded-xl px-4 py-2 border-2 border-gray-400 shadow-md">
                    <p className="text-2xl font-extrabold text-gray-700">{top3[1]?.xpTotal?.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 font-bold">XP</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 1st Place - Tallest */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Crown */}
              <Crown className="w-14 h-14 text-yellow-500 mb-2 animate-bounce" />
              
              {/* Trophy Icon */}
              <div className="mb-3">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-white shadow-2xl ring-4 ring-yellow-200">
                  <span className="text-5xl">🏆</span>
                </div>
              </div>
              
              {/* Podium */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-3xl p-6 w-60 h-60 flex flex-col items-center justify-center border-4 border-white shadow-2xl">
                <div className="text-center w-full">
                  <p className="font-extrabold text-white text-2xl mb-1 truncate drop-shadow-lg">{top3[0]?.userName}</p>
                  <p className="text-yellow-100 text-sm mb-4 font-bold">{top3[0]?.teamName || 'Solo'}</p>
                  
                  <div className="bg-white rounded-xl px-5 py-3 border-2 border-yellow-500 shadow-lg">
                    <p className="text-3xl font-extrabold text-yellow-600">{top3[0]?.xpTotal?.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-bold">XP</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Trophy Icon */}
              <div className="mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-3xl">🥉</span>
                </div>
              </div>
              
              {/* Podium */}
              <div className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-t-3xl p-5 w-48 h-36 flex flex-col items-center justify-center border-4 border-white shadow-xl">
                <div className="text-center w-full">
                  <p className="font-extrabold text-white text-base mb-1 truncate">{top3[2]?.userName}</p>
                  <p className="text-orange-100 text-xs mb-3 font-semibold">{top3[2]?.teamName || 'Solo'}</p>
                  
                  <div className="bg-white rounded-xl px-3 py-2 border-2 border-orange-400 shadow-md">
                    <p className="text-xl font-extrabold text-orange-600">{top3[2]?.xpTotal?.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-bold">XP</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Rest of Leaderboard */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Trophy className="w-7 h-7" />
            <span>Classement Complet</span>
          </h2>
        </div>
        
        <div className="divide-y-2 divide-gray-100">
          {rest.map((entry, index) => (
            <motion.div
              key={entry.userId || entry.teamId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.03 }}
              className="p-5 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  {/* Rank Badge */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-300 shadow-md">
                    <span className="text-2xl font-extrabold text-gray-700">{entry.rank}</span>
                  </div>

                  {/* User/Team Info */}
                  <div>
                    <p className="font-extrabold text-gray-800 text-xl">{entry.userName || entry.teamName}</p>
                    <p className="text-gray-500 text-sm font-semibold flex items-center gap-2">
                      {activeTab === 'individual' ? (
                        <>
                          <Users className="w-4 h-4" />
                          {entry.teamName || 'Solo'}
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          {entry.memberCount || 0} membres
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  {/* XP Display */}
                  <div className="text-right bg-gradient-to-br from-green-50 to-green-100 px-4 py-2 rounded-xl border-2 border-green-200">
                    <p className="text-3xl font-extrabold text-green-600">{entry.xpTotal?.toLocaleString()}</p>
                    <p className="text-xs text-green-700 font-bold">XP</p>
                  </div>

                  {/* Streak */}
                  {entry.streak && (
                    <div className="flex items-center gap-1 bg-orange-50 px-3 py-2 rounded-xl border-2 border-orange-200">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span className="font-extrabold text-orange-600">{entry.streak}</span>
                    </div>
                  )}

                  {/* League Badge */}
                  <div className={`px-4 py-2 rounded-xl text-sm font-extrabold border-2 ${
                    entry.league === 'DIAMOND' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                    entry.league === 'GOLD' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                    entry.league === 'SILVER' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                    'bg-orange-100 text-orange-700 border-orange-300'
                  }`}>
                    {entry.league || 'BRONZE'}
                  </div>

                  {/* Trend */}
                  {entry.trend === 'UP' && (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-2 rounded-xl border-2 border-green-200">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-extrabold">+{Math.floor(Math.random() * 10 + 1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {leaderboard.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-semibold">Aucun résultat pour le moment</p>
          <p className="text-gray-400">Soyez le premier à rejoindre le classement !</p>
        </div>
      )}
    </div>
  );
}
