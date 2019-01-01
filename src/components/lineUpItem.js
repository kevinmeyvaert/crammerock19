// @flow

import React from 'react';
import Link from 'gatsby-link';

import Image from './image';
import { getTimeFromContentfulResponse } from '../util';

import type { TArtist } from '../types';

import styles from './styles/lineupitem.module.css';

type TProps = {
  artist: { node: TArtist },
  dayFilter: string | undefined,
  stageFilter: string | undefined,
  dagindeling: boolean,
}

const LineUpItem = ({
  artist,
  dayFilter,
  dagindeling,
  stageFilter,
}: TProps) => {
  const { node } = artist;
  return (
    <div className={styles.artistNode} key={node.slug}>
      <Link
        to={`/lineup/${node.slug}`}
      >
        <Image
          width={600}
          height={333}
          src={node.headerImage.file.url}
          alt={node.name}
        />
        <p>
          {node.name}
          {!dayFilter && dagindeling && ` | ${node.day}`}
          {dayFilter && stageFilter && ` | ${getTimeFromContentfulResponse(node.showStart)}`}
        </p>
      </Link>
    </div>
  );
};

export default LineUpItem;
