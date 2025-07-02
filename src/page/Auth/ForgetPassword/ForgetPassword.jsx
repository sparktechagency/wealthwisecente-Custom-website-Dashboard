/* eslint-disable react/no-unescaped-entities */
import forgetPasswordImage from "/public/Auth/forgot-password.png";
import authLogo from "../../../assets/auth/auth-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import logoimage from '/public/logo/Logo-Orange.png';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full bg-[#fefaf4] h-full md:h-screen md:flex justify-around ">
      {/* <img
            src={authLogo}
            className="w-[147px] h-[152px] mx-auto md:my-20 md:mx-5"
            alt="Sign in illustration"
      /> */}
      <div className=" h-[70%] md:w-[600px] w-[70%] mx-auto my-20 border-2 border-[#b5b5b5] rounded-xl md:my-28 place-content-center px-5 py-10 gap-8 bg-[#fefaf4] md:mx-10">

        <div className="">

          <div className="mb-5 space-y-5">
            <img src={logoimage} className="w-[100px] mx-auto mb-5" alt="" />
            <h1 className="font-semibold text-2xl flex items-center gap-2">
              <Link to="/auth/login">
                <IoIosArrowBack />
              </Link>
              Forgot Password
            </h1>
            <h1 className="text-xl">
              Enter the email address associated with your account. We'll send you
              an verification code to your email.
            </h1>
          </div>

          {/* Ant Design Form */}
          <Form
            layout="vertical"
            onFinish={submit} // Ant Design form submission
            initialValues={{ email: "" }} // Set initial form values
          >
            {/* CustomInput wrapped in Form.Item for validation */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <CustomInput icon={HiOutlineMail} placeholder="Email" />
            </Form.Item>

            {/* CustomButton for submit */}
            <Form.Item>
              <button
                loading={isLoading}
                border
                type="submit"
                className="w-full bg-[#344f47] text-xl font-semibold text-white rounded-md py-2"
              >
                Send Verification Code
              </button>


            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;