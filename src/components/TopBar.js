import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ActionHelp from 'material-ui/svg-icons/action/help'
import FlatButton from 'material-ui/FlatButton'
import { Page, Row, Column } from 'hedron'
import Button from './ui/Button'

const styles = {
  title: {
    cursor: 'pointer',
  },
};

@inject("store") @observer
export default class TopBar extends Component {

  static propTypes = {
    store: React.PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  }

  handleTitleTap = () => {
    this.navigate('/')
  }

  handleHelpTap = () => {
    this.navigate('/faq')
  }

  navigate = (path) => {
    const { router } = this.context
    if ('history' in router) {
      router.history.push(path)
    } else {
      router.push(path)
    }
  }

  render() {
    return (
      <Row>
        <AppBar
          showMenuIconButton={false}
          title={<span style={styles.title}>Voting</span>}
          onTitleTouchTap={this.handleTitleTap}
          iconElementRight={
            <IconButton onTouchTap={this.handleHelpTap}>
              <ActionHelp />
            </IconButton>
          }
        />
      </Row>
    )
  }

}