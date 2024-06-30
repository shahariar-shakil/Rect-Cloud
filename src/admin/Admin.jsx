import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import loader from '../assets/img/Loading_icon.gif';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, 'users'));
        const userData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const contactSnapshot = await getDocs(collection(db, 'contacts'));
        const contactData = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUsers(userData);
        setContacts(contactData);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading on error
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/admin-login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = (type, id) => {
    // Implement edit functionality
    console.log(`Editing ${type} with ID: ${id}`);
  };

  const handleDelete = async (type, id) => {
    try {
      await deleteDoc(doc(db, type, id));
      if (type === 'users') {
        setUsers(users.filter(user => user.id !== id));
      } else if (type === 'contacts') {
        setContacts(contacts.filter(contact => contact.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${type} with ID: ${id}`, error);
    }
  };

  const handleView = (type, id, fileFullName) => {
    // Implement view functionality
    console.log(`Viewing ${type} with ID: ${id}`);
    console.log(`Full file name: ${fileFullName}`);
    // You can expand this functionality to display the file full name in a modal or similar.
  };

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '100px' }}>
        <img src={loader} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Admin Dashboard</h1>

        <div className="mb-4">
          <h2>Users</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className="btn btn-primary me-2" onClick={() => handleEdit('users', user.id)}>Edit</button>
                      <button className="btn btn-danger me-2" onClick={() => handleDelete('users', user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2>Contacts</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>File</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.fileName}</td>
                    <td>
                      <button className="btn btn-primary me-2" onClick={() => handleEdit('contacts', contact.id)}>Edit</button>
                      <button className="btn btn-danger me-2" onClick={() => handleDelete('contacts', contact.id)}>Delete</button>
                      <button className="btn btn-success me-2" onClick={() => handleView('contacts', contact.id, contact.fileFullName)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
