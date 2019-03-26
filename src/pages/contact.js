// @flow

import React from 'react';
import Helmet from 'react-helmet';
import ReactContactForm from 'react-mail-form';

import styles from './styles/contact.module.css';
import { Template, Header } from '../components';
import { config } from '../config';

const Contact = () => (
  <Template>
    <Header
      title="Contact"
      image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
    />
    <Helmet title={`Contact | ${config.siteName}`} />
    <div className={styles.wrapper}>
      <h2>Contacteer Crammerock</h2>
      <div className={styles.row}>
        <ReactContactForm
          to="info@crammerock.be"
          titlePlaceholder="Onderwerp"
          contentsPlaceholder="Jouw bericht"
          buttonText="Verstuur"
          className={styles.contact}
        />
        <div className={styles.col}>
          <h3>Ons postadres</h3>
          <p>Nieuwstraat 60 E, 9190 Stekene, België</p>
          <p>Ondernemingsnummer: BE 0713.831.017</p>
        </div>
      </div>
    </div>
  </Template>
);

export default Contact;
