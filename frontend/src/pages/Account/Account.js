import React, { useState, useEffect } from "react";
import OrderItemList from "../../components/OrderItem/OrderItemList";
import Pagination from '../../components/Pagination/Pagination';
import Logout from '../../assets/logout.png';
import './Account.css'


const Account = (props) => {
  const findOrderByNameURL = '/api/findOrderByName';
  const getBalanceURL='/api/getBalanceByName';
  const [orderData, setOrderData] = useState([]);
  const [currData,setCurrData]=useState([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [balance,setBalance]=useState();

  const onPageChange = (currPage) => {
    setCurrentPage(currPage);
    return;
  }

  const onRowPerPageChange = (rowPerPage) => {
    setRowsPerPage(rowPerPage);
}

  const loadData = () => {
    fetch(getBalanceURL).then(
      (res) => {
        if (res.redirected) {
          props.logout();
        } else if (!res.ok) {
          throw new Error();
        } else {
          return res.json()
        }
      }
    ).then(
      (data) => {
        if(data){
          setBalance(data);
        }
      }
    ).catch((error) => {
      console.error(error);
    })
    fetch(findOrderByNameURL).then(
      (res) => {
        if (res.redirected) {
          props.logout();
        } else if (!res.ok) {
          throw new Error();
        } else {
          return res.json()
        }
      }
    ).then(
      (data) => {
        // console.log(data);
        if(data){
          setOrderData(data.reverse());
        }
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

  const logoutFunc=()=>{
    props.logout();
  };

  return (
    <div className="header-padding">
      <img src={Logout} alt="logout" title="logout" className="operation-icon" onClick={logoutFunc} />
      <h1 className="order-title">My Orders</h1>
      {balance && <h2 className="order-title">balance:{parseFloat(balance).toFixed(2)}$</h2>}
      <div>
        {currData.map((data, i) => (
          <OrderItemList
            data={data.data}
            time={new Date(data.time).toLocaleString()}
            total={data.total}
            username={data.username}
            delivered={data.delivered}
            key={`orderList${i}`}
          />
        ))}
      </div>
      <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="orderPagination"/>
    </div>
  )
}

export default Account