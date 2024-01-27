import { useState, createContext } from "react";
import "./App.css";
import Header from "./components/header";
import ButtonPage from "./components/btton_page";
import Map from "./components/Map";
import Data from "./assets/january_data.json";

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
					type: "65 ~ 74歳",
					checked: true,
				},
				{
					type: "75歳以上",
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

	return (
		<>
			<AccidentTypeContext.Provider
				value={[accidentInfoState, setAccidentInfoState]}
			>
				<DataContext.Provider value={[data, setData]}>
					<Header />
					<main>
						<aside>
							<ButtonPage />
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
