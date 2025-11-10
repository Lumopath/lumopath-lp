'use client';
import Script from 'next/script';

export default function FrontChatScript() {
  const chatId = process.env.NEXT_PUBLIC_FRONT_CHAT_ID;

  if (!chatId) {
    return null;
  }

  return (
    <>
      <Script
        id='front-chat-bundle'
        src='https://chat-assets.frontapp.com/v1/chat.bundle.js'
        strategy='afterInteractive'
      />
      <Script id='front-chat-init' strategy='afterInteractive'>
        {`
          (function() {
            var retries = 0;
            var maxRetries = 50; // 50 * 100ms = 5 seconds
            
            function initFrontChat() {
              if (window.FrontChat && document.body) {
                window.FrontChat('init', {chatId: '${chatId}', useDefaultLauncher: true});
              } else if (document.body && retries < maxRetries) {
                retries++;
                setTimeout(initFrontChat, 100);
              } else if (!document.body) {
                document.addEventListener('DOMContentLoaded', initFrontChat);
              } else {
                console.error('FrontChat failed to initialize after ' + maxRetries + ' retries.');
              }
            }
            
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initFrontChat);
            } else {
              initFrontChat();
            }
          })();
        `}
      </Script>
    </>
  );
}

