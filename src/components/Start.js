import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Flex, Box } from 'reflexbox'
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
import Divider from 'material-ui/Divider'
import ActionDone from 'material-ui/svg-icons/action/done'
import Typography from './Typography'
import { authorize } from './authorize.hoc'
import cs from '../styles/pages/_home.scss'

@inject("store") @observer
export default class Faq extends Component {

  static propTypes = {
    store: React.PropTypes.object,
    match: React.PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { store } = this.props
    store.setExcludePage(true)
  }

  componentWillUnmount() {
    const { store } = this.props
    store.setExcludePage(false)
  }

  goNext = () => {
    this.navigate('/states');
  }
  
  browse = () => {
    this.navigate('/sites');
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
      <Box col={12} p={1} className={cs.mainContainer}>
        {!store.isActive() && !store.isAfterStart()&&
          <Card>
            <CardText>
              <Typography type={"headline"}>
                Voting will begin online Tue May 1st at 5 p.m - Wed. May 2nd 10:30 a.m.
              </Typography>
              <p>
                See below for instructions and eligibility.
              </p>
            </CardText>
          </Card>
        }
        <Card>
          <CardText>
            <Typography type={"headline"}>
              Important Notes
            </Typography>
            <Typography type={"body1"}>
              <ul>
                <li>You will need your 6 or 8 digit VPPPA Member number. If you do not know your number you can contact your site representative or visit the Registration Desk starting at 7:30 a.m. Wednesday May 2nd.</li>
                <li>Only one management and one non-management vote will be recorded for each VPPPA association full member site. <span style={{ fontWeight: 'bold' }}>Coordinate with other personnel from your site.</span></li>
                <li>Voting will also be available onsite Wednesday May 2nd 7:30 - 10:30 a.m. in the Exhibitor Hall</li>
                <li><a target="_blank" href="http://www.vpppa.org/membership/membership-member-center">More information about VPPPA Membership types</a></li>
              </ul>
            </Typography>
            <br />
            <RaisedButton
              primary
              label="Next" 
              onTouchTap={((...args) => this.goNext(...args))}
            />
            <br />
            <br />
            <Divider />
            <br />
            <Typography type={"headline"}>
              <a name="example">Example Badge</a>
            </Typography>
            <div
              className={cs.barcode}
            />
          </CardText>
        </Card>
      </Box>
    )
  }

}