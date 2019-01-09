// @flow

import React from 'react';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import {
  Template,
  Header,
  NewsItem,
} from '../components';

import { ellipsis } from '../util';
import styles from './styles/index.module.css';

const RootIndex = (props) => {
  const news = get(props, 'data.allContentfulNews.edges');
  const headerData = news[0].node;
  return (
    <Template>
      <div>
        <Header
          title={ellipsis(headerData.title, 50)}
          image={headerData.featuredImage.file.url}
          link={`/news/${headerData.slug}`}
          cta="Lees meer"
        />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            {news.slice(1, 2).map(({ node }) => (
              <NewsItem
                title={node.title}
                content={node.post.childMarkdownRemark.html}
                slug={node.slug}
                key={node.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default RootIndex;

export const pageQuery = graphql`
  query RootIndexQuery {
    allContentfulNews(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          post {
            childMarkdownRemark {
              html
            }
          }
          publishDate(formatString: "MMMM Do, YYYY")
          featuredImage {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulSponsors(filter: {onHomepage: {eq: true }}) {
      edges {
        node {
          sponsor
          onHomepage
          logo {
            file {
              url
            }
          }
          website
        }
      }
    }
  }
`;
