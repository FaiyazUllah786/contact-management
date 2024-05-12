import AddContact from "./components/AddContact";
import AllContact from "./components/AllContact";
import Contacts from "./components/Contacts";
import "./index.css";

const App = () => {
  return (
    <div className="m-4 flex gap-4 flex-col lg:flex-row justify-center items-center lg:items-start">
      <AddContact />
      <Contacts />
    </div>
  );
};

export default App;
