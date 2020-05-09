import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Select } from "semantic-ui-react";

const Top10 = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "top-chart",
      background: "#fff",
      width: "100%"
    },
    xaxis: {
      categories: []
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    }
  });
  const [series, setSeries] = useState([]);
  const [count, setCount] = useState(10);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [role, setRole] = useState("");
  const [countOptions] = useState([
    { key: 5, value: 5, text: 5 },
    { key: 10, value: 10, text: 10 },
    { key: 25, value: 25, text: 25 },
  ]);

  const getData = () => {
    let queryParams = "";
    if (country) queryParams += `country=${country}&`;
    if (role) queryParams += `role=${role}&`;
    queryParams += `limit=${count}&`;
    let title = `Top ${count} Companies Layoff`;
    if (country) title = `Top ${count} Companies Layoff in ${country}`;
    if (role) title += ` with role ${role}`;
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
            text: title,
            style: {
              fontSize: "16px",
              fontWeight: "bold"
            }
          }
        });
        setSeries([
          {
            name: "Layoff",
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
        let data = [{ key: null, value: null, text: "All Roles" }];
        let allRoles = res.data.data.roles.map(c => {
          return { key: c.name, value: c.name, text: c.name };
        });
        setRoleOptions([...data, ...allRoles]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getData();
    getCountries();
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, country, count]);

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
      <Chart options={options} series={series} type="bar" width={600} height={520}/>
    </div>
  );
};

export default Top10;
