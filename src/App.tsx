import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Grocery = {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
};

const groceries: Grocery[] = [
  { id: 1, name: 'Apple', price: 0.99, imageSrc: 'assets/images/apple.jpg' },
  { id: 2, name: 'Banana', price: 0.59, imageSrc: 'assets/images/banana.jpg' },
  { id: 3, name: 'Carrot', price: 0.25, imageSrc: 'assets/images/carrot.jpg' },
  { id: 4, name: 'Grapes', price: 2.99, imageSrc: 'assets/images/grapes.jpg' }
];

const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<string>();
  const [groceryList, setGroceryList] = useState<Grocery[]>(groceries);
  const [newGrocery, setNewGrocery] = useState<Grocery>({
    id: 0,
    name: '',
    price: 0,
    imageSrc: '',
  });

  const handleSort = (sortBy: string) => {
    let sortedList: Grocery[] = [];

    if (sortBy === 'nameAsc') {
      sortedList = [...groceryList].sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (sortBy === 'nameDesc') {
      sortedList = [...groceryList].sort((a, b) => b.name.localeCompare(a.name));
    } 
    else if (sortBy === 'priceAsc') {
      sortedList = [...groceryList].sort((a, b) => a.price - b.price);
    }
    else if (sortBy === 'priceDesc') {
      sortedList = [...groceryList].sort((a, b) => b.price - a.price);
    }

    setGroceryList(sortedList);
    setSortedBy(sortBy);
  };

  const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{  
    const newInput = (data: Grocery)=>({...data, [event.target.name]:event.target.value})
    setNewGrocery(newInput)
  }
  const addGrocery= (event: React.MouseEvent<HTMLInputElement>) =>{
    event.preventDefault();
    const checkEmptyInput = !Object.values(newGrocery).every(res=>res==="")
    if(checkEmptyInput)
    {
     const newData = (data: Grocery[])=>([...data, newGrocery])
     setGroceryList(newData);
     const emptyInput= {id: 0, name: '', price: 0, imageSrc: ''}
     setNewGrocery(emptyInput)
    }
  }  

  const handleDeleteGrocery = (id: number) => {
    const updatedList = groceryList.filter((grocery) => grocery.id !== id);
    setGroceryList(updatedList);
  };

  return (
    <React.Fragment>
    <div className="container mt-5">
      <h1 className="text-center mb-4">Grocery List</h1>
      <div className="sort-container mb-3">
        <label htmlFor="sort-select" className="me-2">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortedBy}
          onChange={(e) => handleSort(e.target.value)}
          className="form-select"
        >
          <option value="nameAsc">Name [A-Z]</option>
          <option value="nameDesc">Name [Z-A]</option>
          <option value="priceAsc">Price (Lower to Higher)</option>
          <option value="priceDesc">Price (Higher to Lower)</option>
        </select>
      </div>
      <div className='text-center row mb-4'>
        <form className="form-group">
          <div className="row row-cols-1">
            <div className="col-md-4">
              <div className="row">
                <label>Name:</label>
              </div>
              <input className='mx-2 input-box'
                type="text"
                name="name"
                id='name'
                value={newGrocery.name}
                onChange={handleChange}
                placeholder='Enter Grocery Name'
              />
            </div>
            <div className="col-md-4">
              <div className="row row-cols-2">
                <label>Price:</label>
              </div>
              <input className='mx-2 input-box'
                type="number"
                name="price"
                value={newGrocery.price}
                onChange={handleChange}
                placeholder='Enter Price'
              />
            </div>
            <div className="col-md-4">
              <div className="row row-cols-2">
                <label>Image Path:</label>
              </div>
              <input className='mx-2 input-box'
                type="text"
                name="imageSrc"
                value={newGrocery.imageSrc}
                onChange={handleChange}
                placeholder='Enter image path'
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="row-cols-4">
              <input className='btn btn-success mt-4' type="submit" onClick={addGrocery}/>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        {groceryList.map((grocery) => (
          <div key={grocery.id} className="col-md-3 mb-4 px-3">
            <div className="card h-100">
              <img
                src={grocery.imageSrc}
                alt={grocery.name}
                className="card-img-top"
                style={{ padding: '3px', height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">{grocery.name}</h5>
                <p className="card-text">${Number(grocery.price).toFixed(2)}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteGrocery(grocery.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </React.Fragment>
  );
};

export default App;