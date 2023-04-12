import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Stepper } from 'react-form-stepper';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

type Grocery = {
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

      <div className="sort-container my-3">
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
      <hr />
      <div className="row">
        <div className='col-md-10'>
        <label htmlFor="search" className='w-75'>
          <input id="search" type="text" className='form-control' onChange={handleSearch} placeholder='Search...'/>
        </label>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-success' type="button" onClick={() => setShowModal(true)}>
            Add Grocery
          </button>
        </div>
      </div>
      <hr />
      <Modal show={showModal} onHide={handleClose} > 
          <Modal.Title className='text-center mt-3 bg-success text-white'>
            Add Grocery
          </Modal.Title> 
        <Modal.Header closeButton> 
          <Stepper 
            className='stepper-color col-md-10'
            steps={[{}, {}]}
            activeStep={step}
          /> 
          </Modal.Header> 
          {step ===1 && <> 
          <Modal.Body> 
            <Form> 
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Label>
                  Product Name
                </Form.Label> 
                <Form.Control 
                  type="text"  
                  name='name'
                  value={newGrocery.name}
                  placeholder="Enter product name" 
                  onChange={handleChange}
                /> 
              </Form.Group> 
              <Form.Group className="mb-3" controlId="exampleForm.CotrolTextarea1"> 
                <Form.Label>
                  Product Description
                </Form.Label> 
                <Form.Control 
                  as="textarea" 
                  rows={2} 
                  name='description'
                  value={newGrocery.description} 
                  placeholder='Enter Description'
                  onChange={handleChange} 
                /> 
              </Form.Group> 
            </Form> 
          </Modal.Body>
          <Modal.Footer> 
            <Button 
              variant="secondary" 
              onClick={handleClose}
            > 
            Close 
            </Button> 
            <Button 
              variant="primary" 
              name="nextButton" 
              disabled = {newGrocery.name.length >= 30 || newGrocery.description.length <= 100 } 
              onClick={goNext}
            > 
            Next 
            </Button> 
          </Modal.Footer> 
          </>} 
          {step === 2 && <> 
          <Modal.Body> 
            <Form> 
              <Form.Group 
                className="mb-3" 
                controlId="exampleForm.ControlInput1"
              > 
                <Form.Label>Product Price</Form.Label> 
                <Form.Control 
                  type="number" 
                  name='price'
                  value={newGrocery.price}
                  placeholder="Enter Price"
                  onChange={handleChange}
                /> 
              </Form.Group> 
              <Form.Group 
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              > 
                <Form.Label>Product Quantity</Form.Label> 
                <Form.Control 
                  type="number" 
                  name='quantity'
                  value={newGrocery.quantity}
                  placeholder='Enter Quantity'
                  onChange={handleChange}
                /> 
              </Form.Group> 
            </Form> 
          </Modal.Body> 
          <Modal.Footer> 
            <Button 
              variant="secondary" 
              onClick={goBack}
            > 
              Back 
            </Button> 
            <Form.Control 
              type='submit' 
              className="btn btn-success w-25" 
              disabled = {newGrocery.price == 0 || newGrocery.quantity == 0} 
              onClick={handleSubmit}
            > 
            </Form.Control>
          </Modal.Footer> 
        </>} 
      </Modal>

      <div className="row mx-5">
          <table className="table border">
            <thead>
              <tr className='bg-light'>
                <th>Id</th>
                <th>Product Name</th>
                <th>Product description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
          <tbody>
            {
              filteredGloceries.nodes.map((data, index) => {
                return(
                  <tr key={index} className='bg-light my-1'>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{Number(data.price).toFixed(2)}</td>
                    <td>{data.quantity}</td>
                    <td><button
                          className="btn btn-danger"
                          onClick={() => handleDeleteGrocery(data.id)}
                        >
                          Delete
                        </button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>      
    </div>
    </React.Fragment>
  );
};

export default App;