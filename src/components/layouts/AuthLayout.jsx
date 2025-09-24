import { Outlet } from "react-router";
import Flex from "../Flex";

const AuthLayout = () => {
  return (
    <>
      <Flex className={"justify-between"}>
        <div className="bg-amber-950 h-screen !text-red-600 w-1/2">dddc</div>
        <div className="h-screen w-1/2">
          <Outlet />
        </div>
      </Flex>
    </>
  );
};

export default AuthLayout;
