import React, { useState, useEffect, useRef } from "react";
import "./Users.css";
import Pagination from "../../components/Pagination/Pagination";
import { createRoot } from "react-dom/client";
import Edit from '../../assets/edit.png';
import { Modal } from 'bootstrap'

function UsersPage() {

    const loadDataURL = '/api/getUsers';
    const editBalanceURL='/api/editBalance';

    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumber, setTotalNumber] = useState(0);
    const table = useRef(null);
    const modal = useRef(null);
    const selected=useRef(null);

    //load data into table
    const loadData = () => {
        let obj = {};
        let name = document.getElementById("name").value;
        if (name && name != "") {
            obj.username = name;
        }
        fetch(loadDataURL,{
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (!res.ok) {
                    throw new Error();
                } else {
                    return res.json()
                }
            }
        ).then(
            (data) => {
                setTableData(() => data);
                setTotalNumber(data.length);
            }
        ).catch((error) => {
            console.error(error);
        })
    }



    useEffect(() => {
        modal.current = new Modal(document.getElementById('editModal'));
        loadData();
    }, []);

    useEffect(() => {
        table.current.innerHTML = "";

        let start = rowsPerPage * (currentPage - 1);
        for (let i = start; i < start + rowsPerPage; i++) {
            if (i >= tableData.length) {
                break;
            }
            const row = table.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = tableData[i].username;
            cell3.innerHTML = tableData[i].balance;

            let name = tableData[i].username;
            const root = createRoot(cell4);
            root.render(
                <>
                    <img src={Edit} alt="edit" title="edit" className="table-operation-icon" onClick={() => edit(name)}/>
                </>
            )

        }

    }, [tableData, rowsPerPage, currentPage])

    const edit=(name)=>{
        selected.current=name;
        modal.current.show();
    }

    //searce users
    const handleSearchUsers = (e) => {
        if (e) {
            e.preventDefault();
        }
        loadData();
    }



    const onPageChange = (currPage) => {
        setCurrentPage(currPage);
        return;
    }
    const onRowPerPageChange = (rowPerPage) => {
        // console.log("rowPerPage:"+rowPerPage);
        setRowsPerPage(rowPerPage);
    }

    const submitEditFunc = () => {
        let balance = document.getElementById("balance").value;
        if (!balance || balance == "") {
            alert("balance mustn't be empty.");
            return false;
        }
        if (isNaN(balance) || isNaN(parseFloat(balance))) {
            alert("invalid input");
            return;
        }
        let data = new FormData();
        data.append("balance", balance);
        data.append("username",selected.current);
        fetch(editBalanceURL, {
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

    return (
        <>
            <main className="header-padding">
                <div className="user-searchform-container">
                    <form
                        id="Search-form"
                        className="form-inline aot-form"
                        action="/"
                        method="post"
                        onSubmit={handleSearchUsers}
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
                            <button type="submit" className="btn btn-primary aoe-btn-submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="table-container">
                    <table className="table aot-table table-striped" id="usersTable">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">username</th>
                                <th scope="col">balance</th>
                                <th scope="col">operation</th>
                            </tr>
                        </thead>
                        <tbody ref={table}></tbody>
                    </table>
                    <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="usersMain" />
                </div>
                <div className="modal fade myModal" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="editStaticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog aot-modal">
                        <div className="modal-dialog modal-dialog-scrollable aot-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editStaticBackdropLabel">Edit</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="form-group grading-inputgroup">
                                    <label htmlFor="price" className="aoe-text grading-input-label">
                                        balance:
                                    </label>
                                    <input
                                        type="text"
                                        name="balance"
                                        id="balance"
                                        className="form-control"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary aoe-btn-submit" onClick={submitEditFunc}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>

    );
}

export default UsersPage;