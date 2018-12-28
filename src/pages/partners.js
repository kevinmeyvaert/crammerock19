// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import Header from '../components/header';
import SponsorItem from '../components/sponsorItem';
import Template from '../components/layout';

import styles from './styles/partners.module.css';

const Partners = (props) => {
  const sponsors = get(props, 'data.allContentfulSponsors.edges');
  return (
    <Template>
      <div>
        <Header
          title="Partners"
        />
        <Helmet title="Partners | Crammerock 2019" />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <div className={styles.sponsorRow}>
              {sponsors.map(sponsor => (sponsor.node.size === 'Big' || sponsor.node.size === 'Medium') && (
                <SponsorItem className={styles.sponsorItem} {...sponsor.node} key={sponsor.node.sponsor} />
              ))}
            </div>
          </div>
          <div className={styles.textRow}>
            {sponsors.map(sponsor => (sponsor.node.size === 'Small') && (
              <span key={sponsor.node.sponsor}><a href={sponsor.node.website} target="_blank" rel="noopener noreferrer">{sponsor.node.sponsor}</a></span>
            ))}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Partners;

export const pageQuery = graphql`
query PartnerQuery {
  allContentfulSponsors(sort: { fields: [size], order: ASC }) {
    edges {
      node {
        sponsor
        size
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
