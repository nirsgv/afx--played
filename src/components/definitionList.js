import React from 'react';
import PropTypes from 'prop-types';

function DefinitionList({term, definition, classNameSpace, processCb}) {

    return (
        <dl>
            <dt className={`${classNameSpace}__term`}>{term}</dt>
            <dd className={`${classNameSpace}__definition`}>{!processCb ? definition : processCb(definition)}</dd>
        </dl>

    );
}

DefinitionList.propTypes = {
    term: PropTypes.string,
    definition: PropTypes.string,
    classNameSpace: PropTypes.string,
    processCb: PropTypes.func,
};

export default DefinitionList;