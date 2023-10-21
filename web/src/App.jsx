import React, { useState , useEffect} from 'react'

import './global.css';
import addClassIcon from './assets/addClassIcon.svg'
import downloadIcon from './assets/downloadIcon.svg'

import { Camera } from './components/Camera';
import { ClasslabelBox } from './components/ClassLabelBox';
import { CapturedFrameProvider } from './hooks/capturedFrameContext'
import { ClassLabels, loadMobileNet } from './buildModel';
import { trainModel } from './train';

loadMobileNet()
export function App() {
  const [newClassLabel, setNewClassLabel] = useState('')
  const [classLabels, setclassLabels] = useState([])

  function addClassLabel() {
    const label = prompt("Please enter a name:", "");
    
    if (label === null || label === "") {
      alert("no class added");
    } else {
      setNewClassLabel(label);
    }
  }
  
  useEffect(() => {
    if (newClassLabel !== "" && classLabels.indexOf(newClassLabel) === -1) {
      setclassLabels([...classLabels, newClassLabel]);
      ClassLabels.push(newClassLabel)
    }
  }, [newClassLabel, classLabels]);
  return (
       <CapturedFrameProvider>
      <main className='container'>
        <section className="block1">
          <button className="add-class" onClick={addClassLabel}>
            <img src={addClassIcon} alt="" /> Add a class</button>
        </section>
        <section className="block2">
          <button id="train" onClick={trainModel}>Train model</button>
          <button id="download">
            <img src={downloadIcon} alt="" /> Download</button>
          <button id="reset">Reset</button>
        </section>
        <main className="block3">
          {
            classLabels.map((classLabel, index) => { 
              return (<ClasslabelBox key={index} index={index} classLabelName={classLabel}/>) })
          }
        </main>
        <aside>
          <Camera />
        </aside>
      </main>
      </CapturedFrameProvider> 
    )
}