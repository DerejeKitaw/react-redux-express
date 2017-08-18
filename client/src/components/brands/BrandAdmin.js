import React from 'react'

import brandContainer from '../../containers/brands/brandContainer'
import AppBarAdmin from './AppBarAdmin'
import ArticleAdmin from './ArticleAdmin'
import BusinessAdmin from './BusinessAdmin'
import BodyAdmin from './BodyAdmin'
import CardAdmin from './CardAdmin'
import ThemeAdmin from './ThemeAdmin'
import FooterAdmin from './FooterAdmin'

const BrandAdmin = ({
  _id,
  appBar,
  article,
  body,
  business,
  card,
  footer,
  theme
}) => {
  return (
    <section className="page">
      <AppBarAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        image={appBar.image}
        initialValues={appBar.values}
      />
      <br/>
      <ArticleAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...article.values,
          imageElevation: article.values.imageElevation && article.values.imageElevation.toString()
        }}
      />
      <br/>
      <BodyAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={body.values}
      />
      <br/>
      <BusinessAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={business.values}
      />
      <br/>
      <CardAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...card.values,
          imageElevation: card.values.imageElevation && card.values.imageElevation.toString()
        }}
      />
      <br />
      <FooterAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        image={footer.image}
        initialValues={footer.values}
      />
      <br/>
      <HeroAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
            ...hero.values,
          imageElevation: hero.values.imageElevation && hero.values.imageElevation.toString()
        }}
      />
      <br />
      <ThemeAdmin
        _id={_id}
        backgroundColor={theme.palette.canvasColor}
        fontFamily={theme.fontFamily}
        initialValues={{
          fontFamily: theme.fontFamily,
          ...theme.palette
        }}
      />
      <br/><br/>
    </section>
  )
}

export default brandContainer(BrandAdmin)
