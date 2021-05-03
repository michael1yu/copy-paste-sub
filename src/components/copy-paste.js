import { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { getFieldNames, getFields, highlightField, replaceFields } from '../util/get-fields';
import 'react-toastify/dist/ReactToastify.css';
import './copy-paste.scss';

const CopyPaste = ({ title, format }) => {
    let fields = getFields(format);
    let fieldNames = getFieldNames(fields);

    const [form, updateForm] = useState({});
    const [target, updateTarget] = useState('');
    const [display, updateDisplay] = useState(null);

    const generate = () => {
        const { strRes, res } = replaceFields(format, form);
        navigator.clipboard.writeText(strRes);
        toast.clearWaitingQueue();
        toast.success(`Copied to clipboard`);
        toast.clearWaitingQueue();
        updateDisplay(res);
    };

    return (
        <div className="copy-paste">
            <ToastContainer
                position="top-right"
                autoClose={800}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                transition={Slide}
                limit={1}
            />
            <h3 className='title'>{title}</h3>
            <div className="display">{highlightField(format, target)}</div>
            <div className="inputs">
                {fieldNames.map((fieldName) => (
                    <input
                        value={form[fieldName]}
                        onFocus={() => updateTarget(fieldName)}
                        onChange={(e) => updateForm({ ...form, [fieldName]: `${e.target.value}` })}
                        placeholder={fieldName}
                    />
                ))}
            </div>
            <button onClick={generate}>Generate</button>
            <div className="display">{display}</div>
        </div>
    );
};

export default CopyPaste;
