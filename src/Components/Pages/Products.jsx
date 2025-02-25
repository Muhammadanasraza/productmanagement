import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import shir from '../../assets/images/shirt-1.jpg';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading

      try {
        const response = await fetch("http://localhost:4000/products/available", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Failed to fetch products");
          return;
        }

        const data = await response.json();
        setProducts(data);
        console.log("Products fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // Function to handle the delete action
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product._id !== id);
    setProducts(updatedProducts);
  };

  // Function to handle the edit action (for now, just logs the product)
  const handleEdit = (product) => {
    console.log("Edit Product:", product);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <p className="text-4xl font-bold mb-6">Products</p>
        <Button className="bg-[#00010229] hover:bg-blue-600 text-white">
          Add Products
        </Button>
      </div>

      {loading ? (
        // Show spinner when loading
        <div className="flex justify-center items-center h-80">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, key) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={shir}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b text-green-500 font-bold">
                    ${product.price}
                  </td>
                  <td className="py-2 px-1 border-b space-x-2">
                    <button
                      className="text-black py-1 px-2 rounded transition"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 py-1 px-2 rounded transition"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
