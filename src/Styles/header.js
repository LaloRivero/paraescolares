const header = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#dddddd',
    boxShadow: 2,
  },
  headerLogo:{
    width: '70px'
  },
  headerOptions:{
    display: 'flex',
    alignItems: 'center'
  },
  headerOptionsItem:{
    marginRight: '20px',
    textDecoration: 'none',
    "&:hover": {
      cursor: 'pointer',
      fontWeight: '600',
      color: '#6a1a2c'
    },
    fontWeight: '600',
    color: '#282425'
  },
}

export default header