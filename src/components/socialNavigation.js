import React from 'react';
import { config } from '../config';

import styles from './styles/socialnavigation.module.css';

const SocialNavigation = () => {

  return (
    <ul style={{
      backgroundColor: '#304A5E',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin: '0',
      padding: '10px 20px 10px',
    }}
    >
      <li className={styles.navigationItem}>
        <a href={config.facebookUrl}>
          <img src="/facebook.svg" className={styles.icon} alt="Facebook" />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href={config.twitterUrl}>
          <img src="/twitter.svg" className={styles.icon} alt="Twitter" />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href={config.instagramUrl}>
          <img src="/instagram.svg" className={styles.icon} alt="Instagram" />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href={config.snapchatUrl}>
          <img src="/snapchat.svg" className={styles.icon} alt="Snapchat" />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href={config.spotifyUrl}>
          <img src="/spotify.svg" className={styles.icon} alt="Spotify" />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href={config.youtubeUrl}>
          <img src="/youtube.svg" className={styles.icon} alt="Youtube" />
        </a>
      </li>
    </ul>
  );
};

export default SocialNavigation;
