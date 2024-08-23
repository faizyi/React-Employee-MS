import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Tree from 'react-d3-tree';
import { getEmployees } from '../../services/empoylee.service';
export default function EmployeeHierarchyModal({selectedEmployee, showModal, handleCloseModal}) {
    const [employeeData, setEmployeeData] = useState(null);
    useLayoutEffect(() => {
        (async () => {
            const data = await getEmployees(selectedEmployee);
            setEmployeeData(data);
            console.log(data);
        })
        ()
    }, [selectedEmployee]);
    const hierarchyData = {
        name: employeeData?.supervisorData?.name,
        attributes: {
            Position: employeeData?.supervisorData?.position
        },
        children: [
            {
                name: employeeData?.name,
                attributes: {
                    Position: employeeData?.position,
                },
                children:
                    employeeData?.subordinates?.map((employee) => {
                        return {name : employee.name}
                    })
            },
        ],
    };
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Employee Hierarchy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ height: '400px', width: '100%' }}>
                    <Tree data={hierarchyData} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
  )
}
