import { observable, action } from 'mobx'
import axios from 'axios'
import moment from 'moment'
import uuid from 'uuid'

const url = 'http://checkin.regionvivpp.org'

class AppState {
  @observable authenticated
  @observable authException = false
  @observable authenticating
  @observable voter = null
  @observable companies = []
  @observable offices = []
  @observable votes = []
  @observable registrantId = ""
  @observable pin = ""
  @observable pinConfirmed = false
  @observable siteId = ""
  @observable site = null
  @observable search = ""
  @observable type = null
  @observable edit = false

  constructor() {
    this.authenticated = false
    this.authenticating = false
    this.fetchOffices()
  }

  @action async fetchOffices() {
    let {data} = await axios.get(`${url}/api/offices`)
    if (data.length > 0) {
      this.offices = data
    }
  }

  @action async getRegistrant() {
    let {data} = await axios.get(`${url}/api/registrants/${this.registrantId}`)
    if (data.length > 0) {
      this.voter = data[0]
    }
    return data
  }

  @action async getRegistrantPin() {
    let {data} = await axios.get(`${url}/api/registrants?category=confirmation&search=${this.pin}`)
    
    if (data.length > 0) {
      this.pinConfirmed = true
      this.authException = false
      this.siteId = (this.voter.siteId) ? this.voter.siteId : ""
      if (this.siteId) {
        const site = await this.getSite()
      }
    }
    return this.pinConfirmed
  }

  @action async confirmRegistrant() {
    let pin = false
    const registrant = await this.getRegistrant()
    if (registrant.length > 0) {
      pin = await this.getRegistrantPin()
    }

    return pin
  }

  @action async searchCompanies(search) {
    const query = (search) ? search : this.search
    let {data} = await axios.get(`${url}/api/company/?search=${query}`)
    console.log(data)
    this.companies = data
    return data
  }

  @action async searchSiteIds(search) {
    const query = (search) ? search : this.siteId
    let {data} = await axios.get(`${url}/api/siteid/?search=${query}`)
    console.log(data)
    this.companies = data
    return data
  }

  @action async getSite() {
    let {data} = await axios.get(`${url}/api/siteid/?search=${this.siteId}`)
    console.log(data)
    if (data.length > 0) {
      this.site = data[0]
    }
    return this.site
  }

  @action updateField(field, value) {
    this[field] = value;
  }

  @action authenticate() {
    let retVal = false
    if (this.authException) {
      retVal = true
    } else {
      retVal = (this.voter) ? this.voter : false
    }
    return retVal
  }

  getVote(electionId) {
    let retVal = null
    const idx = this.votes.findIndex(vote => vote.electionid == electionId)
    if (idx > -1) {
      retVal = this.votes[idx]
    } 

    return retVal
  }

  @action updateVote(office, candidate) {
    let vote = {}
    const idx = this.votes.findIndex(vote => vote.electionid == office.id)
    if (idx > -1) {
      vote = this.votes[idx]
      const newVote = {
        siteid: this.siteId,
        registrantid: this.voter.id,
        electionid: office.id,
        candidateid: candidate.id,
        votertype: this.type,
        datecast: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      this.votes[idx] = Object.assign({}, vote, newVote);
    } else {
      vote = {
        uuid: uuid.v1(),
        siteid: this.siteId,
        registrantid: this.voter.id,
        electionid: office.id,
        candidateid: candidate.id,
        votertype: this.type,
        datecast: moment().format('YYYY-MM-DD H:i:s'),
      }
      this.votes.push(vote)
    }
    console.log(vote)
    
    return vote
  }
  
}

export default AppState;