// @flow
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import get from 'lodash/get';
import { StaticQuery, graphql } from 'gatsby';
import firebase from 'firebase/app';

import Container from './container';
import Navigation from './navigation';
import Footer from './footer';
import Sponsors from './sponsors';
import SocialNavigation from './socialNavigation';

import base from './styles/base.css'; // eslint-disable-line
import { useRemoveServiceWorker } from '../hooks';
import { isIE } from '../util';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);

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
              lijstjestijd
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
            {isIE() && <IEmessage />}
            <Navigation settings={settings} />
            <SocialNavigation />
            <div style={{ background: 'white' }}>
              {props.children}
            </div>
            <Footer />
            <Sponsors sponsors={sponsors} />
          </Container>
        );
      }}
    />
  );
};

export default Template;
