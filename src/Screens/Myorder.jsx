import { useEffect, useState } from "react";

const Myorder = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: localStorage.getItem("userEmail"),
        }),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);
      setOrderData(responseData.orderData?.order_data?.reverse() || []); // Ensure orderData is an array
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div></div>

      <div className="container">
        <div className="row">
          {orderData.length !== 0 ? (
            orderData.map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                <div
                  className="card mt-3"
                  style={{ width: "16rem", maxHeight: "360px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item[1].name}</h5>
                    <div
                      className="container w-100 p-0"
                      style={{ height: "38px" }}
                    >
                      <span className="m-1">{item[1].qty}</span>
                      <span className="m-1">{item[1].size}</span>
                      <span className="m-1">
                        {new Date(item[0].Order_date).toLocaleDateString()}
                      </span>
                      {/* Convert date to a readable format */}
                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                        ₹{item[1].price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myorder;
