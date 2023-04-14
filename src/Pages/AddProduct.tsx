import { AppContext } from "../App";
import React from 'react' 
import Button from 'react-bootstrap/Button';
import { Stepper } from 'react-form-stepper';
import Form from 'react-bootstrap/Form';

const AddProduct: React.FC = () => {
  const { step, newGrocery,handleChange, goBack, goNext, handleSubmit } = React.useContext(AppContext);

  return(
      <div className="container">
            <Stepper 
                className='stepper-color col-md-10'
                steps={[{}, {}]}
                activeStep={step}
            /> 
            {step ===1 && <>
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
                    <Button 
                    variant="primary" 
                    name="nextButton" 
                    disabled = {newGrocery.name.length >= 30 || newGrocery.description.length <= 100 } 
                    onClick={goNext}
                    > 
                    Next 
                    </Button> 
                </Form> 
            </>}
            {step === 2 && <> 
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
                    <div className="row">
                    <Form.Control
                    className="btn btn-secondary m-2 w-25" 
                    onClick={goBack}
                    value='Back'
                    > 
                    </Form.Control> 
                    <Form.Control 
                    type='submit' 
                    className="btn btn-success m-2 w-25 p-1" 
                    disabled = {newGrocery.price == 0 || newGrocery.quantity == 0} 
                    onClick={handleSubmit}
                    > 
                    </Form.Control>
                    </div>
            </>} 
        </div>
    );
}

export default AddProduct