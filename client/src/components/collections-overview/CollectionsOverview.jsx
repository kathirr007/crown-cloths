import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectCollectionsForPreview,
  selectIsShopErrorMessage
} from '../../redux/shop/shop.selectors'

import CollectionPreview from '../collection-preview/CollectionPreview'

import './CollectionsOverview.scss'

const CollectionsOverview = ({ collections, errorMessage }) => {
  // console.log(collections)
  return (
    <div className='collections-overview'>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))
      )}
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
  errorMessage: selectIsShopErrorMessage
})

export default connect(mapStateToProps)(CollectionsOverview)
