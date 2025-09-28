import React from "react";

// Import team photos
import devinPhoto from "../assets/devin.jpg";
import oshanPhoto from "../assets/oshan.jpg";
import anjanaPhoto from "../assets/anjana.jpg";
import sajaniPhoto from "../assets/sajani.jpg";
import oshiniPhoto from "../assets/oshini.jpg";
import omalPhoto from "../assets/omal.jpg";
import kanishkaPhoto from "../assets/kanishka.jpg";

// Team members data
const teamMembers = [
  {
    name: "Devin",
    position: "Team Leader / Full Stack Developer",
    photo: devinPhoto,
    email: "devinkatuwawala2000@gmail.com",
  },
  {
    name: "Oshan",
    position: "Frontend Developer",
    photo: oshanPhoto,
    email: "vishmith715930@gmail.com",
  },
  {
    name: "Anjana",
    position: "UI/UX Designer",
    photo: anjanaPhoto,
    email: "anjanakavinda8@gmail.com",
  },
  {
    name: "Sajani",
    position: "Backend Developer",
    photo: sajaniPhoto,
    email: "sajanibhagya587@gmail.com",
  },
  {
    name: "Oshini",
    position: "Quality Assurance Engineer",
    photo: oshiniPhoto,
    email: "oshiniweerarathne99@gmail.com",
  },
  {
    name: "Omal",
    position: "Database Administrator",
    photo: omalPhoto,
    email: "omalrandilina@gmail.com",
  },
  {
    name: "Kanishka",
    position: "Project Coordinator",
    photo: kanishkaPhoto,
    email: "devin@example.com",
  },
];

const Technologies = () => {
  return (
    <div className="w-full bg-gray-200 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-teal-700 py-6 text-center">
        <h1 className="text-3xl font-bold text-white">Our Technologies Team</h1>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 max-w-6xl">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {/* Circle Photo */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 shadow">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Info */}
            <div className="mt-3 text-center">
              <p className="font-semibold text-lg">{member.name}</p>
              <p className="text-sm text-gray-700">{member.position}</p>
              <p className="text-sm text-teal-600 mt-1">
                <a
                  href={`mailto:${member.email}`}
                  className="underline hover:text-teal-800"
                >
                  {member.email}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full text-center py-4 text-sm text-black bg-gray-100">
        © {new Date().getFullYear()} iService Expert Technologies
      </div>
    </div>
  );
};

export default Technologies;
