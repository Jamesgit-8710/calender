import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Notes />
        <Calendar />
      </div>
    </div>
  );
}