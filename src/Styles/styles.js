import login from './login'
import header from './header'
import classes from './classes'
import dialog from './dialog'

// eslint-disable-next-line import/no-anonymous-default-export
const styles = theme => ({
  ...login,
  ...header,
  ...classes,
  ...dialog,
  appBackground:{
    background:'#6a1a2c',
    height:'100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      height:'100%'
    }
  },
  listBackground:{
    background:'#6a1a2c',
    height:'100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]:{
      height:'100%'
    }
  },
  selectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '550px',
    minHeight: '700px',
    marginTop: '40px',
    marginBottom: '40px'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  formFullLogo:{
    width: '80%',
    marginBottom: '20px',
    alignSelf: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '10px 20px 10px 20px'
  },
  selecInputLabel:{
    fontSize: '14px',
    margin: '0 0 0 10px'
  },
  selectItem:{
    paddingRight:'10px',
    height: '100%',
    width: '100%'
  },
  selectErrorLabel: {
    marginTop: '5px 0 0 0',
    fontSize: '8px',
    color: '#6a1a2c',
  },
  cardTitle: {
    fontSize: '20px',
  },
  formInput: {
    color:'secondary',
    paddingBottom: '35px',
  },
  submitFormButton: {
    maxWidth: '100px',
    alignSelf: 'flex-end',
    marginTop: '20px',
    background: '#282425',
    color: 'white'
  },
  succedText: {
    color: '#282425',
  },
  selectText: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
  circularProgress: {
    background: 'transparent'
  },
  loaderContainer: {
    width:'100%',
    marginTop: '30%',
    color: '#6a1a2c',
  },
  validateError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: '50px',
    width:'90%',
    marginBottom: '15px',
    fontSize: '14px',
    fontWeight: 700,
    color: 'white',
    background: '#6a1a2c',
    borderRadius: '7px',
  },
  selectActionButtons: {
    alignSelf: 'flex-end',
    marginTop: '100px'
  },
  actionCancelButton: {
    marginRight: '20px',
  },
  actionButton: {
    marginRight: '20px',
    background: '#282425',
    color: 'white'
  },
  selectDialogLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6a1a2c',
    marginBottom: '15px'
  },
})

export default styles