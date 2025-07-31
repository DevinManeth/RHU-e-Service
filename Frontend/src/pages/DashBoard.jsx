import Navbar from "../componets/Navbar";
import Chatbot from "../assets/ai-bot.png";
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 pt-16 h-screen px-6 bg-[url(assets/Background.jpeg)] bg-cover "  >
        <div className="absolute inset-0 z-10 bg-black/50 w-full "></div>

        <div className="flex flex-col gap-4 z-10">
          <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow "
            onClick={() => navigate('/OngoingActivities')}>
            Ongoing Activities
          </button>

          <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow"
            onClick={() => navigate('/ApplyTranscript')}>
            Apply Transcript
          </button>

          <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow"
            onClick={() => navigate('/Truecopy')}>
            Truecopy Degree Certificate
          </button>

          <button className="bg-[#9ACBD0] hover:bg-[#8ABFC4] text-black font-semibold px-6 py-3 rounded w-92 shadow"
            onClick={() => navigate('/JobOwners')}>
            For job owners
          </button>

          {/* AI Chat Icon Button */}
          <button
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate('/help')}
          >
            <img
              src={Chatbot}
              alt="AI Chat Bot"
              className="w-full h-full object-cover rounded-full"
            />
          </button>


        </div>

      </div>


    </>
  );
}
export default DashBoard;