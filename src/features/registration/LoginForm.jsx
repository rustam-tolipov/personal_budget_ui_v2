import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import { NavLink } from "react-router-dom";

const LoginFrom = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex h-full items-center justify-center ml-2 sm:ml-0">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Please enter your email and password.
        </Typography>
        <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>

          {isLoading ? (
            <Button
              // disabled
              className="mt-6 flex items-center justify-center"
              fullWidth
            >
              <Spinner />
            </Button>
          ) : (
            <Button className="mt-6" fullWidth>
              login
            </Button>
          )}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Do not have an account?{" "}
            <NavLink className="font-medium text-gray-900" to="/sign-up">
              Sign Up
            </NavLink>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default LoginFrom;
