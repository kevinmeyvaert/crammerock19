// @flow

import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import { getTimeFromContentfulResponse } from '../util';

import type { TArtist } from '../types';

import styles from './styles/lineupitem.module.css';

type TProps = {
  artist: { node: TArtist },
  dayFilter: string | undefined,
  stageFilter: string | undefined,
  dagindeling: boolean,
  podiumindeling: boolean,
}

const LineUpItem = ({
  artist,
  dayFilter,
  dagindeling,
  stageFilter,
  podiumindeling,
}: TProps) => {
  const { node } = artist;
  return (
    <div className={styles.artistNode} key={node.slug}>
      <Link
        to={`/lineup/${node.slug}`}
      >
        <div className={styles.image}>
          <Img
            alt={node.name}
            fluid={node.headerImage.fluid}
            style={{ position: 'initial' }}
          />
        </div>
        <div className={styles.description}>
          <p>{node.name}</p>
          <span>
            {!dayFilter && dagindeling && `${node.day}`}
            {dayFilter && podiumindeling && `${getTimeFromContentfulResponse(node.showStart)}`}
            {dagindeling && podiumindeling && (
              <span className={styles.stage}><br/>{node.stage}</span>
            )}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default LineUpItem;
