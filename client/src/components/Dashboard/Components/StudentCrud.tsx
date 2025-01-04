import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    email: string;
}

export default function StudentCrud() {
    const [UserData, setUserData] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://127.0.0.1:8080/api/directeur/students", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setUserData(res.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`http://127.0.0.1:8080/api/directeur/students/${id}`, config);
                console.log("Student deleted successfully");

                // Update the UserData state after deletion
                setUserData((prev) => prev.filter((user) => user.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleAddClick = () => {
        setShowModal(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleAdd = async (e: any) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };
            await axios.post("http://127.0.0.1:8080/api/directeur/add-students-from-excel", formData, config);
            console.log("File uploaded successfully");

            // Refresh the student list
            const res = await axios.get("http://127.0.0.1:8080/api/directeur/students", config);
            setUserData(res.data);

            setShowModal(false);
            setFile(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="text-end">
                <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={handleAddClick}
                >
                    <Plus />
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">Id</th>
                            <th scope="col" className="px-6 py-3 text-center">Email</th>
                            <th scope="col" className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserData.map((user: User, index: number) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    {user.id}
                                </th>
                                <td className="px-6 py-4 text-center">{user.email}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        type="button"
                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash />
                                    </button>
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
                            Upload Excel File
                        </h2>
                        <div className="space-y-4">
                            {/* <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            /> */}
                            {/* <input type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">*file excel</p> */}

                            {/* <div className="flex items-center justify-center w-full">
                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div> */}

<div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Excel files only (.xlsx, .xls)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept=".xlsx, .xls"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

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
                            onClick={handleAdd}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
