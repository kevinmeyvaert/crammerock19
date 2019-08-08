// @flow

import React from 'react';

import styles from './styles/lineupfilter.module.css';
import { LINEUP_FILTERS } from '../util'

type TProps = {
  dagindeling: boolean,
  onFilterLineUp: Function,
  dayFilter: string | undefined,
}

const LineUpFilter = ({
  dagindeling,
  onFilterLineUp,
  dayFilter,
}: TProps) => (
  <>
    {dagindeling && (
      <div className={styles.filterWrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp(LINEUP_FILTERS.ABC)}
          style={{ borderBottomStyle: dayFilter === LINEUP_FILTERS.ABC ? 'solid' : 'initial' }}
        >
          Overzicht A-Z
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp(LINEUP_FILTERS.FRIDAY)}
          style={{ borderBottomStyle: dayFilter === LINEUP_FILTERS.FRIDAY ? 'solid' : 'initial' }}
        >
          Vrijdag
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp(LINEUP_FILTERS.SATURDAY)}
          style={{ borderBottomStyle: dayFilter === LINEUP_FILTERS.SATURDAY ? 'solid' : 'initial' }}
        >
          Zaterdag
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp(LINEUP_FILTERS.SCHEDULE)}
          style={{ borderBottomStyle: dayFilter === LINEUP_FILTERS.SCHEDULE ? 'solid' : 'initial' }}
        >
          Tijdschema
        </button>
      </div>
    )}
  </>
);

export default LineUpFilter;
