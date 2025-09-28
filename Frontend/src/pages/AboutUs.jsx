// src/pages/AboutUs.jsx
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import indraniImg from "../assets/indrani.jpg";
import niraniImg from "../assets/nirani.jpg";
import weragodaImg from "../assets/weragoda.jpg";
import sahandaniImg from "../assets/sahandani.jpg";
import harshaniImg from "../assets/harshani.jpg";
import thiliniImg from "../assets/thilini.jpg";
import sahaniImg from "../assets/sahani.jpg";
import subasingheImg from "../assets/subasinghe.jpg";
import weerasingheImg from "../assets/weerasinghe.jpg";
import deputyArImg from "../assets/deputy-ar.png";

export default function AboutUs() {
  const staff = [
    { name: "Ms. Y.M.N. Indra Kumari", role: "Staff Management Assistant", email: "kumarin392@gmail.com", phone: "041-2222681 - Ext:12026", img: indraniImg },
    { name: "Ms. Nirani Gmage", role: "Management Assistant (Grade I)", email: "wgnirani22@yahoo.com", img: niraniImg },
    { name: "Mr. N. U. Weragoda", role: "Management Assistant (Grade II)", email: "nuwuragoda@gmail.com", img: weragodaImg },
    { name: "Ms. A.T.M. Sahandani", role: "Management Assistant (Grade III)", email: "mudithasahandani12345@gmail.com", img: sahandaniImg },
    { name: "Ms. H.G. Harshani Wathsala", role: "Management Assistant (Grade III)", email: "harashanisha1@gmail.com", img: harshaniImg },
    { name: "Ms. S.K. Thilini Nuwanthi", role: "Management Assistant (Grade III)", email: "nuwanthisaskt@admin.ruh.ac.lk", img: thiliniImg },
    { name: "Ms. S. Sahani Wickramanayaka", role: "Management Assistant (Grade III)", email: "shashikasw@admin.ruh.ac.lk", img: sahaniImg },
    { name: "Mr. S.E. Subasinghe", role: "Works Aide", email: "sujitheranda@gmail.com", img: subasingheImg },
    { name: "Ms. S.P. Weerasinghe", role: "Works Aide", email: "shiromalaweerasinghe@gmail.com", img: weerasingheImg },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#006A71] to-[#009688] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About RUH-E-Service
          </motion.h1>
          <p className="text-lg md:text-xl">Examination Department Staff & Services</p>
        </div>
      </section>

      {/* Deputy AR Section */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Deputy Assitant Regitrar</h2>
        <div className="flex flex-col items-center">
          <img src={deputyArImg} alt="Deputy Assitant Regitrar" className="w-40 h-40 rounded-full object-cover shadow-md" />
          <h3 className="mt-4 text-lg font-semibold">Deputy Assitant Regitrar</h3>
          <p className="text-sm text-gray-600">Examination Department</p>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-700">Our Staff</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover shadow" />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>

                {/* Email */}
                {member.email && (
                  <p className="text-sm mt-2 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-[#006A71]" />
                    <a href={`mailto:${member.email}`} className="text-[#006A71] hover:underline">{member.email}</a>
                  </p>
                )}

                {/* Phone */}
                {member.phone && (
                  <p className="text-sm mt-1 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-[#006A71]" />
                    {member.phone}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}