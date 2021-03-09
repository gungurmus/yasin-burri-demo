// Alle notwendigen Imports für das Frontend & die Kommunikation zum Backend
/*-------------------------------------------------------------------------*/
import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  // Die Initialisierung aller notwendingen States zusammen mit
  // ihren Manipulations-Methoden erfolgt hier
  /*-------------------------------------------------------------------------*/
  const [employeeList, setEmployeeList] = useState([]);
  const [prevSort, setPrevSort] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [searchIn, setSearchIn] = useState("");
  const [ageFilter, setAgeFilter] = useState(0);
  const [ageCriteria, setAgeCriteria] = useState("");

  let sortBy = "";

  // Alle Funktionen die ins Backend kommunizieren und
  // die notwendingen POST/GET-Requests ausführen via Axios.
  // Die benötigten Variablen von den Inputfeldern und sonstige Variablen
  // werden in der jeweiligen Funktion im HTTP-Request mitgegeben. Bei
  // erfolgreicher Ausführung des Promises wird die Callback-Funktion ausgeführt
  // welche das Array mit den Mitarbeitern gegebenfalls überschreibt.
  /*-------------------------------------------------------------------------*/

  const getEmployees = () => {
    Axios.get("https://yasin-burri-demo.herokuapp.com/api/getdata", {
      headers: {
        "Acces-Controll-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    }).then((response) => {
      setEmployeeList(response.data);
    });
  };

  const sortEmployees = (tempsortby) => {
    sortBy = tempsortby;
    Axios.post("https://yasin-burri-demo.herokuapp.com/api/sortdata", {
      sortBy: sortBy,
      prevSort: prevSort,
      headers: {
        "Acces-Controll-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    }).then((response) => {
      setPrevSort(sortBy);
      setEmployeeList(response.data);
    });
  };

  const searchEmployee = () => {
    Axios.post("https://yasin-burri-demo.herokuapp.com/api/search", {
      searchBy: searchBy,
      searchIn: searchIn,
      headers: {
        "Acces-Controll-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    }).then((response) => {
      setEmployeeList(response.data);
    });
  };

  const filterEmployee = () => {
    Axios.post("https://yasin-burri-demo.herokuapp.com/api/filter", {
      ageFilter: ageFilter,
      ageCriteria: ageCriteria,
      headers: {
        "Acces-Controll-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    }).then((response) => {
      setEmployeeList(response.data);
    });
  };

  // JSX für die Darstellung
  /*-------------------------------------------------------------------------*/

  return (
    <div className={"appbody"}>
      <h1>Yasin's MA-Tool</h1>
      <div className="content-grid-container">
        <div className="left-content-grid-container">
          <table>
            <tbody>
              <tr className="table-head">
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("employeeid")}
                >
                  Employee-ID
                </th>
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("name")}
                >
                  Name
                </th>
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("age")}
                >
                  Age
                </th>
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("birthday")}
                >
                  Birthday
                </th>
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("adress")}
                >
                  Adress
                </th>
                <th
                  className="table-head-item"
                  onClick={() => sortEmployees("zip")}
                >
                  ZIP
                </th>
              </tr>
              {employeeList.map((employee, key) => {
                //Das Array employeeList wird gemappt und für jedes Element wird ein Table-Data erstellt
                return (
                  <tr>
                    <td>{employee.employeeid}</td>
                    <td>{employee.name}</td>
                    <td>{employee.age}</td>
                    {/* Das Datum wird von hinten um 14 Stellen "geschnitten", da ich den Timestap nicht entfernen konnte in der SQL-Datenbank */}
                    <td>{employee.birthday.slice(0, -14)}</td>
                    <td>{employee.adress}</td>
                    <td>{employee.zip}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className={"show-list-button"} onClick={getEmployees}>
            Liste aufzeigen
          </button>
        </div>
        <div className="right-content-grid-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className={"input-container-item"}>
                    In der Tabelle suchen
                  </label>
                </td>
                <td>
                  <input
                    className={"input-container-item"}
                    type="text"
                    onChange={(e) => {
                      //Eine von vielen Fat-Arrow-Functions welches Inline definiert und ausgeführt wird
                      setSearchBy(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={"input-container-item"}>
                    In der Spalte..
                  </label>
                </td>
                <td>
                  <select
                    className={"input-container-item"}
                    onChange={(e) => {
                      setSearchIn(e.target.value);
                    }}
                  >
                    <option value="employeeid">Mitarbeiter-ID</option>
                    <option value="name">Name</option>
                    <option value="age">Alter</option>
                    <option value="birthday">Geburtstag</option>
                    <option value="zip">PLZ</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {" "}
                  <button onClick={searchEmployee}>Suche starten!</button>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Geben Sie ein Alter ein</label>
                </td>
                <td>
                  <input
                    className={"input-container-item"}
                    type="number"
                    onChange={(e) => {
                      setAgeFilter(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={"input-container-item"}>
                    Das Alter der anderen sollte...
                  </label>
                </td>
                <td>
                  <select
                    className={"input-container-item"}
                    onChange={(e) => {
                      setAgeCriteria(e.target.value);
                    }}
                  >
                    <option value="<">Unterhalb</option>
                    <option value=">">Überhalb</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button onClick={filterEmployee}>Filtern!</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
