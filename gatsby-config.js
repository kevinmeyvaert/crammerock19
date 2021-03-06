require('dotenv').config({
  path: '.env',
});

let contentfulConfig;

try {
  // eslint-disable-next-line global-require
  contentfulConfig = require('./.contentful');
} catch (error) {
  // eslint-disable-next-line no-console
  console.log('No local contentful config found.');
}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.',
  );
}

module.exports = {
  plugins: [
    'gatsby-plugin-flow',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/mijnlijstje/*'] },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId,
        accessToken,
      },
    },
    {
      resolve: 'gatsby-plugin-facebook-sdk',
      options: {
        appId: '448271178943799',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.7',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'oswald',
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        generateMatchPathRewrites: true,
      },
    },
  ],
};
