import { Outlet } from "react-router";
import Flex from "../Flex";

const AuthLayout = () => {
  return (
    <>
      <Flex className={"justify-center h-screen font-openSans"}>
        <div className="h-[350px] w-[300px] p-6 shadow-md shadow-gray-500 rounded-[20px]">
          <Outlet />
        </div>
      </Flex>
    </>
  );
};

export default AuthLayout;
