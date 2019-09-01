// @flow

import React from 'react';

import styles from './styles/lineupfilter.module.css';
import { LINEUP_FILTERS } from '../util';
import type { TLineUpFilters } from '../util';

type TProps = {
  showDayInfo: boolean,
  onFilterLineUp: (filter: TLineUpFilters) => void,
  dayFilter: TLineUpFilters,
};

const FILTERS = Object.freeze({
  [LINEUP_FILTERS.ABC]: 'Overzicht A-Z',
  [LINEUP_FILTERS.FRIDAY]: 'Vrijdag',
  [LINEUP_FILTERS.SATURDAY]: 'Zaterdag',
  [LINEUP_FILTERS.SCHEDULE]: 'Tijdschema',
});

const LineUpFilter = ({ showDayInfo, onFilterLineUp, dayFilter }: TProps) => (
  <>
    <div className={styles.filterWrapper}>
      {showDayInfo &&
        Object.keys(FILTERS).map(filter => (
          <button
            type="button"
            className={styles.button}
            onClick={() => onFilterLineUp(filter)}
            style={{ borderBottomStyle: dayFilter === filter ? 'solid' : 'initial' }}
          >
            {FILTERS[filter]}
          </button>
        ))}
    </div>
  </>
);

export default LineUpFilter;
