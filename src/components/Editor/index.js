import React, { useRef } from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'
import { APIs } from '~/config'

const Editor = ({
  initialValue,
  onChange: onChangeProp,
}) => {
  const ref = useRef(null)

  const onChange = () => {
    if (ref) onChangeProp(ref.current.getContent())
  }

  const onUpload = async (blobInfo, success, failure) => {
    try {
      const signedUrlResponse = await APIs.getSingedUrl({
        type: 'lessons',
        ext: blobInfo.filename().split('.').pop(),
        content_type: blobInfo.blob().type,
      })

      if (!signedUrlResponse.ok) return

      const { signedRequest, url } = signedUrlResponse.data.data
      await APIs.uploadToS3(signedRequest, blobInfo.blob())
      success(url)
    } catch (e) {
      failure(`Có lỗi xảy ra khi upload ảnh: ${e.message}`)
    }
  }

  return (
    <TinyMCEEditor
      onInit={(evt, editor) => ref.current = editor}
      initialValue={initialValue}
      onChange={onChange}
      apiKey="u64s5de4699db2cvf13p987n2ns6jwvyzied8a4st2am92lh"
      init={{
        images_upload_handler: onUpload,
        height: 400,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | image',
      }}
    />
  )
}

export default Editor
