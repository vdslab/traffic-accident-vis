import React from "react";
import Button from './button';

const AccidentTypeSelector = ({ title, typeArray }) => (
  <>
    <h2 className="BtnTitle">{title}</h2>
    <div>
      {typeArray.map((type, index) => (
        <React.Fragment key={index}>
          <Button text={type} />
          {index % 2 === 1 && <div key={`divider-${index}`}></div>}
        </React.Fragment>
      ))}
    </div>
  </>
);

const ButtonPage = () => {
  const accidentInfo = [
    { title: "事故の種類", typeArray: ["負傷事故", "死亡事故"] },
    { title: "AT or MT", typeArray: ["AT", "MT"] },
    { title: "時間帯", typeArray: ["朝", "夜", "とかかなあ"] },
    { title: "年齢", typeArray: ["0 ~ 24歳", "25 ~ 34歳", "35 ~ 44歳", "45 ~ 54歳", "55 ~ 64歳", "65歳以上"] },
    { title: "サポカー ？", typeArray: ["そうだよ!!!", "違うよ!!!"] },
  ];

  return (
    <div className="BtnPage">
      {accidentInfo.map((info, index) => (
        <AccidentTypeSelector key={index} title={info.title} typeArray={info.typeArray} />
      ))}
    </div>
  );
};


export default ButtonPage;
