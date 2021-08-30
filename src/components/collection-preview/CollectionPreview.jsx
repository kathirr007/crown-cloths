import { withRouter } from 'react-router'

import CollectionItem from '../collection-item/CollectionItem'

import './CollectionPreview.scss'

const CollectionPreview = ({ items, title, routeName, match, history }) => (
  <div className='collection-preview'>
    <h2
      tabIndex='0'
      className='title'
      role='navigation'
      onClick={() => history.push(`${match.path}/${routeName}`)}
      onKeyUp={(e) =>
        e.key === 'Enter' && history.push(`${match.path}/${routeName}`)
      }
    >
      {title.toUpperCase()}
    </h2>
    <div className='preview'>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
)

export default withRouter(CollectionPreview)
