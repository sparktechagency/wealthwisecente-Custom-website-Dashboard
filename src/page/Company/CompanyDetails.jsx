import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, message } from 'antd'; // Import necessary Ant Design components
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';

const { Item } = Form;

const CompanyDetails = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for add modal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal
    const [currentItem, setCurrentItem] = useState(null); // Store current item for editing
    const [fileList, setFileList] = useState([]); // Store the uploaded file

    // Handle opening the add modal
    const handleAddModalOpen = () => {
        setIsAddModalVisible(true);
    };

    // Handle closing the add modal
    const handleAddModalClose = () => {
        setIsAddModalVisible(false);
    };

    // Handle opening the edit modal
    const handleEditModalOpen = (item) => {
        setCurrentItem(item);
        setIsEditModalVisible(true);
    };

    // Handle closing the edit modal
    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
    };

    // Handle form submit for adding a new item
    const handleAddSubmit = (values) => {
        console.log('Adding new item:', values);
        console.log('Uploaded Image:', fileList);
        setIsAddModalVisible(false);
    };

    // Handle form submit for editing an item
    const handleEditSubmit = (values) => {
        console.log('Editing item:', values);
        console.log('Uploaded Image:', fileList);
        setIsEditModalVisible(false);
    };

    // Handle file upload change (validate image format and size)
    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // Custom validation for file size and format
    const beforeUpload = (file) => {
        const isJpegOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isSmallEnough = file.size / 1024 / 1024 < 25; // Check if file is smaller than 25MB
        if (!isJpegOrPng) {
            message.error('You can only upload JPEG or PNG file!');
        }
        if (!isSmallEnough) {
            message.error('File must be smaller than 25MB!');
        }
        return isJpegOrPng && isSmallEnough;
    };

    return (
        <div className="p-5">
            <div className='flex justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold mb-4">Insurance Facilities</h1>
                <button onClick={handleAddModalOpen} className='bg-[#000000] text-[#dcb66b] px-8 py-3 rounded-md'>
                    Add Item
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b-2">
                <button
                    onClick={() => setActiveTab('personal')}
                    className={`py-2 cursor-pointer px-6 text-lg font-medium ${activeTab === 'personal' ? 'text-white bg-[#000000] border-b-2 border-black rounded-t-lg' : 'text-gray-500'}`}
                >
                    Personal
                </button>
                <button
                    onClick={() => setActiveTab('commercial')}
                    className={`py-2 cursor-pointer px-6 text-lg font-medium ${activeTab === 'commercial' ? 'text-white bg-[#000000] border-b-2 border-black rounded-t-lg' : 'text-gray-500'}`}
                >
                    Commercial
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'personal' && (
                    <div className="grid grid-cols-5 gap-4">
                        {/* Personal Tab Content */}
                        <div className="bg-white cursor-pointer p-6 rounded-lg shadow-[0_3px_6px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.23)] text-center">
                            <div className="bg-black flex items-center justify-center text-white p-4 w-20 h-20 mx-auto rounded-full mb-4">
                                <span className="text-3xl">🏠</span>
                            </div>
                            <p className="text-lg font-semibold">Home</p>
                            <div className='flex justify-center mt-5 gap-4 items-center'>
                                <button className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'>
                                    <RiDeleteBin6Line className='text-xl' />
                                </button>
                                <button
                                    onClick={() => handleEditModalOpen({ name: 'Home', type: 'Personal' })}
                                    className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'>
                                    <FaRegEdit className='text-xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'commercial' && (
                    <div className="grid grid-cols-5 gap-4">
                        {/* Commercial Tab Content */}
                        <div className="bg-white cursor-pointer p-6 rounded-lg shadow-[0_3px_6px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.23)] text-center">
                            <div className="bg-black flex items-center justify-center text-white p-4 w-20 h-20 mx-auto rounded-full mb-4">
                                <span className="text-3xl">🏢</span>
                            </div>
                            <p className="text-lg font-semibold">Business</p>
                            <div className='flex justify-center mt-5 gap-4 items-center'>
                                <button className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'>
                                    <RiDeleteBin6Line className='text-xl' />
                                </button>
                                <button
                                    onClick={() => handleEditModalOpen({ name: 'Business', type: 'Commercial' })}
                                    className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'>
                                    <FaRegEdit className='text-xl' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Item Modal */}
            <Modal
                visible={isAddModalVisible}
                onCancel={handleAddModalClose}
                footer={null}
            >
                <h2 className="text-2xl font-bold mb-4">Add Item</h2>
                <Form onFinish={handleAddSubmit}>
                    <span className='block mb-2 font-semibold'>Item Name</span>
                    <Form.Item name="companyName" rules={[{ required: true, message: 'Please enter company name' }]}>
                        <Input className='w-full !py-3' placeholder="Enter company name" />
                    </Form.Item>

                    {/* File Upload */}
                    <span className='block mb-2 font-semibold'>Upload Image</span>
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={({ fileList }) => fileList}
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                            onChange={handleFileChange}
                            accept=".jpeg,.png"
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <button className='w-full py-3 bg-[#000000] text-[#dbb56a] text-base rounded-lg' type="primary" htmlType="submit">Save</button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Item Modal */}
            <Modal
                visible={isEditModalVisible}
                onCancel={handleEditModalClose}
                footer={null}
            >
                <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
                <Form onFinish={handleEditSubmit} initialValues={currentItem}>
                    <span className='block mb-2 font-semibold'>Item Name</span>
                    <Form.Item name="companyName" rules={[{ required: true, message: 'Please enter company name' }]}>
                        <Input className='w-full !py-3' placeholder="Enter company name" />
                    </Form.Item>

                    {/* File Upload */}
                    <span className='block mb-2 font-semibold'>Upload Image</span>
                    <Form.Item
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={({ fileList }) => fileList}
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                            onChange={handleFileChange}
                            accept=".jpeg,.png"
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <button className='w-full py-3 bg-[#000000] text-[#dbb56a] text-base rounded-lg' type="primary" htmlType="submit">Save</button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CompanyDetails;