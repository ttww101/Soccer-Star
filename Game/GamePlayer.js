import { gameJob } from './GameJob.js';
import React from 'react';
import { WebView } from 'react-native-webview';

export default function GamePlayer(prop) {
  return <WebView
    ref={ref => (webview = ref)}
    useWebKit={true}
    scrollEnabled={false}
    mediaPlaybackRequiresUserAction={false}
    allowsInlineMediaPlayback={true}
    originWhitelist={["*"]}
    source={{ uri: prop.game_url }}
    onShouldStartLoadWithRequest={
      (request) => {
        // Only allow navigating within this website
        console.log(request)
        if (prop.blockNavigate) {
          window.request = request
          function getLocation(href) {
            var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
            return match && {
              href: href,
              protocol: match[1],
              host: match[2],
              hostname: match[3],
              port: match[4],
              pathname: match[5],
              search: match[6],
              hash: match[7]
            }
          }
          window.test = request
          let location = getLocation(prop.game_url)
          let protocol = location["protocol"]
          let host = location["host"]
          let prefiex = protocol + "//" + host
          return request.url.startsWith("https://html5.gamedistribution.com");
        } else {
          // if (request.mainDocumentURL != prop.game_url) return false
          return true
        }
      }
    }
    onLoad={window.gameJob.bind(this.webview)}
  />
}