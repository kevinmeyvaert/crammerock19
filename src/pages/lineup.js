// @flow

import React, { useState } from 'react';
import get from 'lodash/get';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Image from '../components/image';
import Header from '../components/header';
import Template from '../components/layout';
import LineUpFilter from '../components/lineUpFilter';

import styles from './styles/lineup.module.css';
import { randomArrayValue, getTimeFromContentfulResponse } from '../util';
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
          <LineUpFilter
            dagindeling={dagindeling}
            podiumIndeling={podiumIndeling}
            onFilterLineUp={handleFilterLineUp}
            onFilterStage={handleFilterStage}
            dayFilter={dayFilter}
            stageFilter={stageFilter}
          />
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
