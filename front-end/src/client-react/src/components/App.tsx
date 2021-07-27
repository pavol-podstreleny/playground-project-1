import { CustomerPage } from "./customerPage/customerPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./common/navigation/navigation";
import NotFound from "./common/errors/notFound/notFound";
import { Provider } from "react-redux";
import { store } from "../store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation
          menuItems={[
            {
              name: "Customers",
              url: "/customers",
            },
          ]}
        />
        <main className="center">
          <Switch>
            <Route path="/not-found" exact component={NotFound} />
            <Route path="/customers" exact component={CustomerPage} />
            <Redirect from="/" exact to="/customers" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
