import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../http";
import { addToast } from "../../Store/features/toastSlice";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { setRef } from "yet-another-react-lightbox";

const User = () => {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true)
            try {

                const { data } = await axiosInstance.get('users/allUsers');
                console.log(data);
                setUsers(data);

                setLoading(false);


            } catch (error) {
                console.log(error.message)
                setLoading(false);

            }
        }
        getAllUsers();
    }, [refreshing]);

    const sendReminder = async (item) => {
        try {
            setSending(item.id)
            const { data } = await axiosInstance.post('email/reminder', item)
            console.log(data);
            dispatch(addToast({ kind: "Success", msg: "Reminder sent" }));
            toast.success("reminder sent")
            setSending("")
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
            setSending("")
            dispatch(addToast({ kind: "Error", msg: error.message }));
        }
    }

    const onDelete = async (id) => {
        try {
            setDeleting(id)
            console.log(id)

            const { data } = await axiosInstance.delete(`users/delete/${id}`);
            setRefreshing(!refreshing)
            console.log(data);
            setDeleting("")

        } catch (error) {
            setDeleting("id")
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
    if (users) {
      const noOfRecordsPerPage = 10;
      const noOfPages = Math.ceil(users.length / noOfRecordsPerPage) || 1;

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
  }, [users, currentPage]);

  useEffect(() => {
    console.log(no);
  }, [no]);

  const [records, setRecords] = useState([]);

  useEffect(() => {

    if (users) {
      console.log(firstIndex);
      console.log(lastIndex);
      console.log(users.length);
      console.log(users.slice(firstIndex, lastIndex));
      setRecords(users.slice(firstIndex, lastIndex));
    }

  }, [firstIndex, lastIndex, users]);

  useEffect(() => {
    console.log(records);
  }, [records]);


    return (<>
        <div className="w-full px-4">
            <div className="mt-12 flex flex-row">
                <div className="text-2xl font-bold text-[#7C4BA1]">Users</div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left bg-white">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6 whitespace-nowrap">S.N</th>
                            <th className="py-3 px-6 whitespace-nowrap">Username</th>
                            <th className="py-3 px-6 whitespace-nowrap">Full Name</th>
                            <th className="py-3 px-6 whitespace-nowrap">Email</th>
                            <th className="py-3 px-6 whitespace-nowrap">Payment Status</th>
                            <th className="py-3 px-6 whitespace-nowrap">Expiry date</th>
                            <th className="py-3 px-6 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    {
                        loading ? (<div className="h-full flex justify-center items-center p-8">
                            <ClipLoader
                                color={"#D22D3D"}
                                loading={loading}
                                cssOverride={{}}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>) : (
                            <>
                                {
                                    users &&  records && (<tbody className="text-gray-600 divide-y ">
                                        {records.length >0 && records?.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-nowrap">{idx + 1+firstIndex}.</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.profile?.fullname || '---'} </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.email || '---'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.subscription?.status ? <span className="text-[#7C4BA1] bg-violet-100 rounded px-2 py-2">{item?.subscription?.status?.slice(0, 1).toUpperCase() + item.subscription.status?.slice(1)}</span> : <span className="text-[#D22D3D] bg-red-100 px-2 py-2 rounded">Unpaid</span>}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item?.subscription?.expiryDate?.slice(0, 10) || '---'}</td>
                                                <td className=" px-6 whitespace-nowrap space-x-2">
                                                    <Link
                                                        to={`/admin-dashboard/main/users/user/${item.id}`}
                                                        className="py-1 hover:bg-[#613b7e] bg-[#7C4BA1] px-3 font-medium text-gray-200 rounded-lg">
                                                        View
                                                    </Link>

                                                    {
                                                        item.subscription && (<button
                                                            onClick={() => sendReminder(item)}
                                                            disabled={sending}
                                                            // to={`/admin-dashboard/cost-excludes/edit/${item}`}
                                                            className="py-1 hover:bg-[#067BC2]  bg-[#6FB5DC] px-3 font-medium text-gray-200 rounded-lg">
                                                            {
                                                                sending==item.id ? "Reminding" : "Remind"
                                                            }
                                                        </button>)
                                                    }

                                                    {
                                                        item.suspended ? (<>
                                                            <button
                                                                onClick={() => onDelete(item.id)}
                                                                className="py-1 hover:bg-green-600 bg-green-500 px-3 font-medium text-gray-200 rounded-lg">
                                                                {deleting==item?.id?"Activating":"Activate"}
                                                            </button>
                                                        </>) : (<>
                                                            <button
                                                                onClick={() => onDelete(item.id)}
                                                                className="py-1 hover:bg-[#BD2836] bg-[#D22D3D] px-3 font-medium text-gray-200 rounded-lg">
                                                               {deleting==item?.id?"Suspending":"Suspend"}
                                                            </button>
                                                        </>)
                                                    }
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>)
                                }
                            </>
                        )
                    }

                </table>
            </div>
            {users && no.length > 1 && (
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

export default User;