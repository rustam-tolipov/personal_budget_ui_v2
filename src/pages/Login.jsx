import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import RegistrationForm from "../features/registration/RegistrationForm";
import LoginFrom from "../features/registration/LoginForm";

const Login = () => {
  return (
    <div className="flex h-[100dvh] w-full bg-slate-50">
      <div className="flex h-full w-full flex-col px-6 py-4">
        <div className="flex h-fit items-center gap-4">
          <img src="images/beedget.svg" alt="logo" className="h-8" />
          <p className="text-2xl">beedget</p>
        </div>
        <LoginFrom />
      </div>
      <div className="hidden h-full w-full lg:block">
        <LazyLoadImage
          alt="Login image"
          src="./images/login/login.jpeg"
          effect="blur"
          className="h-[100dvh] w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Login;
