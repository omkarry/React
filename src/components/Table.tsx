import React from 'react';
import { Grocery } from '../App';

interface Props {
    groceries: Grocery[];
    handleDeleteGrocery: (id: number) => void;
  }

const Table: React.FC<Props> = ({ groceries, handleDeleteGrocery }) => {
    return (
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
              groceries.map((data, index) => {
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
    );
};

export default Table;