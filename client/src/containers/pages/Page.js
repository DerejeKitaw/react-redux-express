import React, { Component } from 'react'

import pageContainer from './pageContainer'
import SectionList from '../../containers/sections/SectionList'

class Page extends Component {
  state = {
    hash: null,
    timeoutId: null
  }
  componentDidMount() {
    const { hash } = this.props
    if (hash !== '') {
      return this.scrollToId(hash)
    }
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps(nextProps, nextState) {
    const { hash } = nextProps
    if (hash !== '') {
      console.log(hash)
      return this.scrollToId(hash)
    }
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeoutId)
  }
  scrollToId = (hash) => {
    const timeoutId = setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({block: "start", behavior: "smooth"});
    }, 300)
    this.setState({ timeoutId })
  }
  render() {
    const { sections } = this.props
    return (
      <SectionList items={sections} />
    )
  }
}


export default pageContainer(Page)
