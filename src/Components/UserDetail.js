import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';
import { IoMdArrowBack } from "react-icons/io";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const selectedUser = data.find(user => user.id === parseInt(id, 10));
        setUser(selectedUser);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{  marginLeft:'20px'  }}>
      <div class="backSection"> 
        <div class="backarrow">
       
        <Link to="/users"  style={{ height: '20px', width: '20px' }}><IoMdArrowBack /></Link>
        </div>
       
   
      <h2 class="pageHeader">Details: {user.first_name} {user.last_name}</h2>
      </div>
      <div class="detailspace">
      <p>First Name: <strong>{user.first_name}</strong></p>
      <p>Last Name: <strong>{user.last_name}</strong></p>
      <p>Company:<strong>{user.company_name}</strong></p>
      <p>City:<strong>{user.city}</strong> </p>
      <p>State:<strong>{user.state}</strong> </p>
      <p>Zip:<strong>{user.zip}</strong> </p>
      <p>Email:<strong>{user.email}</strong> </p>
      <p>Website:<strong> <a href={user.web} target="_blank" rel="noopener noreferrer">{user.web}</a></strong></p>
      <p style={{ padding: 0, border: 'none' }}>Age: <strong>{user.age}</strong></p>
      </div>
      

      
    </div>
  );
}

export default UserDetail;





























