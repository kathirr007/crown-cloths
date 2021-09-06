import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'
import CollectionPageContainer from '../collection/CollectionPageContainer'
class ShopPage extends React.Component {
  async componentDidMount() {
    const { fetchCollectionsStart } = this.props
    fetchCollectionsStart()
  }

  render() {
    const { match } = this.props
    return (
      <main className='shop-page'>
        {/* {match.isExact ? <h1 className='title'>Collections</h1> : null} */}

        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </main>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart('collections'))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
