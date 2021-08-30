import React from 'react'
import { connect } from 'react-redux'
import { selectCollections } from '../../redux/shop/shop.selectors'

import CollectionPreview from '@/components/collection-preview/CollectionPreview.jsx'
import { createStructuredSelector } from 'reselect'
const ShopPage = ({ collections }) => (
  <main className='shop-page'>
    <h1>Collections</h1>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </main>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(ShopPage)
