// @flow
/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import Link from 'gatsby-link';

import Image from './image';
import styles from './styles/header.module.css';
import { config } from '../config';

type THeaderProps = {
  title: string,
  subTitle?: string,
  image: string,
  video?: string,
  link?: string,
  cta?: string,
};

const renderVideoIfAvailable = (image: string, video?: string, title: string): React$Element<any> => {
  if (video) {
    return (
      <video
        src={video}
        className={styles.headerImage}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return <Image width={1640} height={628} src={image} alt={title} className={styles.headerImage} />;
};

const Header = ({
  title,
  subTitle,
  image = '/baseheader.jpg',
  video,
  link,
  cta,
}: THeaderProps) => (
  <header className={styles.header}>
    {renderVideoIfAvailable(image, video, title)}
    <Image width={500} height={500} src={image} alt={title} className={styles.mobileHeaderImage} />
    <div className={styles.bottomPaint} />

    <div className={styles.headerContent}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src="/cr_logo.png" className={styles.logo} alt={config.siteName} />
        </Link>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}><span>{title}</span></h1>
          <br />
          {subTitle && (subTitle.length > 0) && <h2 className={styles.subTitle}><span>{subTitle}</span></h2>}
        </div>
        <div>
          {cta && (cta.length > 0) && (
            <Link to={link}>
              <h3 className={styles.cta}>
                <span>{cta}</span>
              </h3>
            </Link>
          )
          }
        </div>
      </div>
    </div>

  </header>
);

export default Header;

Header.defaultProps = {
  video: undefined,
  subTitle: undefined,
  link: undefined,
  cta: undefined,
};
