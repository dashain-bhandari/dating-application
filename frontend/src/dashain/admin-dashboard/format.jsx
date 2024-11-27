import { useEffect, useState } from "react"
import { axiosInstance } from '../../http'


// const filtereddata = data.rows.filter((item) => {
//     return item.dimensionValues[0].value != "(not set)" && ['/', '/shop'].includes(item.dimensionValues[1].value)
// })


// console.log(filtereddata)
const TableX = () => {
    const [data, setData] = useState();
    const [filtereddata, setFiltereddata] = useState()
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosInstance.get('/analytics/city')
                console.log(data)
                setData(data)

            } catch (error) {
                console.log(error.message)
            }
        }
        getData();
    }, [])

    useEffect(() => {
        if (data) {
            const newData = data.rows.filter((item) => {
                return item.dimensionValues[0].value != "(not set)" && ['/', '/home/payment', '/home/payment/', '/home/main/dashboard'].includes(item.dimensionValues[1].value)
            })
            setFiltereddata(newData)
        }
    }, [data])
    return (<>
        {data && (<>
            <div className=" shadow-sm border rounded-lg overflow-x-auto mt-4">
                <table className="w-full table-auto text-sm text-left bg-white">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">

                        <tr>
                            {
                                data.dimensionHeaders.map((i) => (<th className="py-3 px-6 whitespace-nowrap">
                                    {
                                        i.name
                                    }
                                </th>))
                            }
                            <th className="py-3 px-6 whitespace-nowrap">
                                {data.metricHeaders[0].name}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            data && filtereddata && filtereddata?.map((item) => (<>
                                <tr>
                                    {
                                        item.dimensionValues.map((i) => (<td className="px-6 py-2 whitespace-nowrap">
                                            {i.value}
                                        </td>))
                                    }
                                    <td className="px-6 py-2 whitespace-nowrap">
                                        {
                                            item.metricValues[0].value
                                        }
                                    </td>
                                </tr>
                            </>))
                        }

                    </tbody>
                </table>
            </div>
        </>)}
    </>)
}


export default TableX