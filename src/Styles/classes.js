const classes = {
  classesContainer: {
    height: '100vh',
    maxWidth: '100%',
    background: '#6a1a2c',
  },
  createClassButton: {
    marginRight: '40px',
    color: 'white',
    background: '#282425',
  },
  uploadButton: {
    marginLeft:'15px',
    color: 'white',
    background: '#282425',
  },
  searchButtonContainer:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  searchButton: {
    alignSelf: 'flex-end',
    marginLeft:'15px',
    color: 'white',
    background: '#282425',
  },
  createClassContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: '40px',
    background: '#6a1a2c',
  },
  classCard: {
    margin: '20px 40px 0px 40px',
  },
  createClassContainerDialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: '450px',
    minHeight: '550px'
  },
  formClassContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '80%'
  },
  formClassFullLogo:{
    marginTop: '20px',
    width: '40%',
    alignSelf: 'center'
  },
  formClassInput: {
    marginTop: '20px',
    width: '100%'
  },
  formCustomClassInput: {
    height: '50px',
    paddingLeft: '15px',
    background:'#eeeeee',
    borderRadius: '5px 5px 0 0',
    width: '100%'
  },
  formClassDialogContentText: {
    alignSelf: 'center'
  },
  listCard: {
    minWidth: '80%',
    margin: '20px'
  },
  listCardContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px'
  },
  listCardSideSelectors:{
    display: 'flex',
  },
  listSelectorElements: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    marginLeft: '25px',
    '& .MuiOutlinedInput-input': {
      padding: '10px 14px'
    }
  },
  listSelectClass: {
    height: '40px',
    width: '220px',
    marginTop: '20px',
    marginBottom: '20px'
  },
}

export default classes