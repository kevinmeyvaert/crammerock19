// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header, ContentBlock } from '../components';

import { ellipsis } from '../util';
import styles from './styles/infoItem.module.css';
import { config } from '../config';
import FoldItem from '../components/foldItem';

class InfoItemTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: null,
    };
  }

  handleSectionClick = block => {
    const { activeBlock } = this.state;
    if (activeBlock === block.title) {
      return this.setState({ activeBlock: null });
    }
    return this.setState({ activeBlock: block.title });
  };

  render() {
    const info = get(this, 'props.data.contentfulInfoPages');
    const { activeBlock } = this.state;
    return (
      <Template>
        <Header
          title={info.title}
          image={info.headerImage.file.url}
          cta="Terug naar info"
          link="/info"
        />
        <Helmet title={`${info.title} | ${config.siteName}`} />
        <div className={styles.wrapper}>
          {info.introCopy && (
            <div
              className={styles.intro}
              dangerouslySetInnerHTML={{
                __html: info.introCopy.childMarkdownRemark.html,
              }}
            />
          )}
          <h2 className={styles.infoTitle}>{info.title}</h2>
          {info.infoBlocks &&
            info.infoBlocks.map(block => (
              <FoldItem
                activeBlock={activeBlock}
                block={block}
                onSectionClick={this.handleSectionClick}
              />
            ))}
          {info.faqGroup ? <h2 className={styles.infoTitle}>Vaak gestelde vragen</h2> : null}
          {info.faqGroup &&
            info.faqGroup.questions.map(block => (
              <FoldItem
                activeBlock={activeBlock}
                block={block}
                onSectionClick={this.handleSectionClick}
              />
            ))}
          {info.relatedInfo ? <h2 className={styles.infoTitle}>Meer info</h2> : null}
          {info.relatedInfo ? (
            <div className={styles.relatedInfoRow}>
              {info.relatedInfo.map(infoItem => (
                <ContentBlock
                  link={`/info/${infoItem.slug}`}
                  title={
                    typeof window !== 'undefined' && window.innerWidth > 730
                      ? infoItem.title
                      : ellipsis(infoItem.title, 30)
                  }
                  fluidImage={infoItem.headerImage.fluid}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Template>
    );
  }
}

export default InfoItemTemplate;

export const pageQuery = graphql`
  query InfoBySlug($slug: String!) {
    contentfulInfoPages(slug: { eq: $slug }) {
      title
      slug
      headerImage {
        file {
          url
        }
      }
      introCopy {
        childMarkdownRemark {
          html
        }
      }
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
      relatedInfo {
        title
        slug
        headerImage {
          fluid(maxWidth: 800, maxHeight: 333, resizingBehavior: FILL, background: "rgb:000000") {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      infoBlocks {
        ...campingBlockFields
        ...duurzaamBlockFields
        ...festivalBlockFields
        ...mobiliteitBlockFields
      }
    }
  }
  fragment mobiliteitBlockFields on ContentfulMobiliteitInfoBlocks {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
  fragment duurzaamBlockFields on ContentfulDuurzaamInfoBlocks {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
  fragment festivalBlockFields on ContentfulFestivalInfoBlocks {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
  fragment campingBlockFields on ContentfulCampingInfoBlocks {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
`;
