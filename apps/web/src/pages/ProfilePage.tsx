import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, ChevronRight, X, Check } from 'lucide-react';
import CustomAvatar from '@/components/CustomAvatar';
import ProfileActionButtons from '@/components/ProfileActionButtons';

// Avatar customization options
const AVATAR_OPTIONS = {
  skinTones: ['#8D5524', '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC', '#FFE0BD'],
  hairStyles: ['short', 'long', 'curly', 'bun', 'mohawk', 'bald'],
  hairColors: ['#2C1B18', '#653D32', '#8B5A3C', '#F2C280', '#FFD700', '#FF6B35'],
  clothingColors: ['#1CB0F6', '#CE82FF', '#58CC02', '#FF9600', '#FF4B4B', '#FFC800'],
  genders: ['male', 'female'] as const,
  accessories: ['none', 'earrings', 'necklace'] as const,
};

const NATIONALITIES = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'MA', flag: '🇲🇦', name: 'Morocco' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'CN', flag: '🇨🇳', name: 'China' },
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [showNameEditor, setShowNameEditor] = useState(false);
  const [showNationalityPicker, setShowNationalityPicker] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [followTab, setFollowTab] = useState<'following' | 'followers'>('followers');
  const [editedName, setEditedName] = useState(user?.name || 'Maroua Hattab');
  const [nationality, setNationality] = useState(NATIONALITIES[2]); // Morocco by default
  const [avatar, setAvatar] = useState<{
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    clothingColor: string;
    gender: 'male' | 'female';
    glasses: boolean;
    accessory: 'none' | 'earrings' | 'necklace';
  }>({
    skinTone: AVATAR_OPTIONS.skinTones[2],
    hairStyle: 'long',
    hairColor: AVATAR_OPTIONS.hairColors[0],
    clothingColor: AVATAR_OPTIONS.clothingColors[0],
    gender: 'female',
    glasses: false,
    accessory: 'earrings',
  });

  const followers = [
    { 
      id: 'user-alice-001',
      name: 'Alice Martin', 
      username: 'alice', 
      xp: 84144, 
      flag: '🇫🇷',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[3],
        hairStyle: 'bun',
        hairColor: AVATAR_OPTIONS.hairColors[4],
        clothingColor: AVATAR_OPTIONS.clothingColors[3],
        gender: 'female' as const,
        glasses: false,
        accessory: 'earrings' as const,
      }
    },
    { 
      id: 'user-bob-002',
      name: 'Bob Durant', 
      username: 'bob', 
      xp: 4762, 
      flag: '🇺🇸',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[1],
        hairStyle: 'short',
        hairColor: AVATAR_OPTIONS.hairColors[2],
        clothingColor: AVATAR_OPTIONS.clothingColors[0],
        gender: 'male' as const,
        glasses: true,
        accessory: 'none' as const,
      }
    },
    { 
      id: 'user-charlie-003',
      name: 'Charlie Smith', 
      username: 'charlie', 
      xp: 1313, 
      flag: '🇬🇧',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[4],
        hairStyle: 'mohawk',
        hairColor: AVATAR_OPTIONS.hairColors[5],
        clothingColor: AVATAR_OPTIONS.clothingColors[1],
        gender: 'male' as const,
        glasses: false,
        accessory: 'none' as const,
      }
    },
    { 
      id: 'user-david-004',
      name: 'David Lee', 
      username: 'davidlee', 
      xp: 15678, 
      flag: '🇨🇳',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[0],
        hairStyle: 'short',
        hairColor: AVATAR_OPTIONS.hairColors[0],
        clothingColor: AVATAR_OPTIONS.clothingColors[2],
        gender: 'male' as const,
        glasses: true,
        accessory: 'none' as const,
      }
    },
    { 
      id: 'user-emma-005',
      name: 'Emma Wilson', 
      username: 'emmaw', 
      xp: 9234, 
      flag: '🇨🇦',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[5],
        hairStyle: 'curly',
        hairColor: AVATAR_OPTIONS.hairColors[3],
        clothingColor: AVATAR_OPTIONS.clothingColors[4],
        gender: 'female' as const,
        glasses: false,
        accessory: 'necklace' as const,
      }
    },
  ];

  const following = [
    { 
      id: 'user-dav-101',
      name: 'Dav Duong', 
      username: 'davduong', 
      xp: 202845, 
      flag: '🇻🇳',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[2],
        hairStyle: 'short',
        hairColor: AVATAR_OPTIONS.hairColors[0],
        clothingColor: AVATAR_OPTIONS.clothingColors[0],
        gender: 'male' as const,
        glasses: false,
        accessory: 'none' as const,
      }
    },
    { 
      id: 'user-trac-102',
      name: 'Trâc phuong', 
      username: 'tracphuong', 
      xp: 60763, 
      flag: '🇻🇳',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[3],
        hairStyle: 'long',
        hairColor: AVATAR_OPTIONS.hairColors[0],
        clothingColor: AVATAR_OPTIONS.clothingColors[1],
        gender: 'female' as const,
        glasses: false,
        accessory: 'earrings' as const,
      }
    },
    { 
      id: 'user-sigmar-103',
      name: 'Sigmar', 
      username: 'sigmar', 
      xp: 30475, 
      flag: '🇩🇪',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[4],
        hairStyle: 'bald',
        hairColor: AVATAR_OPTIONS.hairColors[0],
        clothingColor: AVATAR_OPTIONS.clothingColors[5],
        gender: 'male' as const,
        glasses: true,
        accessory: 'none' as const,
      }
    },
    { 
      id: 'user-kabila-104',
      name: 'Kabila123', 
      username: 'kabila123', 
      xp: 27153, 
      flag: '🇲🇦',
      avatarConfig: {
        skinTone: AVATAR_OPTIONS.skinTones[1],
        hairStyle: 'curly',
        hairColor: AVATAR_OPTIONS.hairColors[0],
        clothingColor: AVATAR_OPTIONS.clothingColors[2],
        gender: 'male' as const,
        glasses: false,
        accessory: 'none' as const,
      }
    },
  ];

  const stats = [
    { value: 385, label: 'Total XP earned', icon: '⚡', color: '#FFC800', subtext: 'Weekly XP' },
    { value: 0, label: 'Day streak', icon: '🔥', color: '#FF9600', subtext: '' },
    { value: 0, label: 'Top 3 finishes', icon: '🛡️', color: '#CCCCCC', subtext: '' },
    { value: 'Bronze', label: 'Current league', icon: '🥉', color: '#CD7F32', subtext: '' },
  ];

  const achievements = [
    { 
      id: 1, 
      name: 'Wildfire', 
      description: 'Reach a 3 day streak',
      progress: 3, 
      goal: 1, 
      icon: '🔥', 
      color: 'from-red-400 to-red-500',
      bgColor: '#FF6B6B',
      label: 'Legendary'
    },
    { 
      id: 2, 
      name: 'Sage', 
      description: 'Earn 500 XP',
      progress: 385, 
      goal: 500, 
      icon: '🧙', 
      color: 'from-green-400 to-green-500',
      bgColor: '#58CC02',
      label: 'Legendary'
    },
    { 
      id: 3, 
      name: 'Champion', 
      description: 'Finish top 3 in Silver League',
      progress: 2, 
      goal: 1, 
      icon: '🏆', 
      color: 'from-purple-400 to-purple-500',
      bgColor: '#CE82FF',
      label: 'Legendary'
    },
  ];

  const friendActions = [
    { icon: '🔍', text: 'Find your friends', color: '#1CB0F6' },
    { icon: '🌟', text: 'Meet new friends', color: '#FFC800' },
    { icon: '👥', text: 'Invite your friends', color: '#58CC02' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-4">
          {/* Following/Followers Tabs */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200">
            <div className="flex border-b-2 border-gray-200">
              <button
                onClick={() => setFollowTab('following')}
                className={`flex-1 py-4 font-bold text-center transition-colors ${
                  followTab === 'following'
                    ? 'text-blue-500 border-b-4 border-blue-500'
                    : 'text-gray-500'
                }`}
              >
                Following
              </button>
              <button
                onClick={() => setFollowTab('followers')}
                className={`flex-1 py-4 font-bold text-center transition-colors ${
                  followTab === 'followers'
                    ? 'text-blue-500 border-b-4 border-blue-500'
                    : 'text-gray-500'
                }`}
              >
                Followers
              </button>
            </div>

            {/* Followers List */}
            <div className="p-4 space-y-3">
              {(followTab === 'followers' ? followers : following).map((person, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedUser(person);
                    setShowUserProfile(true);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <CustomAvatar config={person.avatarConfig} size={48} />
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-base">{person.flag}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-gray-800">{person.name}</p>
                      <p className="text-xs text-gray-500">@{person.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-700">{person.xp.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">XP</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* View More */}
            <button className="w-full py-4 border-t-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span>View more</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Add Friends Section */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Add Friends</h3>
            <div className="space-y-3">
              {friendActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="font-semibold text-gray-700">{action.text}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 overflow-hidden">
            {/* Avatar Section */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 relative">
              <button
                onClick={() => setShowAvatarEditor(true)}
                className="absolute top-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-gray-300"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Avatar Display */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <CustomAvatar config={avatar} size={180} />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-8 text-center">
              {/* Name with Edit */}
              <div className="flex items-center justify-center gap-2 mb-2">
                {showNameEditor ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-4xl font-bold text-white text-center bg-gray-700 border-b-2 border-blue-500 focus:outline-none px-4 py-2 rounded-xl"
                      autoFocus
                    />
                    <button
                      onClick={() => setShowNameEditor(false)}
                      className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <Check className="w-6 h-6 text-green-600" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-gray-800">{editedName}</h1>
                    <button
                      onClick={() => setShowNameEditor(true)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Edit2 className="w-5 h-5 text-gray-500" />
                    </button>
                  </>
                )}
              </div>
              
              <p className="text-gray-500 text-lg mb-2">@{user?.login || 'marouahatt'}</p>
              <p className="text-gray-400 text-sm mb-6">Joined October 2016</p>

              <div className="flex items-center justify-center gap-6 mb-6">
                <button className="hover:underline">
                  <span className="text-blue-500 font-bold">{following.length} Following</span>
                </button>
                <button className="hover:underline">
                  <span className="text-blue-500 font-bold">{followers.length} Followers</span>
                </button>
              </div>

              {/* Nationality Flag - Clickable */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowNationalityPicker(true)}
                  className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 hover:border-blue-500 hover:scale-110 transition-all"
                >
                  <span className="text-3xl">{nationality.flag}</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{nationality.name}</p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-3xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                      {stat.subtext && (
                        <p className="text-sm text-gray-500">{stat.subtext}</p>
                      )}
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Achievements</h2>
              <button className="text-blue-500 font-bold hover:underline">View all</button>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200"
                >
                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-2xl border-4 border-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: achievement.bgColor }}
                  >
                    <span className="text-3xl mb-1">{achievement.icon}</span>
                    <span className="text-xs text-white font-bold">{achievement.label}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{achievement.name}</h3>
                      <p className="text-sm text-gray-500">{achievement.progress} / {achievement.goal}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
                        style={{ width: `${Math.min((achievement.progress / achievement.goal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Editor Modal */}
      <AnimatePresence>
        {showAvatarEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAvatarEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Customize your avatar</h2>
                <button
                  onClick={() => setShowAvatarEditor(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left - Customization Options */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                  {/* Skin Tone */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Skin Tone</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {AVATAR_OPTIONS.skinTones.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setAvatar({ ...avatar, skinTone: tone })}
                          className={`
                            w-12 h-12 rounded-full border-4 transition-all
                            ${avatar.skinTone === tone ? 'border-blue-500 scale-110' : 'border-gray-300'}
                          `}
                          style={{ backgroundColor: tone }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hair Style */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Hair Style</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {AVATAR_OPTIONS.hairStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setAvatar({ ...avatar, hairStyle: style })}
                          className={`
                            p-4 rounded-xl border-2 font-semibold capitalize transition-all
                            ${avatar.hairStyle === style 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Color */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Hair Color</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {AVATAR_OPTIONS.hairColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setAvatar({ ...avatar, hairColor: color })}
                          className={`
                            w-12 h-12 rounded-full border-4 transition-all
                            ${avatar.hairColor === color ? 'border-blue-500 scale-110' : 'border-gray-300'}
                          `}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Clothing Color */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Clothing Color</h3>
                    <div className="grid grid-cols-6 gap-2">
                      {AVATAR_OPTIONS.clothingColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setAvatar({ ...avatar, clothingColor: color })}
                          className={`
                            w-12 h-12 rounded-full border-4 transition-all
                            ${avatar.clothingColor === color ? 'border-blue-500 scale-110' : 'border-gray-300'}
                          `}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Gender</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {AVATAR_OPTIONS.genders.map((gender) => (
                        <button
                          key={gender}
                          onClick={() => setAvatar({ ...avatar, gender })}
                          className={`
                            p-4 rounded-xl border-2 font-semibold capitalize transition-all
                            ${avatar.gender === gender 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {gender === 'female' ? '👩 Female' : '👨 Male'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Glasses */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Glasses</h3>
                    <button
                      onClick={() => setAvatar({ ...avatar, glasses: !avatar.glasses })}
                      className={`
                        w-full p-4 rounded-xl border-2 font-semibold transition-all
                        ${avatar.glasses 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {avatar.glasses ? '👓 Glasses ON' : '🚫 No Glasses'}
                    </button>
                  </div>

                  {/* Accessory */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Accessory</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {AVATAR_OPTIONS.accessories.map((accessory) => (
                        <button
                          key={accessory}
                          onClick={() => setAvatar({ ...avatar, accessory })}
                          className={`
                            p-3 rounded-xl border-2 font-semibold capitalize transition-all text-sm
                            ${avatar.accessory === accessory 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {accessory === 'earrings' ? '👂 Earrings' : accessory === 'necklace' ? '📿 Necklace' : '❌ None'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right - Avatar Preview */}
                <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <CustomAvatar config={avatar} size={280} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t-2 border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAvatarEditor(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAvatarEditor(false)}
                  className="px-6 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nationality Picker Modal */}
      <AnimatePresence>
        {showNationalityPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNationalityPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Choose your nationality</h2>
                <button
                  onClick={() => setShowNationalityPicker(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Nationality Grid */}
              <div className="p-6 max-h-[600px] overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {NATIONALITIES.map((nat) => (
                    <button
                      key={nat.code}
                      onClick={() => {
                        setNationality(nat);
                        setShowNationalityPicker(false);
                      }}
                      className={`
                        p-4 rounded-2xl border-2 transition-all hover:scale-105
                        ${
                          nationality.code === nat.code
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-white hover:border-blue-300'
                        }
                      `}
                    >
                      <div className="text-5xl mb-2">{nat.flag}</div>
                      <p className="font-semibold text-gray-800 text-sm">{nat.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showUserProfile && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowUserProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowUserProfile(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 relative">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <CustomAvatar config={selectedUser.avatarConfig} size={160} />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedUser.name}</h1>
                  <p className="text-gray-500 text-lg mb-2">@{selectedUser.username}</p>
                  
                  {/* Nationality Flag */}
                  <div className="flex justify-center mt-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <span className="text-2xl">{selectedUser.flag}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 border-2 border-yellow-200 text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <p className="text-2xl font-bold text-gray-800">{selectedUser.xp.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Total XP</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border-2 border-orange-200 text-center">
                    <div className="text-3xl mb-2">🔥</div>
                    <p className="text-2xl font-bold text-gray-800">{Math.floor(selectedUser.xp / 1000)}</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Day Streak</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border-2 border-purple-200 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-2xl font-bold text-gray-800">{Math.floor(selectedUser.xp / 5000)}</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Top 3 Finishes</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200 text-center">
                    <div className="text-3xl mb-2">
                      {selectedUser.xp > 100000 ? '💎' : selectedUser.xp > 50000 ? '🥇' : selectedUser.xp > 10000 ? '🥈' : '🥉'}
                    </div>
                    <p className="text-xl font-bold text-gray-800">
                      {selectedUser.xp > 100000 ? 'Diamond' : selectedUser.xp > 50000 ? 'Gold' : selectedUser.xp > 10000 ? 'Silver' : 'Bronze'}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Current League</p>
                  </div>
                </div>

                {/* XP Progress Graph */}
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 mb-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <span>📈</span>
                    <span>XP Progress This Week</span>
                  </h3>
                  <svg viewBox="0 0 400 200" className="w-full h-48">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="40" y2="160" stroke="#E5E7EB" strokeWidth="2" />
                    <line x1="40" y1="160" x2="380" y2="160" stroke="#E5E7EB" strokeWidth="2" />
                    
                    {/* Y-axis labels */}
                    <text x="10" y="25" fill="#6B7280" fontSize="10">200</text>
                    <text x="10" y="95" fill="#6B7280" fontSize="10">100</text>
                    <text x="20" y="165" fill="#6B7280" fontSize="10">0</text>
                    
                    {/* Days */}
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <text key={i} x={60 + i * 48} y="180" fill="#6B7280" fontSize="12" fontWeight="bold" textAnchor="middle">
                        {day}
                      </text>
                    ))}
                    
                    {/* Data points and line */}
                    {(() => {
                      const baseXP = selectedUser.xp / 30;
                      const weekData = [
                        baseXP * 0.7,
                        baseXP * 0.8,
                        baseXP * 1.1,
                        baseXP * 0.9,
                        baseXP * 1.3,
                        baseXP * 1.5,
                        baseXP * 1.2,
                      ];
                      const maxXP = Math.max(...weekData);
                      const points = weekData.map((xp, i) => ({
                        x: 60 + i * 48,
                        y: 160 - (xp / maxXP) * 135,
                        value: Math.round(xp),
                      }));
                      
                      return (
                        <>
                          {/* Line */}
                          <polyline
                            points={points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Points */}
                          {points.map((point, i) => (
                            <g key={i}>
                              <circle cx={point.x} cy={point.y} r="5" fill="#3B82F6" />
                              <circle cx={point.x} cy={point.y} r="3" fill="white" />
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <span>🎖️</span>
                    <span>Achievements</span>
                  </h3>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { icon: '🔥', name: 'Wildfire', color: 'from-red-400 to-orange-500', unlocked: selectedUser.xp > 5000 },
                      { icon: '🧙', name: 'Sage', color: 'from-purple-400 to-purple-600', unlocked: selectedUser.xp > 10000 },
                      { icon: '🏆', name: 'Champion', color: 'from-yellow-400 to-yellow-600', unlocked: selectedUser.xp > 25000 },
                      { icon: '⭐', name: 'Scholar', color: 'from-blue-400 to-blue-600', unlocked: selectedUser.xp > 50000 },
                      { icon: '👑', name: 'Legend', color: 'from-pink-400 to-pink-600', unlocked: selectedUser.xp > 100000 },
                    ].map((achievement, i) => (
                      <div
                        key={i}
                        className={`
                          rounded-2xl p-4 text-center transition-all
                          ${achievement.unlocked 
                            ? `bg-gradient-to-br ${achievement.color} border-2 border-white shadow-lg` 
                            : 'bg-gray-200 border-2 border-gray-300 opacity-50'
                          }
                        `}
                      >
                        <div className={`text-3xl mb-1 ${!achievement.unlocked && 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <p className={`text-xs font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <ProfileActionButtons selectedUser={selectedUser} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
