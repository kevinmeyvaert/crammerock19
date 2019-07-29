// @flow

import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './styles/tickets.module.css';

import { Template, Header, FoldItem } from '../components';
import { getSettings } from '../util';
import { config } from '../config';
import { useRedirectIfNotAllowed } from '../hooks';

const Tickets = (props) => {
  const settings = get(props, 'data.allContentfulSettings.edges');
  const info = get(props, 'data.contentfulInfoPages');
  const { ticketpagina } = getSettings(settings[0].node);
  const [activeBlock, setActiveBlock] = useState(null);

  // redirect to homepage if page is disabled
  useRedirectIfNotAllowed(ticketpagina);

  const handleSectionClick = (block) => {
    if (activeBlock === block.title) {
      return setActiveBlock(null);
    }
    return setActiveBlock(block.title);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.EBWidgets !== 'undefined') {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: '58984031827',
        modal: true,
        modalTriggerElementId: 'eventbrite-widget-modal-trigger-58984031827',
      });
    }
  }, []);

  return (
    <Template>
      <Header
        title="Tickets"
        image="https://images.ctfassets.net/nwp1ppgri1eh/6hq6m7EoEvFPG76NncDVxk/b9b7e40efbb7e6c1c86f1ea8edaecaf5/Festival_-_3____Crammerock.jpg"
      />
      <Helmet title={`Tickets | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <h2>Bestel je tickets</h2>
        <div className={styles.row}>
          <div className={styles.ticketItem} id="eventbrite-widget-modal-trigger-58984031827">
            <noscript><a href="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827" target="_blank" rel="noopener noreferrer">Tickets Kids Vrijdag</a></noscript>
            <img src="/tickets-kids-vrijdag.jpg" alt="Tickets Kids Vrijdag" />
          </div>
          <div className={styles.ticketItem} id="eventbrite-widget-modal-trigger-58984031827">
            <noscript><a href="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827" target="_blank" rel="noopener noreferrer">Tickets Kids Zaterdag</a></noscript>
            <img src="/tickets-kids-zaterdag.jpg" alt="Tickets Kids Zaterdag" />
          </div>
          <div className={styles.ticketItem} id="eventbrite-widget-modal-trigger-58984031827">
            <noscript><a href="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827" target="_blank" rel="noopener noreferrer">Drankvoucher</a></noscript>
            <img src="/tickets-drank.jpg" alt="Drankvoucher" />
          </div>
        </div>
        <h2>Vaak gestelde vragen</h2>
        {info.faqGroup && info.faqGroup.questions.map(block => (
          <FoldItem
            key={block.title}
            activeBlock={activeBlock}
            block={block}
            onSectionClick={handleSectionClick}
          />
        ))}
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
    contentfulInfoPages(slug: { eq: "tickets"}) {
      faqGroup {
        questions {
          title
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
