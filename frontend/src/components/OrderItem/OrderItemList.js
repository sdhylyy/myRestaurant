import React from "react";
import OrderItem from "./OrderItem";
import "./OrderItem.css";

const OrderItemList = (props) => {
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
        </div>
    );
};


export default OrderItemList;