import React from 'react'
import { Route } from 'react-router'

import { collection, getDocs } from '@firebase/firestore'
import {
  db,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionPage from '../collection/CollectionPage'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/WithSpinner'
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null

  async componentDidMount() {
    const { updateCollections } = this.props
    const collectionSnapshot = await getDocs(collection(db, 'collections'))
    const collectionsMap = convertCollectionsSnapshotToMap(collectionSnapshot)
    updateCollections(collectionsMap)
    this.setState({ loading: false })
  }

  render() {
    const { match } = this.props
    const { loading } = this.state
    return (
      <main className='shop-page'>
        {/* {match.isExact ? <h1 className='title'>Collections</h1> : null} */}

        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </main>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
