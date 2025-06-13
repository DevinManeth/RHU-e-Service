import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function ApplyTranscript(){
      const navigate = useNavigate();

    return (
        <>
        
        
      {/* Buttons */}
      <div className="flex flex-col gap-6 pt-16 h-screen px-6 bg-[#D9D9D9]"  >
        

        {/* <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow">
          Apply Transcript
        </button> */}

          <p>You can fill the apply transcript form here</p>
       

        
      </div>
    
        
        </>
    );
}
export default ApplyTranscript;