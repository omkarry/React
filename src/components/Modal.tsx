import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Stepper } from 'react-form-stepper';
import Form from 'react-bootstrap/Form';

type Props = {
show: boolean;
onHide: () => void;
step: number;
newGrocery: any;
handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
goBack: () => void;
goNext: () => void;
handleSubmit: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const GroceryModal: React.FC<Props> = ({
    show,
    onHide,
    step,
    newGrocery,
    handleChange,
    goBack,
    goNext,
    handleSubmit
    }) => {
            return(
                <Modal show={show} onHide={onHide} > 
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
                    onClick={onHide}
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
        );
    }

export default GroceryModal;