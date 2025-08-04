'use client';

import { useCallback, useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User } from '@/type';

export default function SavedUsersPage() {
  const { getSavedUsers } = useLocalStorage();
  const [savedUsers, setSavedUsers] = useState<User[]>([]);

  const fetchSavedUsers = useCallback(() => {
    setSavedUsers(getSavedUsers());
  }, [getSavedUsers]);

  useEffect(() => {
    fetchSavedUsers();
  }, [fetchSavedUsers]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Users</h1>
      {savedUsers.length === 0 ? (
        <p className="text-center text-gray-500">You haven&apos;t saved any users yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedUsers.map((user) => (
            <UserCard 
              key={user.login.uuid} 
              user={user} 
              showSaveButton={false} 
              showDeleteButton={true} 
              onUserRemoved={fetchSavedUsers} 
            />
          ))}
        </div>
      )}
    </div>
  );
}