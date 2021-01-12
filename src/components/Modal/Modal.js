import React from "react";
import "./Modal.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const Modal = props => {
	const splitCamelCase = str => {
		return str.replace(/([a-z])([A-Z])/g, "$1 $2");
	};
	return (
		<Rodal {...props} height={350} width={null}>
			{props.profile ? (
				<table className="modal__data-table">
					{Object.keys(props.profile).map(key => (
						<tr className="modal__data-row">
							<th className="modal__data-key"> {splitCamelCase(key)} </th>
							<td
								className={`modal__data-value ${
									key === "PaymentMethod" ? "modal__data-value--cap" : ""
								}`}
							>
								{props.profile[key]}
							</td>
						</tr>
					))}
				</table>
			) : (
				<div />
			)}
		</Rodal>
	);
};

export default Modal;
