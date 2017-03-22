import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'
import { Page, Row, Column } from 'hedron'
import Home from './Home'
import Site from './Site'
import Office from './Office'
import TopBar from './TopBar'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  componentDidMount() {
    //this.authenticate()
    
  }
  authenticate(e) {
    if (e) e.preventDefault();
    this.props.store.authenticate()
  }
  render() {
    const { authenticated, authenticating, timeToRefresh, refreshToken } = this.store
    return (
      <Router>
        <Provider store={this.store}>
          <Page fluid>
            {/*<DevTools />*/}
            <TopBar />

            <Route 
              exact
              path="/"
              component={Home}
            />
            <Route 
              exact
              path="/site"
              component={Site}
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
              render={(props) => <LazyRoute {...props} component={import('./Type')} />}
            />
            <Route 
              exact
              path="/office/:id"
              component={Office}
            />
            <Route 
              exact
              path="/review"
              render={(props) => <LazyRoute {...props} component={import('./Review')} />}
            />
          </Page>
        </Provider>
      </Router>
    )
  }
}