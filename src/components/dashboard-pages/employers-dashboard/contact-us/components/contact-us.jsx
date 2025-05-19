import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const ContactUs = () => {
    const [contactList, setContactList] = useState([]);

    const getContacts = async (token) => {
        try {
            const response = await fetch("https://apihgt.solvifytech.in/api/v1/ContactUs/SelectAll", {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            switch (result.status) {
                case 1:
                    setContactList(result?.data);
                    break;
                case 2:
                    toast.error(response.message);
                    break;
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const getToken = localStorage.getItem("authToken");
        if (getToken) {
            getContacts(getToken);
        } else {
            toast.error("Invalid access token.");
        }
    }, []);

    return (
        <div className="tabs-box">
            <div className="widget-title">
                <h4>Contacts</h4>
            </div>

            <div className="widget-content">
                <div className="table-outer">
                    <table className="default-table manage-job-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactList?.map((item) => (
                                <tr key={item?.contact_us_id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.subject}</td>
                                    <td>{item?.message}</td>
                                    <td>{moment(item?.created).format("DD-MM-YYYY")}</td>
                                </tr>
                            ))}
                            {contactList.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        No job types found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;