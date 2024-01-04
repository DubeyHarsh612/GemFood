import { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";

const Cards = ({ foodName, options, imgSrc, foodItem }) => {
  const priceRef = useRef();
  let dispatch = useDispatch();
  let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let data = useCart();
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
    } else if (food.size != size) {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // console.log(data);
  };

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "" }}>
      <img
        src={foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: "16rem" }}
      />

      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">this is paneer bhurji</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded text-white"
            id=""
            onChange={(e) => setqty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100  bg-success rounded text-white"
            ref={priceRef}
            onChange={(e) => setsize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cards;
