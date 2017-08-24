import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const cardContainer = (ComposedComponent) => {
  class CardContainer extends Component {
    state = {
      elevation: null
    }
    componentWillMount() {
      const { values } = this.props.item
      if (values.elevation) this.setState({ elevation: values.elevation })
    }
    handleMouseEnter = () => this.setState({ elevation: 4 })
    handleMouseLeave = () => this.setState({ elevation: 1 })
    render() {
      const { elevation } = this.state
      const {
        cardStyle,
        dispatch,
        editItem,
        isFetching,
        item,
        typography
      } = this.props
      const { link } = item.values
      const cursor = link && 'pointer'
      const events = link && {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }
      const props = {
        cardStyle,
        dispatch,
        elevation,
        events,
        item,
        cursor,
        typography
      }
      return (
        isFetching ? null : <ComposedComponent {...props} />
      )
    }
  }
  const mapStateToProps = ({
    brand: { isFetching, cardStyle, typography },
    editItem
  }, {
    item: { values, image }
  }) => ({
    cardStyle,
    editItem: editItem.kind === 'CARD_SECTION' || editItem.kind === 'CARD' ? editItem : null,
    hasButtons: item.values.button1Text ? true : false,
    hasHeading: item.values.h1Text || item.values.h2Text || item.values.h3Text ? true : false,
    hasMedia: item.image.src || item.values.iframe ? true : false,
    hasParagraph: item.values.pText && item.values.pText.length > 8 ? true : false,
    isFetching,
    item,
    typography
  })
  CardContainer.propTypes = {
    cardStyle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    editItem: PropTypes.object,
    hasButtons: PropTypes.bool.isRequired,
    hasHeading: PropTypes.bool.isRequired,
    hasMedia: PropTypes.bool.isRequired,
    hasParagraph: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    typography: PropTypes.object.isRequired
  }
  return connect(mapStateToProps)(CardContainer)
}

export default cardContainer
