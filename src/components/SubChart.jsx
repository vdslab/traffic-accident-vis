import { PieChart, Pie, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Data from '../assets/data.json';
const ageCode = {
  "01": "0～24歳",
  "25": "25～34歳",
  "35": "35～44歳",
  "45": "45～54歳",
  "55": "55～64歳",
  "65": "65～74歳",
  "75": "75歳以上",
  "00": "不明"
};

function YearChart({ prefCode }) {
  const chartData = Object.fromEntries(Object.keys(ageCode).map(name => [name, 0]));
  Data.forEach(elem => {
    if (elem.a === prefCode) {
      chartData[elem.k]++;
      chartData[elem.l]++;
    }
  });

  const data = ['01', '25', '35', '45', '55', '65', '75', '00'].map(code => ({ "name": ageCode[code], "value": chartData[code] }));

  const total = data.reduce((sum, element) => {
    return sum + element.value;
  }, 0);

  const renderCustomizedLabel = ({ name }) => {
    return name;
  };

  return (
    <ResponsiveContainer width="100%" height="40%">
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} startAngle={90} endAngle={-270} fill="#82ca9d" label={renderCustomizedLabel} style={{ outline: 'none', fontSize: '80%' }} />
        <Tooltip formatter={(value, name) => [value + "人", name]}/>
        <text x={'50%'} y={'46%'} dy={8} textAnchor="middle" fill={"#000000"} style={{ fontSize: '80%' }} >
          交通事故
        </text>
        <text x={'50%'} y={'54%'} dy={8} textAnchor="middle" fill={"#000000"} style={{ fontSize: '80%' }} >
          {total}件
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

function DayChart({ prefCode }) {
  const chartData = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 };
  Data.forEach(elem => {
    if (elem.a === prefCode) {
      chartData[elem.day]++;
    }
  });
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const data = days.map((elem, index) => ({ "name":  elem, "事故件数": chartData[index+1]}));
  
  return (
    <ResponsiveContainer width="100%" height="55%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 5,
          left: 5,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value, name, props) => [value + "件", name]}/>
        <Bar dataKey="事故件数" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function SubChart({ prefCode }) {
  return (
    <>
      東京都の年齢別事故割合
      <YearChart prefCode={prefCode} />
      東京都の曜日別事故件数
      <DayChart prefCode={prefCode} />
    </>
  );
}