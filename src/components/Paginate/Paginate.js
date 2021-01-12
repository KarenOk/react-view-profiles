import React from "react";
import "./Paginate.css";
import ReactPaginate from "react-paginate";

const Paginate = props => {
	return (
		<div className="pagination-cont">
			<ReactPaginate
				previousLabel={"<"}
				nextLabel={">"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageRangeDisplayed={1}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
				{...props}
			/>
		</div>
	);
};

export default Paginate;
