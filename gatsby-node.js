const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const lijstjesContent = createPage({
    path: '/mijnlijstje/',
    component: path.resolve('./src/templates/mijnlijstje.js'),
  });

  const newsContent = new Promise((resolve, reject) => {
    const newsTpl = path.resolve('./src/templates/news-post.js');
    resolve(graphql(`
          {
            allContentfulNews {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }

      const posts = result.data.allContentfulNews.edges;
      posts.forEach((post) => {
        createPage({
          path: `/news/${post.node.slug}/`,
          component: newsTpl,
          context: {
            slug: post.node.slug,
          },
        });
      });
    }));
  });

  const infoContent = new Promise((resolve, reject) => {
    const infoTpl = path.resolve('./src/templates/infoItem.js');
    resolve(graphql(`
          {
            allContentfulInfoPages {
              edges {
                node {
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
          `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }

      const info = result.data.allContentfulInfoPages.edges;
      info.forEach((post) => {
        createPage({
          path: `/info/${post.node.slug}/`,
          component: infoTpl,
          context: {
            slug: post.node.slug,
          },
        });
      });
    }));
  });

  const pagesContent = new Promise((resolve, reject) => {
    const pageTpl = path.resolve('./src/templates/page.js');
    resolve(graphql(`
          {
            allContentfulPages {
              edges {
                node {
                  slug
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
            }
          }
          `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }
      const pages = result.data.allContentfulPages.edges;
      pages.forEach((page) => {
        createPage({
          path: `/${page.node.slug}/`,
          component: pageTpl,
          context: {
            slug: page.node.slug,
          },
        });
      });
    }));
  });

  const artistContent = new Promise((resolve, reject) => {
    const artistTpl = path.resolve('./src/templates/artist.js');
    resolve(graphql(`
          {
            allContentfulSettings(filter: { titel: { eq: "Global" } }){
              edges {
                node {
                  dagindeling
                  podiumIndeling
                  tijdIndeling
                }
              }
            }

            allContentfulArtists2018 {
              edges {
                node {
                  slug
                  name
                  artistLevel
                  headerImage {
                    file {
                      url
                    }
                  }
                  bio {
                    childMarkdownRemark {
                      html
                    }
                  }
                  youtubeVideoId
                  facebook
                  twitter
                  instagram
                  soundcloud
                  spotifyArtistId
                  spotify
                  website
                  day
                  stage
                  showStart
                }
              }
            }
          }
          `).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }
      const artists = result.data.allContentfulArtists2018.edges;
      artists.forEach((artist) => {
        createPage({
          path: `lineup/${artist.node.slug}/`,
          component: artistTpl,
          context: {
            slug: artist.node.slug,
          },
        });
      });
    }));
  });

  return [infoContent, newsContent, pagesContent, artistContent, lijstjesContent];
};
