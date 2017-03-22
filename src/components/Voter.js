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
export default class Voter extends Component {
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

  goPrevious = () => {
    this.props.goBack()
  }

  handleNavigate = (path) => {
    const { router } = this.context
    router.push(path)
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
        <Column md={12}>
          <Card>
            <CardHeader
              title="Voter Identification"
              subtitle="Enter your Registrant ID to vote"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="registrantId"
                    hintText="Enter Registrant ID Here"
                    value={this.store.registrantId}
                    onChange={((...args) => this.handleChange('registrantId', ...args))}
                    errorText={this.errorRegistrantId}
                  />
                  <br />
                  <TextField
                    fullWidth
                    id="pin"
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
                label="Previous" 
                onTouchTap={((...args) => this.goPrevious(...args))}
              />
              <RaisedButton
                primary
                label="Next"
                onTouchTap={((...args) => this.verifyRegistrant(...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}