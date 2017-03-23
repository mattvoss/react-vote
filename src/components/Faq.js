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
import {List, ListItem} from 'material-ui/List'
import ActionDone from 'material-ui/svg-icons/action/done'
import Typography from './Typography'
import { authorize } from './authorize.hoc'

@inject("store") @observer
export default class Faq extends Component {
  static fetchData({ store }) {

  }

  static propTypes = {
    store: React.PropTypes.object,
    match: React.PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  goPrevious = () => {
    const { router } = this.context
    if ('history' in router) {
      router.history.goBack()
    } else {
      router.goBack()
    }
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
    const { store } = this.props
    const { muiTheme } = this.context

    return (
      <Row>
        <Column md={12}>
          <Card>
            <CardHeader
              title="Help"
              subtitle="Frequently asked questions"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <Typography type={"body1"}>Help Text goes here</Typography>
                </Column>
              </Row>
            </CardMedia>
            <CardActions>
              <RaisedButton
                primary
                label="Previous" 
                onTouchTap={((...args) => this.goPrevious(...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}