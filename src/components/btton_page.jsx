import React, { useState, useContext } from "react";
import Button from './button';
import { AccidentTypeContext } from '../App.jsx';

const AccidentTypeSelector = ({ title, typeArray, i }) => (
  <>
    <h2 className="BtnTitle">{title}</h2>
    <div>
      {typeArray.map((type, index) => (
        <React.Fragment key={index}>
          <Button data={type} i={i} j={index} />
          {index % 2 === 1 && <div key={`divider-${index}`}></div>}
        </React.Fragment>
      ))}
    </div>
  </>
);

const ButtonPage = () => {
  const [accidentInfo] = useContext(AccidentTypeContext);
  return (
    <>
      <div className="BtnPage">
        {accidentInfo.map((info, index) => (
          <AccidentTypeSelector key={index} title={info.title} typeArray={info.types} i={index} />
        ))}
      </div>
    </>
  );
};

export default ButtonPage;
