// @flow

import React from 'react';
import get from 'lodash/get';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import {
  Template,
  Header,
  ContentBlock,
} from '../components';

import { useGetRandomArtistInterval } from '../hooks';
import { ellipsis } from '../util';
import { config } from '../config';
import styles from './styles/index.module.css';

const RootIndex = (props) => {
  const news = get(props, 'data.allContentfulNews.edges');
  const artists = get(props, 'data.allContentfulArtists2019.edges');
  const randomArtist = useGetRandomArtistInterval(artists, 5000);
  const headerData = news[0].node;
  return (
    <Template>
      <Helmet
        title={config.siteName}
        meta={[
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:image',
            content: 'https://images.ctfassets.net/nwp1ppgri1eh/5scvUuBUEEiQImOC8wmuI2/7e1bf970d2b81ea63eda5802c804221a/whitelies.jpg?w=800&h=600&fit=fill',
          },
          {
            property: 'og:title',
            content: config.siteName,
          },
          {
            property: 'description',
            content: 'Klaar voor de 29ste editie van Crammerock! Op vrijdag 6/9 en zaterdag 7/9 in Stekene.',
          },
          {
            property: 'og:description',
            content: 'Klaar voor de 29ste editie van Crammerock! Op vrijdag 6/9 en zaterdag 7/9 in Stekene.',
          },
          {
            property: 'og:url',
            content: 'https://crammerock.be',
          },
          {
            property: 'fb:app_id',
            content: '448271178943799',
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:url',
            content: 'https://crammerock.be',
          },
          {
            name: 'twitter:title',
            content: config.siteName,
          },
          {
            name: 'twitter:image',
            content: 'https://images.ctfassets.net/nwp1ppgri1eh/5scvUuBUEEiQImOC8wmuI2/7e1bf970d2b81ea63eda5802c804221a/whitelies.jpg?w=800&h=600&fit=fill',
          },
          {
            name: 'twitter:site',
            content: '@crammerock',
          },
          {
            name: 'twitter:creator',
            content: '@crammerock',
          },
        ]}
      />
      <Header
        title={ellipsis(headerData.title, 50)}
        image={headerData.featuredImage.file.url}
        link={`/news/${headerData.slug}`}
        cta="Lees meer"
      />
      <div className={styles.wrapper}>
        <div className={styles.row}>
          {news.slice(1, 2).map(({ node }) => (
            <ContentBlock
              key={node.slug}
              link={`/news/${node.slug}`}
              title={node.title}
              subTitle={node.publishDate}
              contentfulImage={node.featuredImage.file.url}
            />
          ))}
          <ContentBlock
            externalLink="https://www.facebook.com/Crammerock/videos/1549510151819448/"
            title="Aftermovie 2018"
            subTitle="Bekijk hem hier"
            image="/aftermovie.jpg"
          />
          <ContentBlock
            externalLink="https://www.facebook.com/events/265783484259438/"
            title="6 - 7 September 2019"
            subTitle="RSVP op Facebook"
            image="/19block.jpg"
          />
          <ContentBlock
            link={`/lineup/${randomArtist.slug}`}
            title={randomArtist.name}
            subTitle={randomArtist.day}
            fluidImage={randomArtist.headerImage.fluid}
          />
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
          publishDate(formatString: "DD/MM/YYYY")
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
    allContentfulArtists2019 {
      edges {
        node {
          name
          slug
          day
          headerImage {
            fluid(
              maxWidth: 800
              maxHeight: 333
              resizingBehavior: FILL
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
