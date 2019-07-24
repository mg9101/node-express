// src/routes.js
import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import AgenciesTable from './components/AgenciesTable';

export default (
    <Route path="/" component={Layout}>
        <Route path="agencies" component={AgenciesTable}/>
        <Route path="agencies" component={RecommendedAgencies}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
