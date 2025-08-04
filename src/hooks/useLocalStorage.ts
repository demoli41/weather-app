'use client';

import { User } from '@/type';
import { useCallback } from 'react';

export function useLocalStorage() {
  const saveUser = (user: User) => {
    if (typeof window !== 'undefined') {
      const savedUsers = getSavedUsers();
      const isUserSaved = savedUsers.some(
        (savedUser: User) => savedUser.login.uuid === user.login.uuid
      );

      if (!isUserSaved) {
        localStorage.setItem(
          'savedUsers',
          JSON.stringify([...savedUsers, user])
        );
      }
    }
  };

  const getSavedUsers = useCallback((): User[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('savedUsers') || '[]');
    }
    return [];
  }, []);

  const removeUser = (uuid: string) => {
    if (typeof window !== 'undefined') {
      const savedUsers = getSavedUsers();
      const updatedUsers = savedUsers.filter(user => user.login.uuid !== uuid);
      localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
    }
  };

  return { saveUser, getSavedUsers, removeUser };
}