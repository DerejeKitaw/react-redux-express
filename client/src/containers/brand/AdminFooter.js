import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import renderSelectField from '../../components/fields/renderSelectField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

class AdminFooter extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool, submitted: false })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { _id, dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardTitle title="Footer" />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={item.image}
            _id={_id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `footer/${_id}`
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
          style={{ flex: '1 1 auto' }}
        >
          <div className="field-container">
            <Field
              name="backgroundColor"
              label="backgroundColor"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="textColor"
              label="textColor"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="borderBottom"
              label="borderBottom"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="imageAlign"
              component={renderSelectField}
              label="imageAlign"
              className="field"
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="right" primaryText="right" />
            </Field>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="FOOTER"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminFooter = reduxForm({
  form: 'footer'
})(AdminFooter)

const mapStateToProps = (state, { item: { values } }) => ({
  initialValues: {
    ...values
  }
})

AdminFooter = connect(mapStateToProps)(AdminFooter)

export default AdminFooter
