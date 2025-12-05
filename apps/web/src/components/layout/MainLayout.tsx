import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useWebSocketStore } from '@/store/websocketStore';
import { 
  Home, Map, Target, Trophy, Users, ShoppingBag, BookOpen, 
  LogOut, Flame, Gem, Settings, User, Crown
} from 'lucide-react';
import DuoMascot from '@/components/DuoMascot';
import NotificationPanel from '@/components/NotificationPanel';

export default function MainLayout() {
  const { user, logout } = useAuthStore();
  const { connect } = useWebSocketStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      connect();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items - Duolingo style
  const navItems = [
    { name: 'Apprendre', path: '/path', icon: Home, color: '#58CC02' },
    { name: 'Pratiquer', path: '/missions', icon: Target, color: '#00CD9C' },
    { name: 'Équipe', path: '/team', icon: Users, color: '#1CB0F6' },
    { name: 'Classements', path: '/leaderboard', icon: Trophy, color: '#FFC800' },
    { name: 'Super', path: '/store', icon: Crown, color: '#FF9600' },
    { name: 'Profil', path: '/profile', icon: User, color: '#CE82FF' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with Bird */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12">
                <DuoMascot variant="happy" size="sm" animate={true} />
              </div>
              <span className="text-3xl font-extrabold text-green-600">podium</span>
            </Link>

            {/* User Stats */}
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl border-2 border-orange-200">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-600">{user?.streak || 0}</span>
              </div>

              {/* Gems */}
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl border-2 border-blue-200">
                <Gem className="w-5 h-5 text-blue-500" />
                <span className="font-bold text-blue-600">{user?.gems || 0}</span>
              </div>

              {/* Hearts */}
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl border-2 border-red-200">
                <span className="text-xl">❤️</span>
                <span className="font-bold text-red-600">{user?.hearts || 0}</span>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                <User className="w-6 h-6 text-gray-600" />
              </div>

              {/* Notifications */}
              <NotificationPanel />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Déconnexion"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>

          {/* Right Sidebar - Duolingo Style */}
          <aside className="w-80 space-y-6 hidden lg:block flex-shrink-0">
            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden">
              <nav>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center gap-4 px-6 py-4 transition-colors
                        ${active 
                          ? 'bg-blue-50 border-r-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon 
                        className="w-6 h-6"
                        style={{ color: active ? item.color : '#AFAFAF' }}
                      />
                      <span 
                        className={`font-bold text-lg ${active ? 'text-gray-800' : 'text-gray-500'}`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Super Promo Card */}
            <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl shadow-md p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white/20 px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold uppercase tracking-wider">Super</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Rejoins Super NIRD
              </h3>
              <p className="text-sm text-blue-100 mb-4">
                Débloque des entraînements illimités, des cœurs illimités, et des parcours exclusifs !
              </p>
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Essayer Super
              </button>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Progression Hebdomadaire
              </h3>
              
              {/* XP Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Objectif XP</span>
                  <span className="text-sm font-bold text-green-600">
                    {user?.xpTotal || 0} / 100 XP
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((user?.xpTotal || 0) / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-xs font-bold
                      ${i < (user?.streak || 0)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                      }
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Quests */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Quêtes Quotidiennes
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Gagne 10 XP
                    </p>
                    <div className="h-2 bg-purple-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: '60%' }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl ml-3">💎</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Complète 3 leçons
                    </p>
                    <div className="h-2 bg-yellow-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: '30%' }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl ml-3">⭐</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
