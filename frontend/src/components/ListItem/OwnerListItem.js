import React, { useState,useEffect } from "react";
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import "./ListItem.css";

const OwnerListItem = ({
    title,
    description,
    price,
    filename,
    deleteFunc,
    editFunc,
    id
}) => {
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

    const handleDelete=()=>{
        // console.log(id);
        deleteFunc(filename,id);
    }
    const handleEdit=()=>{
        editFunc(id,filename,price,title,description);
    }

    return (
        <div className="list-items">
            <ul>
                <li>
                    {filename && (
                        <img
                            className="menu-image"
                            src={imageData}
                            alt="hero"
                        />
                    )}

                    <div>
                        <h3>{title}</h3>
                        {description && <p>{description}</p>}
                    </div>

                    <h3>${price.toFixed(2)}</h3>
                    <div className="menu-button">
                        <img src={Edit} alt="edit" title="edit" className="menu-icon" onClick={handleEdit} />
                        <img src={Delete} alt="delete" title="delete" className="menu-icon" onClick={handleDelete} />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OwnerListItem;