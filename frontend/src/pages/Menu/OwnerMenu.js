import React, { useState, useRef, useEffect } from "react";
import OwnerListItem from "../../components/ListItem/OwnerListItem";
import "./ItemList/ItemList.css";
import { Modal } from 'bootstrap'

const OwnerMenu = (props) => {
    const modal = useRef(null);
    const editModal = useRef(null);
    const editId = useRef({});
    const maxSize = useRef(5*1024*1024);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedEditFile, setSelectedEditFile] = useState(null);
    const addOrderURL = "/api/addToMenu";
    const getMenuURL = "/api/getMenu";
    const deleteFromMenuURL = "/api/deleteFromMenu";
    const EditMenuURL = "/api/editMenu";
    const [menuData, setMenuData] = useState([]);

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
                // console.log(data);
                if (data) {
                    setMenuData(data);
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }
    useEffect(() => {
        modal.current = new Modal(document.getElementById('addDishModal'));
        editModal.current = new Modal(document.getElementById('editDishModal'));
        loadData();
    }, []);
    const handleAddDish = () => {
        modal.current.show();
    }
    const submitAddFunc = () => {
        let title = document.getElementById("title").value;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        if (!title || title == "") {
            alert("title mustn't be empty.");
            return false;
        }
        if (!price || price == "") {
            alert("price mustn't be empty.");
            return false;
        }
        if (isNaN(price) || isNaN(parseFloat(price))) {
            alert("invalid input");
            return;
        }
        if (parseFloat(price) <= 0) {
            alert("price must be greater than 0");
            return;
        }
        if (!description || description == "") {
            alert("description mustn't be empty.");
            return false;
        }
        if (!selectedFile) {
            alert("image mustn't be empty.");
            return false;
        }
        if (selectedFile.size > maxSize.current) {
            alert("File must not exceed 5 MB!");
            return false;
        } 
        let data = new FormData();
        data.append("file", selectedFile, selectedFile.name);
        data.append("title", title);
        data.append("price", price);
        data.append("description", description);
        fetch(addOrderURL, {
            method: 'POST',
            body: data
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    modal.current.hide();
                    return response.json()
                }
            }
        ).then(
            () => {
                loadData();
            }
        ).catch((error) => {
            console.error(error);
        })
    }
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const onEditFileChange = (e) => {
        setSelectedEditFile(e.target.files[0]);
    }

    const deleteFunc = (filename, id) => {
        let data = new FormData();
        data.append("filename", filename);
        data.append("id", id);
        fetch(deleteFromMenuURL, {
            method: 'POST',
            body: data
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
            () => {
                loadData();
            }
        ).catch((error) => {
            console.error(error);
        })
    }
    const editFunc = (id, filename, price, title, description) => {
        document.getElementById("editTitle").value = title;
        document.getElementById("editPrice").value = price;
        document.getElementById("editDescription").value = description;
        document.getElementById("editUpload").value = null;
        editId.id = id;
        editId.preFilename = filename;
        editModal.current.show();
    }

    const submitEditFunc = () => {
        let data = new FormData();
        let title = document.getElementById("editTitle").value;
        let price = document.getElementById("editPrice").value;
        let description = document.getElementById("editDescription").value;
        let file = document.getElementById("editUpload").value;

        if (title && title != "") {
            data.append("title", title);
        }
        if (price && price != "") {
            if (isNaN(price) || isNaN(parseFloat(price))) {
                alert("invalid input");
                return false;
            }
            if (parseFloat(price) <= 0) {
                alert("price must be greater than 0");
                return false;
            }
            data.append("price", price);
        }
        if (description && description != "") {
            data.append("description", description);;
        }
        if (selectedEditFile) {
            if (selectedEditFile.size > maxSize.current) {
                alert("File must not exceed 5 MB!");
                return false;
            } 
            data.append("file", selectedEditFile, selectedEditFile.name);
        }
        data.append("id", editId.id);
        data.append("preFilename", editId.preFilename);

        fetch(EditMenuURL, {
            method: 'POST',
            body: data
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    editModal.current.hide();
                    return response.json()
                }
            }
        ).then(
            () => {
                loadData();
            }
        ).catch((error) => {
            console.error(error);
        })
    }


    return (
        <>
            {<div className="section">
                <div className="container lunch-time">
                    <h1 className="heading-secondary">Items</h1>

                    <div className="grid-container">
                        <div>
                            {menuData.map((data, i) => (
                                <OwnerListItem
                                    key={data.title}
                                    filename={data.filename}
                                    title={data.title}
                                    price={parseFloat(data.price)}
                                    description={data.description}
                                    deleteFunc={deleteFunc}
                                    editFunc={editFunc}
                                    id={data._id}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        className="submit-order add-dish-button"
                        onClick={handleAddDish}
                    >
                        Add
                    </button>
                </div>
            </div>}
            {<div className="modal fade myModal" id="addDishModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="editStaticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog aot-modal">
                    <div className="modal-dialog modal-dialog-scrollable aot-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editStaticBackdropLabel">Add</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="title" className="aoe-text grading-input-label">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="price" className="aoe-text grading-input-label">
                                    Price:
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="description" className="aoe-text grading-input-label">
                                    Descriptione:
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="upload" className="aoe-text grading-input-label">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    name="upload"
                                    id="upload"
                                    className="form-control"
                                    onChange={onFileChange}
                                    accept=".jpg"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary aoe-btn-submit" onClick={submitAddFunc}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {<div className="modal fade myModal" id="editDishModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog aot-modal">
                    <div className="modal-dialog modal-dialog-scrollable aot-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Edit</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="editTitle" className="aoe-text grading-input-label">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="editTitle"
                                    id="editTitle"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="editPrice" className="aoe-text grading-input-label">
                                    Price:
                                </label>
                                <input
                                    type="text"
                                    name="editPrice"
                                    id="editPrice"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="editDescription" className="aoe-text grading-input-label">
                                    Descriptione:
                                </label>
                                <textarea
                                    type="text"
                                    name="editDescription"
                                    id="editDescription"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group grading-inputgroup">
                                <label htmlFor="editUpload" className="aoe-text grading-input-label">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    name="editUpload"
                                    id="editUpload"
                                    className="form-control"
                                    onChange={onEditFileChange}
                                    accept=".jpg"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary aoe-btn-submit" onClick={submitEditFunc}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default OwnerMenu;