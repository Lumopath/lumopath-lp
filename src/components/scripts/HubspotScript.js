'use client';
import Script from 'next/script';

export default function HubspotScript() {
  return (
    <Script
      id='hubspot-script'
      src='//js.hs-scripts.com/22077126.js'
      strategy='afterInteractive'
    />
  );
}
