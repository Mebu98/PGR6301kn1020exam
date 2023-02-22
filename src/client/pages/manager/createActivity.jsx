import React, { useState } from "react";
import { getJSON } from "../../utils/api/getJSON";
import { useLoader } from "../../useLoader";

export function CreateActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [response, setResponse] = useState(<div></div>);

  const { data, loading, error } = useLoader(
    async () => await getJSON("/api/users/roles"),
    []
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }

  const categories = data;

  async function handleSubmit(e) {
    e.preventDefault();

    // Manager validation is done in the backend via the signed cookie.
    // postJSON function doesn't work since it adds "manager/activities" to the url
    // so I'm using fetch instead.
    await fetch("/api/activities/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        category: selectedCategory,
      }),
    }).then((res) => {
      if (res.ok) {
        setResponse(
          <div>
            <h1>Activity {name} created</h1>
          </div>
        );
      } else {
        setResponse(
          <div>
            <h1>{res.statusText}</h1>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <h1> Create activity </h1>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          Name:{" "}
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </div>
        <div>
          {" "}
          Description:{" "}
          <textarea onChange={(e) => setDescription(e.target.value)} />{" "}
        </div>
        <div>
          {" "}
          Category:
          <select
            defaultValue={"Select a category"}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option disabled value={"Select a category"}>
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <button type={"submit"}> Create </button>
      </form>
      {response}
    </div>
  );
}
