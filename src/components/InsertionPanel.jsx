import React, { useState } from 'react';
import 'react-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { availableColours, colourNameMap } from './colours';

const InsertionPanel = ({ className, subjects=['CITS3003', 'CITS3404'] }) => {
  const noSelection = 'Select a Unit';
  const [selected, setSelected] = useState(noSelection);

  const idk = e => console.log(e);

  return (
    <Table
    className={ className }
    bordered
    variant="dark"
    style={{'tableLayout': 'fixed'}}
    >
      <thead>
        <tr>
          <th colSpan='3'>
            Adding Timeslots
          </th>
        </tr>
        <tr>
          <th>
            Unit:
          </th>

          <th colSpan='2'>
            Time:
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <DropdownButton
              title={ selected }
              variant='primary'
              style={{'width': '100%'}}
              onSelect={ (event) => setSelected(event) }
            >
              {
                subjects.map(
                  subject =>
                    <Dropdown.Item eventKey={ subject } key={ subject }>
                      { subject }
                    </Dropdown.Item>
                )
              }
            </DropdownButton>
          </td>

          <td>
            <input
              type='time'
              style={{
                'backgroundColor': '#282c34',
                'color': 'white',
                'textAreaFocus': 'none'
              }}
            />
          </td>

          <td>
            <Button style={{'width': '100%'}}>
              Submit Time
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default InsertionPanel;
