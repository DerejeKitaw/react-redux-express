import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import loadImage from '../images/loadImage'
import AdminButton from '../buttons/AdminButton'
import AdminCardItem from '../cards/AdminCardItem'
import AdminSectionCarousel from '../carousels/AdminSectionCarousel'
import AdminContactForm  from '../../containers/users/AdminContactForm'
import AdminIframe from '../iframes/AdminIframe'
import AdminImage from '../images/AdminImage'
import AdminProduct from '../products/AdminProduct'
import AdminSectionEdit from '../sections/AdminSectionEdit'
import AdminText from '../texts/AdminText'
import AdminTitle from '../titles/AdminTitle'
import { startEdit } from '../../actions/sections'

const renderComponents = (components, item) => {
  const componentList = (component) => {
    const { type, componentId } = component
    switch(type) {
      case 'Button':
        return <AdminButton key={component._id} componentId={componentId}  />
      case 'Contact':
        return <AdminContactForm key={component._id} componentId={componentId} sectionId={item._id}  />
      case 'Carousel':
        return <AdminSectionCarousel key={component._id} componentId={componentId} />
      case 'Card':
        return <AdminCardItem key={component._id} componentId={componentId}  />
      case 'Iframe':
        return <AdminIframe key={component._id} componentId={componentId} />
      case 'Image':
        return <AdminImage key={component._id} componentId={componentId} />
      case 'Product':
        return <AdminProduct key={component._id} componentId={componentId} />
      case 'Text':
        return <AdminText key={component._id} componentId={componentId} />
      case 'Title':
        return <AdminTitle key={component._id} componentId={componentId} />
      default:
        return
    }
  }
  return components.map(component => componentList(component))
}

const AdminSection = ({ dispatch, item, page }) => {
  const {
    _id,
    components,
    editing,
    image,
    values: {
      backgroundColor,
      containerMarginTop,
      flexFlow,
      justifyContent,
      alignItems,
      margin,
      padding,
      pageLink,
      minHeight
    }
  } = item
  const backgroundImage = image && image.src && { backgroundImage: `url(${image.src})`,   transition: 'all 600ms ease-in-out' }
  const backgroundImageClass = image && image.src && { className: 'background-image' }
  return (
    <div
      id={pageLink ? pageLink : _id}
      style={{
        ...backgroundImage,
        backgroundColor,
        marginTop: containerMarginTop
      }}
      {...backgroundImageClass}
    >
      <section>
        <div style={{
          display: 'flex',
          flexFlow,
          minHeight,
          justifyContent,
          alignItems,
          margin,
          padding
        }}>
          {renderComponents(components, item)}
        </div>
        <div style={{ display: 'flex' }}>
          <RaisedButton
            type="button"
            label="Edit Section"
            style={{ margin: 8, flex: '1 1 auto', zIndex: 1 }}
            onTouchTap={() => dispatch(startEdit(_id))}
          />
        </div>
        {editing &&
          <AdminSectionEdit
            item={item}
            page={page}
            sectionId={item._id}
          />
        }
      </section>
    </div>
  )
}

export default loadImage(AdminSection)
