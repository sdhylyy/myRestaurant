import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import "./ListItem.css";

const ListItem = ({
    title,
    description,
    price,
    filename,
    increment,
    decrement,
}) => {
    const [count, setCount] = useState(0);
    const [imageData, setImageData] = useState(null);

    const loadImage = () => {
        let data = new FormData();
        data.append("filename", filename);
        fetch('/api/getImage', {
            method: 'POST',
            body: data
        })
            .then(response => response.blob())
            .then(data => setImageData(URL.createObjectURL(data)))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        loadImage();
    }, []);

    const handleIncrement = () => {
        setCount(count + 1);
        let obj = {};
        obj.price = price;
        obj.title = title;
        obj.description = description;
        increment(obj);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
            let obj = {};
            obj.price = price;
            obj.title = title;
            obj.description = description;
            decrement(obj);
        }
    };

    return (
        <div className="list-items">
            <ul>
                <li>
                    {filename && (
                        <img
                            className="menu-image"
                            src={imageData}
                            alt="Image"
                        />
                    )}

                    <div>
                        <h3>{title}</h3>
                        {description && <p>{description}</p>}
                    </div>

                    <h3>${price.toFixed(2)}</h3>
                    <div className="buttons menu-button">
                        <button className="minus" onClick={handleDecrement}>
                            -
                        </button>
                        <span className="count">{count}</span>
                        <button className="plus" onClick={handleIncrement}>
                            +
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    itemImage: PropTypes.string,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
};

export default ListItem;
