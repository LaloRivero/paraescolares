import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Header from './Header'
import Classes from './Classes'
import ClassesList from './ClassesList'

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const Dashboard = () => {
  const [showListPage, setShowListPage] = useState(false)
  const [showParaescolaresPage, setShowParaescolaresPage] = useState(true)

  const handleShowListPage = () => {
    setShowListPage(true)
    setShowParaescolaresPage(false)
  }
  const handleShowParaescolaresPage = () =>{
    setShowListPage(false)
    setShowParaescolaresPage(true)
  }
  return (
    <>
      <Header
        setShowListPage={handleShowListPage}
        setShowParaescolaresPage={handleShowParaescolaresPage}
      />
      {showParaescolaresPage && !showListPage ?
        <Classes />
      : null}
      {showListPage && !showParaescolaresPage ?
        <ClassesList />
      : null}
    </>
  )
}

const Wrapped = () => {
  const classes = useStyles()
  return(
    <Dashboard className={classes.appBackground}/>
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized