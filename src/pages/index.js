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
            <div className={styles.indexItem}>
              <Image width={800} height={333} src={node.featuredImage.file.url} alt={node.title} />
              <h2><Link to={`/news/${node.slug}`}><span>{node.title}</span></Link></h2>
            </div>
          ))}
          <div className={styles.indexItem}>
            <Image width={800} height={333} src={randomArtist.headerImage.file.url} alt={randomArtist.name} />
            <h2><Link to={`/lineup/${randomArtist.slug}`}><span>{randomArtist.name}</span></Link></h2>
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
