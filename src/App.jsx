import { useState, createContext } from "react";
import "./App.css";
import Header from "./components/header";
import ButtonPage from "./components/btton_page";
import Map from "./components/Map";
import Data from "./assets/data.json";

export const AccidentTypeContext = createContext();
export const DataContext = createContext();

function App() {
	const accidentInfo = [
		{
			title: "事故の種類",
			types: [
				{
					type: "負傷事故",
					checked: true,
				},
				{
					type: "死亡事故",
					checked: true,
				},
			],
		},
		{
			title: "AT or MT",
			types: [
				{
					type: "AT",
					checked: true,
				},
				{
					type: "MT",
					checked: true,
				},
			],
		},
		{
			title: "時間帯",
			types: [
				{
					type: "朝",
					checked: true,
				},
				{
					type: "夜",
					checked: true,
				},
				{
					type: "とかかなあ",
					checked: true,
				},
			],
		},
		{
			title: "年齢",
			types: [
				{
					type: "0 ~ 24歳",
					checked: true,
				},
				{
					type: "25 ~ 34歳",
					checked: true,
				},
				{
					type: "35 ~ 44歳",
					checked: true,
				},
				{
					type: "45 ~ 54歳",
					checked: true,
				},
				{
					type: "55 ~ 64歳",
					checked: true,
				},
				{
					type: "65歳以上",
					checked: true,
				},
			],
		},
		{
			title: "サポカー ？",
			types: [
				{
					type: "そうだよ!!!",
					checked: true,
				},
				{
					type: "違うよ!!!",
					checked: true,
				},
			],
		},
	];
	const [accidentInfoState, setAccidentInfoState] = useState(accidentInfo);
	const [data, setData] = useState(Data);

	const filterData = () => {
		// 事故の種類
		const typeOfAccident = () => {
			const NumberOfFatalities = Data.filter((d) => {
				return d.b === "1";
			});
			const NumberOfInjuries = Data.filter((d) => {
				return d.b === "2";
			});

			const type = accidentInfoState[0].types;
			if (type[0].checked === true && type[1].checked === true) {
				setData(Data);
			} else if (type[0].checked === true && type[1].checked === false) {
				setData(NumberOfInjuries);
			} else if (type[0].checked === false && type[1].checked === true) {
				setData(NumberOfFatalities);
			} else {
				setData([]);
			}
		};

		// AT or MT
		const typeOfTransmission = () => {
			const type = accidentInfoState[1].types;
			if (type[0].checked === true && type[1].checked === true) {
				setData(Data);
			} else if (type[0].checked === true && type[1].checked === false) {
				const NumberOfAT = Data.filter((d) => {
					return d.m === "1" || d.n === "1";
				});
				setData(NumberOfAT);
			} else if (type[0].checked === false && type[1].checked === true) {
				const NumberOfMT = Data.filter((d) => {
					return d.m === "2" || d.n === "2";
				});
				setData(NumberOfMT);
			} else {
				const NumberOfElse = Data.filter((d) => {
					return d.m === "0" || d.n === "0";
				});
				setData(NumberOfElse);
			}
		};

		const typeOfTime = () => {
			const type = accidentInfoState[2].types;
			if (type[0].checked === true && type[1].checked === true) {
				setData(Data);
			} else if (type[0].checked === true && type[1].checked === false) {
				const NumberOfAT = Data.filter((d) => {
					return d.m === "1" || d.n === "1";
				});
				setData(NumberOfAT);
			} else if (type[0].checked === false && type[1].checked === true) {
				const NumberOfMT = Data.filter((d) => {
					return d.m === "2" || d.n === "2";
				});
				setData(NumberOfMT);
			} else {
				const NumberOfElse = Data.filter((d) => {
					return d.m === "0" || d.n === "0";
				});
				setData(NumberOfElse);
			}
		};

		// 年齢
		const typeOfAge = () => {
			const joinArray = [];
			const type = accidentInfoState[3].types;
			if (type[0].checked === true) {
				const under24YearsOld = Data.filter((d) => {
					return d.k === "1" || d.l === "1";
				});
				joinArray.push(...under24YearsOld);
			}
			if (type[1].checked === true) {
				const under34YearsOld = Data.filter((d) => {
					return d.k === "25" || d.l === "25";
				});
				joinArray.push(...under34YearsOld);
			}
			if (type[2].checked === true) {
				const under44YearsOld = Data.filter((d) => {
					return d.k === "35" || d.l === "35";
				});
				joinArray.push(...under44YearsOld);
			}
			if (type[3].checked === true) {
				const under54YearsOld = Data.filter((d) => {
					return d.k === "45" || d.l === "45";
				});
				joinArray.push(...under54YearsOld);
			}
			if (type[4].checked === true) {
				const under64YearsOld = Data.filter((d) => {
					return d.k === "55" || d.l === "55";
				});
				joinArray.push(...under64YearsOld);
			}
			if (type[5].checked === true) {
				const over65YearsOld = Data.filter((d) => {
					return d.k === "65" || d.l === "65";
				});
				joinArray.push(...over65YearsOld);
			}
			setData(joinArray);
		};

		// サポカー ？
		const typeOfSupportCar = () => {
			const type = accidentInfoState[4].types;
			if (type[0].checked === true && type[1].checked === true) {
				setData(Data);
			} else if (type[0].checked === true && type[1].checked === false) {
				const NumberOfSupportCar = Data.filter((d) => {
					return d.o === "1" || d.p === "1";
				});
				setData(NumberOfSupportCar);
			} else if (type[0].checked === false && type[1].checked === true) {
				const NumberOfNotSupportCar = Data.filter((d) => {
					return d.o === "11" || d.p === "11";
				});
				setData(NumberOfNotSupportCar);
			} else {
				const NumberOfElse = Data.filter((d) => {
					return d.o === "0" || d.p === "0";
				});
				setData(NumberOfElse);
			}
		};

		typeOfAccident();
		typeOfTransmission();
		typeOfSupportCar();
		typeOfTime();
		typeOfAge();
	};
	return (
		<>
			<AccidentTypeContext.Provider
				value={[accidentInfoState, setAccidentInfoState]}
			>
				<DataContext.Provider value={[data, setData]}>
					<Header />
					<main>
						<aside>
							<ButtonPage filterData={filterData} />
						</aside>
						<Map />
					</main>
				</DataContext.Provider>
			</AccidentTypeContext.Provider>
		</>
	);
}

export default App;

// const format = {
// 	"都道府県": String,
// 	"警察署等": String,
// 	"事故内容":
// 	"死者数（数値）":
// 	"負傷者数（数値）":
// 	"発生日時":
// 	"昼夜":
// 	"天候":
// 	"路面状態":
// 	"道路形状":
// 	"衝突地点":
// 	"年齢（当事者A）":
// 	"年齢（当事者B）":
// 	"当事者種別（当事者A）":
// 	"当事者種別（当事者B）":
// 	"オートマチック車（当事者A）":
// 	"オートマチック車（当事者B）":
// 	"サポカー（当事者A）":
// 	"サポカー（当事者B）":
// 	"人身損傷程度（当事者A）":
// 	"人身損傷程度（当事者B）":
// 	"緯度":
// 	"経度":
// };

// const format = {
// 	"都道府県": String,
// 	"警察署等": String,
//     "事故内容": String,
//     "死者数（数値）": Number,
//     "負傷者数（数値）": Number,
//     "発生日時": String,
