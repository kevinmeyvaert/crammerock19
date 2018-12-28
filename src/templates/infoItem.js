// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import styles from './styles/infoItem.module.css';
import Header from '../components/header';
import Template from '../components/layout';

class InfoItemTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: null,
    };
  }

  handleSectionClick = (block) => {
    const { activeBlock } = this.state;
    if (activeBlock === block.title) {
      return this.setState({ activeBlock: null });
    }
    return this.setState({ activeBlock: block.title });
  }

  render() {
    const info = get(this, 'props.data.contentfulInfoPages');
    const { activeBlock } = this.state;
    return (
      <Template>
        <div style={{ background: '#fff' }}>
          <Header
            title={info.title}
            image={info.headerImage.file.url}
            cta="Terug naar info"
            link="/info"
          />
          <Helmet title={`${info.title} | Crammerock 2019`} />
          <div className={styles.wrapper}>
            {info.introCopy && (
            <div
              dangerouslySetInnerHTML={{
                __html: info.introCopy.childMarkdownRemark.html,
              }}
            />
            )
            }
            {info.infoBlocks && info.infoBlocks.map((block) => {
              if (activeBlock === block.title) {
                return (
                  <div
                    className={styles.block}
                    key={block.title}
                    onClick={() => this.handleSectionClick(block)}
                    role="button"
                  >
                    <h2>
                      {block.title}
                      {' '}
                      <span>
                        &#x25BC;
                      </span>
                    </h2>
                    <div className={styles.content}>
                      {block.content && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: block.content.childMarkdownRemark.html,
                        }}
                      />
                      )
                    }
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className={styles.block}
                  key={block.title}
                  onClick={() => this.handleSectionClick(block)}
                  role="button"
                >
                  <h2>
                    {block.title}
                    {' '}
                    <span>
                      &#x25BA;
                    </span>
                  </h2>
                </div>
              );
            })}
          </div>
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
      infoBlocks {
        ...campingBlockFields
        ...ticketsBlockFields
        ...duurzaamBlockFields
        ...festivalBlockFields
        ...mobiliteitBlockFields
        ...faqBlockFields
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
  fragment faqBlockFields on ContentfulFaqInfoBlocks {
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
  fragment ticketsBlockFields on ContentfulTicketsInfoBlocks {
    title
    content {
      childMarkdownRemark {
        html
      }
    }
  }
`;
