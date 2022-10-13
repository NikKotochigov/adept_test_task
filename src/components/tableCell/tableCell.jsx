import { useState } from "react";
import TableCheckBox from "../tableCheckBox/tableCheckBox";

const TableCell = ({ value, id, checkbox, edit, column }) => {

    const [cellValue, setCellValue] = useState(value);

    const handleChangeValue = ({ target }) => {
        setCellValue(target.value);
    }

    if (checkbox) {
        return (
            <td className="table-cell">
                <TableCheckBox
                    id={id}
                    column={column}
                    value={value}
                />
            </td>
        )
    }

    if (!edit) {
        return (
            <td className="table-cell">{value}</td>
        )
    }

    return (
        <td className="table-cell">
            <input className="table-input"
                type="text"
                value={cellValue}
                strid={id}
                column={column}
                onChange={handleChangeValue}
            />
        </td>
    )
}

export default TableCell;