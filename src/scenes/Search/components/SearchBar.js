import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      term: ''
    }
  }

  onIputChange (term) {
    this.setState({term})
    if (this.props.onSearchTermChange) { this.props.onSearchTermChange(term) }
  }

  onClear () {
    this.setState({term: ''})
    if (this.props.onSearchTermClear) { this.props.onSearchTermClear() }
  }

  renderClearButton () {
    if (this.state.term === '') return null

    return (
      <TouchableOpacity onPress={() => this.onClear()}>
        <Icon name="close" size={20}/>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headercontent}>
          <Icon name="magnifier" size={24}/>
          <TextInput
            value={this.state.term}
            placeholder="City name..."
            style={styles.inputTerm}
            onChangeText={ text => this.onIputChange(text)}/>
          {this.renderClearButton()}
        </View>
      </View>
    )
  }
}

const styles = {
  headerContainer: {
    flexDirection: 'row',
    opacity: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#929292',
    elevation: 2
  },
  headercontent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  inputTerm: {
    flex: 1,
    height: 60,
    marginHorizontal: 16,
    fontSize: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
}

export default SearchBar
