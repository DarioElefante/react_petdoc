import "../css/App.css";

function SearchAppointments(props) {
  return (
    <div className="search-appointments row justify-content-center my-4">
      <div className="col-md-6">
        <div className="input-group">
          <input
            id="SearchApts"
            type="text"
            className="form-control"
            aria-label="Search Appointments"
            onChange={(e) => props.search(e.target.value)}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort by: <span className="caret" />
            </button>

            <div className="sort-menu dropdown-menu dropdown-menu-right">
              <button
                className={`sort-by dropdown-item ${
                  props.orderdBy === "petName" ? "active" : ""
                }`}
                onClick={(e) => props.changeOrder("petName", props.orderDir)}
                href="#"
              >
                Pet Name
              </button>
              <button
                className={`sort-by dropdown-item ${
                  props.orderdBy === "aptDate" ? "active" : ""
                }`}
                href="#"
                onClick={(e) => props.changeOrder("aptDate", props.orderDir)}
              >
                Date
              </button>
              <button
                className={`sort-by dropdown-item ${
                  props.orderdBy === "ownerName" ? "active" : ""
                }`}
                onClick={(e) => props.changeOrder("ownerName", props.orderDir)}
                href="#"
              >
                Owner
              </button>
              <div role="separator" className="dropdown-divider" />
              <button
                className={`sort-by dropdown-item ${
                  props.orderDir === "asc" ? "active" : ""
                }`}
                onClick={(e) => props.changeOrder(props.orderdBy, "asc")}
                href="#"
              >
                Asc
              </button>
              <button
                className={`sort-by dropdown-item ${
                  props.orderDir === "desc" ? "active" : ""
                }`}
                onClick={(e) => props.changeOrder(props.orderdBy, "desc")}
                href="#"
              >
                Desc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchAppointments;
