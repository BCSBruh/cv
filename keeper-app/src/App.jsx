import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";

function App() {
  Note.title = "This is the note title";
  Note.content = "This is the note content";

  return (
    <>
      <Header />
      <Note />
      <Footer />
    </>
  );
}

export default App;
