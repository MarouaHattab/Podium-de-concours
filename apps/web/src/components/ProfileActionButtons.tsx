import React, { useState } from 'react';
import { useFollowStore } from '@/store/followStore';
import { useNotificationStore } from '@/store/notificationStore';

interface ProfileActionButtonsProps {
  selectedUser: {
    id: string;
    name: string;
    username: string;
  };
}

export default function ProfileActionButtons({ selectedUser }: ProfileActionButtonsProps) {
  const { follow, unfollow, isFollowing } = useFollowStore();
  const { addNotification } = useNotificationStore();
  const [isFollowingUser, setIsFollowingUser] = useState(isFollowing(selectedUser.id));
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    setIsLoading(true);
    try {
      if (isFollowingUser) {
        await unfollow(selectedUser.id);
        setIsFollowingUser(false);
        addNotification({
          type: 'follow',
          title: 'Unfollowed',
          message: `You unfollowed ${selectedUser.name}`,
        });
      } else {
        await follow(selectedUser.id);
        setIsFollowingUser(true);
        addNotification({
          type: 'follow',
          title: 'New Follow!',
          message: `You are now following ${selectedUser.name}`,
        });
      }
    } catch (error) {
      console.error('Follow error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = () => {
    // Notification pour l'utilisateur qui REÇOIT, pas qui envoie
    // Ici c'est juste un mock, normalement ce serait côté serveur
    // qui enverrait la notification au destinataire
    console.log(`Sending message to ${selectedUser.name}`);
    // TODO: Ouvrir modal de message
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={handleFollowToggle}
        disabled={isLoading}
        className={`py-4 px-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 ${
          isFollowingUser
            ? 'text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
            : 'text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {isFollowingUser ? (
            <>
              <span>✓</span>
              <span>Following</span>
            </>
          ) : (
            <>
              <span>➕</span>
              <span>Follow</span>
            </>
          )}
        </span>
      </button>
      <button
        onClick={handleMessage}
        className="py-4 px-6 rounded-2xl font-bold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center justify-center gap-2">
          <span>💬</span>
          <span>Message</span>
        </span>
      </button>
    </div>
  );
}
