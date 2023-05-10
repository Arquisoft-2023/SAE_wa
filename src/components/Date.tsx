import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface mySearch{
    len: number
    value: string
    opc: string
}

interface PropDate{
    handle: (newSelect: mySearch) => void
}

export default function BasicDatePicker(prop: PropDate) {
    const {handle} = prop
    const [value, setValue] = React.useState<Date | null>(new Date());
    
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
        handle({len: 10, value: dayjs(newValue).toISOString(), opc: 'Fecha'})
        // console.log(dayjs(newValue).toISOString())
        // console.log(new Date(dayjs(newValue).format('YYYY/MM/DD')))
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
            <DatePicker
                label="Calendario"
                // defaultValue={dayjs('2022-04-17')}
                // value={value}
                onChange={handleChange}
                />
        </DemoContainer>
        </LocalizationProvider>
    );
}