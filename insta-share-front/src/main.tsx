import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/root.ts";
import { PersistGate } from "redux-persist/integration/react";
import { MainRouter } from "./routes/MainRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MainRouter />
    </PersistGate>
  </Provider>
);
