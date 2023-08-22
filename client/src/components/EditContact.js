import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
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
        method: "put",
        url: "http://localhost:8080/addresses/" + id,
        data: input,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contact = await axios({
          method: "get",
          url: "http://localhost:8080/addresses/" + id,
        });
        setInput(contact.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchContact();
  }, [id]);

  return (
    <div className="content">
      <h1>Edit Contact</h1>
      <form onSubmit={(e) => submitHandler(e, input)} className="form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={input.name}
          onChange={inputForm}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          defaultValue={input.email}
          onChange={inputForm}
        />
        <br />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          defaultValue={input.phone}
          onChange={inputForm}
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          defaultValue={input.address}
          onChange={inputForm}
        />
        <br />
        <div className="nav_button">
          <button onClick={() => navigate("/")} className="button">
            <span>Cancel</span>
          </button>
          <button type="submit" className="button submit">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
