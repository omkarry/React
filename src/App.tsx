import React, { useState } from 'react';
import GroceryModal from './components/Modal'
import Table from './components/Table';
import './App.css';
import Sort from './components/Sort';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

export type Grocery = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const groceries: Grocery[] = [
  { id: 1, name: 'Apple', description: 'apple', price: 0.99, quantity: 4 },
  { id: 2, name: 'Banana', description: 'Banana', price: 0.59, quantity: 3 },
  { id: 3, name: 'Carrot', description: 'Carrot', price: 0.25, quantity: 5 },
  { id: 4, name: 'Grapes', description: 'Grapes', price: 2.99, quantity: 2 }
];

const emptyInput = { id: 0, name: '', description: '', price: 0, quantity: 0}

const App: React.FC = () => {
  const [count, setCount] = useState(groceries.length + 1);
  const [search, setSearch] = useState('');
  const [sortedBy, setSortedBy] = useState<string>();
  const [groceryList, setGroceryList] = useState<Grocery[]>(groceries);
  const [newGrocery, setNewGrocery] = useState<Grocery>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const goBack = () => {
    setStep(step - 1);
  }
  const goNext = () => {
    setStep(step + 1);
  }

  var handleClose = () => {
    setShowModal(false);
    setNewGrocery(emptyInput)
    setStep(1);
  }
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredGloceries = {
    nodes: groceryList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const handleDeleteGrocery = (id: number) => {
    const updatedList = groceryList.filter((grocery) => grocery.id !== id);
    setGroceryList(updatedList);
  };

  const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{  
    const newInput = (data: Grocery)=>({...data, [event.target.name]:event.target.value})
    setNewGrocery(newInput)
  }
  
 const handleSubmit= (event: React.MouseEvent<HTMLInputElement>) =>{
    event.preventDefault();
    const checkEmptyInput = !Object.values(newGrocery).every(res=>res==="")
    if(checkEmptyInput)
    {
      setCount(count + 1);
      const id = count;
      setGroceryList([...groceryList, { ...newGrocery, id }]);
      handleClose();
    }
  }  

  return (
    <React.Fragment>
    <div className="container-fluid border rounded">
      <h1 className="text-center mb-4 bg-light">Grocery List</h1>
      <Sort 
        sortedBy={sortedBy!}
        handleSort={handleSort}
      />
      <hr />
      <div className="row">
        <Search
          search={search}
          handleSearch={handleSearch}
        />
        <div className='col-md-2'>
          <button className='btn btn-success' type="button" onClick={() => setShowModal(true)}>
            Add Grocery
          </button>
        </div>
      </div>
      <hr />
      <GroceryModal 
        show={showModal}
        onHide={handleClose}
        step={step}
        newGrocery={newGrocery}
        handleChange={handleChange}
        goBack={goBack}
        goNext={goNext}
        handleSubmit={handleSubmit}
      />
      <div className="row mx-5">
        <Table
          groceries={filteredGloceries.nodes}
          handleDeleteGrocery={handleDeleteGrocery}
        />
      </div>      
    </div>
    </React.Fragment>
  );
};

export default App;