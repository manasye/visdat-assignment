import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Grid, Select } from "semantic-ui-react";
import Card from "./Card";

const RoleLayoff = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "pie"
    },
    labels: []
  });
  const [series, setSeries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [countLayoff, setCountLayoff] = useState(0);
  const [countCompanies, setCountCompanies] = useState(0);
  const [countRoles, setCountRoles] = useState(0);

  useEffect(() => {
    const getRoleData = () => {
      let queryParams = "";
      let title = `Total Layoff(s) `;
      if (country && country !== "All Countries") {
        queryParams += `country=${country}&`;
        title += `in ${country}`;
        axios
          .get(`/role?${queryParams}`)
          .then(res => {
            // console.log(res.data.data);
            let labelCountries = res.data.data.map(el => {
              return el.name;
            });
            let seriesCountries = res.data.data.map(el => {
              return el.count;
            });
            let updatedLabelCountries = [...labelCountries];
            let updatedSeriesCountries = [...seriesCountries];
            let idxEmpty = [];
            for (let i = 0; i < seriesCountries.length; i++) {
              if (seriesCountries[i] === 0) {
                idxEmpty.push(i);
              }
            }
            for (let i = idxEmpty.length - 1; i >= 0; i--) {
              updatedLabelCountries.splice(idxEmpty[i], 1);
              updatedSeriesCountries.splice(idxEmpty[i], 1);
            }
            setOptions({
              ...options.chart,
              labels: updatedLabelCountries,
              title: {
                text: title,
                style: {
                  fontSize: "16px",
                  fontWeight: "bold"
                }
              }
            });
            setSeries(updatedSeriesCountries);
            let count = 0;
            for (let i = 0; i < res.data.data.length; i++) {
              count += parseInt(res.data.data[i].count);
            }
            setCountRoles(res.data.data.filter(r => r.count !== 0).length);
          })
          .catch(() => {});
      } else {
        title += `in All Countries`;
        axios
          .get(`/role`)
          .then(res => {
            // console.log(res.data.data);
            let labelRoles = res.data.data.map(role => {
              return role.name;
            });
            let seriesRoles = res.data.data.map(role => {
              return role.count;
            });
            setOptions({
              ...options.chart,
              labels: labelRoles,
              title: {
                text: title,
                style: {
                  fontSize: "16px",
                  fontWeight: "bold"
                }
              }
            });
            setSeries(seriesRoles);
            let count = 0;
            for (let i = 0; i < res.data.data.length; i++) {
              count += parseInt(res.data.data[i].count);
            }
            setCountRoles(res.data.data.filter(r => r.count !== 0).length);
          })
          .catch(() => {});
      }
    };
    const getCountries = () => {
      axios
        .get("/country/list")
        .then(res => {
          let data = [{ key: null, value: null, text: "All Countries" }];
          let allCountries = res.data.data.countries.map(c => {
            return { key: c.name, value: c.name, text: c.name };
          });
          setCountryOptions([...data, ...allCountries]);
        })
        .catch(() => {});
    };
    const getCounts = () => {
      let queryParams = "";
      if (country && country !== "All Countries") {
        queryParams += `name=${country}`;
      }
      axios
        .get(`/country?${queryParams}`)
        .then(res => {
          const data = res.data.data;
          setCountLayoff(data.employeeCount);
          setCountCompanies(data.companyCount);
        })
        .catch(() => {});
    };
    getRoleData();
    getCountries();
    getCounts();
  }, [country, options.chart]);

  let totalLayoff = "",
    totalRole = "",
    totalCompany = "";
  if (country && country !== "All Countries") {
    totalLayoff = `Total Employee Layoff(s) in ${country}`;
    totalRole = `Total Role(s) in ${country}`;
    totalCompany = `Total Company(s) in ${country}`;
  } else {
    totalLayoff = `Total Employee Layoff(s) in All Countries`;
    totalRole = `Total Role(s) in All Countries`;
    totalCompany = `Total Company(s) in All Countries`;
  }

  return (
    <React.Fragment>
      <Grid.Column width={10}>
        <div className="graph-container">
          <Select
            placeholder="Select Country"
            options={countryOptions}
            className="graph-select"
            onChange={(e, { value }) => setCountry(value)}
          />
          <Chart
            options={options}
            series={series}
            type="pie"
            width={600}
            height={370}
          />
        </div>
      </Grid.Column>
      <Grid.Column width={6}>
        <Card title={totalLayoff} count={countLayoff} />
        <Card title={totalRole} count={countRoles} />
        <Card title={totalCompany} count={countCompanies} />
      </Grid.Column>
    </React.Fragment>
  );
};

export default RoleLayoff;
