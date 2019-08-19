// @flow

import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { useLiveOnStage, useLineUpData } from '../hooks';
import { sortByTimeFn } from '../util';
import { Template, LineUpItem, Header } from '../components';

import styles from './styles/live.module.css';
import { config } from '../config';
import { useEnrichedLiveStream, LIVESTREAM_CONTENT_TYPE } from '../util/livefeed';

const renderLiveBlock = (item, index) => {
  console.log(item)
  if (LIVESTREAM_CONTENT_TYPE.INSTAGRAM) {
    return (
      <div className={styles.liveInstagramItem} key={index}>
        <a href={item.link}>
          <img src={item.image} className={styles.liveInstagramItemImg} />
        </a>
        <p className={styles.liveInstagramItemAuthor}>{item.author}</p>
        <p>{item.text}</p>
      </div>
    );
  }
  if (LIVESTREAM_CONTENT_TYPE.TWITTER) {
    return (
      <div className={styles.liveInstagramItem} key={index}>
        <div
          dangerouslySetInnerHTML={{
            __html: item.html,
          }}
        />
      </div>
    );
  }
  return <p>hey</p>;
};

const Live = props => {
  const { liveContent, title, headerImage } = get(
    props,
    'data.allContentfulLivestream.edges',
  )[0].node;
  const enrichedLiveStream = useEnrichedLiveStream(liveContent);
  const artists = useLineUpData().sort(sortByTimeFn);
  const liveOnStage = useLiveOnStage(artists);

  return (
    <Template>
      <Helmet title={`Live | ${config.siteName}`} />
      <Header title={title} image={headerImage.file.url} />
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
                  viewStyles={{ width: '100%', padding: '0' }}
                  key={liveOnStage.now.main.slug}
                  artist={liveOnStage.now.main}
                  isFilteredByDay
                  showDayInfo
                  showStageInfo
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
                  viewStyles={{ width: '100%', padding: '0' }}
                  key={liveOnStage.now.club.slug}
                  artist={liveOnStage.now.club}
                  isFilteredByDay
                  showDayInfo
                  showStageInfo
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
                  viewStyles={{ width: '100%', padding: '0' }}
                  key={liveOnStage.next.main.slug}
                  artist={liveOnStage.next.main}
                  isFilteredByDay
                  showDayInfo
                  showStageInfo
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
                  viewStyles={{ width: '100%', padding: '0' }}
                  key={liveOnStage.next.club.slug}
                  artist={liveOnStage.next.club}
                  isFilteredByDay
                  showDayInfo
                  showStageInfo
                />
              </div>
            )}
          </div>
          <h2>
            Crammerock 2019
            <span> Live Feed</span>
          </h2>
          <div className={styles.row}>
            {enrichedLiveStream.length > 0 ? enrichedLiveStream.map((item, index) => renderLiveBlock(item, index)) : null}
          </div>
        </div>
      )}
    </Template>
  );
};

export default Live;

export const pageQuery = graphql`
  query LiveQuery {
    allContentfulLivestream {
      edges {
        node {
          title
          headerImage {
            file {
              url
            }
          }
          liveContent {
            ... on ContentfulLiveInstagramPost {
              instagramPostUrl
              internal {
                type
              }
            }
            ... on ContentfulLiveTwitterPost {
              twitterPostUrl
              internal {
                type
              }
            }
          }
        }
      }
    }
  }
`;
