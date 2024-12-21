import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(null);
  const [one, setOne] = useState("desc");
  const [formData, setFormData] = useState({
    image: "",
    category: "",
    title: "",
    price: "",
    description: "",
  });

  const fetchData = () => {
    axios
      .get("http://localhost:3000/products", {
        params: {
          category: option,
          _sort: "price",
          _order: one,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    const newPrice = prompt("Enter the new price:");
    if (newPrice) {
      axios
        .put(`http://localhost:3000/products/${id}`, { price: newPrice })
        .then(() => {
          setData(
            data.map((item) =>
              item.id === id ? { ...item, price: newPrice } : item
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAddProduct = () => {
    if (
      formData.image &&
      formData.category &&
      formData.title &&
      formData.price &&
      formData.description
    ) {
      axios
        .post("http://localhost:3000/products", formData)
        .then((res) => {
          setData([...data, res.data]);
          setFormData({
            image: "",
            category: "",
            title: "",
            price: "",
            description: "",
          });
        })
        .catch((err) => console.error(err));
    } else {
      alert("Please fill out all fields!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [option, one]);

  return (
    <div style={{ backgroundColor: "#ffffe6" }}>
      <br />
      <h1>Product List</h1>
      <hr />
      <hr />
      <br />

      {/* Dropdown for filtering */}
      <select onChange={(e) => setOption(e.target.value)}>
        <option> ---- SELECT category ----</option>
        <option>electronics</option>
        <option>jewelery</option>
        <option>women's clothing</option>
        <option>men's clothing</option>
        
      </select>

      <button onClick={() => setOne("asc")}>Low to High</button>
      <button onClick={() => setOne("desc")}>High to Low</button>

      {/* Form for adding a new product */}
      <div style={{ margin: "20px 0" }}>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Display products */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {data.length > 0 ? (
          data.map((el) => (
            <div
              key={el.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                textAlign: "center",
                border: "2px solid black",
              }}
            >
              <img
                src={el.image}
                alt={el.name}
                style={{ height: "200px", width: "200px", objectFit: "cover" }}
              />
              <h2>{el.title}</h2>
              <p>{el.description}</p>
              <p>Category: {el.category}</p>
              <p>Price: ${el.price}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEdit(el.id)}
                >
                  Edit
                </button>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
