

import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";

const { Item } = Form;

const ApplicationUserList = () => {
    const demoUserData = [
        {
            id: 1, fullName: "Bashar 858", accountID: "A123", email: "demo@gmail.com",
            phoneNumber: "55555555555555", address_line1: "Rangpur", createdAt: "2023-06-10",
            status: "active", gender: "male", image: { url: "" },
            dob: "1999-01-19", passport: "13131321-11123131-231", nid: "853-2123-3131",
            insuranceType: "Personal (Property)", policyStartDate: "2024-01-12", policyDuration: "5 years",
            coverageAmount: "$500 annually", paymentMethod: "Master card", cardNumber: "46343544",
            expirationDate: "2029-01-12", billingAddress: "Dhaka"
        },
        {
            id: 2, fullName: "Bashar 858", accountID: "A123", email: "demo@gmail.com",
            phoneNumber: "9999999999999", address_line1: "Rangpur", createdAt: "2023-06-10",
            status: "active", gender: "male", image: { url: "" },
            dob: "1999-01-19", passport: "13131321-11123131-231", nid: "853-2123-3131",
            insuranceType: "Personal (Property)", policyStartDate: "2024-01-12", policyDuration: "5 years",
            coverageAmount: "$500 annually", paymentMethod: "Master card", cardNumber: "46343544",
            expirationDate: "2029-01-12", billingAddress: "Dhaka"
        },
        {
            id: 3, fullName: "Bashar 858", accountID: "A123", email: "demo@gmail.com",
            phoneNumber: "55555555555555", address_line1: "Rangpur", createdAt: "2023-06-10",
            status: "active", gender: "male", image: { url: "" },
            dob: "1999-01-19", passport: "13131321-11123131-231", nid: "853-2123-3131",
            insuranceType: "Personal (Property)", policyStartDate: "2024-01-12", policyDuration: "5 years",
            coverageAmount: "$500 annually", paymentMethod: "Master card", cardNumber: "46343544",
            expirationDate: "2029-01-12", billingAddress: "Dhaka"
        },
        // Add more users here...
    ];

    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState(demoUserData);

    // User details visibility state
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [userDataFull, setUserDataFull] = useState(null);

    // Search Filter
    useEffect(() => {
        if (searchText.trim() === "") {
            setDataSource(demoUserData);
        } else {
            setDataSource(
                demoUserData.filter(
                    (user) =>
                        user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
                        String(user.phoneNumber).includes(searchText)
                )
            );
        }
    }, [searchText]);

    // Date Filter
    useEffect(() => {
        if (!selectedDate) {
            setDataSource(demoUserData);
        } else {
            const formattedDate = selectedDate.format("YYYY-MM-DD");
            setDataSource(
                demoUserData.filter(
                    (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
                )
            );
        }
    }, [selectedDate]);

    const handleShowDetails = (user) => {
        setUserDataFull(user);
        setDetailsVisible(true);
    };

    const columns = [
        { title: "#SI", dataIndex: "si", key: "si" },
        { title: "Full Name", dataIndex: "fullName", key: "fullName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
        {
            title: "Joined Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => moment(date).format("DD MMM YYYY"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div onClick={() => handleShowDetails(record)} className="cursor-pointer">
                    <IoEyeOutline className="text-2xl" />
                </div>
            ),
        },
    ];

    return (
        <section>
            <div className="md:flex justify-between items-center py-6 my-4">
                <Link to={"/"} className="text-2xl flex items-center">
                    <FaAngleLeft />  User list {detailsVisible ? "Details" : ""}
                </Link>
                <Form layout="inline" className="flex space-x-4">
                    <Item name="date">
                        <DatePicker
                            className="rounded-md border border-[#000000]"
                            onChange={(date) => setSelectedDate(date)}
                            placeholder="Select Date"
                        />
                    </Item>
                    <Item name="username">
                        <Input
                            className="rounded-md w-[70%] md:w-full border border-[#000000]"
                            placeholder="User Name"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Item>
                    <Item>
                        <button className="size-8 rounded-full flex justify-center items-center bg-[#000000] text-white">
                            <IoIosSearch className="size-5" />
                        </button>
                    </Item>
                </Form>
            </div>

            <div className={`${detailsVisible ? "grid lg:grid-cols-2 gap-5 py-5" : "block"} duration-500`}>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#000000",
                                headerColor: "#dbb56a",
                                headerBorderRadius: 5,
                            },
                        },
                    }}
                >
                    <Table
                        pagination={{
                            position: ["bottomCenter"],
                            current: currentPage,
                            onChange: setCurrentPage,
                        }}
                        scroll={{ x: "max-content" }}
                        responsive={true}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey="id"
                        loading={false}
                    />
                </ConfigProvider>

                {/* User Details Section */}
                <div className={`${detailsVisible ? "block" : "hidden"} duration-500`}>
                    <div className=" w-full md:w-2/4 mx-auto border-2 border-[#000000] p-2 rounded-lg relative">
                        <div onClick={() => setDetailsVisible(false)} className="absolute bg-[#000000] text-white p-3 rounded-full -top-5 -left-5 cursor-pointer">
                            <FaArrowLeft className="text-2xl" />
                        </div>

                        {/* User Profile Section */}
                        <div className="flex items-center justify-between gap-5 mb-5">
                            <div className="flex items-center gap-5">
                                <img
                                    className="w-24 h-24 rounded-full"
                                    src={userDataFull?.image?.url || "../../../public/logo/userimage.png"}
                                    alt="User"
                                />
                                <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
                            </div>
                        </div>

                        {/* User Details Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Name</span>
                                <span>{userDataFull?.fullName}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Email</span>
                                <span>{userDataFull?.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Phone Number</span>
                                <span>{userDataFull?.phoneNumber}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Date of Birth</span>
                                <span>{moment(userDataFull?.dob).format("DD MMM YYYY")}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Address</span>
                                <span>{userDataFull?.address_line1}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Passport Number</span>
                                <span>{userDataFull?.passport}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">NID Number</span>
                                <span>{userDataFull?.nid}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Insurance Type</span>
                                <span>{userDataFull?.insuranceType}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Policy Start Date</span>
                                <span>{moment(userDataFull?.policyStartDate).format("DD MMM YYYY")}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Policy Duration</span>
                                <span>{userDataFull?.policyDuration}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Coverage Amount</span>
                                <span>{userDataFull?.coverageAmount}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Payment Method</span>
                                <span>{userDataFull?.paymentMethod}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Card Number</span>
                                <span>{userDataFull?.cardNumber}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Expiration Date</span>
                                <span>{moment(userDataFull?.expirationDate).format("DD MMM YYYY")}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                                <span className="font-semibold">Billing Address</span>
                                <span>{userDataFull?.billingAddress}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-5">
                            <button className="border-2 border-black text-black py-2 px-4 rounded-md">Reject</button>
                            <button className="bg-black text-white py-2 px-4 rounded-md">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplicationUserList;
