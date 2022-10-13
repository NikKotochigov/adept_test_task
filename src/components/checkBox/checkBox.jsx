import { useState } from "react";

function CheckBox({ label }) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(prev => !prev);
    };

    return (
        <label>
            {label}
            <input type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
        </label>
    );
}

export default CheckBox;