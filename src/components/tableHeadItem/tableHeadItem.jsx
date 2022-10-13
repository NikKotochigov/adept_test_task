import CheckBox from "../checkBox/checkBox";


const TableHeadItem = ({ text, checkbox }) => {

    if (checkbox) {
        return (
            <td className="table-header">
                <CheckBox />
            </td>
        )
    }

    return (
        <td className="table-header">
            {text}
        </td>
    );
};

export default TableHeadItem;