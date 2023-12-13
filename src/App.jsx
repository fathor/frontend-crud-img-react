import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/addUser" element={<AddUser />} />
                <Route path="/updateUser/:id" element={<UpdateUser />} />
            </Routes>
        </Router>
    )
}

export default App
