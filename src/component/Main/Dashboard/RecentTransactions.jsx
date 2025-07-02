import { ConfigProvider, Table, Pagination, Space, message, Modal, Button } from "antd";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import dayjs from "dayjs"; // Ensure dayjs is imported
import { IoEyeOutline } from "react-icons/io5";

const RecentTransactions = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(6); // Items per page
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user details

  // Demo data for users
  const demoUserData = [
    { id: 1, fullName: "John Doe", email: "john.doe@example.com", role: "Admin", createdAt: "2023-06-16T12:00:00Z" },
    { id: 2, fullName: "Jane Smith", email: "jane.smith@example.com", role: "User", createdAt: "2023-06-14T12:00:00Z" },
    { id: 3, fullName: "Bob Johnson", email: "bob.johnson@example.com", role: "Manager", createdAt: "2023-05-25T12:00:00Z" },
    { id: 4, fullName: "Alice Williams", email: "alice.williams@example.com", role: "User", createdAt: "2023-06-01T12:00:00Z" },
    { id: 5, fullName: "Charlie Brown", email: "charlie.brown@example.com", role: "User", createdAt: "2023-04-18T12:00:00Z" },
    { id: 6, fullName: "David White", email: "david.white@example.com", role: "Admin", createdAt: "2023-06-08T12:00:00Z" },
    { id: 7, fullName: "Eva Green", email: "eva.green@example.com", role: "User", createdAt: "2023-03-22T12:00:00Z" },
    { id: 8, fullName: "Frank Harris", email: "frank.harris@example.com", role: "Manager", createdAt: "2023-06-10T12:00:00Z" },
  ];

  // Handle User Blocking (Demo)
  const handleUserRemove = (id) => {
    message.success("User blocked successfully");
  };

  // Handle User Unblocking (Demo)
  const handleUserUnBlock = (id) => {
    message.success("User unblocked successfully");
  };

  // Open Modal with User Details
  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex flex-row justify-center">
          <button onClick={() => viewDetails(record)}>
            <IoEyeOutline className="text-2xl" />
          </button>
        </Space>
      ),
    },
  ];

  const filteredData = demoUserData.filter((user) => {
    const matchesText =
      `${user.fullName}`.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = selectedDate
      ? dayjs(user.createdAt).format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
      : true;

    return matchesText && matchesDate;
  });

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dataSource = paginatedData.map((user, index) => ({
    key: user.id,
    si: (currentPage - 1) * pageSize + index + 1, // Correct the serial number based on page
    userName: `${user?.fullName}`,
    email: user.email,
    role: user.role,
    joinDate: dayjs(user.createdAt).format("YYYY-MM-DD"),
  }));

  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg">
      <div className="flex items-center justify-between flex-wrap my-10">
        <h1 className="text-2xl flex items-center">Recent User</h1>
      </div>

      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#344f47",
              headerColor: "#fff",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false} // Disable pagination in the table to handle it manually
          scroll={{ x: 500 }}
          className="text-center"
        />
      </ConfigProvider>

      {/* Custom Pagination Component */}
      <div className="flex justify-center my-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          style={{ display: "flex", justifyContent: "center", width: "100%" }} // Custom style for centering
        />
      </div>

      {/* User Details Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-10">User Details</h2>
            <p className="flex items-center justify-between my-5"><strong>Name:</strong> {selectedUser.userName}</p>
            <p className="flex items-center justify-between my-5"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="flex items-center justify-between my-5"><strong>Role:</strong> {selectedUser.role}</p>
            <p className="flex items-center justify-between my-5"><strong>Join Date:</strong> {selectedUser.joinDate}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentTransactions;
