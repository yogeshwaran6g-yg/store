import { Link } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";

// internal imports (adjust relative paths if needed)
import Error from "../form/Error";
import useLoginSubmit from "../../hooks/useAuthSubmit";
import InputArea from "../form/InputArea";

const Login = () => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

  return (    
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold font-serif">Login</h2>
                  <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                    Login with your email and password
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 gap-5">
                    {/* EMAIL */}
                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="justin@gmail.com"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        Icon={FiMail}
                        autocomplete="email"
                      />
                      <Error errorName={errors.email} />
                    </div>
                    {/* FORGOT PASSWORD */}
                    <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          to="/auth/forget-password"
                          className="text-end text-sm text-gray-600 ps-3 underline hover:no-underline focus:outline-none"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>



                    {/* PASSWORD */}
                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="12345678"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        Icon={FiLock}
                        autocomplete="current-password"
                      />
                      <Error errorName={errors.password} />
                    </div>

      
                    <div className="flex items-center justify-between">
                                          <div className="flex ms-auto">
                                            <Link
                                              to="/auth/signup"
                                              className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                                            >
                                              Don't have an account?
                                            </Link>
                                          </div>
                                        </div>
                    {/* SUBMIT */}
                    {loading ? (
                      <button
                        disabled
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 rounded-md focus:outline-none bg-emerald-500 text-white px-5 py-3 hover:bg-emerald-600 h-12 mt-1 w-full"
                      >
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />
                        <span className="font-serif ml-2 font-light">
                          Processing
                        </span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>

               
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
