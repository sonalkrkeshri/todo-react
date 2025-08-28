import { useState } from 'react'
import './App.css'
import editLogo from './assets/edit.png';
import deleteLogo from './assets/delete.png';
import checkLogo from './assets/check.png';

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [temp, setTemp] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  }

  const onSubmit = () => {
    const newList = [...list];
    newList.push({value: userInput, edit: false});
    setList(newList);
    setUserInput("");
  }

  const onEdit = (key) => {
    let newList = list.map((item, index) => {
      if(index===key)
        return {
          ...item,
          edit: true
        };
      else 
        return {
          ...item,
        edit: false
      }
    });
    setList(newList);
    setTemp(list[key].value);
  }

  const onDelete = (key) => {
    const newList = [...list];
    newList.splice(key,1);
    setList(newList);
  }

  const onEditValue = (e) => {
    setTemp(e.target.value);
  }
  const onUpdate = (key) => {
    const newList = list.map((item, index) => {
      if(index === key) {
        return {
          ...item,
          value: temp,
          edit: false,
        }
      } else {
        return item;
      }
    });
    setList(newList);
  }

  return (
    <div className='container'>
      <div>
        <h1>Todo List</h1>
        <input 
          type="text"
          className="text"
          value={userInput}
          onChange={onChange}
        />
        <br />
        <button 
          onClick={onSubmit}
          className="add"
        >
          Add
        </button>
      </div>
      <div>
       { list.map((item, key) => 
        <div className="itemView" key={key}>
          {!(item.edit) ? <div clasname="displayView">
            <p className="itemValue">{item.value}</p>
            <button className="action" onClick={() => onEdit(key)}>
              <img src={editLogo} />
            </button> 
            <button className="action" onClick={() => onDelete(key)}>
              <img src={deleteLogo}/>
            </button>
          </div>
          :
          <div className='editView'>
            <input className='textEdit' id="textEdit" value={temp} onChange={onEditValue} />
              <button className="action" onClick={() => onUpdate(key)}>
                <img src={checkLogo}/>
              </button>
          </div>}

        </div>
        ) }
      </div>
    </div>
  )
}

export default App
