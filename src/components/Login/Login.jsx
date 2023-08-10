import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { userLogin } from "../../toolkit/Users/usersSlice";
import { validateUserData } from "../../utils/userDataValidation";
import { ShowMessage } from "../ShowMessage/ShowMessage";
import passwordEye from "../../assets/password-eye.svg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import facebook from "../../assets/facebook.svg";
import email from "../../assets/email.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
    setErrors(validateUserData(name, value, userData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyValues = Object.values(userData).some(
      (value) => value === ""
    );
    const hasErrors = Object.keys(errors).length;

    if (hasEmptyValues || hasErrors) {
      ShowMessage("Completa todos los campos", "error");
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const credentials = {
        uid: userCredentials.user.uid,
        accessToken: userCredentials.user.accessToken,
      };
      dispatch(userLogin(credentials));

      setUserData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);

      ShowMessage(`Bienvenido ${userCredentials.user.email}`);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          ShowMessage("Contraseña incorrecta", "error");
          break;
        case "auth/user-not-found":
          ShowMessage("Usuario no encontrado", "error");
          break;
        case "auth/too-many-requests":
          ShowMessage("Demasiadas peticiones", "error");
          break;
        case "auth/invalid-email":
          ShowMessage("Email invalido", "error");
          break;
        case "auth/user-disabled":
          ShowMessage("Usuario desactivado", "error");
          break;
        default:
          ShowMessage("Ops, algo salió mal", "error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-mono">
      <div className="relative w-32 h-auto ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/User_font_awesome.svg"
          alt="user-logo"
          className="absolute -top-16 rounded-full border-4 bg-blue-800 bg-opacity-40 border-slate-700"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center bg-blue-800 bg-opacity-20 p-10 rounded-lg shadow-neutral-900 shadow-lg"
      >
        <h1 className="text-3xl text-center text-white mt-16 mb-6">
          INICIAR SESIÓN
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="pl-2 mb-1 text-lg">
            EMAIL
          </label>
          <div className="relative">
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="bg-neutral-900 opacity-50 p-1.5 mb-3 rounded-md w-80  text-neutral-100 text-center outline-none"
            />
            <img src={email} className="absolute top-0 right-1 w-9 h-9" />
          </div>

          {/* Password */}
          <label htmlFor="password" className="pl-2 mb-1 text-lg">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="bg-neutral-900 opacity-50 p-1.5 mb-2 rounded-md w-80 text-neutral-100 text-center outline-none"
            />
            <img src={passwordEye} className="absolute top-0 right-1 w-7 h-9" />
          </div>
        </div>

        <button className="p-2 mt-10 mb-12 bg-blue-800 text-white rounded-md w-48 border-2 border-slate-600 hover:bg-sky-700 hover:shadow-md transition">
          INICIAR SESION
        </button>
        <div className="bg-slate-500 w-56 h-0.5 mb-5"></div>

        {/* Authentication */}
        <h4 className="text-lg mb-5">O CONTINUAR CON</h4>
        <div className="flex justify-center gap-6">
          <img
            src={google}
            alt="google-logo"
            className="w-9 hover:cursor-pointer transition"
          />
          <img
            src={facebook}
            alt="facebook-logo"
            className="w-10 hover:cursor-pointer transition"
          />
          <img
            src={github}
            alt="github-logo"
            className="w-10 hover:cursor-pointer transition"
          />
        </div>
      </form>
    </div>
  );
}
