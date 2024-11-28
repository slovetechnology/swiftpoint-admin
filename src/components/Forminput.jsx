import React, { forwardRef } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { MenuItem, Select } from '@mui/material';


export const dateFormat = 'YYYY/MM/DD';


const Forminput = forwardRef(({ valueName, setup, setValue, valueText, disabledDate, formtype = "input", content, type = "text", children, error, errorMessage, ...props }, ref) => {

    return (
        <div className='relative mb-4'>
            <div className='text-sm mt-4 text-navblue'>{content}</div>
            {formtype === 'input' &&
                <input ref={ref} {...props} type={type} className={`input ${error ? '!border-red-700' : '!border-slate-300'}`} />}
            {formtype === 'textarea' &&
                <textarea ref={ref} {...props} type={type} className={`input ${error ? '!border-red-700' : '!border-slate-300'}`}></textarea>}

            {formtype === 'select' &&
                <Select
                    {...props}
                    ref={ref}
                    className={`input h-14 ${error ? '!border-red-700' : '!border-slate-300'}`}>
                    <MenuItem value={''}>--Select--</MenuItem>
                    {children}
                </Select>
            }
            {formtype === 'date' &&
                <DatePicker
                    {...props}
                    ref={ref}
                    disabledDate={disabledDate}
                    className={`border w-full p-3 rounded-md h-[3.3rem] flex items-center ${error ? '!border-red-700' : '!border-slate-300'}`}
                    placeholder={moment().format('ddd D MMM')}
                    defaultValue={valueText && dayjs(valueText, dateFormat)}
                    format={dateFormat}
                    onChange={(values) => {
                        const val = moment(new Date(values)).format('YYYY-MM-DD');
                        setValue(valueName, val)
                    }}
                />}
            {error && <div className='text-red-700'>{errorMessage}</div>}
        </div>
    )
})

export default Forminput;