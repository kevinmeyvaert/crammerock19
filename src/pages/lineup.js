// @flow

import React from 'react';
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

class LineUp extends React.Component {
  state = {
    filter: undefined,
    stageFilter: undefined,
  };

  onFilterLineUp = day => (day === 'ABC' ? this.setState({ filter: undefined }) : this.setState({ filter: day, stageFilter: undefined }));

  onFilterStage = stage => (stage === 'all' ? this.setState({ stageFilter: undefined }) : this.setState({ stageFilter: stage }));

  filterArtist = (artist) => {
    const { filter, stageFilter } = this.state;
    if (stageFilter && filter) {
      return stageFilter === artist.node.stage && filter === artist.node.day;
    }
    if (filter) {
      return filter === artist.node.day;
    }
    return artist;
  }

  sortByTime = (artistA, artistB) => new Date(artistA.node.showStart) - new Date(artistB.node.showStart);

  render() {
    const { filter, stageFilter } = this.state;
    const artists = get(this, 'props.data.allContentfulArtists.edges').filter(this.filterArtist);
    const settings = get(this, 'props.data.allContentfulSettings.edges');
    const randomArtist = randomArrayValue(artists).node;
    const { lineuppagina, dagindeling, podiumIndeling } = settings[0].node;

    const artistArray = !filter ? artists : artists.sort(this.sortByTime);

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
                <button type="button" className={styles.button} onClick={() => this.onFilterLineUp('ABC')} style={{ borderBottomStyle: filter === undefined ? 'solid' : 'initial' }}>ABC</button>
                <button type="button" className={styles.button} onClick={() => this.onFilterLineUp('Vrijdag')} style={{ borderBottomStyle: filter === 'Vrijdag' ? 'solid' : 'initial' }}>Vrijdag</button>
                <button type="button" className={styles.button} onClick={() => this.onFilterLineUp('Zaterdag')} style={{ borderBottomStyle: filter === 'Zaterdag' ? 'solid' : 'initial' }}>Zaterdag</button>
                <a href="/dl/timetable.pdf" target="_blank"><button type="button" className={styles.button}>Timetable (PDF)</button></a>
              </div>
            )}
            {podiumIndeling
            && filter && (
              <div className={styles.stageFilterWrapper}>
                <button type="button" className={styles.button} onClick={() => this.onFilterStage('all')} style={{ borderBottomStyle: stageFilter === undefined ? 'solid' : 'initial' }}>Alle Podia</button>
                <button type="button" className={styles.button} onClick={() => this.onFilterStage('Main South')} style={{ borderBottomStyle: stageFilter === 'Main South' ? 'solid' : 'initial' }}>Main South</button>
                <button type="button" className={styles.button} onClick={() => this.onFilterStage('Main North')} style={{ borderBottomStyle: stageFilter === 'Main North' ? 'solid' : 'initial' }}>Main North</button>
                <button type="button" className={styles.button} onClick={() => this.onFilterStage('Club')} style={{ borderBottomStyle: stageFilter === 'Club' ? 'solid' : 'initial' }}>Club</button>
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
                        {!filter && dagindeling && ` | ${node.day}`}
                        {filter && stageFilter && ` | ${getTimeFromContentfulResponse(node.showStart)}`}
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
  }
}

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
