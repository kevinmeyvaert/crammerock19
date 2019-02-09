// @flow

import React from 'react';
import Link from 'gatsby-link';

import styles from './styles/newsitem.module.css';
import { ellipsis, removeHtmlTagsFromString } from '../util';

type TProps = {
  title: string,
  content: string,
  slug: string,
  date: string,
};

const NewsItem = ({
  title,
  content,
  slug,
  date,
}: TProps) => (
  <div className={styles.wrap}>
    <Link to={`/news/${slug}`}><h2><span>{title}</span></h2></Link>
    <p className={styles.date}>{`Geplaatst op ${date}.`}</p>
    {ellipsis(removeHtmlTagsFromString(content), 250)}
    <p className={styles.leesmeer}><Link to={`/news/${slug}`}>Lees meer...</Link></p>
  </div>
);

export default NewsItem;
