export const getFields = (format) => {
    const reg = /\$\{([^\}]*)\}/g;
    return format.match(reg) ? format.match(reg) : [];
};

export const getFieldNames = (fields) => {
    const reg = /\$\{([^\}]*)\}/;
    let fieldNames = new Set();
    fields.forEach((field) => {
        fieldNames.add(field.replace(reg, '$1'));
    });
    return [...fieldNames];
};

export const highlightField = (format, target) => {
    format = format.replaceAll(`\${${target}}`, `,\${${target}},`);
    let arr = format.split(',');
    let res = (
        <span style={{ whiteSpace: 'pre-line' }}>
            {arr.map((str) => (
                <span style={{ whiteSpace: 'pre-line' }}>
                    {str !== `\${${target}}` && str}
                    {str === `\${${target}}` && <span className="highlight">{str}</span>}
                </span>
            ))}
        </span>
    );
    return res;
};

export const replaceFields = (format, form) => {
    let targets = new Set();
    Object.keys(form).forEach((key, i) => {
        format = format.replaceAll(`\${${key}}`, `,\${${key}},`);
        targets.add(`\${${key}}`);
    });

    let arr = format.split(',');

    let res = (
        <span style={{ whiteSpace: 'pre-line' }}>
            {arr.map((str, i) => {
                let key = str.replace('${', '').replace('}', '');
                return (
                    <span style={{ whiteSpace: 'pre-line' }}>
                        {!targets.has(str) && str}
                        {targets.has(str) && <span className="highlight">{form[key]}</span>}
                    </span>
                );
            })}
        </span>
    );
    let strRes = '';
    arr.forEach((str) => {
        let key = str.replace('${', '').replace('}', '');
        strRes += targets.has(str) ? form[key] : str;
    });
    return { strRes: strRes, res: res };
};

export const getFormats = (formats) => {
    let res = formats.split(/=== [^=]* ===/);
    let arr = [];
    for(let i = 0; i < res.length; i++) {
        if(res[i].length > 0) arr.push(res[i]);
    }
    console.log(arr);
    let titles = formats.match(/=== [^=]* ===/g) ? formats.match(/=== [^=]* ===/g) : [];
    for(let i = 0; i < titles.length; i++) {
        titles[i] = titles[i].replaceAll('===', '');
    }
    let result = [];
    for(let i = 0; i < Math.min(arr.length, titles.length); i++) {
        result.push({title: titles[i], format: arr[i].trim()});
    }
    console.log(result);
    return result;
};
