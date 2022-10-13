import TableCell from "../tableCell/tableCell";

const TableRow = ({ columns, item, rowHeight }) => {

    return (
        <tr className="table-row" style={{ height: rowHeight }}>
            {
                columns.map((column) => {
                    if (column.checkbox) {
                        return <TableCell
                            key={'' + item.id + column.key}
                            value={item[column.key]}
                            checkbox={column.checkbox}
                            id={item.id}
                            column={column.key}
                        />
                    }
                    return <TableCell
                        key={item.id + column.key}
                        value={item[column.key]}
                        id={item.id}
                        checkbox={column.checkbox}
                        edit={column.edit}
                        column={column.key}
                    />
                })
            }
        </tr>
    )
};

export default TableRow;