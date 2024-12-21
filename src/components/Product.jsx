import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [option,setOption] = useState(null)
  // const [price,setPrice] = useState()

  const [one , setOne] = useState('desc')

  console.log(one)


  const fetchData = () => {
    axios
      .get("http://localhost:3000/products",{
        params:{
          category : option,
          _sort : "price",
          _order : one
        }
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
    const newName = prompt("Enter the new name:");
    if (newName) {
      axios
        .put(`http://localhost:3000/products/${id}`, { price: newName })
        .then(() => {
         
          setData(
            data.map((item) =>
              item.id === id ? { ...item, price: newName } : item
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, [option,one]);

  return (
    <div style={{backgroundColor:'#ffffe6',
   
    }}>
      <br />

      <hr/>
      <hr />
    <br />
      <select onChange={(e)=>setOption(e.target.value)}>
      <option> ---- SELECT category ----</option>
          <option>electronics</option>
          <option>jewelery</option>
          <option>women's clothing</option>
         
          <option>men's clothing</option>

      </select>

      <button onClick={()=>setOne('asc')}>Low to High</button>
      <button onClick={()=>setOne('desc')}> High to Low</button>


      <h1>Product</h1>
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
                   border:'2px solid black'
              }}
            >
              <img
                src={el.image}
                alt={el.name}
                style={{ height: "200px", width: "200px", objectFit: "cover" }}
              />
              <h2>{el.name}</h2>
              <p>{el.description}</p>
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
