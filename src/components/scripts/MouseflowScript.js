'use client';
import Script from 'next/script';

export default function MouseflowScript() {
  return (
    <Script id='mouseflow-script' strategy='afterInteractive'>
      {`
        window._mfq = window._mfq || [];
        (function() {
          var mf = document.createElement("script");
          mf.type = "text/javascript"; 
          mf.defer = true;
          mf.src = "//cdn.mouseflow.com/projects/6ee6060d-fcb2-45ae-9cfe-3a157874d793.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
        })();
      `}
    </Script>
  );
}
