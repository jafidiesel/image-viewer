import React from 'react';
import { InstagramProfile } from '../types/instagram.types';

interface ProfileInfoProps {
  profile: InstagramProfile | null;
  isLoading: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, isLoading }) => {
  if (isLoading) {
    return <div className="profile-info loading">Loading profile info...</div>;
  }

  if (!profile) {
    return <div className="profile-info error">Could not load profile information</div>;
  }

  return (
    <div className="profile-info">
      <h2>@{profile.username}</h2>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-count">{profile.media_count}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-label">Account Type: {profile.account_type}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;