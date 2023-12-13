import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function ProductList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await axios.post('http://localhost:5000/users');
        const result = response.data[0].data
        setUsers(result)
    }
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user`, {
                headers: { 'Content-Type': 'application/json' },
                data: { id: id }
            })
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mt-5">
            <Link to="/AddUser"><button className="button is-primary">Add User</button></Link>
            <div className="columns is-multiline mt-2">
                {users.map((user) => (
                    <div className="column is-one-quarter" key={user.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by4">
                                    <img src={`http://localhost:5000/images/${user.uploadImage}`} alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{user.name} - <span className={user.gender === "Male" ? "tag is-primary" : "tag is-danger"}>{user.gender}</span></p>
                                        <p className="subtitle is-6 has-text-grey">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link to={`/updateUser/${user.id}`} className="card-footer-item">Edit</Link>
                                <a onClick={() => deleteUser(user.id)} className="card-footer-item">Hapus</a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
