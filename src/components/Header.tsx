import React from 'react';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="app-header">
      <h1>Instagram Profile Viewer</h1>
      <p>Viewing profile: @{username}</p>
    </header>
  );
};

export default Header;