import React, { useState, useEffect } from "react";
import OwnerOrderList from "../../components/OrderItem/OwnerOrderList";
import Pagination from '../../components/Pagination/Pagination';
import './Account.css'


const OwnerAccount = (props) => {
  const findAllOrders = '/api/findAllOrders';
  const [orderData, setOrderData] = useState([]);
  const [currData,setCurrData]=useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const onPageChange = (currPage) => {
    setCurrentPage(currPage);
    return;
  }

  const onRowPerPageChange = (rowPerPage) => {
    setRowsPerPage(rowPerPage);
}

  const loadData = () => {
    let obj = {};
    let isReady = document.getElementById("isReady").value;
    let name = document.getElementById("name").value;
    if (isReady && isReady != "") {
        obj.delivered = isReady;
    }
    if (name && name != "") {
        obj.username = name;
    }
    fetch(findAllOrders, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(
        (response) => {
            if (response.redirected) {
                window.location.href = response.url;
            } else if (!response.ok) {
                throw new Error();
            } else {
                return response.json()
            }
        }
    ).then(
      (data) => {
        // console.log(data);
        setOrderData(data.reverse());
      }
    ).catch((error) => {
        console.error(error);
    })
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setTotalNumber(orderData.length);
    setCurrData(() => {
      let obj = [];
      let start = rowsPerPage * (currentPage - 1);
      for (let i = start; i < start + rowsPerPage; i++) {
        if (i >= orderData.length) {
          break;
        }
        obj.push(orderData[i]);
      }
      return obj;
    })


  }, [orderData, rowsPerPage, currentPage])

  //searce orders
  const handleSearchOrders = (e) => {
    if (e) {
      e.preventDefault();
    }
    loadData();
  }

  return (
    <div className="header-padding">
      <h1 className="order-title">Customer Orders</h1>
      <form
        id="Search-form"
        className="form-inline aot-form"
        action="/"
        method="post"
        onSubmit={handleSearchOrders}
      >
        <div className="form-group">
          <label htmlFor="name" className="aoe-text">
            Name:
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="position" className="aoe-text">
            ready:
          </label>
          <select className="form-select" name="isReady" id="isReady">
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary aoe-btn-submit">Search</button>
        </div>

      </form>
      <div>
        {currData.map((data, i) => (
          <OwnerOrderList
            data={data.data}
            time={new Date(data.time).toLocaleString()}
            total={data.total}
            username={data.username}
            delivered={data.delivered}
            key={`orderList${i}`}
            orderId={data._id}
            loadData={loadData}
          />
        ))}
      </div>
      <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="orderPagination"/>
    </div>
  )
}

export default OwnerAccount