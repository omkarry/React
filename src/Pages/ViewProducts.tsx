import { AppContext } from "../App";
import React from 'react'
import Sort from "../Components/Sort";
import Search from "../Components/Search";
import TableData from "../Components/Table";

const ViewProducts: React.FC = () => {
  const { sortedBy, handleSort, search, handleSearch, filteredGloceries, handleDeleteGrocery } = React.useContext(AppContext);
  return(
      <div className="container-fluid w-100">
          <h1 className="text-center mb-4 bg-light">Grocery List</h1>
      {/* <Sort 
        sortedBy={sortedBy!}
        handleSort={handleSort}
      /> */}
      <hr />
      <div className="row">
        <Search
          search={search}
          handleSearch={handleSearch}
        />
      </div>
      <hr />
      <div className="row mx-5">
        <TableData
          groceries={filteredGloceries.nodes}
          handleDeleteGrocery={handleDeleteGrocery}
        />
      </div>
      </div>
  );
}

export default ViewProducts