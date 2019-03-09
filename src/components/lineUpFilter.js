// @flow

import React from 'react';

import styles from './styles/lineupfilter.module.css';

type TProps = {
  dagindeling: boolean,
  podiumIndeling: boolean,
  onFilterLineUp: Function,
  onFilterStage: Function,
  dayFilter: string | undefined,
  stageFilter: string | undefined,
}

const LineUpFilter = ({
  dagindeling,
  podiumIndeling,
  onFilterLineUp,
  onFilterStage,
  dayFilter,
  stageFilter,
}: TProps) => (
  <>
    {dagindeling && (
      <div className={styles.filterWrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp('ABC')}
          style={{ borderBottomStyle: dayFilter === undefined ? 'solid' : 'initial' }}
        >
          Overzicht A-Z
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp('Vrijdag')}
          style={{ borderBottomStyle: dayFilter === 'Vrijdag' ? 'solid' : 'initial' }}
        >
          Vrijdag
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp('Zaterdag')}
          style={{ borderBottomStyle: dayFilter === 'Zaterdag' ? 'solid' : 'initial' }}
        >
          Zaterdag
        </button>
      </div>
    )}
  </>
);

export default LineUpFilter;
