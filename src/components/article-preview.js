// @flow

import React from 'react';
import Link from 'gatsby-link';
import styles from './styles/article-preview.module.css';
import type { TNews } from '../types';

export default ({ article }: { article: TNews }) => (
  <div className={styles.preview}>
    <img src={`${article.featuredImage.file.url}?fit=scale&w=350&h=196`} alt="" />
    <h3 className={styles.previewTitle}>
      <Link to={`/news/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.post.childMarkdownRemark.html,
      }}
    />
  </div>
);
