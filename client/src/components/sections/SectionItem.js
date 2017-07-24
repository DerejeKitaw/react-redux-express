import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import ButtonItem from '../../containers/buttons/ButtonItem'
import CardItem from '../../containers/cards/CardItem'
import ContactForm  from '../../containers/users/ContactForm'
import ProductItemContainer from '../../containers/products/ProductItemContainer'
import SlideList from '../../containers/slides/SlideList'

class SectionItem extends Component {
  state = {
    image: null,
    loading: false
  }
  componentWillMount() {
    const { image } = this.props.item
    if (image.src) {
      this.setState({ loading: true })
      const img = new Image()
      const src = image.src
      img.src = src
      img.onload = this.setState({ image: src, loading: false })
    }
  }
  renderComponents = (components) => {
    const componentList = (component) => {
      const { type, componentId } = component
      switch(type) {
        case 'Button':
          return <ButtonItem key={component._id} componentId={componentId}  />
        case 'Contact':
          return <ContactForm key={component._id} componentId={componentId}  />
        case 'Card':
          return <CardItem key={component._id} componentId={componentId}  />
        case 'Product':
          return <ProductItemContainer key={component._id} componentId={componentId} />
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  render() {
    const { loading } = this.state
    const { item } = this.props
    const {
      backgroundColor,
      flexFlow,
      justifyContent,
      margin,
      minHeight
    } = item.values
    const slides = item.components.filter(value => value.type === 'Slide')
    const backgrounds = this.state.image && {
      backgroundImage: `url(${this.state.image})`,
      transition: 'opacity .9s ease-in-out',
      backgroundPosition: 'center center',
      backgroundRepeat:  'no-repeat',
      backgroundSize:  'cover',
      zIndex: -1
    }
    return (
      !loading &&
      <CSSTransitionGroup
        transitionName="image"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div style={{ ...backgrounds }}>
          <section style={{
            display: 'flex',
            backgroundColor,
            flexFlow,
            justifyContent,
            margin,
            minHeight
          }}>
            {this.renderComponents(item.components)}
          </section>
          { !slides.length ? null :
          <section style={{ backgroundColor, minHeight }}>
              <SlideList slides={slides} />
            </section>
          }
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default SectionItem
