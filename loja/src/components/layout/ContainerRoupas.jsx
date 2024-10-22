import React from 'react';

import style from './ContainerRoupas.module.css';

const ContainerRoupa = (props) => {
    return (
        <div className={style.container_roupa}>
            {props.children}
        </div>
    );
}

export default ContainerRoupa;
