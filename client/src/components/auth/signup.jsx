import { Link } from "react-router-dom";
import { FiLock, FiMail, FiUser } from "react-icons/fi";


import Error from "../form/Error";
import InputArea from "../form/InputArea";
import useLoginSubmit from "../../hooks/useAuthSubmit";


const SignUp = () => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

  return (
    
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold font-serif">
                    Signing Up
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 mb-8 sm:mb-10">
                    Create an account by sign up with provider or email,
                    password
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col justify-center mb-6"
                >
                  <div className="grid grid-cols-1 gap-5">
                    {/* NAME */}
                    <div className="form-group">
                      <InputArea
                        register={register}
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        Icon={FiUser}
                      />
                      <Error errorName={errors.name} />
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                      <InputArea
                        register={register}
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        Icon={FiMail}
                      />
                      <Error errorName={errors.email} />
                    </div>

                    {/* PASSWORD */}
                    <div className="form-group">
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        Icon={FiLock}
                        pattern={
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
                        }
                        patternMessage={[
                          "1. Password must be at least 8 characters long.",
                          "2. Password must contain at least one uppercase letter.",
                          "3. Password must contain at least one lowercase letter.",
                          "4. Password must contain at least one number.",
                          "5. Password must contain at least one special character.",
                        ]}
                      />
                      <Error errorName={errors.password} />
                    </div>

                    {/* LOGIN LINK */}
                    <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          to="/auth/login"
                          className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                        >
                          Already have account?
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
                        Register
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

export default SignUp;
