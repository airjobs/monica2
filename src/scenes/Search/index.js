import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList, Text, ActivityIndicator} from 'react-native'
import SearchBar from './components/SearchBar'
import JobListItem from './components/JobListItem'
import {serachJobs} from '../../services/search'

const perPage = 20

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      jobs: null,
      term: '',
      count: 0,
      page: 1,
      searching: false,
      refreshing: false
    }
  }

  componentWillMount () {
    this.jobSearch('barueri')
  }

  requestData (moreData) {
    const {term, page} = this.state
    serachJobs(term, page, perPage)
      .then(({total, data}) => {
        this.setState({
          count: total,
          jobs: (moreData) ? [...this.state.jobs, ...data] : data,
          term,
          page,
          pages: Math.ceil(total / perPage),
          refreshing: false,
          searching: false
        })
      }).catch(e => console.log(e))
  }

  jobSearch (term) {
    this.setState({
      term,
      page: 1,
      searching: true
    }, () => this.requestData())
  }

  clearSearch () {
    this.setState({
      count: 0,
      jobs: null,
      term: '',
      page: 1,
      searching: false
    })
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
    if (this.state.searching) {
      return (<View style={styles.msgContainer}>
        <ActivityIndicator/>
      </View>)
    }

    if (!this.state.jobs) {
      const msg = '=( Não encontramas nada na sua cidade.'
      return (<View style={styles.msgContainer}>
        <Text style={styles.msgText}>{msg}</Text>
      </View>)
    }
    if (this.state.jobs.length === 0) {
      const msg = '=( Não encontramos nada'

      return (<View style={styles.msgContainer}>
        <Text style={styles.msgText}>{msg}</Text>
      </View>)
    }

    if (this.state.jobs.length > 0) {
      return <FlatList
        data={this.state.jobs}
        extraData={this.state}
        renderItem={({item}) => (
          <JobListItem
            key={item.id}
            job={item}
            onSelectItem ={this.goToJobPrifile.bind(this)}
          />)}
        keyExtractor={job => job.id}
        onRefresh={this.handleRefresh.bind(this)}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore.bind(this)}
        onEndReachedThreshold={0.5}/>
    }
  }

  render () {
    const jobSearch = _.debounce(term => this.jobSearch(term, 5), 300)

    return (
      <View>
        <SearchBar
          onSearchTermChange={jobSearch}
          onSearchTermClear={this.clearSearch.bind(this)}/>
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

export default connect(null)(Search)
