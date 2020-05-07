import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Select } from "semantic-ui-react";

const Top10 = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "top-chart",
      background: "#fff"
    },
    xaxis: {
      categories: []
    }
  });
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState(5);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [role, setRole] = useState("");
  const [countOptions, setCountOptions] = useState([
    { key: 5, value: 5, text: 5 },
    { key: 10, value: 10, text: 10 },
    { key: 20, value: 20, text: 20 },
    { key: 25, value: 25, text: 25 }
  ]);

  useEffect(() => {
    getData();
    getCountries();
    getRoles();
  }, []);

  useEffect(() => {
    getData();
  }, [role, country, count]);

  const getData = () => {
    let queryParams = "";
    if (country) queryParams += `country=${country}&`;
    if (role) queryParams += `role=${role}&`;
    queryParams += `limit=${count}&`;
    let title = `Top ${count} Companies Layoff in South East Asia`;
    if (country) title = `Top ${count} Companies Layoff in ${country}`;
    axios
      .get(`/company?${queryParams}`)
      .then(res => {
        const companies = res.data.data.data;
        setOptions({
          ...options.chart,
          xaxis: {
            ...options.xaxis,
            categories: companies.map(c => c.company)
          },
          title: {
            text: title
          }
        });
        setSeries([
          {
            name: "Count",
            data: companies.map(c => c.count)
          }
        ]);
      })
      .catch(() => {});
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

  const getRoles = () => {
    axios
      .get(`/role/list`)
      .then(res => {
        setRoleOptions(
          res.data.data.roles.map(c => {
            return { key: c.name, value: c.name, text: c.name };
          })
        );
      })
      .catch(() => {});
  };

  return (
    <div className="graph-container">
      <Select
        placeholder="Select Country"
        options={countryOptions}
        className="graph-select"
        onChange={(e, { value }) => setCountry(value)}
      />
      <Select
        placeholder="Select Roles"
        options={roleOptions}
        className="graph-select"
        onChange={(e, { value }) => setRole(value)}
      />
      <Select
        placeholder="Number of Companies"
        options={countOptions}
        className="graph-select"
        onChange={(e, { value }) => setCount(value)}
      />
      <Chart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={320}
      />
    </div>
  );
};

export default Top10;
