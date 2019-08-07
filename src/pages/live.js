// @flow

import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import moment from 'moment';

import { useLiveOnStage } from '../hooks';
import { sortByTimeFn } from '../util';
import { Template, LineUpItem, Header } from '../components';

import styles from './styles/live.module.css';
import { config } from '../config';

const Live = props => {
  const artistData = get(props, 'data.allContentfulArtists2019.edges');
  const artists = artistData.sort(sortByTimeFn);
  const liveOnStage = useLiveOnStage(artists);

  return (
    <Template>
      <Helmet title={`Live | ${config.siteName}`} />
      <Header title="Crammerock 2019 Live" />
      {liveOnStage && (
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <div className={styles.item}>
              <h2>
                On Stage
                <span>Main</span>
              </h2>
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
              ) : (
                <p>Momenteel speelt er niks.</p>
              )}
            </div>
            <div className={styles.item}>
              <h2>
                On Stage
                <span>Club</span>
              </h2>
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
              ) : (
                <p>Momenteel speelt er niks.</p>
              )}
            </div>
            {moment(liveOnStage.time).isBefore('2019-09-08T02:05+02:00') && (
              <div className={styles.item}>
                <h2>
                  Up Next
                  <span>Main</span>
                </h2>
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
                <h2>
                  Up Next
                  <span>Club</span>
                </h2>
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
            fluid(maxWidth: 800, maxHeight: 533, resizingBehavior: FILL, background: "rgb:000000") {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
