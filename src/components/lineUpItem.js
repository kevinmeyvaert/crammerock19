// @flow

import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import { getTimeFromContentfulResponse } from '../util';

import type { TArtist } from '../types';

import styles from './styles/lineupitem.module.css';

type TProps = {
  artist: TArtist,
  isFilteredByDay: boolean,
  showDayInfo: boolean,
  showStageInfo: boolean,
  viewStyles: { [key: string]: string },
};

const LineUpItem = ({
  artist,
  isFilteredByDay,
  showDayInfo,
  showStageInfo,
  viewStyles,
}: TProps) => (
  <div className={styles.artistNode} key={artist.slug} style={viewStyles}>
    <Link to={`/lineup/${artist.slug}`}>
      <div className={styles.image}>
        <Img alt={artist.name} fluid={artist.headerImage.fluid} style={{ position: 'initial' }} />
      </div>
      <div className={styles.description}>
        <p>{artist.name}</p>
        <span>
          {!isFilteredByDay && showDayInfo && `${artist.day}`}
          {isFilteredByDay && showStageInfo && `${getTimeFromContentfulResponse(artist.showStart)}`}
          {showDayInfo && showStageInfo && (
            <span className={styles.stage}>
              <br />
              {artist.stage}
            </span>
          )}
        </span>
      </div>
    </Link>
  </div>
);

export default LineUpItem;
