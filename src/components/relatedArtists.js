// @flow

import React from 'react';
import Link from 'gatsby-link';

import styles from './styles/relatedartists.module.css';
import type { TArtist } from '../types';

type TProps = {
  artists: Array<TArtist>,
};

const RelatedArtists = ({
  artists,
}: TProps) =>
  (
    <div>
      {artists.map(artist => (
        <div key={artist.slug}>
          <Link to={`/lineup/${artist.slug}`}>
            <img src={`${artist.headerImage.file.url}?w=400&h=250&fit=fill`} alt={artist.name} className={styles.relatedImage} />
          </Link>
          <p>{artist.name}</p>
        </div>
      ))}
    </div>
  );

export default RelatedArtists;
