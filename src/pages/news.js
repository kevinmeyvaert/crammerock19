// @flow

import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './styles/news.module.css';
import Header from '../components/header';
import NewsItem from '../components/newsItem';
import Template from '../components/layout';

import { ellipsis } from '../util';

const NewsIndex = (props) => {
  const posts = get(props, 'data.allContentfulNews.edges');
  const latestPost = posts[0].node;
  return (
    <Template>
      <div style={{ background: '#fff' }}>
        <Header
          title={ellipsis(latestPost.title, 50)}
          image={latestPost.featuredImage.file.url}
          link={`/news/${latestPost.slug}`}
          cta="Lees meer"
        />
        <Helmet title="Nieuws | Crammerock 2019" />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            {posts.map(({ node }) => (
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