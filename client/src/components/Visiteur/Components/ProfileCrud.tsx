import { Pencil,Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    nom: string,
    prenom:string
    email: string;
}


export default function ProfileCrud(){
    const [UserData, setUserData] = useState<User[]>([]);
    const [showModal,setShowModal] = useState(false);
    const [editForm,setEditForm] = useState<User>({ id:0, nom:"", prenom:"",email:""});



    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const token = localStorage.getItem("token");
                const res = await axios.get("http://127.0.0.1:8080/api/directeur", {headers: {
                    Authorization: `Bearer ${token}`,
                },});
                console.log(res); 
                setUserData([res.data]); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };
        fetchData();
    }, []);

    const handledelete = async()=>{
        
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                // Send a DELETE request to the API
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                    Authorization: `Bearer ${token}`, 
                    },
                };
                await axios.delete(`http://127.0.0.1:8080/api/directeur`,config);

                console.log("Student deleted successfully");
                
            } catch (error) {
                console.error(error);
            }
        }
    }


    const handleEditClick = (user: User) => {
        setEditForm(user);
        setShowModal(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };


    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://127.0.0.1:8080/api/directeur`, editForm, config);
            console.log("User updated successfully");

            setUserData((prev) =>
                prev.map((user) => (user.id === editForm.id ? editForm : user))
            );

            setShowModal(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <div className="text-end">
            </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        Id 
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Last name 
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        First name 
                    </th>
                    
                    <th scope="col" className="px-6 py-3 text-center">
                        email
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {UserData.map((user:User, index:number) =>(
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {user.id}
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        {user.nom}
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        {user.prenom}
                    </th>
                    
                    <td className="px-6 py-4 text-center">
                        {user.email}
                    </td>
                    <td className="px-6 py-4 text-center">
                        
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 
                    focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium 
                    rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 
                    dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    
                    onClick={()=>handledelete()}>
                    <Trash/></button>
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 
                    focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium 
                    rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 
                    dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    
                    onClick={() => handleEditClick(user)}>
                    <Pencil/></button>
                        
                    </td>
                </tr>
            ))}
               
            </tbody>
        </table>
    </div>
    {showModal && (
                <div
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50"
                onClick={() => setShowModal(false)}
            >
                <div
                    className="bg-white rounded-lg shadow-2xl p-8 w-96"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Update admin
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="nom"
                            value={editForm.nom}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Last Name"
                        />
                        <input
                            type="text"
                            name="prenom"
                            value={editForm.prenom}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="First Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-zinc-300 hover:bg-zinc-400 text-white px-4 py-2 rounded-lg transition duration-200"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            
            )}
    </div>
)
}