import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface mySearch{
    len: number
    value: string
    opc: string
}

interface PropSplitButton{
    options: string[]
    name: string
    handle: (newSelect: mySearch) => void
    selectOpc: string
}


export default function SelectLabels(prop: PropSplitButton) {
    const {options, handle, name, selectOpc} = prop

    const [option, setOption] = React.useState(options);
    const [select, setSelect] = React.useState(selectOpc);

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()
    setSelect(event.target.value);
    // console.log({len: event.target.value.length, value: event.target.value, opc: name})
    handle({len: event.target.value.length, value: event.target.value, opc: name})
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 255 }}>
        <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={select}
          label={name}
          onChange={handleChange}
        >
          <MenuItem value={name}>
            <em>{name}</em>
          </MenuItem>
            {option.map((element) => (
            <MenuItem value={element}>{element}</MenuItem>
            ))}
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      </div>
  );
}