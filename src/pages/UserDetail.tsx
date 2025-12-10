import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import "./UserDetail.css";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient"; 
interface User {
  id?: number;
  name: string;
  slug?: string;
  title: string;
  email: string;
  phone: string;
  profileImage?: string;
  linkedinURL?: string;
}

const UserDetail: React.FC = () => {
  const { slug } = useParams();
  const [user, setUser] = useState<User | null>(null);


useEffect(() => {
    const fetchUser = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("slug", slug)
        .single(); // expect one row

      if (error) {
      } else {
        setUser(data);
      }
    };

    fetchUser();
  }, [slug]);
  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="container">

      {user.profileImage && (
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          className="profile-image"
        />
      )}

      <h1>{user.name}</h1>
      <h2>{user.title}</h2>

<div className="contact-buttons">

  {/* Email */}
  <a href={`mailto:${user.email}`}>
    <img src="/src/assets/email.svg" alt="Email" className="icon" />
    <div className="info-inline">
      <p className="info-label">E-mail</p>
      <p className="info-value">{user.email}</p>
    </div>
  </a>

  {/* Phone */}
  <a href={`tel:${user.phone}`}>
    <img src="/src/assets/phone.svg" alt="Phone" className="icon" />
    <div className="info-inline">
      <p className="info-label">Phone</p>
      <p className="info-value">{user.phone}</p>
    </div>
  </a>

  {/* LinkedIn */}
  {user.linkedinURL && (
  <a href={user.linkedinURL} target="_blank" rel="noopener noreferrer">
    <img src="/src/assets/linkedin.svg" alt="LinkedIn" className="icon" />
    <span>Visit my LinkedIn</span>
  </a>
)}


  {/* Website */}
  <a href="https://chris-marine.com/" target="_blank" rel="noopener noreferrer">
    <img src="/src/assets/web.svg" alt="Website" className="icon" />
    <span>Visit our Website</span>
  </a>

  {/* YouTube */}
  <a href="https://www.youtube.com/@ChrisMarineAB" target="_blank" rel="noopener noreferrer">
    <img src="/src/assets/youtube.svg" alt="YouTube" className="icon" />
    <span>Watch our YouTube</span>
  </a>
</div>


      
<Footer/>
 


      
    </div>
  );
};

export default UserDetail;
