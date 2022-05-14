import * as React from 'react';
import './TableStyles.css';
import moment from 'moment';

export function TableComponent({ eventData }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th align="center">No. </th>
            <th align="center">Type</th>
            <th align="center">ID</th>
            <th align="center">Date</th>
            <th align="center">Popularity</th>
            <th align="center">URL</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((eve, index) => {
            return (
              <tr key={index}>
                <td align="center">{index + 1}</td>
                <td align="center">{eve.type}</td>
                <td align="center">{eve.id}</td>
                <td align="center">
                  {moment(eve.datetime_utc).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
                <td align="center">{eve.popularity}</td>
                <td align="center">{eve.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
