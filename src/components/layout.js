// @flow
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Container from './container';
import Navigation from './navigation';
import Footer from './footer';
import Sponsors from './sponsors';

import base from './styles/base.css'; // eslint-disable-line
import { useRemoveServiceWorker } from '../hooks';
import { isIE } from '../util';

type TProps = {
  children: ?React.Node,
};

const IEmessage = () => (
  <div style={{ backgroundColor: '#A7D7DB', padding: '10px', textAlign: 'center' }}>
    Hallo daar! Blijkbaar gebruik je een héél oude browser,
    bekijk de website in een moderne browser! (Edge, Chrome, Safari)
  </div>
);

const Template = (props: TProps) => {
  useRemoveServiceWorker();
  return (
    <StaticQuery
      query={graphql`
      query TemplateQuery {
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
        allContentfulSettings(filter: { titel: { eq: "Global" } }){
          edges {
            node {
              ticketpagina
              lineuppagina
              infopagina
            }
          }
        }
      }
    `}
      render={(data) => {
        const sponsors = get(data, 'allContentfulSponsors.edges');
        const settings = get(data, 'allContentfulSettings.edges');
        return (
          <Container>
            <Helmet
              title="Crammerock 2019"
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
                  content: 'Crammerock 2019',
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
                  content: 'Crammerock 2019',
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
            {isIE() && <IEmessage />}
            <Navigation settings={settings} />
            {props.children}
            <Footer />
            <Sponsors sponsors={sponsors} />
          </Container>
        );
      }}
    />
  );
};

export default Template;