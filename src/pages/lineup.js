// @flow

import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql, navigate } from 'gatsby';

import {
  Template,
  Header,
  LineUpFilter,
  LineUpItem,
} from '../components';

import styles from './styles/lineup.module.css';
import { randomArrayValue } from '../util';
import { config } from '../config';

const LineUp = (props) => {
  // State Hooks
  const [dayFilter, setDayFilter] = useState(undefined);
  const [stageFilter, setStageFilter] = useState(undefined);

  // State Manipulation Fn
  const handleFilter = (day, stage) => {
    setDayFilter(day);
    setStageFilter(stage);
  };
  const handleFilterLineUp = day => (day === 'ABC' ? setDayFilter(undefined) : handleFilter(day, undefined));
  const handleFilterStage = stage => (stage === 'all' ? setStageFilter(undefined) : setStageFilter(stage));

  // Local helper Fn
  const artistFilterFn = (artist) => {
    if (stageFilter && dayFilter) {
      return stageFilter === artist.node.stage && dayFilter === artist.node.day;
    }
    if (dayFilter) {
      return dayFilter === artist.node.day;
    }
    return artist;
  };
  const sortByTimeFn = (artistA, artistB) => new Date(artistA.node.showStart) - new Date(artistB.node.showStart);

  // Contentful data
  const artists = get(props, 'data.allContentfulArtists2018.edges').filter(artistFilterFn);
  const settings = get(props, 'data.allContentfulSettings.edges');

  // Local consts
  const randomArtist = randomArrayValue(artists).node;
  // TODO: lineuppagina get from settings[0]?node
  const lineuppagina = true;
  const { dagindeling, podiumIndeling } = settings[0].node;
  const artistArray = !dayFilter ? artists : artists.sort(sortByTimeFn);

  useEffect(() => {
    if (!lineuppagina && typeof window !== 'undefined') {
      navigate('/');
    }
  }, []);

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
          {artistArray.map(artist => (
            <LineUpItem
              key={artist.node.slug}
              artist={artist}
              dayFilter={dayFilter}
              dagindeling={dagindeling}
              stageFilter={stageFilter}
            />
          ))}
        </div>
      </div>
    </Template>
  ) : null;
};

export default LineUp;

export const pageQuery = graphql`
  query LineUpQuery {
    allContentfulArtists2018(sort: { fields: [artistLevel, name], order: ASC }) {
      edges {
        node {
          name
          slug
          day
          stage
          showStart
          artistLevel
          headerImage {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulSettings(filter: { titel: { eq: "Global" } }){
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
