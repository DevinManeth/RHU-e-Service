import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [welcomeMsg, setWelcomeMsg] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user?.name) setWelcomeMsg(`Welcome, ${user.name}`);
      } catch {/* ignore */}
    }
  }, []); // runs on mount

  return (
    <div className="bg-[#006A71] w-full h-20 text-white flex items-center justify-between px-10">
      <div><p className="text-lg font-bold">RUH e-service</p></div>
      <div><p className="text-lg font-bold">{welcomeMsg}</p></div>
      <div className="flex-row flex gap-8 mx-10">
        {/* <a className="hover:cursor-pointer" onClick={() => navigate("/help")}>Help Me</a> */}
        <a className="hover:cursor-pointer" onClick={() => navigate("/about-us")}>About Us</a>
      </div>
    </div>
  );
}

export default Navbar;
