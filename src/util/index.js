// @flow

import type { TSettingsNode, TArtist } from '../types';

export const ellipsis = (str: string, max: number = 100): string =>
  `${str.substring(0, max)}${str.length > max ? '…' : ''}`;

export const removeHtmlTagsFromString = (string: string): string =>
  string.replace(/<(?:.|\n)*?>/gm, '');

export const randomArrayValue = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const sortByTimeFn = (artistA: TArtist, artistB: TArtist) =>
  new Date(artistA.showStart) - new Date(artistB.showStart);

export const getTimeFromContentfulResponse = (contentfultimeString: string) => {
  if (!contentfultimeString) return '/';
  const startTime = contentfultimeString.split(' ')[0];
  return startTime.substring(11, startTime.length - 6);
};

export const isIE = () => {
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent;
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  }
  return false;
};

export const getSettings = (fetchedSettings: TSettingsNode): TSettingsNode => {
  if (
    typeof process.env.GATSBY_TICKETPAGINA === 'undefined' ||
    typeof process.env.GATSBY_INFOPAGINA === 'undefined' ||
    typeof process.env.GATSBY_LINEUPPAGINA === 'undefined' ||
    typeof process.env.GATSBY_DAGINDELING === 'undefined' ||
    typeof process.env.GATSBY_TIJDINDELING === 'undefined' ||
    typeof process.env.GATSBY_LIJSTJESTIJD === 'undefined' ||
    typeof process.env.GATSBY_PODIUMINDELING === 'undefined'
  )
    return fetchedSettings;
  return {
    ticketpagina: JSON.parse(process.env.GATSBY_TICKETPAGINA),
    infopagina: JSON.parse(process.env.GATSBY_INFOPAGINA),
    lineuppagina: JSON.parse(process.env.GATSBY_LINEUPPAGINA),
    dagindeling: JSON.parse(process.env.GATSBY_DAGINDELING),
    tijdindeling: JSON.parse(process.env.GATSBY_TIJDINDELING),
    podiumIndeling: JSON.parse(process.env.GATSBY_PODIUMINDELING),
    lijstjestijd: JSON.parse(process.env.GATSBY_LIJSTJESTIJD),
  };
};

export * from './enums';
