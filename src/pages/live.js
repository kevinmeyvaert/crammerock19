// @flow

import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';

import { useLiveOnStage, useLineUpData } from '../hooks';
import { sortByTimeFn } from '../util';
import { Template, LineUpItem, Header } from '../components';

import styles from './styles/live.module.css';
import { config } from '../config';

const Live = () => {
  const artists = useLineUpData().sort(sortByTimeFn);
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
                  viewStyles={{ width: '100%' }}
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
                  viewStyles={{ width: '100%' }}
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
                  viewStyles={{ width: '100%' }}
                  key={liveOnStage.next.club.slug}
                  artist={liveOnStage.next.club}
                  isFilteredByDay
                  showDayInfo
                  showStageInfo
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
