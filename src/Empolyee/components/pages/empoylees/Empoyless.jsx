import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Header from '../../header/Header';
import EmployeeHierarchyModal from '../../EmployeeHierarchyModal/EmployeeHierarchyModal';
import { fetchExistingData } from '../../../services/empoylee.service';
import { showLoader, hideLoader } from '../../../redux/loaderSlice/loaderSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Loader } from '../../loader/loader';
import Delete from '../../delete/delete';
export default function Empoyless() {    
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loader.isLoading);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        async function fetchData() {
            dispatch(showLoader());
            await fetchExistingData((allEmployeesList) => {
                setEmployees(allEmployeesList);
                dispatch(hideLoader());
            });
        }
        fetchData();
    }, []);
    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
  return (
    <>
            <Header />
            <div className='mt-20 overflow-x-auto max-w-100'>
                {isLoading ? (
                    <Loader />
                ) : (
                    !employees.length ? (
                        <p className='flex justify-center items-center mt-10'>No employees found</p>
                    ) : (
                        <div>
                            <h2 className='text-2xl font-bold text-center mb-4'>Employees List</h2>
                            <Table striped bordered hover className='w-100 overflow-y-auto max-h-300'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee, index) => (
                                        <tr key={employee.id} onClick={() => handleRowClick(employee.id)}>
                                            <td>{index + 1}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.email}</td>
                                            <td><Delete id={employee.id} setEmployees={setEmployees}/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )
                )}
            </div>
            <EmployeeHierarchyModal selectedEmployee={selectedEmployee} 
            showModal={showModal} handleCloseModal={handleCloseModal} />
        </>
  )
}
