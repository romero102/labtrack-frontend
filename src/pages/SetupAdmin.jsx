import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupAdmin } from "../api/auth";

const SetupAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setupAdmin(form);
      alert("Admin creado");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error al crear admin");
    }
  };

  return (
    <div>
      <h1>Crear Admin</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default SetupAdmin;