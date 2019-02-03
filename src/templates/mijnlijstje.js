import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Router, Location } from '@reach/router';

import { Template, Header } from '../components';
import styles from './styles/mijnlijstje.module.css';

const handleShare = (id: string) => FB.ui({
  method: 'share',
  href: `https://crammerock.be/mijnlijstje/${id}`,
});

const useGetListFromFirebase = (listId) => {
  const [name, setName] = useState('😎');
  const [artists, setArtists] = useState(null);
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

const makeCanvas = (canvasRef, artists: Array<string>) => {
  const ctx = canvasRef.current.getContext('2d');
  const bg = new Image();
  ctx.font = '80px Oswald';
  bg.src = '/afficheGenerator.jpg';
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2E4C5D';
    ctx.fillText(artists[0].toUpperCase(), 820, 240);
    ctx.fillText(artists[1].toUpperCase(), 820, 360);
    ctx.fillText(artists[2].toUpperCase(), 820, 480);
  };
};

const Lijstje = ({ listId }: { listId: string }) => {
  const { name, artists, finished } = useGetListFromFirebase(listId);
  const canvasRef = useRef(null);

  if (finished) {
    makeCanvas(canvasRef, artists);
  }

  return (
    <>
      <Header
        title={name}
        subTitle="Dit is jouw lijstje!"
        image="https://images.ctfassets.net/nwp1ppgri1eh/5wdAe2GkfYSOOIMM4KIo2i/cf4a8d070a0d1ad03711cf35b8bf8232/large_4GXYu.jpg"
      />
      <canvas ref={canvasRef} width={1200} height={650} className={styles.canvas} />
      <button type="button" onClick={() => handleShare(listId)} className={styles.button}>Deel je affiche!</button>
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
