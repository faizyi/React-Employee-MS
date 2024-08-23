import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { showLoader, hideLoader } from '../../redux/loaderSlice/loaderSlice';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../services/empoylee.service';
export default function Delete({id, setEmployees}) {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            dispatch(showLoader());
            await deleteEmployee(id);
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
            dispatch(hideLoader());
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
        finally{
            dispatch(hideLoader());
        }
    }
  return (
    <Button onClick={handleDelete} variant="primary" className="btn-sm me-1 mb-2" title="Remove item">
    <FontAwesomeIcon onClick={handleDelete} icon={faTrash} />
    </Button>
  )
}
