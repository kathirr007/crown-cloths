import "./CollectionPreview.styles.scss";

import CollectionItem from "../collection-item/CollectionItem.component";

const CollectionPreview = ({ items, title }) => (
  <div className="collection-preview">
    <h2>{title.toUpperCase()}</h2>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
