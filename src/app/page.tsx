'use client';

import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import { User, ApiResponse } from '@/type'; 
import { RevealWrapper } from 'next-reveal';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users?results=9'); 
      const data: ApiResponse = await response.json(); 
      setUsers((prevUsers) => [...prevUsers, ...data.results]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Random Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <RevealWrapper key={user.login.uuid} delay={index * 50}>
            <UserCard user={user} />
          </RevealWrapper>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={fetchUsers}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Load More Users'}
        </button>
      </div>
    </div>
  );
}