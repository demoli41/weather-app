'use client';

import Image from 'next/image';
import { User } from '@/type';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useState } from 'react';
import toast from 'react-hot-toast';
import WeatherCardBack from './WeatherCardBack';

interface UserCardProps {
  user: User;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  onUserRemoved?: () => void;
}

export default function UserCard({ user, showSaveButton = true, showDeleteButton = false, onUserRemoved }: UserCardProps) {
  const { saveUser, removeUser } = useLocalStorage();
  const [isFlipped, setIsFlipped] = useState(false); 

  const handleSave = () => {
    saveUser(user);
    toast.success('User saved successfully!', {
      duration: 3000,
      position: 'top-center',
    });
  };

  const handleDelete = () => {
    removeUser(user.login.uuid);
    toast.success('User deleted!', {
      duration: 3000,
      position: 'top-center',
    });
    if (onUserRemoved) {
      onUserRemoved();
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-96 [perspective:1000px]">
      <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Фронтальна сторона картки */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-6 items-center text-center">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            width={128}
            height={128}
            className="rounded-full mb-4 border-4 border-blue-500"
          />
          <h2 className="text-xl font-bold">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600 mb-1">Gender: {user.gender}</p>
          <p className="text-gray-600 mb-1">
            Location: {user.location.city}, {user.location.country}
          </p>
          <p className="text-gray-600 mb-4">Email: {user.email}</p>
          <div className="flex space-x-4">
            {showSaveButton && (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            )}
            {showDeleteButton && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleFlip}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Weather
            </button>
          </div>
        </div>

        {/* Задня сторона картки */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg shadow-md overflow-hidden p-6">
          <WeatherCardBack user={user} onClose={handleFlip} />
        </div>
      </div>
    </div>
  );
}