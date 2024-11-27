import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../http";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { ClipLoader } from "react-spinners";

const Connection = () => {
    const [connections, setConnections] = useState([]);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true)
            try {
                setDeleting(false)
                const { data } = await axiosInstance.get('connection/allConnections');
                console.log(data);
                setConnections(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message)
                setLoading(false);
            }
        }
        getAllUsers();
    }, [deleting]);



    const deleteConnections = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`connection/deleteAdmin/${id}`);
            console.log(data);
            setDeleting(true)
        } catch (error) {
            console.log(error.message);
        }
    }


      
  //pagination

  const [no, setNo] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);

  const [lastIndex, setLastIndex] = useState(5);

  const prevPage = () => {
    currentPage !== 1 && pageForm !== 1 && setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    currentPage !== no.length && pageForm !== no.length && setCurrentPage(currentPage + 1);
  };


  const [pageForm, setPageForm] = useState(1)

  useEffect(() => {
    setPageForm(currentPage);
  }, [currentPage])

  useEffect(() => {
    if (pageForm <= no.length) {
      console.log(pageForm)
      setCurrentPage(pageForm);
    }
  }, [pageForm])

  useEffect(() => {
    if (connections) {
      const noOfRecordsPerPage = 10;
      const noOfPages = Math.ceil(connections.length / noOfRecordsPerPage) || 1;

      const newLastIndex = currentPage * noOfRecordsPerPage;
      const newFirstIndex = newLastIndex - noOfRecordsPerPage;
      console.log(newFirstIndex);
      console.log(newLastIndex);
      setLastIndex(newLastIndex);
      setFirstIndex(newFirstIndex);

      const numbers = [];
      for (let i = 1; i <= noOfPages; i++) {
        numbers.push(i);
      }

      setNo(numbers);
    }
  }, [connections, currentPage]);

  useEffect(() => {
    console.log(no);
  }, [no]);

  const [records, setRecords] = useState([]);

  useEffect(() => {

    if (connections) {
      console.log(firstIndex);
      console.log(lastIndex);
      console.log(connections.length);
      console.log(connections.slice(firstIndex, lastIndex));
      setRecords(connections.slice(firstIndex, lastIndex));
    }

  }, [firstIndex, lastIndex, connections]);

  useEffect(() => {
    console.log(records);
  }, [records]);

    return (<>
        <div className="w-full px-4">
            <div className="mt-12 flex flex-row">
                <div className="text-2xl font-bold text-[#7C4BA1]">Connections</div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto w-full" >

                <table className="w-full table-auto text-sm text-left bg-white   ">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b w-full">
                        <tr>
                            <th className="py-3 px-6 whitespace-nowrap">S.N</th>
                            <th className="py-3 px-6 whitespace-nowrap">Sender</th>
                            <th className="py-3 px-6 whitespace-nowrap">Reciever</th>
                            <th className="py-3 px-6 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    {
                        (<>
                            <tbody className="text-gray-600 divide-y w-full">
                                {!loading && connections && records && records.length > 0 && records?.map((item, idx) => (
                                    <>
                                        {
                                            "true" && (<>
                                                <tr key={idx}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1+firstIndex}.</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item?.sender?.profile?.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item?.receiver?.profile?.fullname}</td>

                                                    <td className=" px-6 whitespace-nowrap space-x-2">
                                                        <Link
                                                            to={`/admin-dashboard/main/connections/connection/${item.id}`}
                                                            className="py-1 hover:bg-[#613b7e] bg-[#7C4BA1] px-3 font-medium text-gray-200 rounded-lg">
                                                            View
                                                        </Link>

                                                        {/* <Link
                                                to={`/admin-dashboard/cost-excludes/edit/${item}`}
                                                className="py-1 hover:bg-yellow-600 bg-yellow-500 px-3 font-medium text-gray-200 rounded-lg">
                                                Edit
                                            </Link> */}

                                                        <button
                                                            onClick={() => deleteConnections(item.id)}
                                                            className="py-1 hover:bg-[#BD2836] bg-[#D22D3D] px-3 font-medium text-gray-200 rounded-lg">
                                                            {false ? "Deleting..." : "Delete"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>)
                                        }
                                    </>

                                ))}
                                {
                                    loading && (<>
                                        <div className="flex w-full justify-center items-center p-8">
                                            <ClipLoader

                                                color={"#D22D3D"}
                                                loading={loading}
                                                cssOverride={{}}
                                                size={50}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    </>)
                                }
                            </tbody>

                        </>)
                    }

                </table>
            </div>

            {connections && no.length > 1 && (
            <>
              <nav className="flex justify-end mt-2 mb-4">
                <ul className="flex flex-row gap-[10px]">
                  <li
                    className={` px-1 py-1 rounded ${(currentPage === 1 || pageForm == 1) ? "bg-gray-400" : "bg-[#7C4BA1]"
                      }`}
                  >
                    <button className="px-2 py-1 rounded " onClick={prevPage}>
                      <ChevronLeft size={20} color="white" />
                    </button>
                  </li>
                  {no.length > 1 &&

                    <>

                      <div className="flex flex-row gap-1 items-center bg-[#7C4BA1] px-2 py-1 rounded ">
                        <input type="number"
                          min="1"
                          max={no.length} value={pageForm} onChange={(e) => setPageForm(e.target.value)} className="px-1 rounded focus:outline-[#7C4BA1]"></input>
                        <div className="text-white">of</div>
                        <div className="text-white">{no.length}</div>
                      </div>

                    </>
                  }
                  <li
                    className={` px-1 py-1 rounded ${(currentPage === no.length || pageForm == no.length) ? "bg-gray-400" : "bg-[#7C4BA1]"
                      }`}
                  >
                    <button className="px-2 py-1 rounded " onClick={nextPage}>
                      <ChevronRight size={20} color="white" />
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
    </>)
}

export default Connection;