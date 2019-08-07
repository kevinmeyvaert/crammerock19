// @flow

import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import moment from 'moment';

import {
  Template,
  LineUpItem,
  Header,
} from '../components';

import styles from './styles/live.module.css';
import { config } from '../config';

const useLiveOnStage = (artists) => {
  const [time, setTime] = useState(moment());
  const nowDay = time.format('dddd');
  const [liveOnStage, setLiveOnStage] = useState();
  const mainArtists = artists.filter(({ node: artist }) => artist.stage.startsWith('Main'));
  const clubArtists = artists.filter(({ node: artist }) => artist.stage === 'Club');
  
  const getNodeFn = playingArtist => playingArtist && playingArtist.node;
  const findStageFn = (artist, stage) => (artist && artist.stage === stage) || (artist && artist.stage.startsWith(stage));

  useEffect(() => {
    const timer = setInterval(() => setTime(moment()), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nowPlaying = artists.filter(({ node: artist }) => time.isBetween(artist.showStart, artist.showEnd, null, '[]'));
    const nextPlaying = nowPlaying.map(({ node: artistNow }) => {
      const stageList = artistNow.stage === 'Club' ? clubArtists : mainArtists;
      const nowPlayingIndex = stageList.findIndex(({ node: item }) => item.name === artistNow.name);
      return stageList[nowPlayingIndex + 1];
    });

    setLiveOnStage({
      time,
      now: {
        club: nowPlaying.map(getNodeFn).find(a => findStageFn(a, 'Club')) || null,
        main: nowPlaying.map(getNodeFn).find(a => findStageFn(a, 'Main')) || null,
      },
      next: {
        club: nextPlaying.map(getNodeFn).find(a => findStageFn(a, 'Club')) || (nowDay === 'Friday' ? { ...clubArtists[0].node } : { ...clubArtists[8].node }),
        main: nextPlaying.map(getNodeFn).find(a => findStageFn(a, 'Main')) || (nowDay === 'Friday' ? { ...mainArtists[0].node } : { ...mainArtists[12].node }),
      },
    });
  }, [time]);

  return liveOnStage;
};

const Live = (props) => {
  const sortByTimeFn = (artistA, artistB) => new Date(artistA.node.showStart) - new Date(artistB.node.showStart);
  const artistData = get(props, 'data.allContentfulArtists2019.edges');
  const artists = artistData.sort(sortByTimeFn);
  const liveOnStage = useLiveOnStage(artists);

  return (
    <Template>
      <Helmet title={`Live | ${config.siteName}`} />
      <Header
        title="Crammerock 2019 Live"
      />
      {liveOnStage && (
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.item}>
            <h2>On Stage <span>Main</span></h2>
            {liveOnStage.now.main ? (
              <LineUpItem
                viewStyles={{ width: '100%' }}
                key={liveOnStage.now.main.slug}
                artist={{ node: liveOnStage.now.main }}
                dayFilter
                dagindeling
                podiumindeling
                stageFilter
              />
            ) : (<p>Momenteel speelt er niks.</p>)}
          </div>
          <div className={styles.item}>
            <h2>On Stage <span>Club</span></h2>
            {liveOnStage.now.club ? (
              <LineUpItem
                viewStyles={{ width: '100%' }}
                key={liveOnStage.now.club.slug}
                artist={{ node: liveOnStage.now.club }}
                dayFilter
                dagindeling
                podiumindeling
                stageFilter
              />
            ) : (<p>Momenteel speelt er niks.</p>)}
          </div>
          {moment(liveOnStage.time).isBefore('2019-09-08T02:05+02:00') && (
          <div className={styles.item}>
            <h2>Up Next <span>Main</span></h2>
            <LineUpItem
              viewStyles={{ width: '100%' }}
              key={liveOnStage.next.main.slug}
              artist={{ node: liveOnStage.next.main }}
              dayFilter
              dagindeling
              podiumindeling
              stageFilter
            />
          </div>
          )}
          {moment(liveOnStage.time).isBefore('2019-09-08T01:00+02:00') && (
          <div className={styles.item}>
            <h2>Up Next <span>Club</span></h2>
            <LineUpItem
              viewStyles={{ width: '100%' }}
              key={liveOnStage.next.club.slug}
              artist={{ node: liveOnStage.next.club }}
              dayFilter
              dagindeling
              podiumindeling
              stageFilter
            />
          </div>
          )}
        </div>
      </div>
      )}
    </Template>
  );
};

export default Live;

export const pageQuery = graphql`
  query LiveQuery {
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
`;
