import { useEffect, useState } from "react";

function TableCheckBox({ label, id, column, value }) {
    const [checked, setChecked] = useState(value);

    useEffect(() => setChecked(value), [value])

    const handleChange = () => {
        setChecked(prev => !prev);
    };

    return (
        <label className="table-checkbox">
            {label}
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                strid={id}
                column={column}
            />
        </label>
    );
}

export default TableCheckBox;