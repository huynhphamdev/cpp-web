import React, { useRef } from 'react'
import { Box, InputAdornment, Tooltip } from '@material-ui/core'
import { ImageOutlined } from '@material-ui/icons'
import _ from 'lodash-es'

import TextField from '~/components/TextField'
import { APIs } from '~/config'

const ImageUploader = ({ onChange: onChangeProp, containerStyle, ...props }) => {
  const ref = useRef()

  const onClick = () => {
    ref.current.click()
  }

  const onChange = async (e) => {
    const file = _.get(e, ['target', 'files', 0], null)
    if (!file) return

    const signedUrlResponse = await APIs.getSingedUrl({
      type: 'lessons',
      ext: file.name.split('.').pop(),
      content_type: file.type,
    })

    if (!signedUrlResponse.ok) return

    const { signedRequest, url } = signedUrlResponse.data.data
    await APIs.uploadToS3(signedRequest, file)
    onChangeProp(url)
  }

  return (
    <Tooltip
      title={!!props.value && <img src={props.value} width={200} />}
    >
      <div className={containerStyle}>
        <Box display="none">
          <input type="file" ref={ref} onChange={onChange} />
        </Box>
        <TextField
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="start">
                <ImageOutlined />
              </InputAdornment>
            ),
          }}
          onClick={onClick}
          {...props}
        />
      </div>
    </Tooltip>
  )
}

export default ImageUploader
