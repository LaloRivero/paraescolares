import React, { useState, useContext, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AppContext from '../Lib/AppContext'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@material-ui/core"

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const UploadGroupDialog = ({isOpen, onClose, doCreateNewGroup, isLoading}) => {
  const [file, setFile] = useState(null)
  const uploadInputRef = useRef(null)
  const classes = useStyles()

  const onChange = value => {
    setFile(value?.target?.files[0])
  }

  const handleUploadGroup = async () => {
    if (await doCreateNewGroup(file)) {
      onClose()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Subir Grupos</DialogTitle>
      <DialogContent>
        Selecciona el listado de los alumnos en formato .csv
        <input
          ref={uploadInputRef}
          type='file'
          accept='.csv'
          onChange={onChange}
          hidden
        />
      </DialogContent>
      {isLoading ? (
        <div className={classes.selectDialogLoader}>
          <CircularProgress
            size={100}
            color="inherit"
          />
        </div>
      ): null}
      <DialogActions>
        <p>{file ? file?.name : null}</p>
        <Button
          className={classes.uploadButton}
          onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
        >
          Seleccionar archivo
        </Button>
        <Button
          className={classes.uploadButton}
          onClick={() => handleUploadGroup()}
        >
          Subir
        </Button>
      </DialogActions>
    </Dialog>
  )

}

const Wrapped = ({
  uploadDialogOpen,
  setUploadDialogOpen
}) => {
  const {
    doCreateNewGroup,
    isLoading
  } = useContext(AppContext)

  const handleCloseDialog = () => setUploadDialogOpen(false)
  return (
    <UploadGroupDialog
      doCreateNewGroup={doCreateNewGroup}
      isLoading={isLoading}
      isOpen={uploadDialogOpen}
      onClose={() => handleCloseDialog()}
    />
  )
}
const Memoized = React.memo(Wrapped)
export default Memoized