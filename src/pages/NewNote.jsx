/* eslint-disable no-unused-vars */
import { useState } from "react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewNote = ({ getValueForm }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [archived, setArchived] = useState(false);
  const navigate = useNavigate();

  let counter = title.length + body.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && body.trim() !== "" && counter <= 50) {
      const date = new Date();
      const id = date.getTime().toString();
      const createdAt = date.toISOString();
      const newNote = {
        id,
        title,
        body,
        archived,
        createdAt,
      };
      getValueForm(newNote);
      setTitle("");
      setBody("");
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <div className="md:flex md:flex-col md:items-center">
          <div className="bg-gray-200 border border-gray-200 p-5 rounded-md shadow-md md:w-7/12 lg:w-6/12">
            <h1
              className={`mb-4 font-semibold ${
                counter > 50 ? "text-red-500" : ""
              }`}
            >
              Karakter {counter}/50
            </h1>
            <form
              action=""
              className="flex flex-col space-y-3 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Judul..."
                className="p-3 rounded-md outline-none border border-transparent focus:border focus:border-gray-500"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="10"
                className="rounded-md resize-none p-3 outline-none border border-transparent focus:border focus:border-gray-500"
                placeholder="Body..."
                onChange={(e) => setBody(e.target.value)}
                value={body}
                required
              ></textarea>
              <button
                type="submit"
                className="p-3 bg-black text-white rounded-md hover:opacity-80 transition  duration-200 ease-in-out"
              >
                <p className="font-bold tracking-wide text-base">Simpan</p>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};
NewNote.propTypes = {
  getValueForm: PropTypes.func.isRequired,
};

export default NewNote;
