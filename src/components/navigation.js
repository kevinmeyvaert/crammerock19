// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import Link from 'gatsby-link';

import styles from './styles/navigation.module.css';
import type { TSettings } from '../types';

type TProps = {
  settings: Array<TSettings>,
};

const Navigation = (props: TProps) => {
  const [showNav, setShowNav] = useState(typeof window !== 'undefined' && window.innerWidth > 730);
  const handleToggeNav = () => setShowNav(!showNav);

  const { settings } = props;
  const { infopagina, lineuppagina, ticketpagina } = settings[0].node;

  return (
    <nav className={styles.navigationWrapper}>
      <div className={styles.mobileToggle}>
        <img src="/bars.svg" className={styles.icon} alt="Open navigatie" onClick={handleToggeNav} />
      </div>
      {showNav && (
        <ul className={styles.navigation}>
          <li>
            <Link
              to="/"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Nieuws
            </Link>
          </li>
          {lineuppagina && (
            <li>
              <Link
                to="/lineup"
                activeStyle={{
                  borderBottom: 'thick solid #A3D7DD',
                }}
              >
                Line-up
              </Link>
            </li>
          )}
          {infopagina && (
            <li>
              <Link
                to="/info"
                activeStyle={{
                  borderBottom: 'thick solid #A3D7DD',
                }}
              >
                Info
              </Link>
            </li>
          )}
          {ticketpagina && (
          <li className={styles.tickets}>
            <Link
              to="/tickets"
            >
              Koop Tickets
            </Link>
          </li>
          )}
          <li className={styles.tickets}>
            <a href="https://www.youtube.com/user/CrammerockOfficial" target="_blank" rel="noopener noreferrer">
              Herbeleef Crammerock!
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
