import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import firebase from 'firebase/app';
import 'firebase/database';
import { Router, Location } from '@reach/router';

import { config } from '../config';
import { Template, Header } from '../components';
import styles from './styles/mijnlijstje.module.css';

const handleShare = (id: string) => FB.ui({
  method: 'share',
  href: `https://crammerock.be/mijnlijstje/${id}`,
});

const useGetListFromFirebase = (listId) => {
  const [name, setName] = useState('😎');
  const [artists, setArtists] = useState(['', '', '']);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    firebase.database()
      .ref(`/lijstjes19/${listId}`)
      .once('value')
      .then((snapshot) => {
        setName(snapshot.val() && snapshot.val().name);
        setArtists(snapshot.val() && snapshot.val().artists);
        setFinished(true);
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
        title={name}
        subTitle="Dit is jouw lijstje!"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
      />
      <img width={1200} height={650} src={`https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`} />
      <button type="button" onClick={() => handleShare(listId)} className={styles.button}>Deel je affiche!</button>
      {finished && (
        <Helmet
          title={`Het lijstje van ${name} | ${config.siteName}`}
          meta={[
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:image',
              content: `https://firebasestorage.googleapis.com/v0/b/crammerock-1c990.appspot.com/o/lijstjes19%2F${listId}.png?alt=media&token=1cd92339-631d-416e-a741-d30e44d75a20`,
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

const LijstjestijdComplete = () => (
  <Template>
    <Location>
      {({ location }) => {
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

export default LijstjestijdComplete;
