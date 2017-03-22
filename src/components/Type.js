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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Typography from './Typography'
import { authorize } from './authorize.hoc';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}

@inject("store") @authorize @observer
export default class Type extends Component {
  static fetchData({ store }) {

  }

  static propTypes = {
    store: React.PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.store = this.props.store
  }

  componentWillMount() {
      const { store } = this.props
      const { router } = this.context
  }

  handleChange = (field, event, value) => {
    const store = this.store
    store.updateField(field, event.target.value);
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
              title="Voter Type"
              subtitle="Select your voter type"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  <RadioButtonGroup
                    name="voterType"
                    defaultSelected={store.type}
                    onChange={((...args) => this.handleChange('type', ...args))}>
                    <RadioButton
                      value="management"
                      label={
                        <div>
                          <div>Management</div>
                          <Typography type={"body1"}>This vote represents management for your site</Typography>
                        </div>
                      }
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="non-management"
                      label={
                        <div>
                          <div>Non-Management</div>
                          <Typography type={"body1"}>This vote represents non-management for your site</Typography>
                        </div>
                      }
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                </Column>
              </Row>
            </CardMedia>
            <CardActions>
              <RaisedButton
                label="Previous" 
                onTouchTap={((...args) => this.goPrevious(...args))}
              />
              <RaisedButton
                disabled={!store.type}
                primary
                label="Next"
                onTouchTap={((...args) => this.handleNavigate('office/0', ...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}