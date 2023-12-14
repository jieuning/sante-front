import { IoPersonCircleSharp } from "react-icons/io5"; // 프로필아이콘

const Profile = () => {
  return (
    <IoPersonCircleSharp
      type="button"
      cursor="pointer"
      color="#81D8D0"
      onClick={() => {
        alert("안녕");
      }}
    />
  );
};

export default Profile;
