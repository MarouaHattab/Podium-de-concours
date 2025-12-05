import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/store/notificationStore';
import { X, Bell } from 'lucide-react';

export default function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotificationStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Bell Icon with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50 max-h-[600px] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-semibold">No notifications</p>
                    <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y-2 divide-gray-100">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                          !notif.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        {!notif.read && (
                          <div className="absolute left-2 top-6 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                        <div className="flex items-start gap-3 pl-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl">
                            {notif.type === 'follow' && '👥'}
                            {notif.type === 'message' && '💬'}
                            {notif.type === 'achievement' && '🏆'}
                            {notif.type === 'league' && '⚡'}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800 text-sm">{notif.title}</p>
                            <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                            <p className="text-gray-400 text-xs mt-2">
                              {new Date(notif.createdAt).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t-2 border-gray-200">
                  <button
                    onClick={() => {
                      clearAll();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Clear all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
