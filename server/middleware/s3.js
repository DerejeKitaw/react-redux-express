import AWS from 'aws-sdk'

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
})

export const uploadFile = ({ Body, Key }) => {
  const buf = new Buffer(Body.replace(/^data:image\/\w+;base64,/, ""),'base64')
  return s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
    Body: buf,
    ACL: 'public-read'
  }).promise()
}

export const deleteFile = ({ Key }) => {
  return s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET,
    Key,
  }).promise()
}

export const handleFile = ({ oldKey, Key, Body }) => {
  if (Body) {
    return uploadFile({ Body, Key })
  } else if (oldKey) {
    return deleteFile({ Key: oldKey })
  }
  return Promise.resolve({ data: null })
}
