import type { Metadata } from "next";
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from "next/script";
import React from 'react';


export const metadata: Metadata = {
  metadataBase: new URL("https://token.antix.in"),
  title: "Antix: Tokensale",
  description: "Antix: Tokensale platform for ICO and investment",
  keywords: ["antix", "tokensale", "ico", "platform", "investment"],
  openGraph: {
    title: "Antix: Tokensale",
    description: "Antix: Tokensale",
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antix: Tokensale",
    description: "Antix: Tokensale",
    images: "https://token.antix.in/og.png",
    site: "@antix_in",
  },
};


export default class MyDocument extends Document {
  render() {
    return <Html lang="en">
      <Head>
        <title>Antix: Tokensale</title>
        <meta name="description" content="Antix: Tokensale platform for ICO and investment"/>
        <meta property="og:image" content="https://token.antix.in/og.png"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://token.antix.in" />
        <link rel="canonical" href="https://token.antix.in" />


        <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
          ym(98807103, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
          });
        `}}/>

        <Script id="google-tags" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `
          const DOMAINS = {
            'token.antix.in'    : {
              ga: ['G-Z3X71B2ZGH'],
              gtag: ['GTM-M7DFJB2J'],
            },
            'sale.antix.in'     : {
              gtag: ['GTM-WTP9L5LR'],
            },
            'launch.antix.in'   : {
              gtag: ['GTM-5MMK7GJQ'],
            },
            'tokens.antix.in'   : {
              gtag: ['GTM-KQB2LLNZ'],
            },
            'presale.antix.in'  : {
              gtag: ['GTM-TDJJP477'],
            },
            'tokensale.antix.in': {
              gtag: ['GTM-P6NRWGBW'],
            },
            'join.antix.in'     : {
              gtag: ['GTM-MFCLN3HJ'],
            },
          }

          function initGTM(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
          }

          const counters = DOMAINS[window.location.hostname] || DOMAINS[Object.keys(DOMAINS)[0]];
          if (counters && counters.gtag) {
            counters.gtag.forEach(tag => {
              initGTM(window,document,'script','dataLayer',tag)
            })
          }

          if (counters && counters.ga) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }

            counters.ga.forEach(tag => {
              const s = document.createElement('script')
              s.src = 'https://www.googletagmanager.com/gtag/js?id='+tag
              document.head.appendChild(s);
              
              gtag('js', new Date());
              gtag('config', tag);
            })
          }
        `}}/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  }
}
