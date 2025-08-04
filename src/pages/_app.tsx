import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { fonts, getFontVariables } from "@/config/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={getFontVariables()}>
      <Script>
        {`
       (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "l4tnkfxbwl");

    <!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVGZ798K');
<!-- End Google Tag Manager -->
      `}
      </Script>
      <Component {...pageProps} />
    </div>
  );
}
