import React from 'react'
import { Route } from 'react-router'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/CollectionPage'

const ShopPage = ({ collections, match }) => (
  <main className='shop-page'>
    {/* {match.isExact ? <h1 className='title'>Collections</h1> : null} */}

    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route
      exact
      path={`${match.path}/:collectionId`}
      component={CollectionPage}
    />
  </main>
)

export default ShopPage
