// @flow

import React from 'react';

import styles from './styles/container.module.css';

const Container = ({ children }: { children: ?React.Node }) => (
  <div className={styles.siteContainer}>{children}</div>
);

export default Container;
