import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CopyPaste from './components/copy-paste';
import { getFormats } from './util/get-fields';
import TextareaAutosize from 'react-textarea-autosize';

function App() {
    const [formatsInput, updateFormatsInput] = useState('');
    const [formats, updateFormats] = useState([]);

    return (
        <div className="App">
            <TextareaAutosize id="formats-input" value={formatsInput} onChange={(e) => updateFormatsInput(e.target.value)} maxRows={20} />
            <button onClick={() => updateFormats(getFormats(formatsInput))}>Generate Forms</button>
            <div className="nav">
                {formats.map(({ title, format }, key) => (
                    <button onClick={() => document.getElementById(title).scrollIntoView()}>{title}</button>
                ))}
            </div>
            {formats.map(
                ({ title, format }, key) =>
                    format.length > 0 && (
                        <div id={title}>
                            <CopyPaste id={title} title={title} format={format} />
                        </div>
                    )
            )}
        </div>
    );
}

export default App;
