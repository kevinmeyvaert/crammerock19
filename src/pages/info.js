// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header, ContentBlock } from '../components';

import { randomArrayValue } from '../util';
import styles from './styles/info.module.css';
import { config } from '../config';

const Info = (props) => {
  const infoPages = get(props, 'data.allContentfulInfoPages.edges');
  const randomHeader = randomArrayValue(infoPages).node.headerImage.file.url;
  return (
    <Template>
      <Header
        title="Praktische Info"
        subTitle="Alles wat je moet weten!"
        image={randomHeader}
      />
      <Helmet title={`Info | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <div className={styles.row}>
          {infoPages.map(infoItem => (
            <ContentBlock
              key={infoItem.node.slug}
              title={infoItem.node.title}
              link={`/info/${infoItem.node.slug}`}
              contentfulImage={infoItem.node.headerImage.file.url}
            />
          ))}
        </div>
      </div>
    </Template>
  );
};

export default Info;

export const pageQuery = graphql`
  query InfoQuery {
    allContentfulInfoPages(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          slug
          headerImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
