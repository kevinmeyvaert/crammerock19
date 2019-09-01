// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header, ContentBlock } from '../components';

import styles from './styles/news-post.module.css';

import { ellipsis } from '../util';
import { config } from '../config';

const NewsPostTemplate = props => {
  const post = get(props, 'data.contentfulNews');
  return (
    <Template>
      <Header title={ellipsis(post.title, 50)} image={post.featuredImage.file.url} />
      <Helmet title={`${post.title} | ${config.siteName}`}>
        <meta property="og:type" content="website" />
        <meta property="og:image" content={post.featuredImage.file.url} />
        <meta property="og:title" content={`${post.title} | ${config.siteName}`} />
        <meta property="og:url" content={`https://crammerock.be/nieuws/${post.slug}`} />
        <meta property="og:site_name" content="Crammerock.be" />
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <p className={styles.published}>
          {`Gepubliceerd op ${post.publishDate}.`}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.post.childMarkdownRemark.html,
            }}
          />
        </div>
        {post.relatedNews.length > 0 ? (
          <>
            <h2 className={styles.related}>Ander nieuws</h2>
            <div className={styles.relatedInfoRow}>
              {post.relatedNews.map(newsItem => (
                <ContentBlock
                  key={newsItem.slug}
                  link={`/news/${newsItem.slug}`}
                  title={
                    typeof window !== 'undefined' && window.innerWidth > 730
                      ? newsItem.title
                      : ellipsis(newsItem.title, 30)
                  }
                  subTitle={newsItem.publishDate}
                  fluidImage={newsItem.featuredImage.fluid}
                />
              ))}
            </div>
          </>
        ) : null}
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
      publishDate(formatString: "DD/MM/YYYY")
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
      relatedNews {
        title
        slug
        publishDate(formatString: "DD/MM/YYYY")
        featuredImage {
          fluid(maxWidth: 800, maxHeight: 333, resizingBehavior: FILL, background: "rgb:000000") {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`;
