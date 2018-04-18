import React from 'react';
import {
    Collapse, Button, Row, Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const recipeSortComponent = (props) => {

    return (
        <form>
            <select value={props.sortParam} onChange={props.handleSortParamChange} className="form-control">
                <option value="Name">Alfabetycznie</option>
                <option value="-Name">Odwrotnie do alfabetu</option>
                <option selected value="CreatedDate">Najpierw najstarsze</option>
                <option value="-CreatedDate">Najpierw najnowsze</option>
                <option value="CookTimeInMinutes">Najszybsze potrawy</option>
                <option value="-CookTimeInMinutes">Najdluższe potrawy</option>
            </select>
        </form>
    );
}

export default recipeSortComponent;