import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Editor from '@monaco-editor/react'

import styles from './styles'

const useStyles = makeStyles(styles)

const CodeEditor = (props) => {
  const classes = useStyles()

  return (
    <Editor
      height="300px"
      defaultLanguage="cpp"
      theme='vs-dark'
      className={classes.editor}
      wrapperClassName={classes.wrapperEditor}
      {...props}
    />
  )
}

export default CodeEditor
