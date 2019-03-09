const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const staticPagesData = await graphql(`
  {
    allContentfulNews {
      edges {
        node {
          slug
        }
      }
    }
    allContentfulInfoPages {
      edges {
        node {
          slug
        }
      }
    }
    allContentfulPages {
      edges {
        node {
          slug
        }
      }
    }
    allContentfulArtists2018 {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);

  const lijstjesContent = createPage({
    path: '/mijnlijstje/',
    component: path.resolve('./src/templates/mijnlijstje.js'),
  });

  const newsContent = staticPagesData.data.allContentfulNews.edges.forEach((post) => {
    createPage({
      path: `/news/${post.node.slug}/`,
      component: path.resolve('./src/templates/news-post.js'),
      context: {
        slug: post.node.slug,
      },
    });
  });

  const infoContent = staticPagesData.data.allContentfulInfoPages.edges.forEach((post) => {
    createPage({
      path: `/info/${post.node.slug}/`,
      component: path.resolve('./src/templates/infoItem.js'),
      context: {
        slug: post.node.slug,
      },
    });
  });

  const pagesContent = staticPagesData.data.allContentfulPages.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: path.resolve('./src/templates/page.js'),
      context: {
        slug: page.node.slug,
      },
    });
  });

  const artistsContent = staticPagesData.data.allContentfulArtists2018.edges.forEach((artist) => {
    createPage({
      path: `lineup/${artist.node.slug}/`,
      component: path.resolve('./src/templates/artist.js'),
      context: {
        slug: artist.node.slug,
      },
    });
  });

  return [infoContent, newsContent, pagesContent, artistsContent, lijstjesContent];
};
