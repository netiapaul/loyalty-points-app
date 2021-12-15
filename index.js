/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => {
  (function () {
    console.log('app running');
    console.log('app running');
    console.log('app running');
    console.log('app running');
    console.log('app running');
  })();
  SplashScreen.hide();
  return App;
});
