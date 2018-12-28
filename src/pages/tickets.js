// @flow

import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './styles/news.module.css';

import { Template, Header } from '../components';

import { config } from '../config';
import type { TSettings } from '../types';

type TProps = {
  settings: Array<TSettings>,
};

const Tickets = (props: TProps) => {
  const settings = get(props, 'data.allContentfulSettings.edges');
  const { ticketpagina } = settings[0].node;
  return ticketpagina && (
    <Template>
      <div style={{ background: '#fff' }}>
        <Header
          title="Tickets"
          image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
        />
        <Helmet title={`Tickets | ${config.siteName}`} />
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <iframe
                title="Tickets"
                src="https://eventbrite.com/tickets-external?eid=42900429339&ref=etckt"
                frameBorder="0"
                height={typeof window !== 'undefined' && window.innerWidth > 730 ? 1100 : 1500}
                width="100%"
                marginHeight="5"
                marginWidth="5"
                scrolling="auto"
                allowTransparency="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Tickets;

export const pageQuery = graphql`
  query TicketsQuery {
    allContentfulSettings(filter: { titel: { eq: "Global" } }){
      edges {
        node {
          ticketpagina
        }
      }
    }
  }
`;
