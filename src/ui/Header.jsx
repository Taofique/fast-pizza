import React from 'react';
import { Link } from 'react-router-dom';
import SearchOder from '../features/order/SearchOder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="font-semibold tracking-widest">
        Fast Pizza Co.
      </Link>
      <SearchOder />
      <Username />
    </header>
  );
}
