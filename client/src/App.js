import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Helmet } from "react-helmet"

import Main from './Main'

injectTapEventPlugin()

class App extends Component {
  render() {
    const {
      brand: { appBar, body, business, theme },
      carousels,
      children,
      dispatch,
      isFetching,
      pathname,
      search,
    } = this.props
    if(!isFetching) {
      const appBody = document.getElementsByTagName('body')[0]
      appBody.style['background-color'] = body.values.backgroundColor
    }
    return (
      !isFetching &&
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            {business.name && <title>{business.name}</title>}
            {business.description && <meta name="description" content={business.description} />}
            {appBar.image && <link rel="shortcut icon" href={appBar.image.src} />}
            <link rel="canonical" href={window.location.hostname} />
          </Helmet>
          <Main
            carousels={carousels}
            children={children}
            dispatch={dispatch}
            pathname={pathname}
            search={search}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = ({
  brand,
  carousels,
  search
}, {
  location: { pathname }
}) => ({
  brand,
  isFetching: brand.isFetching || carousels.isFetching ? true : false,
  pathname,
  search,
  carousels
})

export default connect(mapStateToProps)(App)
