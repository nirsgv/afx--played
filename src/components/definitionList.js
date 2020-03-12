import React from 'react';

function DefinitionList({term, definition, classNameSpace, processCb}) {

    return (
        <dl>
            <dt className={`${classNameSpace}__term`}>{term}</dt>
            <dd className={`${classNameSpace}__definition`}>{!processCb ? definition : processCb(definition)}</dd>
        </dl>

    );
}

export default DefinitionList;