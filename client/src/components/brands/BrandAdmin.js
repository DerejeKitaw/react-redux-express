import React from 'react'
import PropTypes from 'prop-types'

import brandContainer from '../../containers/brands/brandContainer'
import BrandForm from './BrandForm'

import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

const formFields = [{
  name: 'appBar',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'fontFamily', type: 'text' },
    { name: 'fontSize', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'letterSpacing', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'navColor', type: 'text' },
    { name: 'textShadow', type: 'text' },
  ]
}, {
  name: 'articleStyle',
  fields: [
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right'] },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ]
}, {
  name: 'bodyStyle',
  fields: [
    { name: 'backgroundColor', type: 'text' }
  ]
}, {
  name: 'business',
  fields: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'street', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'state', type: 'text' },
    { name: 'zip', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'github', type: 'text' },
    { name: 'google', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'twitter', type: 'text' },
    { name: 'yelp', type: 'text' },
    { name: 'youtube', type: 'text' }
  ]
}, {
  name: 'cardStyle',
  fields: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' }
  ]
}, {
  name: 'footer',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'borderTop', type: 'text' },
    { name: 'borderBottom', type: 'text' },
    { name: 'margin', type: 'text' }
  ]
}, {
  name: 'heroStyle',
  fields: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' }
  ]
}, {
  name: 'productStyle',
  fields: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ]
}, {
  name: 'swipeableStyle',
  fields: [
    { name: 'buttonColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaElevation', type: 'number' },
    { name: 'h1Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: ['left', 'center', 'right']  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
  ]
}, {
  name: 'theme',
  fields: [
    { name: 'fontFamily', type: 'text' },
    { name: 'primary1Color', type: 'text' },
    { name: 'primary2Color', type: 'text' },
    { name: 'primary3Color', type: 'text' },
    { name: 'accent1Color', type: 'text' },
    { name: 'accent2Color', type: 'text' },
    { name: 'accent3Color', type: 'text' },
    { name: 'textColor', type: 'text' },
    { name: 'secondaryTextColor', type: 'text' },
    { name: 'alternateTextColor', type: 'text' },
    { name: 'canvasColor', type: 'text' },
    { name: 'borderColor', type: 'text' },
    { name: 'disabledColor', type: 'text' },
    { name: 'pickerHeaderColor', type: 'text' },
    { name: 'shadowColor', type: 'text' },
  ]
}, {
  name: 'typography',
  fields: [
    { name: 'h1FontFamily', type: 'text' },
    { name: 'h1FontSize', type: 'text' },
    { name: 'h1FontWeight', type: 'text' },
    { name: 'h1LetterSpacing', type: 'text' },
    { name: 'h1LineHeight', type: 'text' },
    { name: 'h2FontFamily', type: 'text' },
    { name: 'h2FontSize', type: 'text' },
    { name: 'h2FontWeight', type: 'text' },
    { name: 'h2LetterSpacing', type: 'text' },
    { name: 'h2LineHeight', type: 'text' },
    { name: 'h3FontFamily', type: 'text' },
    { name: 'h3FontSize', type: 'text' },
    { name: 'h3FontWeight', type: 'text' },
    { name: 'h3LetterSpacing', type: 'text' }
  ]
}]

const BrandAdmin = ({
  _id,
  appBar,
  articleStyle,
  bodyStyle,
  business,
  cardStyle,
  dispatch,
  footer,
  heroStyle,
  productStyle,
  swipeableStyle,
  theme,
  typography
}) => {
  const forms = [
    appBar,
    articleStyle,
    bodyStyle,
    business,
    cardStyle,
    dispatch,
    footer,
    heroStyle,
    productStyle,
    swipeableStyle,
    theme,
    typography
  ]
  return (
    <section className="page">
      {forms.map((form, i) => (
        <BrandForm
          _id={_id}
          backgroundColor={theme.palette.canvasColor}
          dispatch={dispatch}
          fields={formFields[i]}
          fontFamily={theme.fontFamily}
          form={form}
          initialValues={form.values}
        />
      ))}
    </section>
  )
}

BrandAdmin.propTypes = {
  _id: PropTypes.string.isRequired,
  appBar: PropTypes.object.isRequired,
  articleStyle: PropTypes.object.isRequired,
  bodyStyle: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
  cardStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  footer: PropTypes.object.isRequired,
  heroStyle: PropTypes.object.isRequired,
  productStyle: PropTypes.object.isRequired,
  swipeableStyle: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  typography: PropTypes.object.isRequired
}

export default brandContainer(BrandAdmin)
