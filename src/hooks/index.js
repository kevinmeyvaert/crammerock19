// @flow

import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import moment from 'moment';

import { randomArrayValue, STAGES, DAYS } from '../util';

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

export const useRedirectIfNotAllowed = (isAllowed: boolean) => {
  useEffect(() => {
    if (!isAllowed && typeof window !== 'undefined') {
      navigate('/');
    }
  }, []);
};

export const useLiveOnStage = (artists) => {
  const [time, setTime] = useState(moment());
  const nowDay = time.format('dddd');
  const [liveOnStage, setLiveOnStage] = useState();
  const mainArtists = artists.filter(({ node: artist }) => artist.stage.startsWith('Main'));
  const clubArtists = artists.filter(({ node: artist }) => artist.stage === STAGES.CLUB);
  
  const getNodeFn = playingArtist => playingArtist && playingArtist.node;
  const findStageFn = (artist, stage) => (artist && artist.stage === stage) || (artist && artist.stage.startsWith(stage));

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nowPlaying = artists.filter(({ node: artist }) => time.isBetween(artist.showStart, artist.showEnd, null, '[]'));
    const nextPlaying = nowPlaying.map(({ node: artistNow }) => {
      const stageList = artistNow.stage === STAGES.CLUB ? clubArtists : mainArtists;
      const nowPlayingIndex = stageList.findIndex(({ node: item }) => item.name === artistNow.name);
      return stageList[nowPlayingIndex + 1];
    });

    setLiveOnStage({
      time,
      now: {
        club: nowPlaying.map(getNodeFn).find(a => findStageFn(a, STAGES.CLUB)) || null,
        main: nowPlaying.map(getNodeFn).find(a => findStageFn(a, 'Main')) || null,
      },
      next: {
        club: nextPlaying.map(getNodeFn).find(a => findStageFn(a, STAGES.CLUB)) || (nowDay === DAYS.FRIDAY ? { ...clubArtists[0].node } : { ...clubArtists[8].node }),
        main: nextPlaying.map(getNodeFn).find(a => findStageFn(a, 'Main')) || (nowDay === DAYS.FRIDAY ? { ...mainArtists[0].node } : { ...mainArtists[12].node }),
      },
    });
  }, [time]);

  return liveOnStage;
};
