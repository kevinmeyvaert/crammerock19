// @flow

import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import { Template, Header } from '../components';

import styles from './styles/page.module.css';
import { config } from '../config';

const PageTemplate = (props) => {
  const page = get(props, 'data.contentfulPages');

  return (
    <Template>
      <Header
        title={page.title}
        subTitle={page.headerCopy}
        image={page.headerImage.file.url}
        video={page.headerVideo && page.headerVideo.file.url}
      />
      <Helmet title={`${page.title} | ${config.siteName}`} />
      <div className={styles.wrapper}>
        <div
          dangerouslySetInnerHTML={{
            __html: page.content.childMarkdownRemark.html,
          }}
        />
      </div>
    </Template>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PagesBySlug($slug: String!) {
    contentfulPages(slug: { eq: $slug }) {
      title
      headerCopy
      headerImage {
        file {
          url
        }
      }
      headerVideo {
        file {
          url
        }
      }
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
