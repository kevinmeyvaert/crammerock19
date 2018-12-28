// @flow

import React, { useState } from 'react';
import get from 'lodash/get';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Image from '../components/image';
import Header from '../components/header';
import Template from '../components/layout';

import styles from './styles/lineup.module.css';
import { randomArrayValue, getTimeFromContentfulResponse } from '../util';
import { config } from '../config';

const LineUp = (props) => {
  // State Hooks
  const [dayFilter, setDayFilter] = useState(undefined);
  const [stageFilter, setStageFilter] = useState(undefined);

  // State Manipulation Fn
  const setFilter = (day, stage) => {
    setDayFilter(day);
    setStageFilter(stage);
  };
  const onFilterLineUp = day => (day === 'ABC' ? setDayFilter(undefined) : setFilter(day, undefined));
  const onFilterStage = stage => (stage === 'all' ? setStageFilter(undefined) : setStageFilter(stage));

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
  const artists = get(props, 'data.allContentfulArtists.edges').filter(artistFilterFn);
  const settings = get(props, 'data.allContentfulSettings.edges');

  // Local consts
  const randomArtist = randomArrayValue(artists).node;
  const { lineuppagina, dagindeling, podiumIndeling } = settings[0].node;
  const artistArray = !dayFilter ? artists : artists.sort(sortByTimeFn);

  return lineuppagina && (
    <Template>
      <div>
        <Header
          title="Line-up"
          image={randomArtist.headerImage.file.url}
          video={(randomArtist.headerVideo && randomArtist.headerVideo.file.url) || null}
          link={`/lineup/${randomArtist.slug}`}
          cta={`Maak kennis met ${randomArtist.name}`}
        />
        <Helmet title={`Lineup | ${config.siteName}`} />
        <div className={styles.wrapper}>
          {dagindeling && (
            <div className={styles.filterWrapper}>
              <button type="button" className={styles.button} onClick={() => onFilterLineUp('ABC')} style={{ borderBottomStyle: dayFilter === undefined ? 'solid' : 'initial' }}>ABC</button>
              <button type="button" className={styles.button} onClick={() => onFilterLineUp('Vrijdag')} style={{ borderBottomStyle: dayFilter === 'Vrijdag' ? 'solid' : 'initial' }}>Vrijdag</button>
              <button type="button" className={styles.button} onClick={() => onFilterLineUp('Zaterdag')} style={{ borderBottomStyle: dayFilter === 'Zaterdag' ? 'solid' : 'initial' }}>Zaterdag</button>
              <a href="/dl/timetable.pdf" target="_blank"><button type="button" className={styles.button}>Timetable (PDF)</button></a>
            </div>
          )}
          {podiumIndeling
          && dayFilter && (
            <div className={styles.stageFilterWrapper}>
              <button type="button" className={styles.button} onClick={() => onFilterStage('all')} style={{ borderBottomStyle: stageFilter === undefined ? 'solid' : 'initial' }}>Alle Podia</button>
              <button type="button" className={styles.button} onClick={() => onFilterStage('Main South')} style={{ borderBottomStyle: stageFilter === 'Main South' ? 'solid' : 'initial' }}>Main South</button>
              <button type="button" className={styles.button} onClick={() => onFilterStage('Main North')} style={{ borderBottomStyle: stageFilter === 'Main North' ? 'solid' : 'initial' }}>Main North</button>
              <button type="button" className={styles.button} onClick={() => onFilterStage('Club')} style={{ borderBottomStyle: stageFilter === 'Club' ? 'solid' : 'initial' }}>Club</button>
            </div>
          )}
          <div className={styles.artistWrapper}>
            {artistArray.map((artist) => {
              const { node } = artist;
              return (
                <div className={styles.artistNode} key={node.slug}>
                  <Link
                    to={`/lineup/${node.slug}`}
                  >
                    <Image
                      width={600}
                      height={333}
                      src={node.headerImage.file.url}
                      alt={node.name}
                    />
                    <p>
                      {node.name}
                      {!dayFilter && dagindeling && ` | ${node.day}`}
                      {dayFilter && stageFilter && ` | ${getTimeFromContentfulResponse(node.showStart)}`}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default LineUp;

export const pageQuery = graphql`
  query LineUpQuery {
    allContentfulArtists(sort: { fields: [artistLevel, name], order: ASC }) {
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
