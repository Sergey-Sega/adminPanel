import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteData } from '../../service/getData';
import './style.scss';
export const AdminList = ({ columns, data, setDelete, tableName, update }) => {
  const history = useHistory();

  const deleteRow = (id) => {
    deleteData(`${tableName}${id}`)
      .then(() => {
        if (update) {
          update();
        }
      })
      .then(() => setDelete(true))
      .catch((err) => {
        console.error('ERROR', err);
        history.push('/adminPanel/errorpage/');
      });
  };

  return (
    <table className='admin-list'>
      <thead className='admin-list__row head'>
        <tr>
          {columns.map((el) => (
            <th className='admin-list__cell head' key={el.dataName}>
              {el.name}
            </th>
          ))}
          <th className='admin-list__cell head'>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val) => (
            <tr key={val.id} className='admin-list__row'>
              {columns.map((el) => (
                <td key={val[el.dataName]} className='admin-list__cell'>
                  {val[el.dataName]}
                </td>
              ))}
              <td
                className='admin-list__cell delete'
                onClick={() => deleteRow(val.id)}
              >
                ✖
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
