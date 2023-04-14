import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import AddProduct from "../../Pages/AddProduct";
import ViewProducts from "../../Pages/ViewProducts";

function Main() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ViewProducts" element={<ViewProducts />} />
      </Routes>
    </>
  );
}

export default Main