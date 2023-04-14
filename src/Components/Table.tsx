import React from 'react';
import { Grocery } from '../App';
import { FaSort } from 'react-icons/fa';
import { Table } from 'react-bootstrap';

interface Props {
    groceries: Grocery[];
    handleDeleteGrocery: (id: number) => void;
  }

const TableData: React.FC<Props> = ({ groceries, handleDeleteGrocery }) => {

  const [sortedField, setSortedField] = React.useState<keyof Grocery | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  let sortedProducts: Grocery[] = [...groceries];
  if (sortedField !== null) {
    sortedProducts.sort((a, b) => {
      const sortValue = sortDirection === 'asc' ? 1 : -1;

      if (a[sortedField!] < b[sortedField!]) {
        return -1 * sortValue;
      }
      if (a[sortedField!] > b[sortedField!]) {
        return 1 * sortValue;
      }
      return 0;
    });
  }

  const toggleSortDirection = (field: keyof Grocery) => {
    if (sortedField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortedField(field);
      setSortDirection('asc');
    }
  };

    return (
        <Table responsive bordered>
            <thead>
              <tr className='bg-light'>
                <th>Id
                <button type="button" 
                  className='btn no-border'
                  onClick={() =>  toggleSortDirection('id')}><FaSort /></button>
                </th>
                
                <th>Product Name
                  <button type="button" 
                  className='btn no-border'
                  onClick={() =>  toggleSortDirection('name')}><FaSort /></button>
                </th>
                <th>Product description
                  <button type="button" 
                  className='btn no-border'
                  onClick={() =>  toggleSortDirection('description')}><FaSort /></button>
                </th>
                <th>Price
                  <button type="button" 
                  className='btn no-border'
                  onClick={() =>  toggleSortDirection('price')}><FaSort /></button>
                </th>
                <th>Quantity
                  <button type="button" 
                  className='btn no-border'
                  onClick={() =>  toggleSortDirection('quantity')}><FaSort /></button>
                </th>
                <th></th>
              </tr>
            </thead>
          <tbody>
            {
              sortedProducts.map((data, index) => {
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
        </Table>
    );
};

export default TableData;