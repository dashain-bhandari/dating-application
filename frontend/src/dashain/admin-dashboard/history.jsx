import { Link } from "react-router-dom";
import { axiosInstance } from "../../http";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";

const History = () => {

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const getAllEmails = async () => {
      setLoading(true)
      try {
        const { data } = await axiosInstance.get('email');
        console.log(data);
        setEmails(data);
        setLoading(false);
        setDeleting(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false);
        setDeleting(false)
      }
    }
    getAllEmails();
  }, [deleting]);

  const onDelete = async (id) => {
    try {
      console.log(id)
      setDeleting(true)
      const { data } = await axiosInstance.delete(`email/${id}`);
      console.log(data);
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
    if (emails) {
      const noOfRecordsPerPage = 10;
      const noOfPages = Math.ceil(emails.length / noOfRecordsPerPage) || 1;

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
  }, [emails, currentPage]);

  useEffect(() => {
    console.log(no);
  }, [no]);

  const [records, setRecords] = useState([]);

  useEffect(() => {

    if (emails) {
      console.log(firstIndex);
      console.log(lastIndex);
      console.log(emails.length);
      console.log(emails.slice(firstIndex, lastIndex));
      setRecords(emails.slice(firstIndex, lastIndex));
    }

  }, [firstIndex, lastIndex, emails]);

  useEffect(() => {
    console.log(records);
  }, [records]);


  
  return (<>
    <div className="w-full px-4">
      <div className="mt-12 flex flex-row">
        <div className="text-2xl font-bold text-[#7C4BA1]">History</div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left bg-white">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 whitespace-nowrap">S.N</th>
              <th className="py-3 px-6 whitespace-nowrap">Name</th>
              <th className="py-3 px-6 whitespace-nowrap">Email</th>
              <th className="py-3 px-6 whitespace-nowrap">Subject</th>
              <th className="py-3 px-6 whitespace-nowrap">Sent at</th>
              <th className="py-3 px-6 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          {
            loading ? (<>
            <div className="w-full h-full flex justify-center items-center p-8">
                            <ClipLoader
                                color={"#D22D3D"}
                                loading={loading}
                                cssOverride={{}}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
            </>) : (<>
              {
                emails && records &&  records.length > 0 && (<>
                  <tbody className="text-gray-600 divide-y">
                    {records?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap">{idx + 1+firstIndex}.</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.receiver?.profile?.fullname}</td>

                        <td className="px-6 py-4 whitespace-nowrap">{item?.receiver?.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.createdAt.slice(0, 10)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.subject}</td>
                        <td className=" px-6 whitespace-nowrap space-x-2">
                          <Link
                            to={`/admin-dashboard/main/users/user/${item?.receiver?.id}`}
                            className="py-1 hover:bg-[#613b7e] bg-[#7C4BA1] px-3 font-medium text-gray-200 rounded-lg">
                            View
                          </Link>

                          {/* <Link
                        to={`/admin-dashboard/cost-excludes/edit/${item}`}
                        className="py-1 hover:bg-yellow-600 bg-yellow-500 px-3 font-medium text-gray-200 rounded-lg">
                        Edit
                      </Link> */}

                          <button
                            onClick={() => onDelete(item.id)}
                            className="py-1 hover:bg-[#BD2836] bg-[#D22D3D] px-3 font-medium text-gray-200 rounded-lg">
                            {deleting ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>)
              }
            </>)
          }

        </table>
      </div>
      {emails && no.length > 1 && (
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

export default History;