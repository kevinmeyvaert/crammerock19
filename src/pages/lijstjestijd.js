import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Helmet from 'react-helmet';
import firebase from 'firebase/app';
import 'firebase/database';

import { config } from '../config';
import styles from './styles/lijstjestijd.module.css';
import { Template, Header } from '../components';

const areAllFieldsFilledIn = (artists: Array<string>, email: string, name: string) => {
  if (artists[0].length > 0 && artists[1].length > 0 && artists[2].length > 0 && email.length > 0 && name.length > 0) {
    return true;
  }
  return false;
};

const isEmailValid = email => email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

const Lijstjestijd = () => {
  // state variables
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(['', '', '']);
  const [email, setEmail] = useState('');
  const [optin, setOptin] = useState(false);
  const [error, setError] = useState(false);

  // helper fns
  const onChange = (value: string, key: number) => {
    if (typeof key === 'number') {
      const artistsCopy = artists;
      artistsCopy[key] = value;
      setArtists(artistsCopy);
    } else {
      setEmail(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (areAllFieldsFilledIn(artists, email, name) && isEmailValid(email)) {
      const dbRef = firebase.database().ref('lijstjes19/');
      const newListRef = dbRef.push();
      const listId = newListRef.key;
      newListRef.set({
        name,
        email,
        optin,
        artists,
      });
      // redirect
      navigate(`/mijnlijstje/${listId}`);
    } else {
      setError(true);
    }
  };

  return (
    <Template>
      <Header
        title="Lijstjestijd!"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
      />
      <Helmet title={`Lijstjestijd | ${config.siteName}`} />
      <div className={styles.row}>
        <div className={styles.copyCol}>
          <p>Welke bangelijke band woont al weken in je oren? Welke straffe dj doet je hart spontaan harder bonken? Welke rapper blaast je helemaal van je hipste sokken? Welke zotte zanger of zangeres zal deze zomer met zijn of haar liedjes iedereen mierentietjes bezorgen?</p>
          <p>Kortom, wie wil jij op Crammerock 2019 zien? Laat het snel weten door hier jouw lijstje in te vullen. En wie weet, spelen de festivalacts van jouw dromen op 31 augustus en 1 september op Crammerock!</p>
        </div>
        <div className={styles.form}>
          <form>
            <label htmlFor="name">
              Jouw voornaam
              <input
                id="name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                id="email"
                type="email"
                value={email}
                onChange={event => onChange(event.target.value, null)}
                required
              />
            </label>
            <label htmlFor="artistOne">
              Artiest/Band 1
              <input
                id="artistOne"
                type="text"
                value={artists[0]}
                onChange={event => onChange(event.target.value, 0)}
              />
            </label>
            <label htmlFor="artistTwo">
              Artiest/Band 2
              <input
                id="artistTwo"
                type="text"
                value={artists[1]}
                onChange={event => onChange(event.target.value, 1)}
              />
            </label>
            <label htmlFor="artistThree">
              Artiest/Band 3
              <input
                id="artistThree"
                type="text"
                value={artists[2]}
                onChange={event => onChange(event.target.value, 2)}
              />
            </label>
            <div className={styles.optin}>
              <input
                type="checkbox"
                className={styles.checkbox}
                value={optin}
                onChange={event => setOptin(event.target.checked)}
              />
              <span>Ik wil me inschrijven op de Crammerock nieuwsbrief!</span>
            </div>
            { error && <p className={styles.error}>Vul alle velden in en controleer je email adres!</p>}
            <button onClick={event => onSubmit(event)} type="submit">Verstuur</button>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default Lijstjestijd;
