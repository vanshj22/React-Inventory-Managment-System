// ForgotPassword.js
import { useState } from "react";

function ForgotPassword() {
    const [form, setForm] = useState({
        email: "",
      });

    const loginUser = (e) => {
        // Cannot send empty data
        if (form.email === "") {
          alert("Enter details to proceed...");
        } else {
          fetch("https://node-inventory-management-07460c9da453.herokuapp.com/api/forget", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(form),
          })
            .then((response) => {
              if (response.ok) {
                return response.text(); // Return the response body as text
              } else {
                throw new Error("Email not found!"); // Throw an error for non-successful response
              }
            })
            .then((data) => {
              // This block executes when the response is successful
              alert(data); // Display the response message
              console.log("User login", data);
            })
            .catch((error) => {
              // This block executes when there is an error (e.g., email not found)
              alert("Something went wrong: " + error.message);
              console.log("Something went wrong ", error);
            });
        }
      };
      

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="forget max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Your Password?</h2>
      <p className="mb-4">
        Enter your email address below and we'll share the password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email address
          </label>
          <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
            />
        </div>
        <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={loginUser}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
