import "./App.css";
import { Switch, Route } from "react-router-dom";
import { loadFonts } from "./utils/utils";

import HomePage from "./pages/homepage/HomePage.component";
import ShopPage from "./pages/shop/ShopPage.component";

let fontsToLoad = [
  {
    name: "openSansCondensed",
    url: "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap",
  },
];

function App() {
  loadFonts(fontsToLoad);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
