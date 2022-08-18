import React, { useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AppContext from '../Lib/AppContext'

import {
  Card,
  CardContent,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core"
import {logoFull} from '../utils/constants'
import StudentValidateForm from './StudentValidateForm'
import SelectClass from './SelectClass'

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const Selection = ({
  isLoading,
  isValidStudent,
  error,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <img className={classes.formFullLogo} src={logoFull} alt="logo"/>
        {error ? (
          <Typography className={classes.validateError}>{`Lo sentimos, ${error.toLowerCase()}`}</Typography>
        ) : null}
        {!isValidStudent && !isLoading ? (
          <StudentValidateForm />
        ) : null }
        {isValidStudent && !isLoading ? (
          <SelectClass />
        ) : null }
        {isLoading ? (
          <div className={classes.loaderContainer}>
            <CircularProgress
              size={100}
              color="inherit"
            />
          </div>
        ) : null}
        </CardContent>
    </Card>
  )
}
const Wrapped = props =>{
  const {
    isValidate,
    isLoading,
    requestError,
  } = useContext(AppContext)
  const classes = useStyles()

  return (
    <div className={classes.appBackground}>
      <Container className={classes.selectionContainer}>
        <Selection
          {...props}
          isValidStudent={isValidate}
          isLoading={isLoading}
          error={requestError}
        />
      </Container>
    </div>
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized
