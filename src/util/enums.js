// @flow

export const STAGES = Object.freeze({
  CLUB: 'Club',
  MAIN_NORTH: 'Main North',
  MAIN_SOUTH: 'Main South',
});

export const DAYS = Object.freeze({
  EN: {
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
  },
  NL: {
    VRIJDAG: 'Vrijdag',
    ZATERDAG: 'Zaterdag',
  }
});

export const LINEUP_FILTERS = Object.freeze({
  ABC: 'ABC',
  ALL: 'all',
  SCHEDULE: 'Schedule',
  FRIDAY: DAYS.NL.VRIJDAG,
  SATURDAY: DAYS.NL.ZATERDAG,
})