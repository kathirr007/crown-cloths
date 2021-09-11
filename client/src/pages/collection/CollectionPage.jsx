import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/CollectionItem'
import {
  selectCollection,
  selectIsShopErrorMessage
} from '../../redux/shop/shop.selectors'

import './CollectionPage.scss'

const CollectionPage = ({ collection, errorMessage }) => {
  if (errorMessage) {
    return (
      <div className='collection-page'>
        <p>{errorMessage}</p>
      </div>
    )
  }
  let { title, items } = collection
  return (
    <div className='collection-page'>
      <h2 className='title'>{title} Collection</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  errorMessage: selectIsShopErrorMessage(state)
})

export default connect(mapStateToProps)(CollectionPage)
