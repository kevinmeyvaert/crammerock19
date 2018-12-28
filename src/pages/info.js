// @flow

import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import Header from '../components/header';
import Template from '../components/layout';

import { randomArrayValue } from '../util';
import styles from './styles/info.module.css';

const Info = (props) => {
  const infoPages = get(props, 'data.allContentfulInfoPages.edges');
  const randomHeader = randomArrayValue(infoPages).node.headerImage.file.url;
  return (
    <Template>
      <div>
        <Header
          title="Praktische Info"
          subTitle="Alles wat je moet weten!"
          image={randomHeader}
        />
        <Helmet title="Info | Crammerock 2019" />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            {infoPages.map(infoItem => (
              <Link to={`/info/${infoItem.node.slug}`} key={infoItem.node.title}>
                <div className={styles.infoItem}>
                  <img src={`${infoItem.node.headerImage.file.url}?w=600&h=333&fit=fill`} alt={infoItem.node.title} />
                  <h2 className={styles.infotitle}><span>{infoItem.node.title}</span></h2>
                </div>
              </Link>
            ))}
          </div>
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
