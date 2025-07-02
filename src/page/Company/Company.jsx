
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Company = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const companies = [
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
        { name: "Shell tech", website: "www.support.com" },
    ];

    return (
        <div className="md:px-5 md:py-5 p-2">
            <div className="flex justify-between items-center flex-wrap mb-6">
                <h1 className="text-2xl font-bold">Company list</h1>
                <div>
                    <Link to="/company/add-company" className="bg-[#000000] text-[#dcb66b] px-8 py-3 rounded-md"> Add company</Link>
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {companies
                    .filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((company, index) => (
                        <div className='bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-2 border-[#dcb66b]'>
                            <Link to={`/company/details/${index}`} key={index} className=" flex items-center">
                                <img
                                    src="/category/cardProfile.png"
                                    alt="Shell Logo"
                                    className="w-16 h-16 mx-auto mb-4"
                                />
                                <div className="">
                                    <p className="font-semibold text-2xl mb-2">{company.name}</p>
                                    <a
                                        href={`https://${company.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" hover:underline"
                                    >
                                        {company.website}
                                    </a>
                                </div>
                            </Link>
                            <hr className='my-4 h-[2px] bg-gray-300' />
                            <div className='flex justify-end gap-4 items-center'>
                                <button className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'><RiDeleteBin6Line className='text-xl' /></button>
                                <Link to={`/company/edit/${index}`} className='h-14 w-14 bg-black text-[#dbb56a] rounded-full flex items-center justify-center'><FaRegEdit className='text-xl' /></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Company;
