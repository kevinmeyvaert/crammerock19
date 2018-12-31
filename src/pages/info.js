// @flow

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header, Image } from '../components';

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
            <Link to={`/info/${infoItem.node.slug}`} key={infoItem.node.title}>
              <div className={styles.infoItem}>
                <Image width={800} height={333} src={infoItem.node.headerImage.file.url} alt={infoItem.node.title} />
                <h2><span>{infoItem.node.title}</span></h2>
              </div>
            </Link>
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
