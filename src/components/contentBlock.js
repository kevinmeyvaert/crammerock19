// @flow
// This component is IE11 Proof! 🔥

import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import Image from './image';

import styles from './styles/contentBlock.module.css';

type TProps = {
  link?: string,
  externalLink?: string,
  title?: string,
  subTitle?: string,
  contentfulImage?: string,
  image?: string,
  fluidImage?: string,
}

const ContentBlock = ({
  link,
  externalLink,
  title,
  subTitle,
  contentfulImage,
  fluidImage,
  image,
}: TProps) => {
  const renderBlock = () => (
    <div className={styles.contentBlock}>
      <div className={styles.innerBorder}>
        <h2><span>{title}</span></h2>
        {subTitle ? <h3><span>{subTitle}</span></h3> : null}
      </div>
      {fluidImage ? (
        <Img
          alt={title}
          fluid={fluidImage}
          style={{ position: 'initial' }}
        />
      ) : null}
      {contentfulImage
        ? <Image width={800} height={333} src={contentfulImage} alt={title} />
        : null}
      {image ? <img src={image} width="800" alt={title} /> : null}
    </div>
  );

  if (link) {
    return (
      <div className={styles.contentBlockWrap}>
        <Link to={`${link}`}>
          {renderBlock()}
        </Link>
      </div>
    );
  }
  if (externalLink) {
    return (
      <div className={styles.contentBlockWrap}>
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          {renderBlock()}
        </a>
      </div>
    );
  }
  return (
    <div className={styles.contentBlockWrap}>
      {renderBlock()}
    </div>
  );
};

ContentBlock.defaultProps = {
  contentfulImage: undefined,
  externalLink: undefined,
  image: undefined,
  link: undefined,
  title: undefined,
  subTitle: undefined,
  fluidImage: undefined,
}

export default ContentBlock;
