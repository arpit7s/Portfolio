import { useEffect, useState } from 'react'
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"
const AdminContacts = () => {
    const { authorizationToken } = useAuth();
    const [contactData, setContactData] = useState([])
    const getUserContactData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            }
            // console.log(contactData);

        } catch (error) {
            console.log(error);
        }
    }


    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            })
            if (response.ok) {
                getUserContactData();
                toast.success("Contact Deleted Successfully");
            } else {
                toast.error("Something Went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserContactData();
    }, [])
    return (
        <>
            <section className='admin-contact-section'>
                <h1>Admin Contact Data</h1>
                <div className="container admin-user">
                    {
                        contactData.map((curData, index) => {
                            const { username, email, message, _id } = curData;
                            return (
                                <div key={index}>
                                    <p>{username}</p>
                                    <p>{email}</p>
                                    <p>{message}</p>
                                    <button className='btn' onClick={() => deleteContactById(_id)}>Delete</button>
                                </div>
                            );
                        })}
                </div>
            </section>
        </>
    )
}

export default AdminContacts
