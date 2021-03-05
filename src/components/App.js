import { useEffect, useState } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";
import { without, findIndex } from "lodash";

function App() {
  const [data, setData] = useState(null);
  const [formDisplay, setDisplay] = useState(false);
  const [orderdBy, setOrder] = useState("ownerName");
  const [orderDir, setDir] = useState("desc");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.map((item, i) => {
            return (item = { ...item, aptId: i });
          })
        )
      );
  }, []);
  console.log(data);
  const toggleDisplay = () => {
    setDisplay(!formDisplay);
  };

  const deleteApt = (apt) => {
    let tempApts = data;
    tempApts = without(tempApts, apt);
    setData(tempApts);
  };

  const addAppointment = (apt) => {
    let tempApts = data;
    tempApts.unshift(apt);
    setData(tempApts);
  };
  if (!data) return null;

  let order;
  let filteredApts = data;
  if (orderDir === "asc") {
    order = 1;
  } else {
    order = -1;
  }

  filteredApts = filteredApts
    .sort((a, b) => {
      if (a[orderdBy].toLowerCase() < b[orderdBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    })
    .filter((eachItem) => {
      return (
        eachItem.petName.toLowerCase().includes(query.toLowerCase()) ||
        eachItem.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        eachItem.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    });

  const changeOrder = (order, dir) => {
    setOrder(order);
    setDir(dir);
  };

  const search = (query) => {
    setQuery(query);
  };

  const updateInfo = (name, value, id) => {
    let tempApts = data;
    let aptIndex = findIndex(data, { aptId: id });
    tempApts[aptIndex][name] = value;
    setData(tempApts);
  };

  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <SearchAppointments
                changeOrder={changeOrder}
                orderdBy={orderdBy}
                orderDir={orderDir}
                search={search}
              />
              <AddAppointments
                formDisplay={formDisplay}
                toggleDisplay={toggleDisplay}
                addAppointment={addAppointment}
              />
              <ListAppointments
                appointments={filteredApts}
                deleteApt={deleteApt}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
