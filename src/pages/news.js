// @flow

import React, { useState } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './styles/news.module.css';

import { Template, Header, NewsItem } from '../components';

import { ellipsis } from '../util';
import { config } from '../config';

const NewsIndex = (props) => {
  const [posts, setPosts] = useState(get(props, 'data.allContentfulNews.edges').slice(1, 7));
  const latestPost = get(props, 'data.allContentfulNews.edges')[0].node;
  return (
    <Template>
      <Header
        title={ellipsis(latestPost.title, 50)}
        image={latestPost.featuredImage.file.url}
        link={`/news/${latestPost.slug}`}
        cta="Lees meer"
      />
      <Helmet title={`Nieuws | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <div className={styles.row}>
          {posts.map(({ node }) => (
            <NewsItem
              title={node.title}
              content={node.post.childMarkdownRemark.html}
              slug={node.slug}
              key={node.slug}
              date={node.publishDate}
            />
          ))}
        </div>
        {Object.keys(posts).length <= 6 && (
          <button
            type="button"
            className={styles.showAll}
            onClick={() => setPosts(get(props, 'data.allContentfulNews.edges').slice(1))}
          >
            Toon oudere berichten
          </button>
        )}
      </div>
    </Template>
  );
};

export default NewsIndex;

export const pageQuery = graphql`
  query NewsIndexQuery {
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
  }
`;
