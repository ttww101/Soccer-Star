import {config} from './config.js';
import React, { useState, useEffect } from 'react';
import {StatusBar} from 'react-native'
import { View, SafeAreaView, NativeModules } from 'react-native';
import Orientation from 'react-native-orientation';
import GamePlayer from './GamePlayer.js';
import InfoViewer from './InfoViewer.js';

export default function App() {
  // control switch on/off
  const [state, setState] = useState("");
  const [launching, setLaunching] = useState(true);
  const leancloud_id = config.leancloud_id;
  const leancloud_key = config.leancloud_key;
  let id_prefix = leancloud_id.slice(0,8)
  const production_url = "https://" + id_prefix + ".api.lncldglobal.com/1.1/classes/Game"
  const locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
  console.log(locale)
  if (locale == "zh_CN") {
    fetch(production_url, {
      headers: {
        'Cache-Control': 'no-cache',
        'X-LC-Id': leancloud_id,
        'X-LC-Key': leancloud_key
      }
    }).then((n) => {
      return n.json()
    }).then((n) => {
      setState(n.results[0].flag)
    }).catch(function(t) {
      console.log(t)
    })
  }

  setTimeout(()=>{setLaunching(false)}, 2000)
  
  useEffect(() => {
    if (config.isLockLandscape) {
      if (state == "") {
        Orientation.lockToLandscape();
      } else {
        Orientation.unlockAllOrientations()
      }
    } else {
      Orientation.lockToPortrait();
    }
  });

  return (
    <>
      <View style={{flex: launching?10000:0, backgroundColor: "#000"}} ></View>
      <SafeAreaView style={{flex: 1, backgroundColor: state == "" ?'#000' : '#EFEFF4'}}>
        <StatusBar hidden={state == ""} />
        {
          state == "" ?
          <GamePlayer style={{ flex: 1, justifyContent: "center", alignItems: "center" }} game_url={config.game_url} blockNavigate={config.blockNavigate} /> :
          <InfoViewer url={state}/>
        }
      </SafeAreaView>
    </>
  );
}
