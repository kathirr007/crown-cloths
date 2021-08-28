import './CollectionPreview.scss'

import CollectionItem from '../collection-item/CollectionItem'

const CollectionPreview = ({ items, title }) => (
  <div className='collection-preview'>
    <h2>{title.toUpperCase()}</h2>
    <div className='preview'>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
)

export default CollectionPreview
