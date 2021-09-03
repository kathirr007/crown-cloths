import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded
} from '../../redux/shop/shop.selectors'

import WithSpinner from '../../components/with-spinner/WithSpinner'
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/CollectionPage'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  async componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props
    return (
      <main className='shop-page'>
        {/* {match.isExact ? <h1 className='title'>Collections</h1> : null} */}

        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </main>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () =>
    dispatch(fetchCollectionsStartAsync('collections'))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
