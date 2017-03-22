import React, { Component, PropTypes } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Page, Row, Column } from 'hedron'
import {
  Card,
  CardActions,
  CardMedia,
  CardHeader,
  CardText
} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Typography from './Typography'
import { authorize } from './authorize.hoc';

const styles = {
  badgeImage: {
    maxWidth: "100%",
    height: "auto"
  }
};


@inject("store")
@observer
export default class Home extends Component {
  @observable errorRegistrantId = null
  @observable errorPin = null

  static fetchData({ store }) {
  }

  static propTypes = {
    store: React.PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.store = this.props.store
  }

  handleChange = (field, event) => {
    const store = this.store
    this.store.updateField(field, event.target.value)
  }

  handleNavigate = (path) => {
    const { router } = this.context
    router.push(path)
  }

  browse = () => {
    const { store } = this.props
    store.updateField('authException', true)
    this.handleNavigate('sites')
  }

  checkIfComplete = () => {
    let retVal = false
    const { store } = this.props
    if (store.registrantId.length > 0 && store.pin.length > 0) {
      retVal = true
    }

    return retVal
  }

  async verifyRegistrant() {
    const errorText = 'Your Registrant ID and/or Pin is incorrect'
    const store = this.store
    const confirmed = await store.confirmRegistrant()
    if (confirmed) {
      this.errorRegistrantId = null
      this.errorPin = null
      this.handleNavigate('site')
    } else {
      this.errorRegistrantId = errorText
      this.errorPin = errorText
    }
  }

  render() {
    const store = this.store
    return (
      <Row>
        <Column md={6}>
          <Card>
            <CardHeader
              title="Vote Now!"
              subtitle="Enter your Registrant ID to vote"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="registrantId"
                    floatingLabelText="Registrant ID"
                    hintText="Enter Registrant ID Here"
                    value={this.store.registrantId}
                    onChange={((...args) => this.handleChange('registrantId', ...args))}
                    errorText={this.errorRegistrantId}
                  />
                  <br />
                  <TextField
                    fullWidth
                    id="pin"
                    floatingLabelText="Pin"
                    hintText="Enter PIN"
                    value={this.store.pin}
                    onChange={((...args) => this.handleChange('pin', ...args))}
                    errorText={this.errorPin}
                  />
                </Column>
                <Column md={12}>
                  <img 
                    src="src/images/badge.png" 
                    style={styles.badgeImage}
                  />
                </Column>
              </Row>
            </CardMedia>
            <CardActions>
              <RaisedButton
                primary
                disabled={!this.checkIfComplete()}
                label="Next"
                onTouchTap={((...args) => this.verifyRegistrant(...args))}
              />
            </CardActions>
          </Card>
        </Column>
        <Column md={6}>
          <Card>
            <CardHeader
              title="Browse Sites"
              subtitle="See what sites are eligible to vote"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <RaisedButton
                    label="Browse Sites"
                    secondary 
                    onTouchTap={((...args) => this.browse(...args))}
                  />
                </Column>
              </Row>
            </CardMedia>
          </Card>
        </Column>
      </Row>
    )
  }

}