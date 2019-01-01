import { useEffect, useState } from 'react';
import { randomArrayValue } from '../util';

export const useRemoveServiceWorker = () => {
  useEffect(() => {
    if (typeof navigator !== 'undefined'
     && typeof navigator.serviceWorker !== 'undefined') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);
};

export const useGetRandomArtistInterval = (artists, interval) => {
  const [randomArtist, setRandomArtist] = useState(randomArrayValue(artists).node);

  useEffect(() => {
    const artistInterval = setInterval(
      () => setRandomArtist(randomArrayValue(artists).node),
      interval,
    );

    return () => clearInterval(artistInterval);
  }, []);

  return randomArtist;
};
