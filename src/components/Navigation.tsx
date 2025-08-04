
import { UsersRound } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 mb-8 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">
            Weather App 🌤️
        </Link>
        <Link href="/saved" className="text-lg flex items-center gap-2 hover:text-gray-300">
            <span>Saved Users</span>
          <UsersRound/>
        </Link>
      </div>
    </nav>
  );
}