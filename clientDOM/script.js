document.addEventListener("DOMContentLoaded", () => {
  const address = document.querySelector(".address");
  getContacts(address);
});

function getContacts(el) {
  fetch("http://localhost:8080/addresses")
    .then((response) => response.json())
    .then((data) => {
      const contactList = createContactList(data);
      el.appendChild(contactList);
    });
}

function createContactList(contacts) {
  const contactsList = document.createElement("div");
  contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const contactHeading = document.createElement("h2");
    contactHeading.id = contact.id;
    contactHeading.classList.add("contacts");
    contactHeading.onclick = () => getDetail(contact);
    contactHeading.textContent = contact.name;

    const contactDiv = document.createElement("div");
    contactDiv.appendChild(contactHeading);
    contactsList.appendChild(contactDiv);
  }
  return contactsList;
}

function getDetail(contact) {
  if (!document.querySelector(".detail")) {
    const div = document.createElement("div");
    div.classList.add("detail");

    if (document.querySelector(".main-content")) {
      const content = document.querySelector(".main-content");
      content.replaceWith(div);
    } else if (document.querySelector(".create-form")) {
      const content = document.querySelector(".create-form");
      content.replaceWith(div);
    } else if (document.querySelector(".edit-form")) {
      const content = document.querySelector(".edit-form");
      content.replaceWith(div);
    }
  }

  const el = document.querySelector(".detail");
  el.innerHTML = "";

  const name = document.createElement("h1");
  name.textContent = contact.name;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close");
  closeBtn.onclick = () => closeContact();

  const h2 = document.createElement("h2");
  h2.textContent = "Contact Details";

  const detail = document.createElement("div");
  detail.classList.add("contact-details");

  const classname = ["placeholder", "colon", "data"];
  const placeholder = ["Email", "Phone", "Address"];

  for (let i = 0; i < classname.length; i++) {
    const cl = document.createElement("div");
    cl.classList.add(`${classname[i]}`);
    if (classname[i] == "placeholder") {
      for (let i = 0; i < placeholder.length; i++) {
        const label = document.createElement("label");
        label.textContent = `${placeholder[i]}`;
        cl.appendChild(label);
      }
    } else if (classname[i] == "colon") {
      for (let i = 0; i < placeholder.length; i++) {
        const colon = document.createElement("label");
        colon.textContent = `:`;
        cl.appendChild(colon);
      }
    } else if (classname[i] == "data") {
      const dataEmail = document.createElement("label");
      dataEmail.textContent = contact.email;
      const dataPhone = document.createElement("label");
      dataPhone.textContent = contact.phone;
      const dataAddress = document.createElement("label");
      dataAddress.textContent = contact.address;
      cl.appendChild(dataEmail);
      cl.appendChild(dataPhone);
      cl.appendChild(dataAddress);
    }
    detail.appendChild(cl);
  }

  const navBtn = document.createElement("div");
  navBtn.classList.add("nav-button");

  const editBtn = document.createElement("button");
  editBtn.onclick = () => editContact(contact);
  editBtn.classList.add("button");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("button");
  deleteBtn.onclick = () => deleteContact(contact.id);
  deleteBtn.textContent = "Delete";

  navBtn.appendChild(editBtn);
  navBtn.appendChild(deleteBtn);

  el.appendChild(name);
  el.appendChild(h2);
  el.appendChild(closeBtn);
  el.appendChild(detail);
  el.appendChild(navBtn);
}

function deleteContact(id) {
  fetch(`http://localhost:8080/addresses/${id}`, { method: "delete" }).then(
    () => {
      const address = document.querySelector(".address");
      address.innerHTML = "";
      getContacts(address);

      const el = document.createElement("div");
      el.classList.add("main-content");
      const image = document.createElement("img");
      image.id = "logo";
      image.src = "./assets/Navigation-amico.png";
      el.appendChild(image);
      const detail = document.querySelector(".detail");
      detail.replaceWith(el);
    }
  );
}

function closeContact() {
  const el = document.createElement("div");
  el.classList.add("main-content");
  const image = document.createElement("img");
  image.id = "logo";
  image.src = "./assets/Navigation-amico.png";
  el.appendChild(image);

  if (document.querySelector(".detail")) {
    const detail = document.querySelector(".detail");
    detail.replaceWith(el);
  } else if (document.querySelector(".create-form")) {
    const detail = document.querySelector(".create-form");
    detail.replaceWith(el);
  } else if (document.querySelector(".edit-form")) {
    const detail = document.querySelector(".edit-form");
    detail.replaceWith(el);
  }
}

