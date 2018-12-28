import React from 'react';

import styles from './styles/lineupfilter.module.css';

const LineUpFilter = ({
  dagindeling,
  podiumIndeling,
  onFilterLineUp,
  onFilterStage,
  dayFilter,
  stageFilter,
}) => (
  <>
    {dagindeling && (
      <div className={styles.filterWrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterLineUp('ABC')}
          style={{ borderBottomStyle: dayFilter === undefined ? 'solid' : 'initial' }}
        >
          ABC
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
        <a href="/dl/timetable.pdf" target="_blank">
          <button type="button" className={styles.button}>Timetable (PDF)</button>
        </a>
      </div>
    )}
    {podiumIndeling
    && dayFilter && (
      <div className={styles.stageFilterWrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterStage('all')}
          style={{ borderBottomStyle: stageFilter === undefined ? 'solid' : 'initial' }}
        >
          Alle Podia
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterStage('Main South')}
          style={{ borderBottomStyle: stageFilter === 'Main South' ? 'solid' : 'initial' }}
        >
          Main South
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterStage('Main North')}
          style={{ borderBottomStyle: stageFilter === 'Main North' ? 'solid' : 'initial' }}
        >
          Main North
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onFilterStage('Club')}
          style={{ borderBottomStyle: stageFilter === 'Club' ? 'solid' : 'initial' }}
        >
          Club
        </button>
      </div>
    )}
  </>
);

export default LineUpFilter;
