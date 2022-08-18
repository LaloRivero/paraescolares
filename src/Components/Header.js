import React, { useState } from "react";
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { logo } from '../utils/constants'
import UploadGroupsDialog from './UploadGroupsDialog'
import DownloadListDiaglog from './DownloadListDialog'

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const Header = ({setShowListPage, setShowParaescolaresPage}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const classes = useStyles()
  return (
    <>
      {uploadDialogOpen ? (
        <UploadGroupsDialog
          uploadDialogOpen={uploadDialogOpen}
          setUploadDialogOpen={setUploadDialogOpen}
        />
      ) : null}
      {downloadDialogOpen ? (
        <DownloadListDiaglog
          downloadDialogOpen={downloadDialogOpen}
          setDownloadDialogOpen={setDownloadDialogOpen}
        />
      ): null}
      <div className={classes.header}>
        <Link className={classes.headerLogoContainer} to="/dashboard"> <img className={classes.headerLogo} src={logo} alt="logo"/></Link>
        <div className={classes.headerOptions}>
          <p className={classes.headerOptionsItem} onClick={() => setShowParaescolaresPage(true)}>Paraescolares</p>
          <p className={classes.headerOptionsItem} onClick={() => setShowListPage(true)}>Listados</p>
          <p className={classes.headerOptionsItem} onClick={() => setUploadDialogOpen(true)}>Subir Grupos</p>
          <p className={classes.headerOptionsItem} onClick={() => setDownloadDialogOpen(true)}>Descargar Grupos</p>
        </div>
      </div>
    </>
  )
}

const Memoized = React.memo(Header)
export default Memoized