// @flow

import React, { useState } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import { Template, Header, LineUpFilter, LineUpItem } from '../components';

import styles from './styles/lineup.module.css';
import {
  randomArrayValue,
  getSettings,
  LINEUP_FILTERS,
} from '../util';
import { config } from '../config';
import { useRedirectIfNotAllowed, useLineUpData } from '../hooks';
import { timeSchedule, sortByArtistLevel } from '../util/lineupFormat';
import TimeSchedule from '../components/timeSchedule';

const LineUp = props => {
  const [dayFilter, setDayFilter] = useState(LINEUP_FILTERS.ABC);
  const handleFilterLineUp = day => setDayFilter(day);
  const artistFilterFn = artist => {
    if (dayFilter !== LINEUP_FILTERS.ABC) {
      return dayFilter === artist.day;
    }
    return true;
  };

  const artistData = useLineUpData();
  const randomArtist = randomArrayValue(artistData);
  const timeScheduleData = timeSchedule(artistData);
  const artists = artistData.filter(artistFilterFn).sort(sortByArtistLevel);
  const settings = get(props, 'data.allContentfulSettings.edges');
  const { lineuppagina, dagindeling, podiumIndeling } = getSettings(settings[0].node);

  // redirect to homepage if page is disabled
  useRedirectIfNotAllowed(lineuppagina);

  return lineuppagina ? (
    <Template>
      <Header
        title="Line-up"
        image={randomArtist.headerImage.file.url}
        video={(randomArtist.headerVideo && randomArtist.headerVideo.file.url) || null}
        link={`/lineup/${randomArtist.slug}`}
        cta={`Maak kennis met ${randomArtist.name}`}
      />
      <Helmet title={`Lineup | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <LineUpFilter
          showDayInfo={dagindeling}
          onFilterLineUp={handleFilterLineUp}
          dayFilter={dayFilter}
        />
        <a href="/blokkenschema2019.pdf" className={styles.blokkenschema} target="_blank">Blokkenschema</a>
        <div className={styles.artistWrapper}>
          {dayFilter !== LINEUP_FILTERS.SCHEDULE &&
            artists.length > 0 &&
            artists.map(artist => (
              <LineUpItem
                key={artist.slug}
                artist={artist}
                isFilteredByDay={!!dayFilter}
                showDayInfo={dagindeling}
                showStageInfo={podiumIndeling}
              />
            ))}
        </div>
        {dayFilter === LINEUP_FILTERS.SCHEDULE && (
          <TimeSchedule timeScheduleData={timeScheduleData} />
        )}
      </div>
    </Template>
  ) : null;
};

export default LineUp;

export const pageQuery = graphql`
  query LineUpQuery {
    allContentfulSettings(filter: { titel: { eq: "Global" } }) {
      edges {
        node {
          lineuppagina
          dagindeling
          podiumIndeling
        }
      }
    }
  }
`;
