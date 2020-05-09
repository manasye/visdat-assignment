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

	useEffect(() => {
		const getRoleData = () => {
			let queryParams = "";
			let title = `Total Layoff `;
			if (country && country !== "All Countries") {
				queryParams += `country=${country}&`;
				title += `in ${country}`;
				axios
					.get(`/role?${queryParams}`)
					.then((res) => {
						// console.log(res.data.data);
						let labelCountries = res.data.data.map((el) => {
							return el.name;
						});
						let seriesCountries = res.data.data.map((el) => {
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
									fontWeight: "bold",
								},
							},
						});
						setSeries(updatedSeriesCountries);
						let count = 0;
						for (let i = 0; i < res.data.data.length; i++) {
							count += parseInt(res.data.data[i].count);
						}
						// console.log(count);
						setCountRole(count);
					})
					.catch(() => {});
			} else {
				title += `All Countries`;
				axios
					.get(`/role`)
					.then((res) => {
						// console.log(res.data.data);
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
								text: title,
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
						// console.log(count);
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
		getRoleData();
		getCountries();
	}, [country, options.chart]);

	let totalLayoff = null;
	if (country && country !== "All Countries") {
		totalLayoff = (
			<h1>
				Total Layoff in {country}: {countRole}
			</h1>
		);
	} else {
		totalLayoff = <h1>Total Layoff All Countries: {countRole}</h1>;
	}

	return (
		<React.Fragment>
			<Grid.Column width={6}>{totalLayoff}</Grid.Column>
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
