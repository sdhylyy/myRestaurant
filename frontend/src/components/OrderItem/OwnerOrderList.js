import React from "react";
import OrderItem from "./OrderItem";
import "./OrderItem.css";

const OrderItemList = (props) => {
    const setOrderReadyURL="/api/setOrderReady";

    const setOrderReady = () => {
        fetch(setOrderReadyURL,{
            method: "POST",
            body: JSON.stringify({id:props.orderId}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (!res.ok) {
                    throw new Error();
                } else {
                    props.loadData();
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className="order-card">
            {props.time && <h5>time: {props.time}</h5>}
            {props.username && <h5>username: {props.username}</h5>}
            <div className="order-item-container">
                {props.data.map((data, i) => (
                    <OrderItem
                        price={data.price}
                        title={data.title}
                        number={data.number}
                        key={`${props.key}_orderItem${i}`}
                    />
                ))}
            </div>
            {props.total && <h5>total: {props.total}</h5>}
            {props.delivered && <h5>ready: {props.delivered}</h5>}
            {props.delivered=="No" && <button onClick={setOrderReady}>ready</button>}
        </div>
    );
};


export default OrderItemList;