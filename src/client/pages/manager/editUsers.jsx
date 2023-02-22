import { useLoader } from "../../useLoader";
import { getJSON } from "../../utils/api/getJSON";
import React, { useEffect, useState } from "react";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const { data, loading, error } = useLoader(
    async () => await getJSON("/api/users/all"),
    []
  );

  useEffect(() => {
    setUsers(data);
  }, [data]);

  // get the roles by mapping the roles from users and filtering out duplicates
  useEffect(() => {
    if (users) {
      setRoles(
        users
          .map((user) => user.role)
          .filter((role, index, self) => self.indexOf(role) === index)
      );
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function handleLiRemove(id) {
    const newList = users.filter((user) => user._id !== id);
    setUsers(newList);
  }

  return (
    <div>
      <ul id={"users-list"}>
        {users
          ? users.map((user) => (
              <li key={user._id}>
                <p>role: {user.role}</p>
                <p>username: {user.username}</p>
                <p>name: {user.name}</p>
                <EditUser user={user} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );

  function EditUser({ user }) {
    const [formOpen, setFormOpen] = useState(false);
    const [NewRoleOpen, setNewRoleOpen] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newName, setNewName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const openForm = () => {
      setFormOpen(!formOpen);
    };

    const openCreateNewRole = (e) => {
      // Page crashes if this is not here, but is ok without it in the other function?
      e.preventDefault();
      setNewRoleOpen(!NewRoleOpen);
    };

    async function handleUserUpdate(e) {
      e.preventDefault();

      await fetch(`/api/users/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          username: newUsername,
          name: newName,
          role: selectedRole,
        }),
      });
    }

    async function handleDeleteUser() {
      let deleteResponse = 0;
      // TODO: add a custom confirm prompt
      if (
        prompt(
          `Are you sure you want to delete user ${user.username}? (y/n)`
        ) === "y"
      ) {
        await fetch(`/api/users/delete/${user._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          deleteResponse = res.status;
        });
      }
      console.log(deleteResponse);
      return deleteResponse;
    }

    return (
      <div key={user._id}>
        <button onClick={openForm}> {formOpen ? "close" : "edit"} </button>
        {formOpen ? (
          <div>
            <form onSubmit={handleUserUpdate}>
              <label>
                {" "}
                New role:
                <select
                  defaultValue={"Select a role"}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  <option disabled value={"Select a role"}>
                    Select a role
                  </option>
                  {roles.map((category) => {
                    return (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </label>
              <button onClick={openCreateNewRole}> Role not found </button>
              {NewRoleOpen ? (
                <input
                  type={"text"}
                  placeholder={"new role"}
                  onChange={(event) => setSelectedRole(event.target.value)}
                />
              ) : null}
              <input
                type={"text"}
                placeholder={"New username"}
                onChange={(event) => setNewUsername(event.target.value)}
              />
              <input
                type={"text"}
                placeholder={"New name"}
                onChange={(event) => setNewName(event.target.value)}
              />
              <button> Submit </button>
            </form>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser().then((response) => {
                  if (response === 200) {
                    handleLiRemove(user._id);
                  }
                });
              }}
            >
              Delete user
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export function EditUsers() {
  return (
    <div>
      <h1> Edit users </h1>
      <ListUsers />
    </div>
  );
}
