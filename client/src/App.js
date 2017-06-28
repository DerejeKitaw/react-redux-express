import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import SearchList from './search/containers/SearchList'
import Header from './header/containers/Header'
import Footer from './footer/components/Footer'

injectTapEventPlugin()

const App = ({ isFetching, brandTheme, business, search, children }) => {
  return (
    isFetching ? null : brandTheme ?
      <MuiThemeProvider muiTheme={getMuiTheme(brandTheme)}>
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Helmet>
            <meta charSet="utf-8" />
            {business.name && <title>{business.name}</title>}
            <meta name="description" content={business.description} />
            <link rel="shortcut icon" href={business.image} />
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          <Header />
          <main style={{ backgroundColor: brandTheme.main.color }}>
            {search.value ? <SearchList /> : children}
          </main>
          <Footer />
        </CSSTransitionGroup>
      </MuiThemeProvider>

      :

      <MuiThemeProvider>
        <div>
          <Header />
          <main>
            { children }
          </main>
          <Footer />
        </div>
      </MuiThemeProvider>
  )
}

const mapStateToProps = ({ brand, search }) => {
  const { isFetching, theme, appBar, main, footer, business } = brand
  const brandTheme = theme ? {
    theme,
    appBar: {
      ...appBar.values
    },
    main,
    footer: {
      ...footer.values
    }
  } : null
  return {
    isFetching,
    brandTheme,
    business,
    search
  }
}

export default connect(mapStateToProps)(App)
