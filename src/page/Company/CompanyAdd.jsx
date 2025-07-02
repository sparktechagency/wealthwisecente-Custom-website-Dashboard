import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa';

const CompanyAdd = () => {
    const [fileList, setFileList] = useState([]);

    // Handle file validation
    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleSubmit = (values) => {
        console.log('Form Values:', values);
        console.log('Uploaded Files:', fileList);
        message.success('Company details saved successfully!');
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
        <div className="p-6">
            <Link to="/company" className=" text-[#000000] text-2xl hover:underline mb-4 flex items-center gap-2 font-semibold">
                <FaArrowLeft /> Add New Company
            </Link>


            <Form className='max-w-2xl border border-gray-300 p-6 rounded-lg' layout="vertical" onFinish={handleSubmit}>
                {/* Company Name */}
                <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: 'Please input the company name!' }]}
                >
                    <Input className='!py-3' placeholder="Enter company name" />
                </Form.Item>

                {/* Company Link */}
                <Form.Item
                    label="Company Link"
                    name="companyLink"
                    rules={[{ required: true, message: 'Please input the company link!' }]}
                >
                    <Input className='!py-3' placeholder="Enter company website link" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                >
                    <Input className='!py-3' placeholder="Enter company email" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input the phone number!' }]}
                >
                    <Input className='!py-3' placeholder="Enter company phone number" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input a brief description!' }]}
                >
                    <Input.TextArea placeholder="Enter company description" rows={4} />
                </Form.Item>


                {/* File Upload for Image */}
                <Form.Item
                    label="Upload Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={({ fileList }) => fileList}
                    rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        onChange={handleFileChange}
                        fileList={fileList}
                        accept=".jpeg,.png"
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <button className='bg-[#000000] text-[#ffffff] py-3 px-4 w-full text-center text-base rounded-md' type="primary" htmlType="submit" block>
                        Save
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CompanyAdd;
