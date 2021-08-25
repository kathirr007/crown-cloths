import React from "react";
import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/CollectionPreview.component";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <main className="shop-page">
        <h1>Collections</h1>
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </main>
    );
  }
}
export default ShopPage;
