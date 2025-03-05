/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:8080/v1/addData";

const InputComponent = () => {
  const [data, setData] = useState({
    key: "",
    value: "",
    expiry: "",
  });

  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: any) => {
    console.log(data);
    try {
      const postResponse = await axios.post(url, data);
      console.log(postResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandler = (e: any) => {
    setData((prev) => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="key"
          placeholder="key.."
          onChange={(e) => {
            inputHandler(e);
          }}
        />
        <input
          type="text"
          name="value"
          placeholder="value.."
          onChange={(e) => inputHandler(e)}
        />
        <input
          type="text"
          name="expiry"
          placeholder="value.."
          onChange={(e) => inputHandler(e)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {isError && <p>Error</p>}
      </div>
    </div>
  );
};

export default InputComponent;
