/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => {
  // (function () {
  //   setTimeout(() => {
  //     console.log('app running');
  //     console.log('app running');
  //     console.log('app running');
  //     console.log('app running');
  //     console.log('app running');
  //   }, 6000);
  // })();
  // setTimeout(() => {
  //   console.log('app running');
  //   console.log('app running');
  //   console.log('app running');
  //   console.log('app running');
  //   console.log('app running');
  // }, 6000);
  // clearInterval(setTimeout);
  setTimeout(() => {
    SplashScreen.hide();
  }, 5000);

  return App;
});
