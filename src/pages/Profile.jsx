import React from 'react';
import '../pages/Profile.css'; // Import the CSS file

const name = localStorage.getItem('nameToProfile');
const email = localStorage.getItem('emailToProfile');
function Profile({ user = {
    fullName: name,
    email: email,
    date: 'date',
    picture: 'https://example.com/profile-picture.jpg',
  } }) {
  const { fullName, email, date, picture } = user;




  return (
    <div className="profile-container">
      <img src={picture} alt="Profile" className="profile-picture" />
      <div className="profile-details">
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
    </div>
  );
}

export default Profile;