import * as React from "react";
import Pagination from "@mui/material/Pagination";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { fetchAllLaunches, fetchPastLaunches } from "../utils/spaceXClient";
import SelectOptions from "./SelectOptions";
import { options1, options2 } from "../utils/FilterConstants";
import SpaceXTable from "./SpaceXTable";

let MainComponent = ({ match, history }) => {
  const [allData, setAllData] = React.useState([]);
  const [pages, setPages] = React.useState(1);
  const [tableData, setTableData] = React.useState([]);
  const itemsParPage = 8;
  let launchData = [];

  React.useEffect(() => {
    history.push(
      `/assignment?filter1=${localStorage.getItem(
        "filter1"
      )}&filter2=${localStorage.getItem("filter2")}`
    );
    getDataForFilters();
  }, []);

  let getDataForFilters = () => {
    let filter1 = match.params.filter1 || localStorage.getItem("filter1");
    let filter2 = match.params.filter2 || localStorage.getItem("filter2");
    if (
      filter1 != null &&
      filter1 != "undefined" &&
      filter2 != null &&
      filter2 != "undefined"
    ) {
      let backdate = addMonths(new Date(), filter1);
      fetchPastLaunches(formateDate(backdate), formateDate(new Date())).then(
        (response) => {
          launchData = [];
          response.data.map((item) => {
            getDataByStatus(filter2, item);
          });
          setStateData(launchData);
        }
      );
    } else if (
      filter1 != null &&
      filter1 != "undefined" &&
      (filter2 == null || filter2 == "undefined")
    ) {
      let backdate = addMonths(new Date(), filter1);
      fetchPastLaunches(formateDate(backdate), formateDate(new Date())).then(
        (response) => {
          launchData = [];
          response.data.map((item) => {
            let items = getObject(item);
            launchData.push(items);
          });
          setStateData(launchData);
        }
      );
    } else if (
      (filter1 == null || filter1 == "undefined") &&
      filter2 != null &&
      filter2 != "undefined"
    ) {
      fetchAllLaunches().then((response) => {
        response.data.map((item) => {
          getDataByStatus(filter2, item);
        });
        setStateData(launchData);
      });
    } else {
      fetchAllLaunches().then((response) => {
        console.log(response.data);
        let launchData = [];
        response.data.map((item) => {
          let items = getObject(item);
          launchData.push(items);
        });
        setStateData(launchData);
      });
    }
  };
  let getObject = (item) => {
    return {
      flightNumber: item.flight_number,
      launched: item.launch_date_utc,
      location: item.launch_site.site_name,
      mission: item.mission_name,
      orbit: item.rocket.second_stage.payloads[0].orbit,
      launchStatus: item.launch_success,
      rocket: item.rocket.rocket_name,
      upcoming: item.upcoming,
    };
  };

  let setStateData = (launchData) => {
    setAllData(launchData);
    setPages(Math.ceil(launchData.length / itemsParPage));
    setTableData(launchData.slice(0, itemsParPage));
  };
  let addMonths = (input, months) => {
    const date = new Date(input);
    date.setDate(1);
    date.setMonth(date.getMonth() + Number(months));
    date.setDate(
      Math.min(
        input.getDate(),
        getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
      )
    );
    return date;
  };
  let getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  let formateDate = (date) =>
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

  let onRowClick = () => {
    console.log("clikcing on row");
  };
  let getDataByStatus = (status, item) => {
    if (status == "success" && item.launch_success == true) {
      let obj = getObject(item);
      launchData.push(obj);
    } else if (status == "failed" && item.launch_success == false) {
      let obj = getObject(item);
      launchData.push(obj);
    } else if (status == "upcoming" && item.upcoming == true) {
      let obj = getObject(item);
      launchData.push(obj);
    } else if (status == "all") {
      let obj = getObject(item);
      launchData.push(obj);
    }
  };

  let getDatePickerIcon = () => <DateRangeIcon />;
  let getFilterIcon = () => <FilterAltIcon />;
  let onPageChange = (event, page) => {
    setTableData(allData.slice(itemsParPage * (page - 1), itemsParPage * page));
  };
  let addToURLFilter = (belongingURLFilter, item) => {
    if (belongingURLFilter == "filter1") {
      localStorage.setItem("filter1", item.value);
      history.push(
        `/assignment?${belongingURLFilter}=${
          item.value
        }&filter2=${localStorage.getItem("filter2")}`
      );
    } else if (belongingURLFilter == "filter2") {
      localStorage.setItem("filter2", item.key);
      history.push(
        `/assignment?filter1=${localStorage.getItem(
          "filter1"
        )}&${belongingURLFilter}=${item.key}`
      );
    }
    getDataForFilters();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <SelectOptions
            renderIcon={getDatePickerIcon()}
            values={options1}
            addToURLFilter={addToURLFilter}
            belongingURLFilter={"filter1"}
          />
        </div>
        <div>
          <SelectOptions
            renderIcon={getFilterIcon()}
            values={options2}
            addToURLFilter={addToURLFilter}
            belongingURLFilter={"filter2"}
          />
        </div>
      </div>
      <SpaceXTable tableData={tableData} onRowClick={onRowClick} />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "15px",
        }}
      >
        <Pagination
          count={pages}
          variant="outlined"
          shape="rounded"
          onChange={(e, page) => onPageChange(e, page)}
        />
      </div>
    </div>
  );
};
export default MainComponent;
