import { connect } from 'react-redux'
import { addItem } from '@/redux/cart/cart.actions'

import CustomButton from '@/components/custom-button/CustomButton'

// import './CollectionItem.scss'

import { CollectionItemContainer } from './CollectionItem.styles'

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <CollectionItemContainer>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <div className='name'>{name}</div>
        <div className='price'>{price}</div>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        Add to Cart
      </CustomButton>
    </CollectionItemContainer>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)
