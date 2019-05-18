// @flow

import React, { useState } from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import styles from './styles/tickets.module.css';

import { Template, Header, ContentBlock, FoldItem } from '../components';
import { getSettings } from '../util';
import { config } from '../config';
// import { useRedirectIfNotAllowed } from '../hooks';
import type { TSettings } from '../types';

type TProps = {
  settings: Array<TSettings>,
};

const Tickets = (props: TProps) => {
  const settings = get(props, 'data.allContentfulSettings.edges');
  const info = get(props, 'data.contentfulInfoPages');
  const { ticketpagina } = getSettings(settings[0].node);
  const [activeBlock, setActiveBlock] = useState(null);

  // redirect to homepage if page is disabled
  // useRedirectIfNotAllowed(ticketpagina);

  const handleSectionClick = (block) => {
    if (activeBlock === block.title) {
      return setActiveBlock(null);
    }
    return setActiveBlock(block.title);
  };

  if (typeof window !== 'undefined' && window.EBWidgets) {
    window.EBWidgets.createWidget({
      widgetType: 'checkout',
      eventId: '58984031827',
      modal: true,
      modalTriggerElementId: 'eventbrite-widget-modal-trigger-58984031827',
    });
  }

  return ticketpagina && (
    <Template>
      <Header
        title="Tickets"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
      />
      <Helmet title={`Tickets | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <h2>Bestel je tickets</h2>
        <div className={styles.row}>
          <ContentBlock
            title="Tickets Vrijdag"
            subTitle="€37 + €1,48 servicekosten"
            image="/tickets-vrijdag.jpg"
            externalLink="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827"
            id="eventbrite-widget-modal-trigger-58984031827"
          />
          <ContentBlock
            title="Tickets Zaterdag"
            subTitle="€37 + €1,48 servicekosten"
            externalLink="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827"
            id="eventbrite-widget-modal-trigger-58984031827"
            image="/tickets-zaterdag.jpg"
          />
          <ContentBlock
            title="Tickets Weekend"
            subTitle="€58 + €2,32 servicekosten"
            externalLink="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827"
            id="eventbrite-widget-modal-trigger-58984031827"
            image="/tickets-weekend.jpg"
          />
          <ContentBlock
            title="Tickets Camping"
            externalLink="https://www.eventbrite.com/e/tickets-crammerock-2019-58984031827"
            id="eventbrite-widget-modal-trigger-58984031827"
            image="/tickets-camping.jpg"
          />
        </div>
        <h2>Vaak gestelde vragen</h2>
        {info.faqGroup && info.faqGroup.questions.map(block => (
          <FoldItem
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
