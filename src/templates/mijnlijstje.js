import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import firebase from 'firebase/app';
import 'firebase/database';
import { Router, Location } from '@reach/router';
import { navigate } from 'gatsby';

import { config } from '../config';
import { Template, Header } from '../components';
import { useRedirectIfNotAllowed } from '../hooks';
import styles from './styles/mijnlijstje.module.css';

const useGetListFromFirebase = (listId) => {
  const [name, setName] = useState('😎');
  const [artists, setArtists] = useState(['', '', '']);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    firebase.database()
      .ref(`/lijstjes19/${listId}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          setName(snapshot.val() && snapshot.val().name);
          setArtists(snapshot.val() && snapshot.val().artists);
          setFinished(true);
        } else {
          navigate('/');
        }
      });
  }, []);
  return ({
    name,
    artists,
    finished,
  });
};

const Lijstje = ({ listId }: { listId: string }) => {
  const { name, artists, finished } = useGetListFromFirebase(listId);

  return (
    <>
      <Header
        title={`${name}'s lijstje`}
        subTitle="Dat ziet er goed uit!"
        cta="Maak je eigen lijstje!"
        link="/lijstjestijd"
        video="https://videos.ctfassets.net/nwp1ppgri1eh/3aXWeGRxgIcUCqu2SYwKQM/c6b165050c1ade94dc25dc9bfb6f9adb/Crammevideozonderzwart.mp4"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
      />
      <div className={styles.row}>
        <div className={styles.column}>
          <p className={styles.bigCopy}>Voor <span>{name}</span> staat het buiten kijf, de ideale Crammerock 2019 is er eentje met <span>{artists[0]}</span>, <span>{artists[1]}</span> en natuurlijk <span>{artists[2]}</span>.</p>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcrammerock.be%2Fmijnlijstje%2F${listId}&amp;src=sdkpreparse`}>
            <button type="button" className={styles.button}>Deel op Facebook</button>
          </a>
          <a download target="_blank" rel="noopener noreferrer" href={`https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`}>
            <button type="button" className={styles.button}>Download &amp; deel op Instagram</button>
          </a>
        </div>
        <div className={styles.column}>
          <img className={styles.lijstje} alt="Jouw lijstje!" src={`https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`} />
        </div>
      </div>
      <iframe
        className={styles.iframe}
        title="sharer"
        src={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcrammerock.be%2Fmijnlijstje%2F${listId}&amp;src=sdkpreparse`}
      />
      {finished && (
        <Helmet
          title={`Het lijstje van ${name} | ${config.siteName}`}
          meta={[
            {
              property: 'og:image',
              content: `https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`,
            },
            {
              property: 'og:image:secure_url',
              content: `https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`,
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:image:width',
              content: 600,
            },
            {
              property: 'og:image:height',
              content: 314,
            },
            {
              property: 'og:image:type',
              content: 'image/png',
            },
            {
              property: 'og:title',
              content: `Het lijstje van ${name}`,
            },
            {
              property: 'og:description',
              content: `Ik wil graag ${artists[0]}, ${artists[1]} & ${artists[2]} op Crammerock 2019!`,
            },
            {
              property: 'og:url',
              content: `https://crammerock.be/mijnlijstje/${listId}`,
            },
          ]}
        />
      )}
    </>
  );
};

const LijstjestijdComplete = ({ location }: { location: string }) => {
  // redirect to homepage if no subpath is given
  useRedirectIfNotAllowed(!location.pathname.substr(13).length <= 0);
  return (
    <Template>
      <Location>
        {() => {
          const listId = location.pathname.substr(13);
          return (
            <Router location={location} className="router">
              <Lijstje path="mijnlijstje/:page" listId={listId} />
            </Router>
          );
        }}
      </Location>
    </Template>
  );
};

export default LijstjestijdComplete;
