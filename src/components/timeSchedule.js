// @flow

import React from 'react';

import styles from './styles/timeSchedule.module.css';
import { getTimeFromContentfulResponse } from '../util';

type TProps = {
  timeScheduleData: any,
};

const TimeSchedule = ({ timeScheduleData }: TProps) =>
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
  ));

export default TimeSchedule;
