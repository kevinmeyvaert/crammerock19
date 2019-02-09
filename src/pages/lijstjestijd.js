import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Helmet from 'react-helmet';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { config } from '../config';
import { ellipsis } from '../util';
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
  const [progressMsg, setProgressMsg] = useState(null);
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

  const handleUploadImage = (canvas, listId) => {
    canvas.toBlob((blob) => {
      const affiche = new Image();
      affiche.src = blob;
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`lijstjes19/${listId}.png`).put(blob);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressMsg(`We verwerken jouw lijstje. ${Math.round(progress)}% klaar!`);
      }, (uploadError) => {
        console.error(uploadError);
      }, () => {
        // redirect
        navigate(`/mijnlijstje/${listId}`);
      });
    });
  };

  const makeCanvas = new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 650;
    const ctx = canvas.getContext('2d');
    const bg = new Image();
    ctx.font = '80px Oswald';
    bg.src = '/afficheGenerator.jpg';
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#2E4C5D';
      ctx.fillText(ellipsis(artists[0].toUpperCase(), 20), 820, 240);
      ctx.fillText(ellipsis(artists[1].toUpperCase(), 20), 820, 360);
      ctx.fillText(ellipsis(artists[2].toUpperCase(), 20), 820, 480);
      return resolve(canvas);
    };
  });

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
      makeCanvas
        .then(canvas => handleUploadImage(canvas, listId));
    } else {
      setError(true);
    }
  };

  return (
    <Template>
      <Header
        title="Lijstjestijd!"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
        subTitle="Geef jouw top 3 voor Crammerock 2019"
        video="https://videos.ctfassets.net/nwp1ppgri1eh/3aXWeGRxgIcUCqu2SYwKQM/c6b165050c1ade94dc25dc9bfb6f9adb/Crammevideozonderzwart.mp4"
      />
      <Helmet title={`Lijstjestijd | ${config.siteName}`} />
      <div className={styles.row}>
        <div className={styles.copyCol}>
          <p>Welke bangelijke band woont al weken in je oren? Welke straffe dj doet je hart spontaan harder bonken? Welke rapper blaast je helemaal van je hipste sokken? Welke zotte zanger of zangeres zal deze zomer met zijn of haar liedjes iedereen mierentietjes bezorgen?</p>
          <p>Kortom, wie wil jij op Crammerock 2019 zien? Laat het snel weten door hier jouw lijstje in te vullen. En wie weet, spelen de festivalacts van jouw dromen op 6 en 7 september op Crammerock!</p>
        </div>
        {!progressMsg ? (
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
        ) : <div className={styles.form}><p>{progressMsg}</p></div>}
      </div>
    </Template>
  );
};

export default Lijstjestijd;
