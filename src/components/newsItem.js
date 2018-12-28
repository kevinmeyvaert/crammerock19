// @flow

import React from 'react';
import Link from 'gatsby-link';

import styles from './styles/newsitem.module.css';
import { ellipsis, removeHtmlTagsFromString } from '../util';

type TProps = {
  title: string,
  content: string,
  slug: string,
};

const NewsItem = ({
  title,
  content,
  slug,
}: TProps) => (
  <div className={styles.wrap}>
    <h2><span>{title}</span></h2>
    {ellipsis(removeHtmlTagsFromString(content), 250)}
    <p className={styles.leesmeer}><Link to={`/news/${slug}`}>Lees meer...</Link></p>
  </div>
);

export default NewsItem;
