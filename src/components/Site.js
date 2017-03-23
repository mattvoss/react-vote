import React, { Component, PropTypes } from 'react'
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
import { authorize } from './authorize.hoc'

@inject("store") @authorize @observer
export default class Site extends Component {

  static fetchData({ store }) {
    return store.getSite()
  }

  static propTypes = {
    store: React.PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    //props.store.updateField(field, event.target.value)
    //props.store.getSite()
    this.store = this.props.store
  }

  handleChange = (field, event) => {
    const store = this.store
    this.store.updateField(field, event.target.value)
    store.getSite()
  }

  handleNavigate = (path) => {
    const { router } = this.context
    this.navigate(path)
  }

  navigate = (path) => {
    const { router } = this.context
    if ('history' in router) {
      router.history.push(path)
    } else {
      router.push(path)
    }
  }

  goPrevious = () => {
    this.props.goBack()
  }

  render() {
    const store = this.store
    const { muiTheme } = this.context
    return (
      <Row>
        <Column md={12}>
          <Card>
            <CardHeader
              title="Select Site"
              subtitle="Select your site in order to cast your vote"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="siteId"
                    floatingLabelText="Site ID (6 or 8 digits)"
                    hintText="Enter 6 or 8 digit Site ID Here"
                    value={this.store.siteId}
                    onChange={((...args) => this.handleChange('siteId', ...args))}
                  />
                  {store.site &&
                    <div>
                      <Typography type='title'>Selected Site</Typography>
                      <Typography type='body1'>{store.site.company}</Typography>
                      <Typography type='body1'>{store.site.street1}</Typography>
                      <Typography type='body1'>{store.site.street2}</Typography>
                      <Typography type='body1'>{store.site.city}, {store.site.state}</Typography>
                    </div>
                  }
                </Column>
              </Row>
              <Row>
                <Column md={12}>
                  <div>
                    If you are unsure of your Site ID you can browse and select from all eligible "full member sites".
                  </div>
                  <RaisedButton
                    label="Browse Eligible Sites"
                    secondary
                    onTouchTap={((...args) => this.handleNavigate('sites', ...args))}
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
                disabled={!this.store.siteId}
                label="Next"
                onTouchTap={((...args) => this.handleNavigate('type', ...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}