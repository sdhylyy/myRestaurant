import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../../../components/ListItem/ListItem";
import "./ItemList.css";

const ItemList = (props) => {
    const submitURL = "/api/submitOrder";
    const getMenuURL = "/api/getMenu";
    const navigate = useNavigate();
    const [menuData,setMenuData]=useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState([]);

    const handleOrderSubmit = () => {
        if (currentOrder.length == 0) {
            alert("no item select");
            return;
        }
        let obj = {
            time: new Date(),
            total: totalPrice.toFixed(2),
            data: currentOrder,
            delivered:"No"
        };

        fetch(submitURL, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                // console.log(response);
                if (response.redirected) {
                    props.logout();
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                navigate("/account");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const increment = (obj) => {
        setTotalPrice((prevPrice) => {
            return prevPrice + obj.price;
        });
        let item = findItem(obj.title);
        if (item) {
            item.number++;
        } else {
            item = { number: 1 };
            Object.assign(item, obj);
            setCurrentOrder((pre) => {
                pre.push(item);
                return pre;
            });
        }
        // console.log(currentOrder);
    };

    const decrement = (obj) => {
        setTotalPrice((prevPrice) => {
            return prevPrice - obj.price;
        });
        let item = findItem(obj.title);
        item.number--;
        // console.log(currentOrder);
    };

    const findItem = (title) => {
        for (let i in currentOrder) {
            if (currentOrder[i].title === title) {
                return currentOrder[i];
            }
        }
        return null;
    };

    const loadData = () => {
        fetch(getMenuURL).then(
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
                if (data) {
                    setMenuData(data);
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }


    useEffect(() => {
        loadData();
      }, []);

    return (
        <div className="section">
            <div className="container lunch-time">
                <h1 className="heading-secondary">Items</h1>

                <div className="grid-container">
                    <div>
                        {menuData.map((data, i) => (
                            <ListItem
                                key={data.title}
                                filename={data.filename}
                                title={data.title}
                                price={parseFloat(data.price)}
                                description={data.description}
                                increment={increment}
                                decrement={decrement}
                            />
                        ))}
                    </div>
                </div>

                <div className="total-container">
                    <div className="total-price">
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                    <button
                        className="submit-order"
                        onClick={handleOrderSubmit}
                    >
                        Submit Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemList;
