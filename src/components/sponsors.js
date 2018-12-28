// @flow

import React from 'react';

import SponsorItem from '../components/sponsorItem';

import styles from './styles/sponsors.module.css';
import type { TSponsor } from '../types';

type TProps = {
  sponsors: Array<TSponsor>
}

const Sponsors = ({
  sponsors,
}: TProps) => (
  <div className={styles.wrapper}>
    <div className={styles.row}>
      <div className={styles.sponsorRow}>
        {sponsors.map(sponsor => <SponsorItem className={styles.sponsorItem} {...sponsor.node} key={sponsor.node.sponsor} />)}
      </div>
    </div>
  </div>
);

export default Sponsors;
