// @flow

import { useEffect, useState } from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';

import { randomArrayValue, STAGES, DAYS } from '../util';
import type { TArtist } from '../types';

export const useRemoveServiceWorker = () => {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.serviceWorker !== 'undefined') {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);
};

export const useGetRandomArtistInterval = (artists: TArtist[], interval: number): TArtist => {
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

export const useRedirectIfNotAllowed = (isAllowed?: ?boolean) => {
  useEffect(() => {
    if (!isAllowed && typeof window !== 'undefined') {
      navigate('/');
    }
  }, []);
};

export const useLiveOnStage = (artists: TArtist[]) => {
  const [time, setTime] = useState(moment());
  const nowDay = time.format('dddd');
  const [liveOnStage, setLiveOnStage] = useState();
  const mainArtists = artists.filter((artist) => artist.stage.startsWith('Main'));
  const clubArtists = artists.filter((artist) => artist.stage === STAGES.CLUB);
  const findStageFn = (artist, stage) =>
    (artist && artist.stage === stage) || (artist && artist.stage.startsWith(stage));

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nowPlaying = artists.filter((artist) =>
      time.isBetween(artist.showStart, artist.showEnd, null, '[]'),
    );
    const nextPlaying = nowPlaying.map((artistNow) => {
      const stageList = artistNow.stage === STAGES.CLUB ? clubArtists : mainArtists;
      const nowPlayingIndex = stageList.findIndex((item) => item.name === artistNow.name);
      return stageList[nowPlayingIndex + 1];
    });

    setLiveOnStage({
      time,
      now: {
        club: nowPlaying.find(a => findStageFn(a, STAGES.CLUB)) || null,
        main: nowPlaying.find(a => findStageFn(a, 'Main')) || null,
      },
      next: {
        club:
          nextPlaying.find(a => findStageFn(a, STAGES.CLUB)) ||
          (nowDay === DAYS.EN.FRIDAY ? { ...clubArtists[0] } : { ...clubArtists[8] }),
        main:
          nextPlaying.find(a => findStageFn(a, 'Main')) ||
          (nowDay === DAYS.EN.FRIDAY ? { ...mainArtists[0] } : { ...mainArtists[12] }),
      },
    });
  }, [time]);

  return liveOnStage;
};

export const useLineUpData = (): TArtist[] => {
  const data = useStaticQuery(
    graphql`
      query SiteMetaData {
        allContentfulArtists2019(sort: { fields: [artistLevel, name], order: ASC }) {
          edges {
            node {
              name
              slug
              day
              stage
              showStart
              showEnd
              artistLevel
              headerImage {
                file {
                  url
                }
                fluid(
                  maxWidth: 800
                  maxHeight: 533
                  resizingBehavior: FILL
                  background: "rgb:000000"
                ) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    `,
  );
  return data.allContentfulArtists2019.edges.map(({ node: artist }) => artist);
};
