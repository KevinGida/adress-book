import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";
import mainLogo from "../assets/Navigation-amico.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchContact = async (id) => {
    try {
      setLoading(true);
      const person = await axios({
        method: "get",
        url: "http://localhost:8080/addresses/" + id,
      });
      setContact(person.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchContacts = async () => {
    try {
      const contacts = await axios({
        method: "get",
        url: "http://localhost:8080/addresses",
      });
      setContacts(contacts.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios({
        method: "delete",
        url: "http://localhost:8080/addresses/" + id,
      });
      fetchContacts();
      setContact({});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (contact.id) {
      setLoading(false);
    }
  }, [contact]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const popup = () => {
    if (contact.id) {
      if (!loading) {
        return (
          <div className="container">
            <div className="namecard">
              <div>
                <h1>{contact.name}</h1>
                <button
                  className="close"
                  onClick={() => setContact({})}
                ></button>
              </div>
              <div>
                <h2>Contact Details</h2>
              </div>
              <div className="detail">
                <div className="placeholder">
                  <label>Email</label>
                  <label>Phone</label>
                  <label>Address</label>
                </div>
                <div className="colon">
                  <label>:</label>
                  <label>:</label>
                  <label>:</label>
                </div>
                <div className="data">
                  <li>{contact.email}</li>
                  <li>{contact.phone}</li>
                  <li>{contact.address}</li>
                </div>
              </div>
              <div className="nav_button">
                <button
                  onClick={() => navigate("/addresses/" + contact.id + "/edit")}
                  className="button"
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="button"
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="container">
          <img className="main_image" src={mainLogo} alt="" />
        </div>
      );
    }
  };

  return (
    <div className="main_page">
      <div className="left_content">
        <div className="header">
          <h1 className="title">Contacts </h1>
          <div className="search-box">
            <button className="btn-search">
              <FontAwesomeIcon icon={(faS, faSearch)} />
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Search contact..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="page">
          {contacts
            .filter((el) => {
              return search.toLowerCase() === ""
                ? el
                : el.name?.toLowerCase().includes(search);
            })
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((el) => (
              <li
                key={el.id}
                className="list"
                onClick={() => fetchContact(el.id)}
              >
                {el.name}
              </li>
            ))}
        </div>
      </div>
      <div className="right_content">
        <div>{popup()}</div>
      </div>
    </div>
  );
}
