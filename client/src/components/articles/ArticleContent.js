import React from 'react'
import PropTypes from 'prop-types'

import ArticleMedia from './ArticleMedia'
import Buttons from '../buttons/Buttons'
import Text from '../typography/Text'

const ArticleContent = ({
  articleStyle: {
    values: {
      button1BackgroundColor,
      button2BackgroundColor,
      button1Color,
      button2Color,
      h1Align,
      h1Color,
      h1TextShadow,
      h2Align,
      h2Color,
      h2TextShadow,
      h3Align,
      h3Color,
      h3TextShadow,
      mediaBorder,
      mediaBoxShadow,
      mediaElevation,
    }
  },
  dispatch,
  hasButtons,
  hasMedia,
  hasText,
  item: {
    _id,
    editing,
    image,
    values: {
      button1Text,
      button1Link,
      button2Text,
      button2Link,
      flexFlow,
      h1Text,
      h2Text,
      h3Text,
      iframe,
      mediaAlign,
      mediaFlex,
      pText,
      textFlex,
    },
  }
}) => {
  return (
    <article
      className="article"
      style={{ flexFlow }}
    >
      {hasMedia && mediaAlign === 'left' ?
        <ArticleMedia
          mediaBoxShadow={mediaBoxShadow}
          mediaElevation={mediaElevation}
          mediaFlex={mediaFlex}
          image={image}
          iframe={iframe}
        />
      : null}
      {hasText || hasButtons ?
        <div style={{ flex: textFlex }}>
          {hasText &&
            <Text
              h1Align={h1Align}
              h2Align={h2Align}
              h3Align={h3Align}
              h1Color={h1Color}
              h2Color={h2Color}
              h3Color={h3Color}
              h1Text={h1Text}
              h2Text={h2Text}
              h3Text={h3Text}
              pText={pText}
              h1TextShadow={h1TextShadow}
              h2TextShadow={h2TextShadow}
              h3TextShadow={h3TextShadow}
            />
          }
          {hasButtons &&
            <Buttons
              button1BackgroundColor={button1BackgroundColor}
              button2BackgroundColor={button2BackgroundColor}
              button1Color={button1Color}
              button2Color={button2Color}
              button1Link={button1Link}
              button2Link={button2Link}
              button1Text={button1Text}
              button2Text={button2Text}
              dispatch={dispatch}
            />
          }
        </div>
      : null}
      {hasMedia && mediaAlign === 'right' ?
        <ArticleMedia
          mediaBoxShadow={mediaBoxShadow}
          mediaElevation={mediaElevation}
          mediaFlex={mediaFlex}
          image={image}
          iframe={iframe}
        />
      : null}
    </article>
  )
}

ArticleContent.propTypes = {
  articleStyle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasButtons: PropTypes.bool.isRequired,
  hasMedia: PropTypes.bool.isRequired,
  hasText: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default ArticleContent