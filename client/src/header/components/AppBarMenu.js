import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import muiThemeable from 'material-ui/styles/muiThemeable'

import SearchBar from '../../search/components/SearchBar'
import SigninSignout from '../../users/components/SigninSignout'
import CartIcon from '../../carts/components/CartIcon'
import AppBarBrand from './AppBarBrand'

class AppBarMenu extends Component {
  state = {
    searching: false,
    openMenu: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = () => this.setState({ openMenu: false })
  handleSearch = () => this.setState({ searching: !this.state.searching })
  render() {
    console.log('rendering appBar')
    const {
      dispatch,
      user,
      pages,
      brand: { business, appBar },
      muiTheme: { palette },
      path,
      hasProducts
    } = this.props
    return (
      <nav>
        {this.state.searching ?
          <SearchBar handleSearch={this.handleSearch} />

          :

          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
            <div style={{ cursor: 'pointer', maxHeight: 64}} onTouchTap={() => dispatch(push('/'))}>
              <AppBarBrand />
            </div>
            <span>
              <span className="appbar-nav">
                {pages.filter(page => page.slug !== 'home').map(page => (
                  <FlatButton
                    key={page._id}
                    style={{ color: path === `/${page.slug}` ? palette.primary1Color : appBar.textColor }}
                    onTouchTap={() => dispatch(push(`/${page.slug}`))}
                    label={page.name}
                    hoverColor="none"
                  />
                ))}
                <FlatButton
                  style={{ color: path === `/contact` ? palette.primary1Color : appBar.textColor }}
                  onTouchTap={() => dispatch(push(`/contact`))}
                  label="Contact"
                  hoverColor="none"
                />
              </span>
              {!hasProducts ? null :
                <IconButton
                  iconClassName="fa fa-search"
                  iconStyle={{ fontSize: 18}}
                  style={{ color: appBar.textColor }}
                  onTouchTap={() => this.setState({ searching: !this.state.searching })}
                />
              }
              <FlatButton
                onTouchTap={this.handleOpen}
                label={user.values.firstName ? `Hello, ${user.values.firstName}`: `SIGN IN`}
                hoverColor="none"
                style={{ color: appBar.textColor }}
              />
              <Popover
                open={this.state.openMenu}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleClose}
                animation={PopoverAnimationVertical}
              >
                <Menu>
                  <SigninSignout user={user} handleClose={this.handleClose} />
                </Menu>
              </Popover>
              { !hasProducts ? null :
                <IconButton
                  children={<CartIcon  />}
                  onTouchTap={() => dispatch(push('/cart'))}
                  style={{ padding: '12px 0' }}
                />
              }
            </span>
          </div>
        }
      </nav>
    )
  }
}

AppBarMenu = compose(connect(), muiThemeable())(AppBarMenu)

export default AppBarMenu
