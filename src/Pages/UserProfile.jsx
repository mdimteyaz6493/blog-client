import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/userContext';
import Loader from '../Component/Loader';

const UserProfile = () => {
  const { CurrentUser } = useContext(UserContext);
  const token = CurrentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email,avatar } = response.data.User;
        setUserData({ ...userData, name, email,avatar });
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('Failed to fetch user data');
      }
    };
    fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/user/edit-user/${id}`,
        userData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log('Error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${CurrentUser.id}`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={userData.avatar} alt="avatar" />
            </div>
          </div>
          <h1>{userData.name}</h1>
          <form className="form profile_form" onSubmit={handleSubmit}>
            {error && <p className="form_error-msg">{error}</p>}
            <input
              type="text"
              placeholder="Avatar Link"
              name="avatar"
              value={userData.avatar}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmNewPassword"
              value={userData.confirmNewPassword}
              onChange={handleChange}
            />
            <button type="submit" className="btn primary">
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
