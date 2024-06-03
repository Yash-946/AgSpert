import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginType = {
  username: string;
  password: string;
};

function Auth() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm<LoginType>();
  const { colorMode } = useColorMode();

  useEffect(()=>{

    
  },[])

  function sendRequest(data: { username: any; password: any; }) {
    try {
      const { username, password } = data;
      console.log(username, password);

      if (username === "admin" && password === "admin1234") {
        localStorage.setItem("name","admin");
        navigate("/orders");
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col bg-white">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold text-black">Create an account</div>
          </div>
          <div className="pt-8">
            <div>
              <label className="block mb-2 text-sm text-black font-semibold pt-4 ">
                Username
              </label>
              <input
                type={"text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="admin"
                {...register("username", { required: { value: true, message: "This field is required" } })}
              />
            </div>
            {errors && <div className="text-red-500">{errors.username?.message}</div>}
            <div>
              <label  className="block mb-2 text-sm text-black font-semibold pt-4">
                Password
              </label>
              <input
                type={"password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="admin1234"
                {...register("password", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 8, message: "Password must be at least 8 characters long" }
                })}
              />
            </div>
            {errors && <div className="text-red-500">{errors.password?.message}</div>}

            <button
              onClick={handleSubmit(sendRequest)}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Log In  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Auth;
