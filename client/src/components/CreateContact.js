import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateContact() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
  });

  const inputForm = (el) => {
    const { name, value } = el.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e, input) => {
    try {
      e.preventDefault();
      await axios({
        method: "post",
        url: "http://localhost:8080/addresses",
        data: input,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <h1>New Contact</h1>
      <form onSubmit={(e) => submitHandler(e, input)} className="form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange={inputForm}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Enter email address"
          onChange={inputForm}
        />{" "}
        <br />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          onChange={inputForm}
        />{" "}
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          placeholder="Enter adddress"
          onChange={inputForm}
        />
        <br />
        <div className="nav_button">
          <button onClick={() => navigate("/")} className="button">
            <span>Cancel</span>
          </button>
          <button type="submit" value="submit" className="button submit">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
