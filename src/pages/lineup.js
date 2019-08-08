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
  getTimeFromContentfulResponse,
  LINEUP_FILTERS,
} from '../util';
import { config } from '../config';
import { useRedirectIfNotAllowed, useLineUpData } from '../hooks';
import { timeSchedule, sortByArtistLevel } from '../util/lineupFormat';

const LineUp = props => {
  const [dayFilter, setDayFilter] = useState(undefined);
  const [stageFilter, setStageFilter] = useState(undefined);

  const handleFilter = (day, stage) => {
    setDayFilter(day);
    setStageFilter(stage);
  };
  const handleFilterLineUp = day =>
    day === LINEUP_FILTERS.ABC ? setDayFilter(undefined) : handleFilter(day, undefined);
  const handleFilterStage = stage =>
    stage === LINEUP_FILTERS.ALL ? setStageFilter(undefined) : setStageFilter(stage);
  const artistFilterFn = artist => {
    if (stageFilter && dayFilter) {
      return stageFilter === artist.stage && dayFilter === artist.day;
    }
    if (dayFilter) {
      return dayFilter === artist.day;
    }
    return artist;
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
          dagindeling={dagindeling}
          podiumIndeling={podiumIndeling}
          onFilterLineUp={handleFilterLineUp}
          onFilterStage={handleFilterStage}
          dayFilter={dayFilter}
          stageFilter={stageFilter}
        />
        <div className={styles.artistWrapper}>
          {dayFilter !== LINEUP_FILTERS.SCHEDULE &&
            artists.length > 0 &&
            artists.map(artist => (
              <LineUpItem
                key={artist.slug}
                artist={artist}
                dayFilter={dayFilter}
                dagindeling={dagindeling}
                podiumindeling={podiumIndeling}
                stageFilter={stageFilter}
              />
            ))}
        </div>
        {dayFilter === LINEUP_FILTERS.SCHEDULE &&
          Object.keys(timeScheduleData).map(day => (
            <div key={day} className={styles.tijdWrapper}>
              <h2>{day}</h2>
              <div className={styles.dayRow}>
                {Object.keys(timeScheduleData[day]).map(stage => (
                  <div key={day + stage} className={styles.stageColumn}>
                    <h3>{stage}</h3>
                    {timeScheduleData[day][stage].map(artist => (
                      <p key={artist.name}>
                        <strong>
                          {getTimeFromContentfulResponse(artist.showStart)} -{' '}
                          {getTimeFromContentfulResponse(artist.showEnd)}
                        </strong>{' '}
                        {artist.name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
