// src/routes.js
import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import RecommendedAgencies from './components/RecommendedAgencies';

export default (
    <Route path="/" component={Layout}>
        <Route path="recomAgencies" component={RecommendedAgencies}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
