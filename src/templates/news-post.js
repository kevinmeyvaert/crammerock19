// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import styles from './styles/news-post.module.css';
import Header from '../components/header';
import { ellipsis } from '../util';
import Template from '../components/layout';
import { config } from '../config';

const NewsPostTemplate = (props) => {
  const post = get(props, 'data.contentfulNews');
  return (
    <Template>
      <div style={{ background: '#fff' }}>
        <Header
          title={ellipsis(post.title, 50)}
          image={post.featuredImage.file.url}
        />
        <Helmet title={`${post.title} | ${config.siteName}`}>
          <meta property="og:type" content="website" />
          <meta property="og:image" content={post.featuredImage.file.url} />
          <meta property="og:title" content={`${post.title} | ${config.siteName}`} />
          <meta property="og:url" content={`https://crammerock.be/nieuws/${post.slug}`} />
          <meta property="og:site_name" content="Crammerock.be" />
        </Helmet>
        <div className={styles.wrapper}>
          <div
            dangerouslySetInnerHTML={{
              __html: post.post.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
    </Template>
  );
};

export default NewsPostTemplate;

export const pageQuery = graphql`
  query NewsBySlug($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      title
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      featuredImage {
        file {
          url
        }
      }
      post {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
