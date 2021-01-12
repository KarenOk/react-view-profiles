import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./images/logo_pink.svg";
import avatarWhite from "./images/icons/avatar_white.svg";
import avatarPink from "./images/icons/avatar_pink.svg";
import avatarBlue from "./images/icons/avatar_blue.svg";
import data from "./data.json";
import Paginate from "./components/Paginate/Paginate";

function App() {
	const ITEMS_PER_PAGE = 20;
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		if (data) setPageCount(Math.ceil(data.records.profiles.length / ITEMS_PER_PAGE));
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	const handlePageClick = e => {
		const selectedPage = e.selected;
		setCurrentPage(selectedPage);
	};

	return (
		<div className="app">
			<header className="app__header">
				<div className="app__header_item app__header_item--left">
					<img src={logo} className="app__logo" />
					<h1 className="app_heading"> Mallmart </h1>
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
				<div className="content">
					<h2 className="content__heading"> Orders Placed</h2>
					<form className="content__form">
						<input className="content__search-input" aria-label="Search table" placeholder="Search..." />
						<div className="content__filters">
							<div className="content__filter">
								<label htmlFor="gender" className="content__filter-label">
									Gender
								</label>
								<select className="content__filter-dropdown" id="gender">
									<option>All</option>
								</select>
							</div>
							<div className="content__filter">
								<label htmlFor="pm" className="content__filter-label">
									Payment Method
								</label>
								<select className="content__filter-dropdown" id="pm">
									<option>All</option>
								</select>
							</div>
							<div className="content__filter">
								<label htmlFor="cc_type" className="content__filter-label">
									Credit Card Type
								</label>
								<select className="content__filter-dropdown" id="cc_type">
									<option>All</option>
								</select>
							</div>
						</div>
					</form>
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
						{data.records.profiles
							.slice(ITEMS_PER_PAGE * currentPage, ITEMS_PER_PAGE * currentPage + ITEMS_PER_PAGE)
							.map(profile => (
								<tr className="content__table-row">
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
												alt={profile["FirstName"]}
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
										<button className="content__table-btn"> View </button>
									</td>
								</tr>
							))}
					</table>
					<Paginate pageCount={pageCount} onPageChange={handlePageClick} />
				</div>
			</main>
		</div>
	);
}

export default App;
