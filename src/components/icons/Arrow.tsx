import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

const Arrow = () => {
  return (
    <>
      <IoChevronBack type="button" cursor="pointer" />
      <IoChevronForward type="button" cursor="pointer" />
    </>
  );
};

export default Arrow;
