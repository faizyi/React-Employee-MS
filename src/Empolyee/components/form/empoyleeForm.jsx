import React, { useState, useEffect } from 'react';
import { Form,Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { addEmployee, fetchExistingData,  } from '../../services/empoylee.service';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../../Empolyee/redux/loaderSlice/loaderSlice';
import { Loader } from '../loader/loader';
export default function EmpoyleeForm({showModal, setShowModal}) {
    const {isLoading} = useSelector(state=>state.loader)
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => {
        async function fetchData() {
            await fetchExistingData((allEmployeesList) => {
                setEmployees(allEmployeesList);
            });
        }
        fetchData();
    },[])
    const onSubmit = async (data) => {
        try {
            dispatch(showLoader());
           await addEmployee(data, reset,dispatch,setShowModal);
           setShowModal(false);
        } catch (error) {
            console.log(error);
        }
        finally{
            dispatch(hideLoader()); 
        }
    }
  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
    <Modal.Header closeButton>
    <Modal.Title>Add Employee</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {isLoading ? <Loader/> : 
            <Form className='ml-5' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control className='' type="text" placeholder='Enter Name' {...register('name', { required: 'Name is required' })} />
                {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
            </Form.Group>
        
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control className='' type="email" placeholder='Enter Email' 
                {...register('email', { required: 'email is required' })} />
                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
            </Form.Group>
        
            <Form.Group controlId="position">
                <Form.Label>Position:</Form.Label>
                <Form.Control className='' type="text" placeholder='Enter Position' {...register('position', { required: 'Position is required' })} />
                {errors.position && <Form.Text className="text-danger">{errors.position.message}</Form.Text>}
            </Form.Group>
        
             <Form.Group controlId="supervisor">
                <Form.Label>Supervisor:</Form.Label>
                <Form.Control className='' as="select" {...register('supervisor', { required: 'Supervisor is required' })}>
                    <option disabled selected value="">Select Supervisor</option>
                    {!employees ? <option>Loading....</option> : (
                        employees.map((employee, index)=>{
                            return (
                                <option key={index} value={employee.id}>{employee.name} 
                                {employee.position}</option>
                            )
                        })
                    )}
                </Form.Control>
                {errors.supervisor && <Form.Text className="text-danger">{errors.supervisor.message}</Form.Text>}
            </Form.Group> 
        
            <Button variant="primary" type="submit" className='mt-3'>Add Employee</Button>
        </Form> 
       
        }
</Modal.Body>
    </Modal>
</>
  )
}
