import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import { Select } from "semantic-ui-react";

const RoleLayoff = () => {
	const [options, setOptions] = useState({
		chart: {
			width: "100%",
			type: "pie",
		},
		labels: [],
	});
	const [series, setSeries] = useState([]);
	const [country, setCountry] = useState("");
	const [countryOptions, setCountryOptions] = useState([]);
	const [countRole, setCountRole] = useState(0);

	const getRoleData = () => {
		let queryParams = "";
		if (country) {
			queryParams += `country=${country}&`;
			axios
				.get(`/company?${queryParams}`)
				.then((res) => {
					console.log(res.data.data.data);
					let labelCountries = res.data.data.data.map((el) => {
						return el.company;
					});
					let seriesCountries = res.data.data.data.map((el) => {
						return el.count;
					});
					setOptions({
						...options.chart,
						labels: labelCountries,
					});
					setSeries(seriesCountries);
				})
				.catch(() => {});
		} else {
			axios
				.get(`/role`)
				.then((res) => {
					console.log(res.data.data);
					let labelRoles = res.data.data.map((role) => {
						return role.name;
					});
					let seriesRoles = res.data.data.map((role) => {
						return role.count;
					});
					setOptions({
						...options.chart,
						labels: labelRoles,
						title: {
							text: "Total Role Layoff",
							style: {
								fontSize: "16px",
								fontWeight: "bold",
							},
						},
					});
					setSeries(seriesRoles);
					let count = 0;
					for (let i = 0; i < res.data.data.length; i++) {
						count += parseInt(res.data.data[i].count);
					}
					// let countRoles = res.data.data.map((el) => {
					// 	count += parseInt(el.count);
					// });
					console.log(count);
					setCountRole(count);
				})
				.catch(() => {});
		}
	};

	const getCountries = () => {
		axios
			.get("/country/list")
			.then((res) => {
				let data = [{ key: null, value: null, text: "All Countries" }];
				let allCountries = res.data.data.countries.map((c) => {
					return { key: c.name, value: c.name, text: c.name };
				});
				setCountryOptions([...data, ...allCountries]);
			})
			.catch(() => {});
	};

	useEffect(() => {
		getRoleData();
		getCountries();
	}, []);

	return (
		<React.Fragment>
			<Grid.Column width={6}>
				<h1>Total: {countRole}</h1>
			</Grid.Column>
			<Grid.Column width={10}>
				<div className="graph-container">
					<Select
						placeholder="Select Country"
						options={countryOptions}
						className="graph-select"
						onChange={(e, { value }) => setCountry(value)}
					/>
					{/* <h1>Total: {countRole}</h1>  */}
					<Chart options={options} series={series} type="pie" width={520} />
				</div>
			</Grid.Column>
		</React.Fragment>
	);
};

export default RoleLayoff;
