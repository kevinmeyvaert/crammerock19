// @flow

import React from 'react';
import Helmet from 'react-helmet';

import { Template, Header } from '../components';
import { config } from '../config';

const NotFound = () => (
  <Template>
    <Header
      title="Pagina niet gevonden!"
      image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
    />
    <Helmet title={`404 | ${config.siteName}`} />
  </Template>
);

export default NotFound;
