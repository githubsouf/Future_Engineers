
export default function Forget() {

    const handleAlert= () =>{
        return(
            alert("Check your email please")
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Please Enter your email to reset your password
                </h2>

                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button type="button" onClick={handleAlert} className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white py-2 rounded-md transition-colors">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
