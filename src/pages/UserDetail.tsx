import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserDetail.css";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";


import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import linkedinIcon from "../assets/linkedin.svg";
import webIcon from "../assets/web.svg";
import youtubeIcon from "../assets/youtube.svg";
import arrowIcon from "../assets/arrow.svg"; // <-- new arrow image

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
        .single();

      if (!error) {
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
        <a href={`mailto:${user.email}`} className="contact-button">
          <img src={emailIcon} alt="Email" className="icon" />
          <div className="info-inline">
            <p className="info-label">E-mail</p>
           <p className="info-value email">{user.email}</p>
          </div>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </a>

        {/* Phone */}
        <a href={`tel:${user.phone}`} className="contact-button">
          <img src={phoneIcon} alt="Phone" className="icon" />
          <div className="info-inline">
            <p className="info-label">Phone</p>
            <p className="info-value">{user.phone}</p>
          </div>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </a>

        {/* LinkedIn */}
        {user.linkedinURL && (
          <a href={user.linkedinURL} target="_blank" rel="noopener noreferrer" className="contact-button">
            <img src={linkedinIcon} alt="LinkedIn" className="icon" />
            <span>Visit my LinkedIn</span>
            <img src={arrowIcon} alt="Arrow" className="arrow" />
          </a>
        )}

        {/* Website */}
        <a href="https://chris-marine.com/" target="_blank" rel="noopener noreferrer" className="contact-button">
          <img src={webIcon} alt="Website" className="icon" />
          <span>Visit our Website</span>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com/@ChrisMarineAB" target="_blank" rel="noopener noreferrer" className="contact-button">
          <img src={youtubeIcon} alt="YouTube" className="icon" />
          <span>Watch our YouTube</span>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default UserDetail;
