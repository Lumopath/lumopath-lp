export default function ApolloScript() {
  return (
    <script
      async
      defer
      dangerouslySetInnerHTML={{
        __html: `
          (function initApollo(){
            var n=Math.random().toString(36).substring(7);
            var o=document.createElement("script");
            o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
            o.async = true;
            o.defer = true;
            o.onload = function(){
              window.trackingFunctions.onLoad({
                appId: "660b364a5c16db02e83eb720"
              });
            };
            document.head.appendChild(o);
          })();
        `,
      }}
    />
  );
}
