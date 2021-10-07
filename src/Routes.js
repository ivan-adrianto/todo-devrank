import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TodoDetail from './pages/TodoDetail'

function Routes() {
    return (
        <Switch>
            <Route path="/detail/:todoId" component={TodoDetail} />
            <Route path="/" component={Dashboard} />
        </Switch>
    )
}

export default Routes
