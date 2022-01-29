import React from 'react';

function Table(props) {
    return (
        <>
            <tr>
                <td data-th="Supplier Code">
                    {props.srNo}
                </td>
                <td data-th="Supplier Name">
                    {props.fname}
                </td>
                <td>
                    {/*<button onClick={() => {*/}
                    {/*    props.onSubmit(props.id)*/}
                    {/*}}> Show*/}
                    {/*</button>*/}
                    <button onClick={() => {
                        props.onSubmit2(props.id)
                    }}> Update
                    </button>
                    <button onClick={() => {
                        props.onSubmit1(props.id)
                    }}> Delete
                    </button>
                </td>
            </tr>
        </>
    );
}

export default Table;