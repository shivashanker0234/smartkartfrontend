import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const FoundProducts = () => {

   const {name}=useParams();
   console.log("name "+name)

    const buyNowHandler=()=>{
        console.log("Buy Now Handler");
    }
    const addtoCartHandler=()=>{
        console.log("Add to Cart Handler");
    }
  return (
    <div>

       <div className="col-md-3">
              <div className="card-group" style={{ width: "18rem" }}>
                <div className="card">
                  <img
                    src="http://img.tjskl.org.cn/pic/z2577d9d-200x200-1/pinarello_lungavita_2010_single_speed_bike.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name : {name}</h5>
                    <p className="card-text">
                      Color:
                      <br />
                      Details:
                      <br />
                      Price : 
                      <br/>
                      email:{localStorage.getItem("email")}
                    </p>
                    <p className="card-text">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={
                          addtoCartHandler}
                      >
                        Add to card
                      </button>
                      <button type="button" className="btn btn-primary" onClick={buyNowHandler}>
                        Buy Now
                      </button>
                     
                    </p>
                  </div>
                </div>
              </div>
              {/* <ToastContainer position="top-center" theme="dark" /> */}
            </div>
    </div>
  )
}

export default FoundProducts
