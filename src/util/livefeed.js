import { useEffect, useState } from 'react';
import bigInt from 'big-integer';

// @flow

export const LIVESTREAM_CONTENT_TYPE = {
  INSTAGRAM: 'ContentfulLiveInstagramPost',
  TWITTER: 'ContentfulLiveTwitterPost',
  FACEBOOK_VIDEO: 'ContentfulLiveFacebookVideo',
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

export const getInstagramData = item => {
  if (item.internal.type === LIVESTREAM_CONTENT_TYPE.INSTAGRAM) {
    return fetch(`https://api.instagram.com/oembed/?url=${item.instagramPostUrl}`)
      .then(res => res.json())
      .then(post => ({
        author: post.author_name,
        image: post.thumbnail_url,
        text: post.title,
        link: getInstagramUrlFromMediaId(post.media_id),
        internal: {
          type: item.internal.type,
        },
      }))
      .catch(err => console.log(err));
    }
};

export const useEnrichedLiveStream = liveStreamData => {
  const [enrichedLiveStream, setEnrichedLiveStream] = useState([]);

  useEffect(() => {
    const updatedData = liveStreamData.map(item => {
      if (item.internal.type === LIVESTREAM_CONTENT_TYPE.INSTAGRAM) {
        const igData = getInstagramData(item);
        return igData;
      }
      return item;
    });

    Promise.all(updatedData).then(result => setEnrichedLiveStream(result));
  }, []);

  return enrichedLiveStream;
};
