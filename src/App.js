import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./images/logo_pink.svg";
import loader from "./images/loader.gif";
import notFound from "./images/search_illustration.svg";
import avatarWhite from "./images/icons/avatar_white.svg";
import avatarPink from "./images/icons/avatar_pink.svg";
import avatarBlue from "./images/icons/avatar_blue.svg";
import more from "./images/icons/more.svg";
import Paginate from "./components/Paginate/Paginate";

function App() {
	const ITEMS_PER_PAGE = 20;
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const [loading, setLoading] = useState(false);
	const [profiles, setProfiles] = useState(null);

	const [filtered, setFiltered] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		gender: "",
		cc_type: "",
		payment_method: ""
	});
	const [filterList, setFilterList] = useState({
		genders: new Set(),
		cc_types: new Set(),
		payment_methods: new Set()
	});

	useEffect(() => {
		fetchProfiles();
	}, []);

	useEffect(() => {
		if (profiles) setPageCount(Math.ceil((filtered || profiles).length / ITEMS_PER_PAGE));
	}, [profiles, filtered]); // eslint-disable-line react-hooks/exhaustive-deps

	// Debounce Search
	useEffect(() => {
		const handler = setTimeout(() => {
			searchAndFilterProfiles();
		}, 1000);
		return () => {
			clearTimeout(handler);
		};
	}, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		searchAndFilterProfiles();
	}, [selectedFilters]); // eslint-disable-line react-hooks/exhaustive-deps

	const handlePageClick = e => {
		const selectedPage = e.selected;
		setCurrentPage(selectedPage);
	};

	const capitalize = str => (str ? str[0].toUpperCase() + str.slice(1) : "");

	const fetchProfiles = async () => {
		setLoading(true);
		const res = await fetch("https://api.enye.tech/v1/challenge/records");
		const data = await res.json();
		setProfiles(data.records.profiles);
		setLoading(false);

		// Get filterList from data
		const filterList = {
			genders: new Set(),
			cc_types: new Set(),
			payment_methods: new Set()
		};

		data.records.profiles.forEach(profile => {
			filterList.genders.add(profile["Gender"]);
			filterList.cc_types.add(profile["CreditCardType"]);
			filterList.payment_methods.add(profile["PaymentMethod"]);
		});

		setFilterList(filterList);
	};

	const searchProfiles = () => {
		const regex = new RegExp(searchQuery, "gi");

		if (!profiles) return;
		if (!searchQuery) return profiles;

		let filtered = profiles.filter(
			profile =>
				profile["FirstName"].match(regex) ||
				profile["LastName"].match(regex) ||
				profile["Email"].match(regex) ||
				profile["UserName"].match(regex) ||
				profile["PhoneNumber"].match(regex)
		);
		// setFiltered(filtered);
		return filtered;
	};

	const filterProfiles = profiles => {
		if (profiles) {
			let filtered = profiles.filter(
				profile =>
					(profile["Gender"] === selectedFilters.gender || !selectedFilters.gender) &&
					(profile["PaymentMethod"] === selectedFilters.payment_method || !selectedFilters.payment_method) &&
					(profile["CreditCardType"] === selectedFilters.cc_type || !selectedFilters.cc_type)
			);
			return filtered;
		}
		return null;
	};

	const searchAndFilterProfiles = () => {
		let temp = searchProfiles();
		// pass data that has been searched through to filter
		if (temp) temp = filterProfiles(temp);
		else return;

		setFiltered(temp);
	};

	const selectFilters = (key, value) => {
		setSelectedFilters({ ...selectedFilters, [key]: value });
	};

	return (
		<div className="app">
			<header className="app__header">
				<div className="app__header_item app__header_item--left">
					<img src={logo} className="app__logo" alt="Malmart" />
					<h1 className="app__heading"> Mallmart </h1>
				</div>
				<nav className="app__header_item app__nav">
					<a href="/" className="app__nav-item">
						Home
					</a>
					<a href="/" className="app__nav-item">
						Tracker
					</a>
					<a href="/" className="app__nav-item">
						Logout
					</a>
				</nav>
				<div className="app__header_item user">
					<div className="user__avatar-cont">
						<img
							src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
							className="user__avatar"
							alt="Karen Okonkwo"
						/>
					</div>
					<p className="user__name"> Karen Okonkwo </p>
				</div>
			</header>

			<main className="app__content">
				{profiles ? (
					<div className="content">
						<h2 className="content__heading"> Profiles </h2>
						<form className="content__form">
							<input
								className="content__search-input"
								aria-label="Search table"
								placeholder="Search..."
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
							<div className="content__filters">
								<div className="content__filter">
									<label htmlFor="gender" className="content__filter-label">
										Gender
									</label>
									<select
										className="content__filter-dropdown"
										id="gender"
										onChange={e => selectFilters("gender", e.target.value)}
									>
										<option className="content__filter-option" value="">
											All
										</option>
										{Array.from(filterList.genders).map((option, i) => (
											<option className="content__filter-option" key={i} value={option}>
												{capitalize(option)}
											</option>
										))}
									</select>
								</div>
								<div className="content__filter">
									<label htmlFor="pm" className="content__filter-label">
										Payment Method
									</label>
									<select
										className="content__filter-dropdown"
										id="pm"
										onChange={e => selectFilters("payment_method", e.target.value)}
									>
										<option className="content__filter-option" value="">
											All
										</option>
										{Array.from(filterList.payment_methods).map((option, i) => (
											<option className="content__filter-option" key={i} value={option}>
												{capitalize(option)}
											</option>
										))}
									</select>
								</div>
								<div className="content__filter">
									<label htmlFor="cc_type" className="content__filter-label">
										Credit Card Type
									</label>
									<select
										className="content__filter-dropdown"
										id="cc_type"
										onChange={e => selectFilters("cc_type", e.target.value)}
									>
										<option className="content__filter-option" value="">
											All
										</option>
										{Array.from(filterList.cc_types).map((option, i) => (
											<option className="content__filter-option" key={i} value={option}>
												{capitalize(option)}
											</option>
										))}
									</select>
								</div>
							</div>
						</form>
						{(filtered && filtered.length) || !filtered ? (
							<figure className="content__table-cont">
								<figcaption className="content__table-caption"> Table of profiles </figcaption>
								<table className="content__table">
									<tr className="content__table-row">
										<th className="content__table-header"></th>
										<th className="content__table-header"> First Name</th>
										<th className="content__table-header"> Last Name</th>
										<th className="content__table-header"> Username</th>
										<th className="content__table-header"> Email</th>
										<th className="content__table-header"> Phone Number</th>
										<th className="content__table-header"> Payment Method</th>
										<th className="content__table-header"> Credit Card Type </th>
										<th className="content__table-header"></th>
									</tr>
									{(filtered || profiles)
										.slice(
											ITEMS_PER_PAGE * currentPage,
											ITEMS_PER_PAGE * currentPage + ITEMS_PER_PAGE
										)
										.map((profile, i) => (
											<tr className="content__table-row" key={i}>
												<td className="content__table-cell">
													<div className={`user__avatar-cont content__table-img-cont`}>
														<img
															src={
																profile["Gender"] === "Female"
																	? avatarPink
																	: profile["Gender"] === "Male"
																	? avatarBlue
																	: avatarWhite
															}
															className="user__avatar content__table-img"
															alt={profile["Gender"]}
														/>
													</div>
												</td>
												<td className="content__table-cell"> {profile["FirstName"]}</td>
												<td className="content__table-cell"> {profile["LastName"]}</td>
												<td className="content__table-cell"> {profile["UserName"]}</td>
												<td className="content__table-cell"> {profile["Email"]}</td>
												<td className="content__table-cell"> {profile["PhoneNumber"]}</td>
												<td className="content__table-cell"> {profile["PaymentMethod"]}</td>
												<td className="content__table-cell"> {profile["CreditCardType"]}</td>
												<td className="content__table-cell">
													<button
														className="content__table-btn"
														aria-label="Click to view more"
													>
														<img className="content__table-btn-img" alt="" src={more} />
													</button>
												</td>
											</tr>
										))}
								</table>
								<Paginate pageCount={pageCount} onPageChange={handlePageClick} />
							</figure>
						) : (
							<div className="no-content">
								<img className="no-content__img" alt="" src={notFound} />
								<p className="no-content__desc"> No profiles were found. </p>
							</div>
						)}
					</div>
				) : loading ? (
					<div className="no-content">
						<img className="no-content__loader" alt="" src={loader} />
						<p className="no-content__desc"> Loading... </p>
					</div>
				) : (
					<div className="no-content">
						<img className="no-content__img" alt="" src={notFound} />
						<p className="no-content__desc"> No profiles were found. </p>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
