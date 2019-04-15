// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header } from '../components';

import { getTimeFromContentfulResponse, getSettings } from '../util';
import { config } from '../config';

import styles from './styles/artist.module.css';
import { useRedirectIfNotAllowed } from '../hooks';

const isAvailable = (propValue: string): boolean => propValue && propValue.length > 0;

const createSubtitle = (settingValues, page): string => {
  const { dagindeling, podiumIndeling, tijdIndeling } = settingValues;
  if (dagindeling && !podiumIndeling && !tijdIndeling) {
    return page.day;
  }
  if (dagindeling && podiumIndeling && !tijdIndeling) {
    return `${page.day} | ${page.stage}`;
  }
  if (dagindeling && podiumIndeling && tijdIndeling) {
    return `${page.stage} | ${page.day} | ${getTimeFromContentfulResponse(page.showStart)}`;
  }
  return '';
};

const PageTemplate = (props) => {
  const page = get(props, 'data.contentfulArtists2019');
  const settings = get(props, 'data.allContentfulSettings.edges');
  const settingValues = getSettings(settings[0].node);
  const { lineuppagina } = settingValues;

  // redirect to homepage if page is disabled
  useRedirectIfNotAllowed(lineuppagina);

  return (
    <Template>
      <Header
        title={page.name}
        image={page.headerImage.file.url}
        video={page.headerVideo && page.headerVideo.file.url}
        cta="Terug naar line-up"
        link="/lineup"
      />
      <Helmet title={`${page.name} | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <p className={styles.location}>
          {createSubtitle(settingValues, page)}
        </p>
        <h2>Over {page.name}</h2>
        {page.bio && (
        <div
          dangerouslySetInnerHTML={{
            __html: page.bio.childMarkdownRemark.html,
          }}
        />)}
        <div className={styles.video}>
          {isAvailable(page.youtubeVideoId) && <iframe title="youtube" width="560" height="315" src={`https://www.youtube-nocookie.com/embed/${page.youtubeVideoId}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen />}
          {isAvailable(page.spotifyArtistId) && <iframe title="spotify" src={`https://open.spotify.com/embed/artist/${page.spotifyArtistId}`} width="300" height="315" frameBorder="0" allowTransparency="true" />}
        </div>
        <h2>Meer van {page.name}</h2>
        <div>
          <ul className={styles.socials}>
            { isAvailable(page.facebook) && (
              <li className={styles.facebook}><a href={page.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            )}
            { isAvailable(page.instagram) && (
              <li className={styles.instagram}><a href={page.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            )}
            { isAvailable(page.twitter) && (
              <li className={styles.twitter}><a href={page.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
            )}
            { isAvailable(page.soundcloud) && (
              <li className={styles.soundcloud}><a href={page.soundcloud} target="_blank" rel="noopener noreferrer">Soundcloud</a></li>
            )}
            { isAvailable(page.spotify) && (
              <li className={styles.spotify}><a href={page.spotify} target="_blank" rel="noopener noreferrer">Spotify</a></li>
            )}
            { isAvailable(page.website) && (
              <li className={styles.website}><a href={page.website} target="_blank" rel="noopener noreferrer">Website</a></li>
            )}
          </ul>
        </div>
      </div>
    </Template>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query ArtistBySlug($slug: String!) {
    allContentfulSettings(filter: { titel: { eq: "Global" } }){
      edges {
        node {
          dagindeling
          podiumIndeling
          tijdIndeling
        }
      }
    }
    contentfulArtists2019(slug: { eq: $slug }) {
      name
      artistLevel
      headerImage {
        file {
          url
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
      youtubeVideoId
      facebook
      twitter
      instagram
      soundcloud
      spotifyArtistId
      spotify
      website
      day
      stage
      showStart
    }
  }
`;
