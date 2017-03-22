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
import {List, ListItem} from 'material-ui/List'
import Typography from './Typography'
import { authorize } from './authorize.hoc';
let candidateSelected = null
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}

const RenderCandidate = (candidate) => (
  <RadioButton
    key={candidate.id}
    value={candidate}
    label={
      <div>
        <div>{candidate.name}</div>
        <Typography type={"body1"}>{candidate.company}</Typography>
      </div>
    }
    style={styles.radioButton}
  />
)

const RenderCandidates = ({candidates, onChange}) => (
  <RadioButtonGroup
    name="candidates"
    defaultSelected={candidateSelected}
    onChange={((...args) => onChange(...args))}
  >
    {candidates.map((candidate) => RenderCandidate(candidate))}
  </RadioButtonGroup>
)

@inject("store") @authorize @observer
export default class Office extends Component {
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

  selectCandidate = (event, candidate) => {
    const { store, match } = this.props
    const office = store.offices[parseInt(match.params.id, 10)]
    store.updateVote(office, candidate);
  }

  handleNext = () => {
    let path = '/office/'
    const { store, match } = this.props
    const { router } = this.context
    const electionIdx = parseInt(match.params.id, 10)
    if (electionIdx === (store.offices.length-1) || store.edit) {
      store.updateField('edit', false)
      path = "/review"
    } else {
      path += (electionIdx + 1).toString()
    }
    
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
    const { store, match } = this.props
    const { muiTheme } = this.context
    const electionIdx = parseInt(match.params.id, 10)
    const office = store.offices[electionIdx]
    const vote = store.getVote(office.id)
    if (vote) {
      const idx = office.Candidates.findIndex(c => c.id == vote.candidateid)
      candidateSelected = office.Candidates[idx]
    }
    
    return (
      <Row>
        <Column md={12}>
          <Card>
            <CardHeader
              title={office.title}
              subtitle="Select the candidate you wish to vote for"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  {office.Candidates.length > 0 &&
                      <RenderCandidates candidates={office.Candidates} onChange={this.selectCandidate} />
                  }
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
                disabled={!vote}
                label="Next"
                onTouchTap={((...args) => this.handleNext(...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}