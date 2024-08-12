import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const { authorizationToken } = useAuth();
    const params = useParams()
    //get single user data to click update button
    const getSingleUSerData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log(`Single Users Data ${data}`);
            setData(data);

            //   if (response.ok) {
            //     getSingleUSerData();
            //   }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleUSerData();
    }, [])

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })
    }

    //update data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data)
            }
            );
            if (response.ok) {
                toast.success("Updated Successfully");
            }else{
                toast.error("Not Updated");     
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="section-contact ">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>
                {/* <h1>Contact Page</h1> */}
                <div className="container grid grid-half-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={data.username}
                                    onChange={handleInput}
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Email</label>
                                <input
                                    type="email"
                                    name="username"
                                    id="username"
                                    value={data.email}
                                    onChange={handleInput}
                                    autoCapitalize="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone"> Phone</label>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    value={data.phone}
                                    onChange={handleInput}
                                    autoCapitalize="off"
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit"> Update </button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    )
}

export default AdminUpdate
