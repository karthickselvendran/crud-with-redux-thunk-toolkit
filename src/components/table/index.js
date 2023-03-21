import React from "react";
import "./style.css";

export const Table = (props) => {
  const {
    headersList = [],
    tableDatas = [],
    className = "",
    handleEdit = () => {},
    handleDelete = () => {},
  } = props;

  return (
    <>
      {tableDatas && tableDatas.length ? (
        <table className={className}>
          <thead>
            <tr>
              {headersList && headersList.length
                ? headersList.map((tableHead, i) => (
                    <th key={tableHead.key}>{tableHead.value}</th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {tableDatas && tableDatas.length
              ? tableDatas.map((tableData, i) => (
                  <tr key={tableData.id}>
                    <td>{i + 1}</td>
                    <td>{tableData.name}</td>
                    <td>{tableData.phoneNumber}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(tableData)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(tableData)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      ) : null}
    </>
  );
};
