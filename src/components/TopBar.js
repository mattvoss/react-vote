import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ActionHelp from 'material-ui/svg-icons/action/help'
import FlatButton from 'material-ui/FlatButton'
import { Page, Row, Column } from 'hedron'
import Button from './ui/Button'

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

@inject("store") @observer
export default class TopBar extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store
  }

  authenticate(e) {
    if (e) e.preventDefault();
    console.log('CLICKED BUTTON')
    this.store.authenticate()
  }

  render() {
    const { authenticated } = this.store
    return (
      <Row>
        <AppBar
          showMenuIconButton={false}
          title={<span style={styles.title}>Voting</span>}
          onTitleTouchTap={handleTouchTap}
          iconElementRight={<IconButton><ActionHelp /></IconButton>}
        />
      </Row>
    )
  }

}