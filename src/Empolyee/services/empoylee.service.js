import { db } from "../../Empolyee/firebaseConfig/firebaseConfig"
import Swal from 'sweetalert2'
import { addDoc, arrayUnion, collection, deleteDoc, doc, 
getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { showLoader,hideLoader } from "../redux/loaderSlice/loaderSlice";
export const fetchExistingData = async (callback) => {
    try {
        const c = collection(db, "employees");

        return onSnapshot(c, (snapshot) => {
            const existingData = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            callback(existingData);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const addEmployee = async (data, reset,dispatch,setShowModal) => {
    try {
        dispatch(showLoader())
        await addDoc(collection(db, "employees"),{
            ...data,
            subordinates: [],
        })
        const subordinatesData ={
            name: data.name,
            position: data.position,
        }
        if (data.supervisor) {
            const employeeRef = doc(db, `employees/${data.supervisor}`);
            await updateDoc(employeeRef, {
                subordinates: arrayUnion(subordinatesData)
            });
        }
        Swal.fire("Employee added successfully");
        reset();
        setShowModal(false);
    } catch (error) {
        console.log(error);
    }
    finally {
        dispatch(hideLoader());
    }
}


export const getEmployees = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const employeeRef = doc(db, `employees/${id}`);
            const employeeDataSnap = await getDoc(employeeRef);

            if (employeeDataSnap.exists()) {
                if (employeeDataSnap.data().supervisor) {
                    const supervisorRef = doc(db, `employees/${employeeDataSnap.data().supervisor}`)
                    const superVisorDocSnap = await getDoc(supervisorRef);

                    if (superVisorDocSnap.exists()) {
                        resolve({ ...employeeDataSnap.data(), supervisorData: superVisorDocSnap.data() });
                    }
                } else {
                    resolve(employeeDataSnap.data())
                }

            }

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    })
}


export const deleteEmployee = async (id) => {
    try {
        await deleteDoc(doc(db, "employees", id));
        alert("Employee removed successfully")
    } catch (error) {
        console.log(error);
    }
}