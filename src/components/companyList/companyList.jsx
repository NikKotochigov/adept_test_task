import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button";
import { addCompany, changeCompany, removeCompany, selectAllCompany } from "../../store/companySlice";
import TableHeadItem from "../tableHeadItem/tableHeadItem";
import TableRow from "../tableRow/tableRow";
import getNextId from "../../utils/getNextId";
import { getTopHeight, getBottomHeight } from "../../utils/getHeight";
import { changeAllId, changeId } from "../../store/idSlice";
import { dropEmployeeCheckBox, removeEmployeeByCompany } from "../../store/employeeSlice";

const rowHeight = 40;
const visibleRows = 10;

function CompanyList() {

    const [start, setStart] = useState(0);
    const dispatch = useDispatch();
    const tableData = useSelector(state => state.company.companyData);

    const columns = [
        {
            key: "selected",
            header: "Выбран",
            checkbox: true,
            edit: true
        },
        {
            key: "company_name",
            header: "Название",
            checkbox: false,
            edit: true
        },
        {
            key: "count",
            header: "Количество",
            edit: false,
            checkbox: false
        },
        {
            key: "address",
            header: "Адрес",
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
                dispatch(changeCompany({
                    id: strid.value,
                    value,
                    column: column.value
                }));
            }
            if (event.target.type === "checkbox" && strid) {
                dispatch(changeId({ id: strid.value, checked: value }));
                if (!value) {
                    dispatch(dropEmployeeCheckBox({ company_id: strid.value }));
                }
            }
        }
    }

    const handleHeadOnChange = (event) => {
        if (event.target.nodeName === "INPUT" && event.target.type === "checkbox") {
            const checked = event.target.checked;
            dispatch(selectAllCompany({ checked: checked }));
            if (checked) {
                dispatch(changeAllId({
                    activeId: tableData.map((item) => {
                        return item.id;
                    })
                }));
            } else {
                dispatch(changeAllId({ activeId: [] }));
            }
            event.stopPropagation();
        }
    }

    const handleAddRow = () => {
        dispatch(addCompany({ id: getNextId(tableData) }));
    }

    const handleDelRow = () => {
        const delId = [];
        tableData.forEach(item => {
            if (item.selected) {
                delId.push(item.id);
            }
        })
        if (delId.length) {
            dispatch(removeEmployeeByCompany({ delId }));
        }
        dispatch(removeCompany());
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
                            tableData.slice(start, start + visibleRows + 1).map((item) => {
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
                <div style={{ height: getBottomHeight(rowHeight, tableData, start, visibleRows) }} />
            </div>
        </div>
    );
}

export default CompanyList;