// @flow

import { STAGES, DAYS } from './enums';
import { sortByTimeFn } from './index';

import type { TArtist } from '../types';

export const timeSchedule = (artistData: TArtist[]) =>
  [DAYS.NL.VRIJDAG, DAYS.NL.ZATERDAG].reduce(
    (dayAcc, day) => ({
      ...dayAcc,
      [day]: [STAGES.MAIN_SOUTH, STAGES.MAIN_NORTH, STAGES.CLUB].reduce((stageAcc, stage) => {
        return {
          ...stageAcc,
          [stage]: artistData
            .map(artist => artist.day === day && artist.stage === stage && artist)
            .filter(Boolean)
            .sort(sortByTimeFn),
        };
      }, {}),
    }),
    {},
  );

export const sortByArtistLevel = (artistA, artistB) => artistA.artistLevel - artistB.artistLevel;