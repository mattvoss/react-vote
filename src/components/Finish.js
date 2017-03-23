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
import ReactCountdownClock from 'react-countdown-clock'
import Typography from './Typography'

@inject("store") @observer
export default class Finish extends Component {
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

  goBegin = () => {
    const { store } = this.props

    store.reset()
    this.navigate('/')
  }

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
              title="Vote Cast"
              subtitle="Thank you for voting"
            />
            <CardMedia>
              <Row alignItems="center">
                <Column md={12}>
                  <ReactCountdownClock 
                    seconds={25}
                    color="#000"
                    alpha={0.9}
                    size={300}
                    onComplete={this.goBegin} 
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