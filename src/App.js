import logo from './logo.svg';
import './App.css';
import CopyPaste from './components/copy-paste';

function App() {
  return (
    <div className="App">
      <CopyPaste title="test" format="${test} abcd ${test2}${test2} abcd ${test}" />
    </div>
  );
}

export default App;
