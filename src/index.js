require('./styles/main.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App'
import AppState from './stores/AppState'
import styles from './styles/main.scss';

injectTapEventPlugin();
const appState = new AppState();

ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider>
      <App store={appState} />
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <AppContainer>
        <App store={appState} />
      </AppContainer>
      ,
      document.getElementById('root')
    );
  });
}