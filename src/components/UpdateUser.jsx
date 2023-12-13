import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function UpdateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [img, setImg] = useState('')
    const [preview, setPreview] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getUserByid()
    }, [])

    const getUserByid = async () => {
        const response = await axios.post('http://localhost:5000/users', { id: id }, {
            Headers: { 'Content-Type': 'application/json' }
        })
        const result = response.data[0].data[0]
        setName(result.name)
        setEmail(result.email)
        setGender(result.gender)
        setImg(result.uploadImage)
        setPreview(`http://localhost:5000/images/${result.uploadImage}`)
    }

    const loadImage = (e) => {
        const image = e.target.files[0]
        setImg(image)
        setPreview(URL.createObjectURL(image))
    }

    const saveUser = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', id)
        formData.append('img', img)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('gender', gender)
        try {
            await axios.patch('http://localhost:5000/user', formData, {
                Headers: { 'Content-Type': 'application/json' }
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input className="file-input" type="file" onChange={loadImage} />
                                    <span className="file-cta">
                                        <span className="file-label">
                                            Choose a file...
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {preview && <figure className="image is-128x128"><img src={preview} alt="Preview" /> </figure>}
                    <br /><br /><br />
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
