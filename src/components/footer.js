import React, { useState } from 'react';
import Link from 'gatsby-link';
import { setConfig } from 'react-hot-loader';

import styles from './styles/footer.module.css';

setConfig({ pureSFC: true });

const Footer = () => {
  const [email, setEmail] = useState('');
  return (
    <footer>
      <div className={styles.wrapper}>
        <ul className={styles.menu}>
          <h2>Algemeen</h2>
          <li>
            <Link
              to="/over-crammerock"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Over Crammerock
            </Link>
          </li>
          <li>
            <Link
              to="/pers"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Pers
            </Link>
          </li>
          <li>
            <Link
              to="/algemene-voorwaarden"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Algemene voorwaarden
            </Link>
          </li>
          <li>
            <Link
              to="/meewerken"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Word medewerker
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-beleid"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/partners"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Partners
            </Link>
          </li>
        </ul>
        <ul className={styles.menu}>
          <h2>Info</h2>
          <li>
            <Link
              to="/info/tickets"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Tickets
            </Link>
          </li>
          <li>
            <Link
              to="/info/festival"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Festival
            </Link>
          </li>
          <li>
            <Link
              to="/info/camping"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Camping
            </Link>
          </li>
          <li>
            <Link
              to="/info/mobiliteit"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Mobiliteit
            </Link>
          </li>
          <li>
            <Link
              to="/info/duurzaam"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              Duurzaam
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              activeStyle={{
                borderBottom: 'thick solid #A3D7DD',
              }}
            >
              F.A.Q.
            </Link>
          </li>
        </ul>
        <ul className={styles.menu}>
          <h2>Nieuwsbrief</h2>
          <li>
            <form action="https://crammerock.us1.list-manage.com/subscribe/post?u=68c4eee9fd85460f8aeb2ec9d&amp;id=2e89c237ab" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
              <div id="mc_embed_signup_scroll">
                <input type="email" name="EMAIL" className={styles.email} id="mce-EMAIL" placeholder="Jouw Email" value={email} onChange={event => setEmail(event.currentTarget.value)} required />
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name="b_68c4eee9fd85460f8aeb2ec9d_2e89c237ab" tabIndex="-1" value="" readOnly />
                </div>
                <div className="clear">
                  <input type="submit" value="Inschrijven" name="subscribe" id="mc-embedded-subscribe" className={styles.button} />
                </div>
              </div>
            </form>
          </li>
          <ul className={styles.navigation}>
            <li className={styles.navigationItem}>
              <a href="https://www.facebook.com/Crammerock/">
                <img src="/facebook.svg" className={styles.icon} alt="Facebook" />
              </a>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://instagram.com/crammerock">
                <img src="/instagram.svg" className={styles.icon} alt="Instagram" />
              </a>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://www.snapchat.com/add/Crammerock">
                <img src="/snapchat.svg" className={styles.icon} alt="Snapchat" />
              </a>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://open.spotify.com/user/crammerock/playlist/2ZfGcHunpKZrWPqJORQQF5">
                <img src="/spotify.svg" className={styles.icon} alt="Spotify" />
              </a>
            </li>
            <li className={styles.navigationItem}>
              <a href="https://www.youtube.com/user/CrammerockOfficial">
                <img src="/youtube.svg" className={styles.icon} alt="Youtube" />
              </a>
            </li>
          </ul>
          <li className={styles.navigationItem}>
            <a href="https://www.festivalfinder.eu/" noopener noreferrer>
              <img src="/effe.png" width="100" alt="The EFFE Label is Europe’s quality stamp for remarkable arts festivals showing their engagement in the field of the arts, community involvement and international openness." />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.sub}>
        <p>
          <span role="img" aria-label="copyright">&copy;</span> 2019 Crammerock VZW
        </p>
        <p className={styles.credits}>
          Website: Kevin • Ontwerp: Marieke, Jonas
        </p>
      </div>
    </footer>
  );
};

export default Footer;
