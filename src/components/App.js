import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'
import { Flex, Box } from 'reflexbox'
import IdleTimer from 'react-idle-timer'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ReactCountdownClock from 'react-countdown-clock'
import TopBar from './TopBar'
import Type from './Type'

const styles = {
  container: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
  }
}
const history = createBrowserHistory()

@observer
export default class App extends Component {
  @observable idleTimer = null
  @observable router = null
  @observable dialogOpen = false

  componentDidMount() {
    //this.authenticate()
    
  }
  
  onActive = () => {
    console.log('activity detected')
    this.idleTimer.reset()
  }

  onIdle = () => {
    const { store } = this.props
    if (!store.excludePage) {
      console.log('app is idle')
      this.dialogOpen = true
    } else {
      this.idleTimer.reset()
    }
  }

  handleOpen = () => {
    this.dialogOpen = true
  }

  handleDone = () => {
    this.dialogOpen = false
    this.navigate("/reset")
  }

  handleMoreTime = () => {
    this.dialogOpen = false
    this.idleTimer.reset()
  }

  goBegin = () => {
    const { store } = this.props
    this.dialogOpen = false
    store.reset()
    this.navigate('/')
  }

  navigate = (path) => {
    const { router } = this
    if ('history' in router) {
      router.history.push(path)
    } else {
      router.push(path)
    }
  }

  render() {
    const { store } = this.props
    const actions = [
      <FlatButton
        label="I'm done voting"
        onTouchTap={this.handleDone}
      />,
      <FlatButton
        label="I need more time!"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleMoreTime}
      />,
    ]
    let timeoutSeconds = 30

    return (
      <IdleTimer
        ref={(timer) => { this.idleTimer = timer }}
        element={document}
        activeAction={this.onActive}
        idleAction={this.onIdle}
        timeout={store.timeout}
        format="MM-DD-YYYY HH:MM:ss.SSS">
        <div style={styles.container}>
          <Router
            history={history}
            ref={(router) => { this.router = router }}
          >
            <Provider store={store}>
              <Flex
                column
                style={{flexGrow: 1}}
              >
                {/*<DevTools />*/}
                <TopBar />
                <Route 
                  exact
                  path="/"
                  render={(props) => <LazyRoute {...props} component={import('./Start')} />}
                />
                <Route 
                  exact
                  path="/states"
                  render={(props) => <LazyRoute {...props} component={import('./States')} />}
                />
                <Route 
                  exact
                  path="/login"
                  render={(props) => <LazyRoute {...props} component={import('./Login')} />}
                />
                <Route 
                  exact
                  path="/site"
                  render={(props) => <LazyRoute {...props} component={import('./Site')} />}
                />
                <Route 
                  exact
                  path="/sites"
                  render={(props) => <LazyRoute {...props} component={import('./Sites')} />}
                />
                <Route 
                  exact
                  path="/voter"
                  render={(props) => <LazyRoute {...props} component={import('./Voter')} />}
                />
                <Route 
                  exact
                  path="/type"
                  component={Type}
                />
                <Route 
                  exact
                  path="/office/:id"
                  render={(props) => <LazyRoute {...props} component={import('./Office')} />}
                />
                <Route 
                  exact
                  path="/review"
                  render={(props) => <LazyRoute {...props} component={import('./Review')} />}
                />
                <Route 
                  exact
                  path="/finish"
                  render={(props) => <LazyRoute {...props} component={import('./Finish')} />}
                />
                <Route 
                  exact
                  path="/faq"
                  render={(props) => <LazyRoute {...props} component={import('./Faq')} />}
                />
                <Route 
                  exact
                  path="/invalid"
                  render={(props) => <LazyRoute {...props} component={import('./Invalid')} />}
                />
                <Route
                  exact
                  path="/reset" 
                  render={(state) => {
                    // seems ok ?
                    store.reset()
                    return <Redirect 
                      to="/"
                    />
                  }}
                />
              </Flex>
            </Provider>
          </Router>
          <Dialog
            title="Timeout"
            actions={actions}
            modal={false}
            open={this.dialogOpen}
            onRequestClose={this.handleDone}
          >
            <Flex>
              <Box col={6}>
                Your session will timeout in {timeoutSeconds} second(s)
              </Box>
              <Box col={6}>
                <ReactCountdownClock 
                  seconds={timeoutSeconds}
                  color="#000"
                  alpha={0.9}
                  size={50}
                  onComplete={this.goBegin} 
                />
              </Box>
            </Flex>
          </Dialog>
        </div>
      </IdleTimer>
    )
  }
}