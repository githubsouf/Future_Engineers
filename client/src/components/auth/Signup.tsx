import './Signup.css';

interface SignupProps {
    flipCard: ()=> void;
}
export default function Signup({flipCard}: SignupProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" ring2 bg-white shadow-lg rounded-lg p-8 max-w-lg">
        <i
          style={{ "--clr": "rgba(39, 161, 146, 255)" } as React.CSSProperties}
        ></i>
        <i
          style={{ "--clr": "rgba(76, 135, 174, 255)" } as React.CSSProperties}
        ></i>
        <i
          style={{ "--clr": "rgba(127, 71, 217, 255)" } as React.CSSProperties}
        ></i>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign up
        </h2>

        <form className="space-y-4  ">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white py-2 rounded-md transition-colors">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <button onClick={flipCard} className="text-blue-500 underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}