import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout.component";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
