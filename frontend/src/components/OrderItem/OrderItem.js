import React from "react";
import "./OrderItem.css";

const OrderItem=(props)=>{

    return (
        <tr>
            {props.title && <td>{props.title}</td>}
            {props.price && <td>{props.price}</td>}
            {props.number && <td>{props.number}</td>}
        </tr>
    );
}

export default OrderItem;