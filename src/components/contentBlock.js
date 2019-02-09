// @flow
// This component is IE11 Proof! 🔥

import React from 'react';
import Link from 'gatsby-link';

import Image from './image';

import styles from './styles/contentBlock.module.css';

type TProps = {
  link: string,
  externalLink: string,
  title: string,
  contentfulImage: string,
  image: string,
}

const ContentBlock = ({
  link,
  externalLink,
  title,
  contentfulImage,
  image,
}: TProps) => {
  const renderBlock = () => (
    <div className={styles.contentBlock}>
      <div className={styles.innerBorder}>
        <h2><span>{title}</span></h2>
      </div>
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

export default ContentBlock;
