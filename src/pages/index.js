// @flow

import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import {
  Template,
  Header,
  NewsItem,
  Image,
} from '../components';

import { ellipsis } from '../util';
import styles from './styles/index.module.css';
import type { TArtist } from '../types';
import { useGetRandomArtistInterval } from '../hooks';

const RootIndex = (props) => {
  const artists = get(props, 'data.allContentfulArtists.edges');
  const news = get(props, 'data.allContentfulNews.edges');
  const headerData = news[0].node;
  const randomArtist: TArtist = useGetRandomArtistInterval(artists, 5000);
  return (
    <Template>
      <Header
        title={ellipsis(headerData.title, 50)}
        image={headerData.featuredImage.file.url}
        link={`/news/${headerData.slug}`}
        cta="Lees meer"
      />
      <div className={styles.wrapper}>
        <div className={styles.row}>
          {news.slice(1, 2).map(({ node }) => (
            <Link to={`/news/${node.slug}`}>
              <div className={styles.indexItem}>
                <Image width={800} height={333} src={node.featuredImage.file.url} alt={node.title} />
                <h2><span>{node.title}</span></h2>
              </div>
            </Link>
          ))}
          <Link to={`/lineup/${randomArtist.slug}`}>
            <div className={styles.indexItem}>
              <Image width={800} height={333} src={randomArtist.headerImage.file.url} alt={randomArtist.name} />
              <h2><span>{randomArtist.name}</span></h2>
            </div>
          </Link>
          <a href="https://www.facebook.com/Crammerock/videos/1549510151819448/" target="_blank" rel="noopener noreferrer">
            <div className={styles.indexItem}>
              <img src="/aftermovie.jpg" width="800" alt="Aftermovie 2018" />
              <h2><span>Aftermovie 2018</span></h2>
            </div>
          </a>
          <a href="https://www.facebook.com/events/265783484259438/" target="_blank" rel="noopener noreferrer">
            <div className={styles.indexItem}>
              <img src="/19block.jpg" width="800" alt="Aftermovie 2018" />
              <h2><span>6 - 7 September 2019</span></h2>
            </div>
          </a>
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
    allContentfulArtists(sort: { fields: [name], order: DESC }) {
      edges {
        node {
          name
          slug
          headerImage {
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
