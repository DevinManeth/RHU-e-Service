import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image from '../assets/history6.jpg';
import LoginAs from './LoginAs.jsx';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start">
      <div className="w-screen h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-teal-700 text-white flex justify-between items-center px-6 py-6">
          <h1 className="text-xl font-bold">RUH e-Service</h1>
          <nav className="space-x-6 font-semibold">
            <a href="#" className="hover:cursor-pointer"> Help Me </a>
            <a href="#" className="hover:cursor-pointer"> About Us </a>
            <a href="#" className="hover:cursor-pointer"> Job Opportunities </a>
            <button className="hover:cursor-pointer" onClick={()=>{navigate('./login-as')}}>Login</button>

            {/* <a href="#" className="hover:cursor-pointer" onClick={(e)=>Navigate('./login')}> Login </a> */}
          </nav>
        </header>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-0 h-auto">
          {/* Image Section */}
          <div className="h-full w-full md:w-1/2  bg-center">
            <img
              src={image}
              alt="University of Ruhuna"
              className="h-160 w-full border border-gray-300"
            />
          </div>

          {/* Text Section */}
          <div className="bg-[#9ACBD0] w-full md:w-1/2 text-teal-900 font-semibold text-lg p-6">
            <p>
              The University of Ruhuna, established by a Special Presidential Decree in 1978 and
              elevated to a fully-fledged university in 1984, is Sri Lanka's sixth oldest
              University. It is the only University in the country's southern region, with ten
              faculties spread across three prominent locations.</p><br/>
              History and Governance:<br/>
                <p>Established in 1978 by a presidential decree, initially as a smaller institution before becoming a full-fledged university in 1984. 
                It is the sixth oldest university in Sri Lanka. 
                Operates under the Universities Act No. 16 of 1978 and the Universities (Amendment) Act No. 7 of 1985. 
                Financed mainly by the government through the University Grants Commission (UGC), resulting in significant UGC influence on its administration. 
                Undergraduate education is free.
            </p><br/>
            Faculties and Programs:
               <p> Central Campus (Wellamadama): Houses the Faculties of Science, Humanities and Social Sciences, Management and Finance, and Fisheries and Marine Sciences & Technology. 
                Other Faculties: Includes Agriculture, Engineering, Medicine, Technology, and Allied Health Sciences. 
                Offers a variety of undergraduate and postgraduate degrees, including special degrees, in fields like Science, Computer Science, Engineering, Management, and more. </p><br/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;