import { useEffect, useState } from 'react';
import bigInt from 'big-integer';

// @flow

export const LIVESTREAM_CONTENT_TYPE = {
  INSTAGRAM: 'ContentfulLiveInstagramPost',
  TWITTER: 'ContentfulLiveTwitterPost',
};

export type TLiveStreamContentType = $Values<typeof LIVESTREAM_CONTENT_TYPE>;

function getInstagramUrlFromMediaId(resMediaId) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let shortenedId = '';
  let mediaId = resMediaId.substring(0, resMediaId.indexOf('_'));

  while (mediaId > 0) {
    const remainder = bigInt(mediaId).mod(64);
    mediaId = bigInt(mediaId)
      .minus(remainder)
      .divide(64)
      .toString();
    shortenedId = alphabet.charAt(remainder) + shortenedId;
  }

  return `https://www.instagram.com/p/${shortenedId}/`;
}

export const getInstagramData = async item => {
  if (item.internal.type === LIVESTREAM_CONTENT_TYPE.INSTAGRAM) {
    const response = await fetch(`https://api.instagram.com/oembed/?url=${item.instagramPostUrl}`);
    const post = await response.json();
    return {
      author: post.author_name,
      image: post.thumbnail_url,
      text: post.title,
      link: getInstagramUrlFromMediaId(post.media_id),
      internal: {
        type: item.internal.type,
      },
    };
  }
};

export const getTwitterData = async item => {
    if (item.internal.type === LIVESTREAM_CONTENT_TYPE.TWITTER) {
      const response = await fetch(`https://publish.twitter.com/oembed?url=${item.twitterPostUrl}`);
      const post = await response.json();
      return {
        author: post.author_name,
        html: post.html,
        internal: {
          type: item.internal.type,
        },
      };
    }
  };

export const useEnrichedLiveStream = liveStreamData => {
  const [enrichedLiveStream, setEnrichedLiveStream] = useState([]);

  useEffect(async () => {
    const updatedData = await liveStreamData.map(async item => {
      if (item.internal.type === LIVESTREAM_CONTENT_TYPE.INSTAGRAM) {
        const igData = await getInstagramData(item);
        return igData;
      }
      if (item.internal.type === LIVESTREAM_CONTENT_TYPE.TWITTER) {
        const twitterData = await getTwitterData(item);
        return twitterData;
      }
      return item;
    });

    setEnrichedLiveStream(await Promise.all(updatedData));
  }, []);

  return enrichedLiveStream;
};
