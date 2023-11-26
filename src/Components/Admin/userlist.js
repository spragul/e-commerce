import axios from "axios";
import { useEffect, useState } from "react"
import { Loading } from "../../pages/loading";
import { URL } from "../../backend link";



export function UserList() {
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('myRole');

    const getuser = async () => {
        try {
            let response = await axios.get(`${URL}/user`, { headers: { "Authorization": `Bearer ${token}` } });
            setUser(response.data.user);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    useEffect(() => {
        getuser();
    }, [])
    return (
        <div>
            {user.length===0 ? <Loading /> : <div>
                <div className="order-container" style={{ height: "100vh" }}>
                    <div className="list-orders">
                        <h2>User list</h2>
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {role === 'admin' ? <>{user.map((x) => (
                                    <tr key={x._id}>
                                        <td>{x._id}</td>
                                        <td>{x.name}</td>
                                        <td>{x.email}</td>
                                        <td>{x.mobile}</td>
                                        <td>{x.role}</td>
                                    </tr>
                                ))
                                }</> : <></>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            }
        </div>
    )

}
