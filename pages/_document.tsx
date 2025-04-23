import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Les liens favicon sont désormais gérés dans _app.tsx pour supporter le basePath dynamique */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
