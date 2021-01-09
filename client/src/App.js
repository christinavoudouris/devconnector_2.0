import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'
import { LOGOUT } from './actions/types'
import BootstrapProvider from '@bootstrap-styled/provider'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

const App = ({ theme }) => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    })
  }, [])

  return <Provider store={store}>
    <BootstrapProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </BootstrapProvider>
  </Provider>
}

<App theme={{
  '$font-family-base': 'Helvetica',
  '$body-color': '#EA638C',
  '$btn-primary-bg': '#190E4F',
  '$btn-danger-bg': 'red',
  '$btn-light-bg': '#f8f9fa',
  '$btn-dark-bg': '#343a40',
  '$alert-border-radius': '.35rem',
  '$alert-success-text': '#EA638C',
  '$alert-success-bg': '#03012C',
  '$link-color': '#CCC',
}} />

export default App
