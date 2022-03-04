import './App.css';
import Table from './Components/table';
import Main from './Components/main';

function App() {
  return (
    <div className="App">
      <Main></Main>
      <Table  props={{width: '600px'}}></Table>
    </div>
  );
}

export default App;
