import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button";
import { addEmployee, changeEmployee, removeEmployee, selectAllEmployee } from "../../store/employeeSlice";
import TableHeadItem from "../tableHeadItem/tableHeadItem";
import TableRow from "../tableRow/tableRow";
import getNextId from "../../utils/getNextId";
import { getTopHeight, getBottomHeight } from "../../utils/getHeight";
import { addEmployeesCount, decreaseEmployeesCount } from "../../store/companySlice";

const rowHeight = 40;
const visibleRows = 15;

function EmployeeList() {

    const [start, setStart] = useState(0);
    const [currentData, setCurrentData] = useState([]);

    const dispatch = useDispatch();
    const tableData = useSelector(state => state.employee.employeeData);
    const activeId = useSelector(state => state.activeId.activeId);

    useEffect(() => {
        if (activeId.length) {
            setCurrentData(tableData.filter((item) => activeId.includes(item.company_id)))
        } else {
            setCurrentData([]);
        }
        setStart(0);
    }, [activeId, tableData]);

    const columns = [
        {
            key: "selected",
            header: "Выбран",
            edit: true,
            checkbox: true
        },
        {
            key: "name",
            header: "Имя",
            checkbox: false,
            edit: true
        },
        {
            key: "surname",
            header: "Фамилия",
            edit: true,
            checkbox: false
        },
        {
            key: "position",
            header: "Должность",
            edit: true,
            checkbox: false
        }
    ];

    const onScroll = ({ target }) => {
        setStart(Math.floor(target.scrollTop / rowHeight));
    }

    const handleTableOnChange = (event) => {
        if (event.target.nodeName === "INPUT") {
            const value = (event.target.type === "checkbox") ? event.target.checked : event.target.value;
            const { strid, column } = event.target.attributes;
            if (strid && column) {
                dispatch(changeEmployee({
                    id: strid.value,
                    value,
                    column: column.value
                }));
            }
        }
    }

    const handleHeadOnChange = (event) => {
        if (event.target.nodeName === "INPUT" && event.target.type === "checkbox") {
            dispatch(selectAllEmployee({
                checked: event.target.checked
            }));
            event.stopPropagation();
        }
    }

    const handleAddRow = () => {
        // Добавлять можем только когда выделена 1 строка в таблице компаний
        if (activeId.length === 1) {
            dispatch(addEmployee({ id: getNextId(tableData), company_id: activeId[0] }));
            dispatch(addEmployeesCount({ id: activeId[0], count: 1 }));
        }
    }

    const handleDelRow = () => {
        const countId = [];
        activeId.forEach((id) => {
            let count = 0;
            currentData.forEach((item) => {
                if (item.selected && item.company_id === id) {
                    count += 1;
                }
            });
            if (count) {
                countId.push({ company_id: id, count });
            }
        });
        if (countId.length) {
            dispatch(decreaseEmployeesCount({ countId }));
        }
        dispatch(removeEmployee());
    }

    if (!currentData.length) {
        return null;
    }

    return (
        <div>
            <div className="table-buttons">
                <Button onButtonClick={handleAddRow} text="Добавить" />
                <Button onButtonClick={handleDelRow} text="Удалить" />
            </div>
            <div className="table-container" style={{ height: rowHeight * visibleRows }} onScroll={onScroll}>
                <div style={{ height: getTopHeight(rowHeight, start) }} />
                <table onChange={handleTableOnChange} className="table">
                    <thead onChange={handleHeadOnChange}>
                        <tr>
                            {columns.map((item) => {
                                return <TableHeadItem
                                    key={item.key}
                                    text={item.header}
                                    checkbox={item.checkbox}
                                />;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentData.slice(start, start + visibleRows + 1).map((item) => {
                                return <TableRow
                                    key={item.id}
                                    columns={columns}
                                    item={item}
                                    rowHeight={rowHeight}
                                />
                            })
                        }
                    </tbody>
                </table>
                <div style={{ height: getBottomHeight(rowHeight, currentData, start, visibleRows) }} />
            </div>
        </div>
    );
}

export default EmployeeList;