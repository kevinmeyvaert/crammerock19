// @flow

import type { TSettingsNode } from '../types';

export const ellipsis = (str, max = 100) => `${str.substring(0, max)}${str.length > max ? '…' : ''}`;

export const removeHtmlTagsFromString = (string: string): string => string.replace(/<(?:.|\n)*?>/gm, '');

export const randomArrayValue = (array: Array) => array[Math.floor(Math.random() * array.length)];

export const getTimeFromContentfulResponse = (contentfultimeString) => {
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
  const {
    ticketpagina,
    infopagina,
    lineuppagina,
    dagindeling,
    tijdindeling,
    podiumIndeling,
  } = fetchedSettings;
  return ({
    ticketpagina: ticketpagina || JSON.parse(process.env.GATSBY_TICKETPAGINA),
    infopagina: infopagina || JSON.parse(process.env.GATSBY_INFOPAGINA),
    lineuppagina: lineuppagina || JSON.parse(process.env.GATSBY_LINEUPPAGINA),
    dagindeling: dagindeling || JSON.parse(process.env.GATSBY_DAGINDELING),
    tijdindeling: tijdindeling || JSON.parse(process.env.GATSBY_TIJDINDELING),
    podiumIndeling: podiumIndeling || JSON.parse(process.env.GATSBY_PODIUMINDELING),
  });
};
