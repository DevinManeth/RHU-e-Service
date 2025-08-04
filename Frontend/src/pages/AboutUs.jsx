import React from "react";

const teamMembers = Array(8).fill({
  name: "Name",
  position: "Job Position",
  photo: "", // Add photo URLs later
});

const AboutUs = () => {
  return (
    <div className="w-full bg-gray-200 min-h-screen flex flex-col items-center">
      <div className="w-full bg-teal-700 py-6 text-center">
        <h1 className="text-3xl font-bold text-black">Our Teams</h1>
      </div>

      <div className="grid grid-cols-4 gap-10 p-10 max-w-6xl">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs text-center">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                "include a photo"
              )}
            </div>
            <div className="mt-2 text-center text-sm">
              <p className="font-semibold">{member.name}</p>
              <p>{member.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="w-full text-right pr-10 pb-4 text-sm text-black">
        Iservice Expert
      </div> */}
    </div>
  );
};

export default AboutUs;