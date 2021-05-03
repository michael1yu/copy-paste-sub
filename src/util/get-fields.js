export const getFields = (format) => {
    const reg = /\$\{([^\}]*)\}/g;
    return format.match(reg);
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
    console.log(arr);
    let res = (
        <span style={{ whiteSpace: 'pre-line' }}>
            {arr.map((str) => (
                <span style={{ whiteSpace: 'pre-line' }}>
                    {str !== `\${${target}}` && str}
                    {str === `\${${target}}` && <span className="highlight-yellow">{str}</span>}
                </span>
            ))}
        </span>
    );
    return res;
};
