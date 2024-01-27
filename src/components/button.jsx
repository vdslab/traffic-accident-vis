import React, { useState, useContext } from "react";
import { AccidentTypeContext, DataContext } from "../App.jsx";
import Data from "../assets/data.json";

const Button = ({ data, i, j }) => {
	const [accidentInfo, setAccidentInfo] = useContext(AccidentTypeContext);
	const [dataInfo, setDataInfo] = useContext(DataContext);

	const accidentTypeHandler = () => {
		const NumOfFatalities = Data.filter((item) => {
			if (item.b === "1") {
				return item;
			}
		});

		const NumOfInjuries = Data.filter((item) => {
			if (item.b === "2") {
				return item;
			}
		});

		const type = accidentInfo[0].types;
		if (type[0].checked === true && type[1].checked === true) setDataInfo(Data);
		if (type[0].checked === true && type[1].checked === false)
			setDataInfo(NumOfInjuries);
		if (type[0].checked === false && type[1].checked === true)
			setDataInfo(NumOfFatalities);
		if (type[0].checked === false && type[1].checked === false) setDataInfo([]);
	};

	const transmissionTypeHandler = () => {
		const type = accidentInfo[1].types;
		if (type[0].checked === true && type[1].checked === true) setDataInfo(Data);
		if (type[0].checked === true && type[1].checked === false)
			setDataInfo(dataInfo.filter((item) => item.m === "1"));
		if (type[0].checked === false && type[1].checked === true)
			setDataInfo(dataInfo.filter((item) => item.m === "2"));
		if (type[0].checked === false && type[1].checked === false)
			setDataInfo(dataInfo.filter((item) => item.m === "0"));
	};

	const ageTypeHandler = () => {
		const type = accidentInfo[3].types;
		const age = [];
		if (type[0].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "01";
				}),
			);
		}
		if (type[1].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "25";
				}),
			);
		}
		if (type[2].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "35";
				}),
			);
		}
		if (type[3].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "45";
				}),
			);
		}
		if (type[4].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "55";
				}),
			);
		}
		if (type[5].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "65";
				}),
			);
		}
		if (type[6].checked === true) {
			age.push(
				dataInfo.filter((item) => {
					return item.k === "75";
				}),
			);
		}
		console.log(age.flat());
		setDataInfo(age.flat());
	};

	const supportCarTypeHandler = () => {
		const type = accidentInfo[4].types;
		if (type[0].checked === true && type[1].checked === true) setDataInfo(Data);
		if (type[0].checked === true && type[1].checked === false)
			setDataInfo(dataInfo.filter((item) => item.o === "01"));
		if (type[0].checked === false && type[1].checked === true)
			setDataInfo(dataInfo.filter((item) => item.o === "11"));
		if (type[0].checked === false && type[1].checked === false)
			setDataInfo(dataInfo.filter((item) => item.o === "00"));
	};

	const chengeHandler = () => {
		const newChecked = !data.checked;
		const newAccidentInfo = [...accidentInfo];
		newAccidentInfo[i].types[j].checked = newChecked;
		if (i === 0) accidentTypeHandler();
		if (i === 1) transmissionTypeHandler();
		if (i === 3) ageTypeHandler();
		if (i === 4) supportCarTypeHandler();
		setAccidentInfo(newAccidentInfo);
	};

	return (
		<div className={`selectBtn ${data.checked ? "checked" : ""}`}>
			<label>
				<input
					type="checkbox"
					checked={data.checked}
					onChange={chengeHandler}
				/>
				{data.type}
			</label>
		</div>
	);
};

export default Button;
