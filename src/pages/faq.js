// @flow

import React, { useState } from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header } from '../components';

import styles from './styles/faq.module.css';
import { config } from '../config';
import FoldItem from '../components/foldItem';

const Faq = (props) => {
  const faqData = get(props, 'data.allContentfulFaqGroepBlocks.edges');
  const [activeBlock, setActiveBlock] = useState(null);

  const handleSectionClick = (block) => {
    if (activeBlock === block.title) {
      return setActiveBlock(null);
    }
    return setActiveBlock(block.title);
  };

  return (
    <Template>
      <Header
        title="F.A.Q."
        subTitle="Vaak gestelde vragen"
      />
      <Helmet title={`Info | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <div className={styles.row}>
          {faqData.map(({ node }) => (
            <div className={styles.faqGroup} key={node.titel}>
              <h2 className={styles.groupTitle}>{node.titel}</h2>
              {node.questions.map(block => (
                <FoldItem
                  block={block}
                  activeBlock={activeBlock}
                  onSectionClick={handleSectionClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Template>
  );
};

export default Faq;

export const pageQuery = graphql`
  query FaqQuery {
    allContentfulFaqGroepBlocks {
      edges {
        node {
          titel
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
  }
`;
