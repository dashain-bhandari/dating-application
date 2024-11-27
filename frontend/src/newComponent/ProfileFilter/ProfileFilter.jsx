import { Accordion, AccordionItem } from '@szhsin/react-accordion'
import React from 'react'
import FilterOptionItem from './FilterOptionItem';
import { AiFillFilter } from 'react-icons/ai';


function ProfileFilter() {

    const filterOption = [
        {
            id: '1',
            label: 'Age',
            value: 'age',
            options: [
                {
                    key: '1',
                    label: '10',
                    value: '10'
                },
                    {
                    key: '2',
                    label: '11',
                    value: '11'
                },
                    {
                    key: '3',
                    label: '12',
                    value: '13'
                },
                    {
                    key: '4',
                    label: '14',
                    value: '14'
                }
            ]
        },
         {
            id: '2',
            label: 'Age',
            value: 'age',
            options: [
                {
                    key: '1',
                    label: '10',
                    value: '10'
                },
                    {
                    key: '2',
                    label: '11',
                    value: '11'
                },
                    {
                    key: '3',
                    label: '12',
                    value: '13'
                },
                    {
                    key: '4',
                    label: '14',
                    value: '14'
                }
            ]
        },
             {
            id: '3',
            label: 'Age',
            value: 'age',
            options: [
                {
                    key: '1',
                    label: '10',
                    value: '10'
                },
                    {
                    key: '2',
                    label: '11',
                    value: '11'
                },
                    {
                    key: '3',
                    label: '12',
                    value: '13'
                },
                    {
                    key: '4',
                    label: '14',
                    value: '14'
                }
            ]
        },
             {
            id: '4',
            label: 'Age',
            value: 'age',
            options: [
                {
                    key: '1',
                    label: '10',
                    value: '10'
                },
                    {
                    key: '2',
                    label: '11',
                    value: '11'
                },
                    {
                    key: '3',
                    label: '12',
                    value: '13'
                },
                    {
                    key: '4',
                    label: '14',
                    value: '14'
                }
            ]
        }
    ]


  return (
      <div className='w-full rounded-xl bg-white flex flex-col justify-start item-center overflow-hidden mb-16 mt-8 min-h-[500px]'>
        <div className='w-full flex pl-4 items-center mb-3'>
            <AiFillFilter size={25} color="var(--primary)" />
            <span className='text-xl px-2 py-2 font-semibold'>Filter</span>
        </div>
        {
            filterOption.map((option) => {
                return <FilterOptionItem option={option} />
            })
        }
      </div>
  )
}

export default ProfileFilter;