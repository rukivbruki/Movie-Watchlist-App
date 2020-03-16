import * as React from 'react';
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Router} from "react-router-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import history from "./history.js";
import reducer from "./reducer/reducer.js";
import {Operation as FilmsOperation} from "./reducer/films/films.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import {Operation as FavoritesOperation} from "./reducer/favorites/favorites.js";
import {Operation as PromoOperation} from "./reducer/promo/promo.js";
import withActiveCard from "./hocs/with-active-card/with-active-card";
import withPlayer from "./hocs/with-player/with-player";
import {createAPI} from "./api.js";
import App from "./components/app/app";

const api = createAPI(() => void 0);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(FilmsOperation.loadMovies());
store.dispatch(FavoritesOperation.loadFavorites());
store.dispatch(UserOperation.check());
store.dispatch(PromoOperation.loadPromo());

const WrappedApp = withActiveCard(withPlayer(App));

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <WrappedApp/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
