import { useNavigate } from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();
    return (
        <>
        <div className="bg-[#006A71] w-full h-20 text-white flex items-center justify-between px-10 ">
            <div >
            <p className="text-lg font-bold">RUH e-service</p>
            </div>
            <div className="flex-row flex gap-8 mx-10">
            <a className="hover:cursor-pointer" onClick={() => navigate('/help')}>Help Me</a>
            <a className="hover:cursor-pointer" onClick={() => navigate('/about-us')}>About Us</a>
            </div>
            
        </div>
        </>
    );
};
export default Navbar