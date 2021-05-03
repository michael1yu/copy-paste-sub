import { useState } from 'react';
import { getFieldNames, getFields, highlightField } from '../util/get-fields';
import './copy-paste.scss';

const CopyPaste = ({ title, format }) => {
    let fields = getFields(format);
    let fieldNames = getFieldNames(fields);

    const [form, updateForm] = useState({});
    const [target, updateTarget] = useState('');
    return (
        <div className="copy-paste">
            <h1>{title}</h1>
            <p>{format}</p>
            <p>{highlightField(format, target)}</p>
            <p>{fieldNames}</p>
            <div className="inputs">
                {fieldNames.map((fieldName) => (
                    <input
                        value={form[fieldName]}
                        onClick={() => updateTarget(fieldName)}
                        onChange={(e) => updateForm({ ...form, [fieldName]: `${e.target.value}` })}
                        placeholder={fieldName}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default CopyPaste;