function addContact() {
  const div = document.createElement("div");
  div.classList.add("create-form");

  if (document.querySelector(".main-content")) {
    const content = document.querySelector(".main-content");
    content.replaceWith(div);
  } else if (document.querySelector(".detail")) {
    const content = document.querySelector(".detail");
    content.replaceWith(div);
  } else if (document.querySelector(".edit-form")) {
    const content = document.querySelector(".edit-form");
    content.replaceWith(div);
  }

  const title = document.createElement("h1");
  title.classList.add("title-form");
  title.textContent = "New Contact";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-form");
  closeBtn.onclick = () => closeContact();

  const form = document.createElement("form");
  form.id = "form";
  const inputData = ["name", "email", "phone", "address"];

  for (let i = 0; i < inputData.length; i++) {
    const label = document.createElement("label");
    label.classList.add("label");
    label.textContent = `${inputData[i]} :`;

    const input = document.createElement("input");
    input.id = `${inputData[i]}`;
    input.setAttribute("name", inputData[i]);
    input.placeholder = `Enter ${inputData[i]}`;

    form.appendChild(label);
    form.appendChild(input);
  }

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("button", "submit");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";
  form.appendChild(submitBtn);

  div.appendChild(title);
  div.appendChild(closeBtn);
  div.appendChild(form);

  const formForm = document.querySelector("form");
  formForm.addEventListener("submit", submitData);
}

function submitData(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());
  console.log(value);

  fetch(`http://localhost:8080/addresses`, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  }).then(() => {
    const address = document.querySelector(".address");
    address.innerHTML = "";
    getContacts(address);

    const el = document.createElement("div");
    el.classList.add("main-content");
    const image = document.createElement("img");
    image.id = "logo";
    image.src = "./assets/Navigation-amico.png";
    el.appendChild(image);
    const detail = document.querySelector(".create-form");
    detail.replaceWith(el);
  });
}

function editContact(contact) {
  const div = document.createElement("div");
  div.classList.add("edit-form");

  const content = document.querySelector(".detail");
  content.replaceWith(div);

  const title = document.createElement("h1");
  title.classList.add("title-form");
  title.textContent = "Edit Contact";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-form");
  closeBtn.onclick = () => closeContact();

  const form = document.createElement("form");
  form.id = "form";
  const inputData = ["name", "email", "phone", "address"];

  for (let i = 0; i < inputData.length; i++) {
    const label = document.createElement("label");
    label.classList.add("label");
    label.textContent = `${inputData[i]} :`;

    const input = document.createElement("input");
    input.id = `${inputData[i]}`;
    if (inputData[i] == "name") {
      input.defaultValue = `${contact.name}`;
    } else if (inputData[i] == "email") {
      input.defaultValue = `${contact.email}`;
    } else if (inputData[i] == "phone") {
      input.defaultValue = `${contact.phone}`;
    } else {
      input.defaultValue = `${contact.address}`;
    }
    input.setAttribute("name", inputData[i]);
    input.placeholder = `Enter ${inputData[i]}`;

    form.appendChild(label);
    form.appendChild(input);
  }

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("button", "submit");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";
  form.appendChild(submitBtn);

  div.appendChild(title);
  div.appendChild(closeBtn);
  div.appendChild(form);

  const formForm = document.querySelector("form");
  formForm.addEventListener("submit", (e) => updateData(e, contact));
}

function updateData(e, contact) {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());

  fetch(`http://localhost:8080/addresses/${contact.id}`, {
    method: "put",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  }).then(() => {
    const address = document.querySelector(".address");
    address.innerHTML = "";
    getContacts(address);

    const el = document.createElement("div");
    el.classList.add("main-content");
    const image = document.createElement("img");
    image.id = "logo";
    image.src = "./assets/Navigation-amico.png";
    el.appendChild(image);

    const detail = document.querySelector(".edit-form");
    detail.replaceWith(el);
  });
}

function search_contact() {
  let input = document.getElementById("searchContact").value;
  input = input.toLowerCase();
  let contacts = document.getElementsByClassName("contacts");

  for (let i = 0; i < contacts.length; i++) {
    if (!contacts[i].innerHTML.toLowerCase().includes(input)) {
      contacts[i].style.display = "none";
    } else {
      contacts[i].style.display = "";
    }
  }
}
