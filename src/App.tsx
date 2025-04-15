import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import ProfileInfo from './components/ProfileInfo.tsx';
import ImageGrid from './components/ImageGrid.tsx';
import { fetchInstagramMedia, fetchInstagramProfile } from './services/instagramService.ts';
import { InstagramMedia, InstagramProfile } from './types/instagram.types';
import './styles.css';

const App: React.FC = () => {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const profileData = await fetchInstagramProfile();
        setProfile(profileData);
      } catch (err) {
        setError('Failed to load profile information. Please check your API credentials.');
        console.error(err);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    const loadMedia = async () => {
      try {
        setIsLoadingMedia(true);
        const mediaData = await fetchInstagramMedia();
        setMedia(mediaData);
      } catch (err) {
        setError('Failed to load media. Please check your API credentials.');
        console.error(err);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    loadProfile();
    loadMedia();
  }, []);

  return (
    <div className="app">
      <Header username={profile?.username || 'Loading...'} />
      
      {error && <div className="error-message">{error}</div>}
      
      <main>
        <ProfileInfo profile={profile} isLoading={isLoadingProfile} />
        <ImageGrid media={media} isLoading={isLoadingMedia} />
      </main>
    </div>
  );
};

export default App;