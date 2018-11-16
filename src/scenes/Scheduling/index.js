import React, {Component} from 'react'
import moment from 'moment'
import {View, FlatList, Text, ActivityIndicator} from 'react-native'
import {serachJobs} from '../../services/search'
import ScheduleListItem from './components/ScheduleListItem'

const perPage = 4

class Scheduling extends Component {
  constructor (props) {
    super(props)

    this.state = {
      jobs: null,
      term: '',
      count: 0,
      page: 1,
      Profileing: false,
      refreshing: false
    }
  }

  componentWillMount () {
    this.serchJob('barueri')
  }

  requestData (moreData) {
    const {term, page} = this.state
    serachJobs('barueri', page, perPage)
      .then(({total, data}) => {
        var scheduleJobs = (moreData) ? [...this.state.jobs, ...data] : data

        scheduleJobs.sort((jobA, jobB) => moment.utc(jobA.createdDate).diff(moment.utc(jobB.createdDate)))

        this.setState({
          count: total,
          jobs: scheduleJobs,
          term,
          page,
          pages: Math.ceil(total / perPage),
          refreshing: false,
          Profileing: false
        })
      }).catch(e => console.log(e))
  }

  serchJob (term) {
    this.setState({
      term,
      page: 1,
      Profileing: true
    }, () => this.requestData())
  }

  handleRefresh () {
    this.setState({
      page: 1,
      refreshing: true
    }, () => this.requestData())
  }

  handleLoadMore () {
    const {page, pages} = this.state
    if (page === pages) return

    this.setState({
      page: this.state.page + 1
    }, () => this.requestData(true))
  }

  goToJobPrifile (job) {
    this.props.navigation.navigate('Job', {id: job.id})
  }

  renderResult () {
    if (this.state.Profileing) {
      return (<View style={styles.msgContainer}>
        <ActivityIndicator/>
      </View>)
    }

    if (!this.state.jobs || this.state.jobs.length === 0) {
      const msg = 'No jobs scheduled'
      return (<View style={styles.msgContainer}>
        <Text style={styles.msgText}>{msg}</Text>
      </View>)
    }

    if (this.state.jobs.length > 0) {
      return <FlatList
        data={this.state.jobs}
        extraData={this.state}
        renderItem={({item}) => (
          <ScheduleListItem
            key={item.id}
            job={item}
            onSelectItem ={this.goToJobPrifile.bind(this)}
          />)}
        keyExtractor={job => job.id}
        onRefresh={this.handleRefresh.bind(this)}
        refreshing={this.state.refreshing}/>
    }
  }

  render () {
    return (
      <View>
        {this.renderResult()}
      </View>)
  }
}

const styles = {
  msgContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgText: {
    fontWeight: '300',
    color: '#292929',
    fontSize: 24,
    textAlign: 'center'
  }
}

export default Scheduling
