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
import ActionDone from 'material-ui/svg-icons/action/done';
import Typography from './Typography'
import { authorize } from './authorize.hoc';
let offices = []
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}

const getOffice = (officeId) => {
  const idx = offices.findIndex(o => o.id == officeId)
  return offices[idx]
}

const getOfficeCandidate = (officeId, candidateId) => {
  const office = getOffice(officeId)
  const idx = office.Candidates.findIndex(c => c.id == candidateId)
  return office.Candidates[idx]
}

const RenderVote = (vote, onSelect) => (
  <ListItem
    key={vote.uuid}
    leftIcon={<ActionDone />}
    primaryText={getOffice(vote.electionid).title}
    secondaryTextLines={1}
    onTouchTap={((...args) => onSelect(vote, ...args))}
    secondaryText={getOfficeCandidate(vote.electionid, vote.candidateid).name}
  />
)

const RenderVotes = ({votes, onSelect}) => (
  <List>
    {votes.map((vote) => RenderVote(vote, onSelect))}
  </List>
)

@inject("store") @authorize @observer
export default class Review extends Component {
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

  handleNext = () => {
    let path = 'office/'
    const { store, match } = this.props
    const { router } = this.context
    const electionIdx = parseInt(match.params.id, 10)
    if (electionIdx === (store.offices.length-1) || store.edit) {
      path = "review"
    } else {
      path += (electionIdx + 1).toString()
    }
    
    router.push(path)
  }

  selectVote = (vote) => {
    const { store } = this.props
    const { router } = this.context
    const idx = store.votes.findIndex(r => r.uuid === vote.uuid)
    store.updateField('edit', true)
    this.navigate('/office/'+idx.toString())
  }

  goPrevious = () => {
    this.props.goBack()
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
    offices = store.offices

    return (
      <Row>
        <Column md={12}>
          <Card>
            <CardHeader
              title="Review Vote(s)"
              subtitle="Click/Tap vote to change"
            />
            <CardMedia>
              <Row>
                <Column md={12}>
                  {store.votes.length > 0 &&
                      <RenderVotes votes={store.votes} onSelect={this.selectVote} />
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
                label="Cast Vote(s)"
                onTouchTap={((...args) => this.handleNext(...args))}
              />
            </CardActions>
          </Card>
        </Column>
      </Row>
    )
  }

}