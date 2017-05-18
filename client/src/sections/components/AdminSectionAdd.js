import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAdd } from '../actions/index'

const AdminSectionAdd = ({ dispatch, page }) => (
  <Card>
    <CardActions>
      <RaisedButton
        type="submit"
        label="Add New Section"
        primary={true}
        fullWidth={true}
        onTouchTap={() => {
          const add = {
            pageId: page._id,
            pageName: page.slug,
          }
          dispatch(fetchAdd(add))
        }}
      />
    </CardActions>
  </Card>
)


export default connect()(AdminSectionAdd)
