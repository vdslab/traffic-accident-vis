import { useState, createContext } from 'react'
import './App.css'
import Header from './components/header'
import ButtonPage from './components/btton_page'
import Map from './components/Map'

export const AccidentTypeContext = createContext();

function App() {
  const accidentInfo = [
    {
      "title": "事故の種類",
      "types": [
        {
          "type": "負傷事故",
          "checked": true
        },
        {
          "type": "死亡事故",
          "checked": true
        }
      ]
    },
    {
      "title": "AT or MT",
      "types": [
        {
          "type": "AT",
          "checked": true
        },
        {
          "type": "MT",
          "checked": true
        }
      ]
    },
    {
      "title": "時間帯",
      "types": [
        {
          "type": "朝",
          "checked": true
        },
        {
          "type": "夜",
          "checked": true
        },
        {
          "type": "とかかなあ",
          "checked": true
        }
      ]
    },
    {
      "title": "年齢",
      "types": [
        {
          "type": "0 ~ 24歳",
          "checked": true
        },
        {
          "type": "25 ~ 34歳",
          "checked": true
        },
        {
          "type": "35 ~ 44歳",
          "checked": true
        },
        {
          "type": "45 ~ 54歳",
          "checked": true
        },
        {
          "type": "55 ~ 64歳",
          "checked": true
        },
        {
          "type": "65歳以上",
          "checked": true
        }
      ]
    },
    {
      "title": "サポカー ？",
      "types": [
        {
          "type": "そうだよ!!!",
          "checked": true
        },
        {
          "type": "違うよ!!!",
          "checked": true
        }
      ]
    }
  ];
  const [accidentInfoState, setAccidentInfoState] = useState(accidentInfo);
  console.log(accidentInfoState);
  return (
    <>
      <AccidentTypeContext.Provider value={[accidentInfoState, setAccidentInfoState]}>
        <Header />
        <main>
          <aside>
            <ButtonPage />
          </aside>
          <Map />
        </main>
      </AccidentTypeContext.Provider>
    </>
  )
}

export default App
