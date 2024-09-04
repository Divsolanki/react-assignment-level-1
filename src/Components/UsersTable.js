
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetching data from the API
  useEffect(() => {
    fetch('https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filtering users based on search input
  const filteredUsers = sortedUsers.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className='ml-3 mt-4 mb-0 text-3xl'>Users</h2>
    <div className="container mx-auto p-6">
    <div className="mt-4 relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search by first or last name"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 pl-4 pr-10 border border-gray-300 rectangle-md focus:outline-none focus:ring-2"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 border-2">
        <CiSearch className="text-gray-600 justify-center" />
      </div>
    </div>
    </div>
    
      <table className=" m-4 min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left text-sm uppercase font-semibold text-gray-700">
            <th onClick={() => handleSort('first_name')} className="cursor-pointer py-2 px-4">First Name</th>
            <th onClick={() => handleSort('last_name')} className="cursor-pointer py-2 px-4">Last Name</th>
            <th onClick={() => handleSort('age')} className="cursor-pointer py-2 px-4">Age</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Website</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} className="border-t border-gray-300">
              <td className="py-2 px-4">
                <Link to={`/users/${user.id}`} className="text-black-600 hover:underline">
                  {user.first_name}
                </Link>
              </td>
              <td className="py-2 px-4">{user.last_name}</td>
              <td className="py-2 px-4">{user.age}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <a href={user.web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {user.web}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
function Pagination({ usersPerPage, totalUsers, paginate, currentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const maxPagesToShow = 5;

  // Calculate the start and end page numbers
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4 flex justify-end">
      <ul className="flex justify-centre space-x-2">
        {/* Previous button */}
        <li className="page-item">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) paginate(currentPage - 1);
            }}
            className={`page-link py-2 px-4 block ${currentPage === 1 ? 'text-gray-400' : 'text-white-600'}`}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'
            } square`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              className="page-link py-2 px-4 block"
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li className="page-item">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) paginate(currentPage + 1);
            }}
            className={`page-link py-2 px-4 block ${currentPage === totalPages ? 'text-gray-400' : 'text-white-600'}`}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default UsersTable;


