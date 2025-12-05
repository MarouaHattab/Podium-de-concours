import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { 
  Users, Crown, UserPlus, Copy, Check, Shield, Code, BookOpen, 
  Award, TrendingUp, LogOut, Settings, Trash2
} from 'lucide-react';
import api from '@/lib/api';

export default function TeamPage() {
  const { user, fetchMe } = useAuthStore();
  const [team, setTeam] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', inviteCode: '' });
  const [inviteUsername, setInviteUsername] = useState('');

  useEffect(() => {
    loadTeam();
  }, [user]);

  const loadTeam = async () => {
    try {
      if (user?.teamId) {
        const { data } = await api.get(`/teams/${user.teamId}`);
        setTeam(data.data);
      }
    } catch (error) {
      console.error('Failed to load team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teams', {
        name: formData.name,
        description: formData.description,
      });
      await fetchMe();
      await loadTeam();
      setShowCreateForm(false);
      setFormData({ name: '', description: '', inviteCode: '' });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erreur lors de la création');
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Get team ID from invite code
      await api.post(`/teams/TEAM_ID/join`, {
        inviteCode: formData.inviteCode,
      });
      await fetchMe();
      await loadTeam();
      setShowJoinForm(false);
      setFormData({ name: '', description: '', inviteCode: '' });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Code invalide');
    }
  };

  const handleLeaveTeam = async () => {
    if (!confirm('Es-tu sûr de vouloir quitter l\'équipe ?')) return;
    try {
      await api.post(`/teams/${user?.teamId}/leave`);
      await fetchMe();
      setTeam(null);
      alert('Tu as quitté l\'équipe avec succès !');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erreur lors de la sortie de l\'équipe');
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir expulser ${memberName} de l'équipe ?`)) return;
    try {
      await api.delete(`/teams/${user?.teamId}/members/${memberId}`);
      await loadTeam(); // Reload team data
      alert(`${memberName} a été retiré de l'équipe`);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erreur lors de la suppression du membre');
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteUsername.trim()) return;
    
    try {
      await api.post(`/teams/${user?.teamId}/invite`, {
        username: inviteUsername.trim()
      });
      await loadTeam(); // Reload team data
      setShowAddMember(false);
      setInviteUsername('');
      alert(`Invitation envoyée à ${inviteUsername} !`);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erreur lors de l\'invitation');
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team?.inviteCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleIcons: Record<string, any> = {
    CAPTAIN: Crown,
    DEVELOPER: Code,
    VERIFIER: Shield,
    PEDAGOGUE: BookOpen,
  };

  const roleColors: Record<string, string> = {
    CAPTAIN: '#FFC800',
    DEVELOPER: '#1CB0F6',
    VERIFIER: '#CE82FF',
    PEDAGOGUE: '#58CC02',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  // No team - Show create/join options
  if (!team) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl"
          >
            <Users className="w-16 h-16 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Rejoins une Équipe !</h1>
          <p className="text-xl text-gray-600">
            Collabore avec d'autres pour apprendre le NIRD ensemble
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Team Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Créer une Équipe</h2>
            <p className="text-gray-600 mb-6">
              Deviens capitaine et invite tes amis à te rejoindre
            </p>
            
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
              >
                Créer
              </button>
            ) : (
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom de l'équipe"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold text-gray-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold text-gray-800"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Join Team Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8"
          >
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Rejoindre une Équipe</h2>
            <p className="text-gray-600 mb-6">
              Entre le code d'invitation partagé par ton équipe
            </p>
            
            {!showJoinForm ? (
              <button
                onClick={() => setShowJoinForm(true)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
              >
                Rejoindre
              </button>
            ) : (
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <input
                  type="text"
                  placeholder="Code d'invitation"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none font-semibold text-gray-800"
                  value={formData.inviteCode}
                  onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                  >
                    Rejoindre
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJoinForm(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Has team - Show team details
  return (
    <div className="max-w-6xl mx-auto">
      {/* Team Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 mb-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
              <Users className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{team.name}</h1>
              <p className="text-gray-600 text-lg mb-3">{team.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl border-2 border-purple-200">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-700">{team.members?.length || 0} membres</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border-2 border-yellow-200">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700">{team.xpTotal || 0} XP</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLeaveTeam}
            className="p-3 hover:bg-red-50 rounded-xl transition-colors group"
            title="Quitter l'équipe"
          >
            <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
          </button>
        </div>

        {/* Invite Code */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">Code d'invitation :</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-mono text-lg font-bold text-gray-800">
              {team.inviteCode}
            </code>
            <button
              onClick={copyInviteCode}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>
        </div>

        {/* Add Member Section (only for CAPTAIN) */}
        {team.members?.find((m: any) => m.id === user?.id)?.roles?.includes('CAPTAIN') && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600">Inviter un membre :</p>
              {!showAddMember && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Ajouter</span>
                </button>
              )}
            </div>

            {showAddMember && (
              <form onSubmit={handleAddMember} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Username de l'utilisateur"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold text-gray-800"
                  value={inviteUsername}
                  onChange={(e) => setInviteUsername(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
                >
                  Inviter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMember(false);
                    setInviteUsername('');
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Annuler
                </button>
              </form>
            )}
          </div>
        )}
      </motion.div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.members?.map((member: any, index: number) => {
          const memberRoles = member.roles || [];
          const mainRole = memberRoles[0] || 'DEVELOPER';
          const RoleIcon = roleIcons[mainRole] || Code;
          const roleColor = roleColors[mainRole];

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 relative"
            >
              {/* Remove button (only for CAPTAIN) */}
              {team.members?.find((m: any) => m.id === user?.id)?.roles?.includes('CAPTAIN') && member.id !== user?.id && (
                <button
                  onClick={() => handleRemoveMember(member.id, member.name)}
                  className="absolute top-4 right-4 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  title="Expulser du membre"
                >
                  <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </button>
              )}

              {/* Member Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  style={{ backgroundColor: roleColor }}
                >
                  <span className="text-2xl text-white font-bold">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                  <p className="text-gray-600 text-sm">@{member.login}</p>
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-2 mb-4">
                {memberRoles.map((role: string) => {
                  const Icon = roleIcons[role] || Code;
                  return (
                    <div
                      key={role}
                      className="flex items-center gap-1 px-3 py-1 rounded-full border-2 text-sm font-semibold"
                      style={{
                        backgroundColor: `${roleColors[role]}20`,
                        borderColor: roleColors[role],
                        color: roleColors[role],
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{role.toLowerCase()}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{member.xpTotal || 0}</p>
                  <p className="text-xs text-gray-500 font-semibold">XP</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{member.streak || 0}</p>
                  <p className="text-xs text-gray-500 font-semibold">Série</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
