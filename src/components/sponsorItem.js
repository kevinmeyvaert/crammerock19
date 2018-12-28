// @flow

import React from 'react';
import type { TSponsor } from '../types';

import Image from './image';
import styles from './styles/sponsoritem.module.css';

const SponsorItem = ({
  website,
  logo,
  sponsor,
  imgSize = 400,
}: TSponsor) => (
  <div className={styles.container}>
    <a href={website} target="_blank" rel="noopener noreferrer">
      <span>{sponsor}</span>
      <Image width={imgSize} height={imgSize} src={logo ? logo.file.url : ''} alt={sponsor} className={styles.logo} />
    </a>
  </div>
);

export default SponsorItem;
