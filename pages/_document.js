import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

// emotion
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
// theme
import palette from '@/theme/palette';

// ----------------------------------------------------------------------

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

          <meta name="theme-color" content={palette.light.primary.main} />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta name="description" content="Watch and stream movies for free" />
          <meta
            name="keywords"
            content="Youplex,earn,games,live stream,instant withdrawals,movies,free movies,youtube,free series,netflix,hulu,onstream"
          />
          <meta name="author" content="Youplex" />
          <meta name="subject" content="Youplex" />
          <meta name="copyright" content="Youplex" />
          <meta name="language" content="EN" />
          <meta name="robots" content="index,follow" />
          <meta name="abstract" content="" />
          <meta name="topic" content="" />
          <meta name="summary" content="" />
          <meta name="Classification" content="Business" />
          <meta name="author" content="Youplex, support@youplex.live" />
          <meta name="designer" content="Youplex" />
          <meta name="reply-to" content="support@youplex.live" />
          <meta name="owner" content="" />
          <meta name="url" content="http://youplex.live" />
          <meta name="identifier-URL" content="http://youplex.live" />
          <meta name="directory" content="submission" />
          <meta
            name="pagename"
            content="Youplex,earn,games,live stream,instant withdrawals,movies,free movies,youtube,free series,netflix,hulu,onstream"
          />
          <meta name="category" content="Movie Streaming" />
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="1 day" />
          <meta name="subtitle" content="Youplex.live" />
          <meta name="target" content="all" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="DC.title" content="Unstoppable Robot Ninja" />
          <meta name="ResourceLoaderDynamicStyles" content="" />
          <meta name="medium" content="blog" />
          <meta httpEquiv="Expires" content="0" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Cache-Control" content="no-cache" />
          <meta httpEquiv="imagetoolbar" content="no" />
          <meta httpEquiv="x-dns-prefetch-control" content="off" />

          <meta name="og:title" content="Youplex" />
          <meta name="og:type" content="Company" />
          <meta name="og:url" content="http://youplex.live" />
          <meta name="og:image" content="http://youplex.live" />
          <meta name="og:site_name" content="Youplex" />
          <meta name="og:description" content="Watch and stream movies for free" />

          <meta name="fb:page_id" content="43929265776" />
          <meta name="application-name" content="Youplex" />
          <meta name="og:email" content="support@youplex.live" />
          <meta name="og:phone_number" content="650-123-4567" />
          <meta name="og:fax_number" content="+1-415-123-4567" />

          <meta name="og:latitude" content="37.416343" />
          <meta name="og:longitude" content="-122.153013" />
          <meta name="og:street-address" content="USA,california" />
          <meta name="og:locality" content="USA" />
          <meta name="og:region" content="NA" />
          <meta name="og:postal-code" content="94304" />
          <meta name="og:country-name" content="USA" />
          {/* Google tag (gtag.js)*/}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-PQEDR9JBYK"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PQEDR9JBYK');
            `}
          </Script>
          <Script data-cfasync="false" strategy="afterInteractive" id="show-banner">
            {`
            atOptions = {
            'key' : 'db286534355560bb44457576fd0665fb',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
            };
            `}
          </Script>

          <Script
            data-cfasync="false"
            strategy="afterInteractive"
            src="//affectionparson.com/db286534355560bb44457576fd0665fb/invoke.js"
          ></Script>

          <Script
            data-cfasync="false"
            strategy="afterInteractive"
            src="//affectionparson.com/cb91f4b32d74a911ec84244e77e12b2f/invoke.js"
          ></Script>

          {/*
          <Script
            data-cfasync="false"
            strategy="afterInteractive"
            src="//affectionparson.com/32/53/5d/32535d9e78bdbc9c2ccd4394d843466b.js"
          ></Script>

          <Script data-cfasync="false" strategy="afterInteractive">
            {`

           (function(){var l=window,y="bb8fbe99f395a811088d6fb81ae38615",u=[["siteId",265-524-804-943*332+5409065],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default","PHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0nLy9wbDIzNjE1Mjc0LmhpZ2hyZXZlbnVlbmV0d29yay5jb20vMDYvNDEvZGQvMDY0MWRkZWZhYWJmMzBjOWU3NmJmMWQ1Zjc4YmEzZGEuanMnPjwvc2NyaXB0Pg=="],["defaultPerDay",0],["topmostLayer","auto"]],e=["d3d3LmJsb2NrYWRzbm90LmNvbS9nYmVhdXRpZnkubWluLmNzcw==","ZG5oZmk1bm4yZHQ2Ny5jbG91ZGZyb250Lm5ldC9PbnZSSy93anNmZWF0LW1pbi5qcw=="],s=-1,a,p,v=function(){clearTimeout(p);s++;if(e[s]&&!(1746195748000<(new Date).getTime()&&1<s)){a=l.document.createElement("script");a.type="text/javascript";a.async=!0;var d=l.document.getElementsByTagName("script")[0];a.src="https://"+atob(e[s]);a.crossOrigin="anonymous";a.onerror=v;a.onload=function(){clearTimeout(p);l[y.slice(0,16)+y.slice(0,16)]||v()};p=setTimeout(v,5E3);d.parentNode.insertBefore(a,d)}};if(!l[y]){try{Object.freeze(l[y]=u)}catch(e){}v()}})();

            `}
          </Script>
           */}

          <Script async strategy="afterInteractive" src="//acscdn.com/script/aclib.js"></Script>
          <Script data-cfasync="false" strategy="lazyOnload">
            {`
           aclib.runPop({
        zoneId: '9033646',
    });
             `}
          </Script>

          {/*
          <Script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js" strategy="afterInteractive" />
          <Script strategy="lazyOnload">
            {`
        [
            '#FF69B4',
            '#DC143C',
            '#9ACD32',
            '#FF8C00',
            '#7FFFD4',
            '#9370DB',
            '#FFD700'
        ].forEach(function(item) {
            new Snowflakes({
                count: 15,
                maxSize: 60,
                color: item
            });
        });
    `}
          </Script>
          */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
