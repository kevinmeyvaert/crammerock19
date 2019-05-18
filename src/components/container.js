// @flow

import React from 'react';
import Helmet from 'react-helmet';

import styles from './styles/container.module.css';

const Container = ({ children }: { children: ?React.Node }) => (
  <>
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171335-2" />
      <script type="text/javascript">
        {`var gtagId = 'UA-171335-2';
        window['ga-disable-' + gtagId] = true;
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments); }
        gtag('js', new Date());`}
      </script>
      <script>
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '543116772561552');`}
      </script>
      <script src="https://cookiehub.net/cc/312bb6b7.js" />
      <script type="text/javascript">
        {`window.addEventListener("load", function () {
          window.cookieconsent.initialise({
            onInitialise: function (status) {
              if (this.hasConsented('required')) {
              }
              if (this.hasConsented('analytics')) {
                window['ga-disable-UA-171335-2'] = false;
                gtag('config', gtagId);
              }
              if (this.hasConsented('marketing')) {
                fbq('track', 'PageView');
              }
            },
            onAllow: function (category) {
              if (category == 'required') {
              }
              if (category == 'analytics') {
                window['ga-disable-UA-171335-2'] = false;
                gtag('config', gtagId);
              }
              if (category == 'marketing') {
                fbq('track', 'PageView');
              }
            },
            onRevoke: function (category) {
              if (category == 'required') {
              }
              if (category == 'analytics') {
                window['ga-disable-UA-171335-2'] = true;
              }
              if (category == 'marketing') {
              }
            }
          })
        })`}
      </script>
    </Helmet>
    <div className={styles.siteContainer}>{children}</div>
  </>
);

export default Container;
