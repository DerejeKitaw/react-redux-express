import React from 'react'
import { Card, CardMedia, CardText } from 'material-ui/Card'

import iframeContainer from '../../containers/iframes/iframeContainer'
import AdminIframeEdit from './AdminIframeEdit'
import { startEdit } from '../../actions/iframes'

const AdminIframeItem = ({ dispatch, item, isFetching }) => {
  const {
    editing,
    values: {
      backgroundColor,
      flex,
      iframe,
      margin,
      width,
      zDepth
    }
  } = item
  return (
    <Card
      onTouchTap={() => dispatch(startEdit(item._id))}
      zDepth={zDepth}
      style={{ backgroundColor, flex, margin, width, cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', paddingBottom: '50%' }}>
        <iframe
          title="iframe"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={iframe} frameBorder="0" allowFullScreen
        >
        </iframe>
      </div>
      {editing && <AdminIframeEdit item={item} />}
    </Card>
  )
}

export default iframeContainer(AdminIframeItem)
