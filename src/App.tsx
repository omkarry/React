import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Layouts/Header/Header";
import Sidebar from "./Layouts/Sidebar/Sidebar";
import Main from "./Layouts/Main/Main";

export const AppContext = React.createContext<any>({});

export type Grocery = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const emptyInput = { id: 0, name: '', description: '', price: 0, quantity: 0}

const groceries: Grocery[] = [
  { id: 1, name: 'Apple', description: 'apple', price: 0.99, quantity: 4 },
  { id: 2, name: 'Banana', description: 'Banana', price: 0.59, quantity: 3 },
  { id: 3, name: 'Carrot', description: 'Carrot', price: 0.25, quantity: 5 },
  { id: 4, name: 'Grapes', description: 'Grapes', price: 2.99, quantity: 2 }
];

function App() {
  
  const [profile, setProfile] = useState({
    name: "Apple",
    photo: "./Images/apple.jpg",
  });
  const [count, setCount] = useState(groceries.length + 1);
  const [search, setSearch] = useState('');
  const [sortedBy, setSortedBy] = useState<string>();
  const [groceryList, setGroceryList] = useState<Grocery[]>(groceries);
  const [step, setStep] = useState(1);
  const [newGrocery, setNewGrocery] = useState<Grocery>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  });

  const goBack = () => {
    setStep(step - 1);
  }
  const goNext = () => {
    setStep(step + 1);
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
      setNewGrocery(emptyInput)
      setStep(1);
      alert("Product added successfully..!");
    }
  } 

  return (
    <AppContext.Provider value={{ 
      profile, 
      sortedBy, 
      handleSort, 
      search,
      handleSearch,
      filteredGloceries,
      handleDeleteGrocery,
      step,
      newGrocery,
      handleChange,
      goBack,
      goNext,
      handleSubmit
    }}>
        <BrowserRouter>
        <div className="container-fluid w-100">
           <div className="row">
            <Header />
           </div>
           <div className="row">
            <div className="w-25">
              <Sidebar />
            </div>
            <div className="w-75">
              <Main />
            </div>
           </div>
        </div>
        </BrowserRouter>
  </AppContext.Provider>

  );
}

export default App;
