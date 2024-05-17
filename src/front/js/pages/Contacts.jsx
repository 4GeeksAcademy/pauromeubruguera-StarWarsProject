import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleEditSubmit = () => {
        event.preventDefault();
        const dataToSend = {
            name: name,
            email: email,
            phone: phone,
            address: address
        }
        actions.editContact(dataToSend);
    }

    const handleEdit = (item) => {
        actions.editConfirmation(item)
        setName(item.name)
        setEmail(item.email)
        setPhone(item.phone)
        setAddress(item.address)
    }

    const handleModal = (item) => {
        actions.deleteConfirmation(item)
    }

    const handleDelete = (item) => {
        actions.deleteContact(item);
    }

    useEffect(() => {
        actions.getContacts()
    }, [])

    return (
        <div className="container-fluid my-4 contactList">
            {!store.deleteContact ? "" :
                <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Contact?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Estas seguro de eliminar {store.deleteContact.name} ?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleDelete(store.deleteContact)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!store.editContact ? "" :
                <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Contact?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputName"
                                            value={name} onChange={(event) => setName(event.target.value)} />
                                    </div>  <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="inputPhone"
                                            value={phone} onChange={(event) => setPhone(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputAddress" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="inputAddress"
                                            value={address} onChange={(event) => setAddress(event.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                    <button type="reset" className="btn btn-secondary ms-2" data-bs-dismiss="modal">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ul className="list-group">
                {!store.contacts ? ""
                    :
                    <>
                        {store.contacts.map((item) =>
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                                {item.name}
                                <div>
                                    <span className="text-success me-2 editIcon" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEdit(item)}>
                                        <i className="far fa-edit"></i>
                                    </span>
                                    <span className="text-danger deleteIcon" onClick={() => handleModal(item)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <i className="fas fa-trash"></i>
                                    </span>
                                </div>
                            </li>
                        )
                        }
                    </>
                }
            </ul>
            <div className="buttonContainer">
                <Link to="/add-contact" className="btn btn-success my-3">Add Contact</Link>
            </div>
        </div>
    )
}