import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Main from "./components/Main";
import EditContact from "./components/EditContact";
import CreateContact from "./components/CreateContact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Main />} />
          <Route path="/addresses/:id/edit" element={<EditContact />} />
          <Route path="/addresses/create" element={<CreateContact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
