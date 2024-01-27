import React, { useState, useContext } from "react";
import Button from "./button";
import { AccidentTypeContext, DataContext } from "../App.jsx";

const AccidentTypeSelector = ({ title, typeArray, i }) => (
	<>
		<h2 className="BtnTitle">{title}</h2>
		<div className="SetBtn">
			{typeArray.map((type, index) => (
				<Button key={index} data={type} i={i} j={index} />
			))}
		</div>
	</>
);

const ButtonPage = (props) => {
	const { filterData } = props;
	const [data, setData] = useContext(DataContext);
	const [accidentInfo] = useContext(AccidentTypeContext);
	return (
		<>
			<div className="BtnPage">
				{accidentInfo.map((info, index) => (
					<AccidentTypeSelector
						key={index}
						title={info.title}
						typeArray={info.types}
						i={index}
					/>
				))}
			</div>
		</>
	);
};

export default ButtonPage;
