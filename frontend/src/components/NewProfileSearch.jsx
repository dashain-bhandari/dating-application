import React, { useState, useEffect, useCallback, useContext } from "react";
import debounce from "debounce-promise";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../http";
import { Select } from "@mantine/core";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import { setFilteredRecommedUser } from "../Store/features/recommendSlice";
import { setFilteredResult, setLoading } from "../Store/features/searchUser";
import { AuthContext } from "../utils/context/AuthContext";

export default function NewProfileSearch({ showFilter, setShowFilter ,setPopupOpen}) {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(6);
  const { result, filteredResult } = useSelector((state) => state.search);
  const { recommendUser, filteredRecommendUser } = useSelector(
    (state) => state.recommend
  );
  const isMobile = useMediaQuery("(max-width: 992px)");

  const [fetchFilterData, setFetchFilterData] = useState(false);

  const [option, setOption] = useState([
    {
      key: "6",
      value: "religion",
      label: "Religion",
      options: [
        { value: "hindu", label: "Hinduism" },
        { value: "buddhist", label: "Buddhism" },
        { value: "islam", label: "Islam" },
        { value: "christianity", label: "Christianity" },
        { value: "sikh", label: "Sikhism" },
        { value: "Jain", label: "Jainism" },
        { value: "kirat", label: "Kirat" },
        { value: "no", label: "Non-Religious" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "8",
      value: "caste",
      label: "Caste",
      options: [
        { value: "brahmin", label: "Brahmin" },
        { value: "chhetri", label: "chhetri" },
        { value: "thakuri", label: "Thakuri" },
        { value: "magar", label: "Magar" },
        { value: "tamang", label: "Tamang" },
        { value: "sherpa", label: "Sherpa" },
        { value: "newar", label: "Newar" },
      ],
    },

    {
      key: "9",
      value: "gender",
      label: "Gender",
      options: [
        { value: "man", label: "Male" },
        { value: "woman", label: "Female" },
      ],
    },
    {
      key: "5",
      value: "marital_status",
      label: "Marital Status",
      options: [
        {
          label: "Divorced",
          value: "divored",
        },
        {
          label: "Unmarried",
          value: "Unmarried",
        },
        {
          label: "Awaiting Divorce",
          value: "Awaition Divorce",
        },
      ],
    },
    {
      key: "10",
      value: "sector",
      label: "Sector",
      options: [
        { value: "private", label: "Private Company" },
        { value: "government", label: "Government" },
        { value: "ngo", label: "NGO's/INGO's" },
        { value: "selfEmployed", label: "Self Employed" },
        { value: "unEmployed", label: "Unemployed" },
      ],
    },
    {
      key: "1",
      value: "height",
      label: "Height",
      options: [
        { value: "4ft 5in - 134cm", label: "4ft 5in - 134cm" },
        { value: "4ft 6in - 137cm", label: "4ft 6in - 137cm" },
        { value: "4ft 7in - 139cm", label: "4ft 7in - 139cm" },
        { value: "4ft 8in - 142cm", label: "4ft 8in - 142cm" },
        { value: "4ft 9in - 144cm", label: "4ft 9in - 144cm" },
        { value: "4ft 10in - 147cm", label: "4ft 10in - 147cm" },
        { value: "4ft 11in - 149cm", label: "4ft 11in - 149cm" },
        { value: "5ft 0in - 152cm", label: "5ft 0in - 152cm" },
        { value: "5ft 1in - 154cm", label: "5ft 1in - 154cm" },
        { value: "5ft 2in - 157cm", label: "5ft 2in - 157cm" },
        { value: "5ft 3in - 159cm", label: "5ft 3in - 159cm" },
        { value: "5ft 4in - 162cm", label: "5ft 4in - 162cm" },
        { value: "5ft 5in - 164cm", label: "5ft 5in - 164cm" },
        { value: "5ft 6in - 167cm", label: "5ft 6in - 167cm" },
        { value: "5ft 7in - 169cm", label: "5ft 7in - 169cm" },
        { value: "5ft 8in - 172cm", label: "5ft 8in - 172cm" },
        { value: "5ft 9in - 174cm", label: "5ft 9in - 174cm" },
        { value: "5ft 10in - 177cm", label: "5ft 10in - 177cm" },
        { value: "5ft 11in - 179cm", label: "5ft 11in - 179cm" },
        { value: "6ft 0in - 182cm", label: "6ft 0in - 182cm" },
        { value: "6ft 1in - 184cm", label: "6ft 1in - 184cm" },
        { value: "6ft 2in - 187cm", label: "6ft 2in - 187cm" },
        { value: "6ft 3in - 189cm", label: "6ft 3in - 189cm" },
        { value: "6ft 4in - 192cm", label: "6ft 4in - 192cm" },
      ],
    },

    {
      key: "3",
      value: "age",
      label: "Age",
      options: [
        { value: 22, label: "22" },
        { value: 23, label: "23" },
        { value: 24, label: "24" },
        { value: 25, label: "25" },
        { value: 26, label: "26" },
        { value: 27, label: "27" },
        { value: 28, label: "28" },
        { value: 29, label: "29" },
        { value: 30, label: "30" },
        { value: 31, label: "31" },
        { value: 32, label: "32" },
        { value: 33, label: "33" },
        { value: 34, label: "34" },
        { value: 35, label: "35" },
        { value: 36, label: "36" },
        { value: 37, label: "37" },
        { value: 38, label: "38" },
        { value: 39, label: "39" },
        { value: 40, label: "40" },
        { value: 41, label: "41" },
        { value: 42, label: "42" },
      ],
    },

    {
      key: "7",
      value: "annualIncome",
      label: "Annual Income",
      options: [
        { value: "2L", label: "Upto 2L" },
        { value: "3L", label: "Upto 3L" },
        { value: "3L-4L", label: "3L-4L" },
        { value: "4L-5L", label: "4L-5L" },
        { value: "5L-6L", label: "5L-6L" },
        { value: "6L-7L", label: "6L-7L" },
        { value: "7L-8L", label: "7L-8L" },
        { value: "8L-9L", label: "8L-9L" },
        { value: "9L-10L", label: "9L-10L" },
        { value: "10L-15L", label: "10L-15L" },
        { value: "15L-20L", label: "15L-20L" },
        { value: "20L-30L", label: "20L-30L" },
        { value: "above30L", label: "Above 30L" },
      ],
    },
  ]);

  const [values, setValues] = useState({
    minHeight: "",
    maxHeight: "",
    minAge: "",
    maxAge: "",
    marital_status: "",
    annualIncome: "",
    religion: "",
    caste: "",
    subcaste: "",
    sector: "",
    gender: "",
  });

  // useEffect(() => {
  //   if (fetchFilterData) {
  //     fetchUser();
  //   }
  // }, [values, setValues]);

  const searchUser = async () => {
    //  console.log('filter search user thunk');
    console.log(values);
    setPopupOpen(false)
    dispatch(setLoading(true));
    //  dispatch(filterSearchUserThunk(values.minAge && values.minAge.value, values.maxAge && values.maxAge.value, values.minHeight && values.minHeight.value, values.maxHeight && values.maxHeight.value, values.religion && values.religion.value, values.caste && values.caste.value, values.annualIncome && values.annualIncome.value, values.sector && values.sector.value, values.gender && values.gender.value));
    axiosInstance
      .get(
        `/users/filter?minAge=${values.minAge && values.minAge}&maxAge=${values.maxAge && values.maxAge
        }&minHeight=${values.minHeight && values.minHeight}&maxHeight=${values.maxHeight && values.maxHeight
        }&marital_status=${values.marital_status && values.marital_status
        }&sector=${values.sector && values.sector}&religion=${values.religion && values.religion
        }&caste=${values.caste && values.caste}&annualIncome=${values.annualIncome && values.annualIncome
        }&gender=${values.gender && values.gender}`
      )
      .then((res) => {
        console.log(res.data);
        if (location.pathname == "/home/main/dashboard/search") {
          console.log("setting search filter");
          let filterSearchResult;
          console.log(result);
          if (result.length > 0) {
            filterSearchResult = result.filter((searchResult) => {
              // console.log(values);
              // console.log(result);
              console.log("Search", searchResult);
              if (
                searchResult.id !== user.id &&
                values.religion &&
                searchResult.religion == values.religion.value &&
                values.gender &&
                searchResult.gender == values.gender.value &&
                values.caste &&
                searchResult.caste == values.caste.value &&
                values.annualIncome &&
                searchResult.annualIncome == values.annualIncome.value &&
                values.marital_status &&
                searchResult.marital_status == values.marital_status.value &&
                values.sector &&
                searchResult.sector === values.sector.value &&
                values.minAge &&
                searchResult.year <= new Date().getFullYear - values.minAge &&
                values.maxAge &&
                searchResult.year >= new Date().getFullYear - values.maxAge - 1
              ) {
                return searchResult;
              }
            });
          }

          dispatch(setLoading(false));
          if (filterSearchResult.length > 0) {
            dispatch(setFilteredResult([...filterSearchResult, ...res.data]));
          } else {
            dispatch(setFilteredResult([...res.data]));
          }
        } else {
          console.log("seconde");
          let filterRecommendResult = [];
          if (recommendUser.length > 0) {
            console.log("thirde");
            filterRecommendResult = recommendUser.filter((searchResult) => {
              console.log(searchResult.id);
              console.log(user.id);
              if (
                searchResult.id != user.id &&
                values.religion &&
                searchResult.religion == values.religion &&
                values.caste &&
                searchResult.caste == values.caste &&
                values.annualIncome &&
                searchResult.annualIncome == values.annualIncome &&
                values.marital_status &&
                searchResult.marital_status == values.marital_status &&
                values.sector &&
                searchResult.sector === values.sector &&
                values.minAge &&
                searchResult.year <= new Date().getFullYear - values &&
                values.maxAge &&
                searchResult.year >= new Date().getFullYear - values.maxAge - 1
              ) {
                return searchResult;
              }
            });
          }
          console.log(filteredRecommendUser);
          console.log(filterRecommendResult);
          dispatch(setLoading(false));
          if (filterRecommendResult.length > 0) {
            console.log("setting filterRecommendResult");
            //added for own profile not showing
            const filteredResponse = res.data?.filter((items) => {
              return items.id != user.id;
            });
            console.log(filteredResponse);
            dispatch(
              setFilteredRecommedUser([
                filterRecommendResult,
                ...filteredResponse,
              ])
            );
          } else {
            //added for own profile not showing
            const filteredResponse = res.data?.filter((items) => {
              console.log(items.id);

              return items.id != user.id;
            });
            console.log(filteredResponse);
            console.log("filter", res.data);
            dispatch(setFilteredRecommedUser([...filteredResponse]));
          }
        }
      });
  };

  const delayFetchUser = useCallback(debounce(searchUser, 500), []);

  const handleReligionChange = (value) => {
    setValues({ ...values, religion: value });
    setFetchFilterData(true);
  };

  const handleCasteChange = (value) => {
    setValues({ ...values, caste: value });
    setFetchFilterData(true);
  };

  const handlemarital_statusChange = (value) => {
    setValues({ ...values, marital_status: value });
    setFetchFilterData(true);
  };

  const handleSectorChange = (value) => {
    setValues({ ...values, sector: value });
    setFetchFilterData(true);
  };

  const handleMinAgeChange = (value) => {
    setValues({ ...values, minAge: value });
    setFetchFilterData(true);
  };

  const handleMaxAgeChange = (value) => {
    setValues({ ...values, maxAge: value });
    setFetchFilterData(true);
  };

  const handleMinHeightChange = (value) => {
    setValues({ ...values, minHeight: value });
    setFetchFilterData(true);
  };

  const handleMaxHeightChange = (value) => {
    setValues({ ...values, maxHeight: value });
    setFetchFilterData(true);
  };

  const handleGenderChange = (value) => {
    setValues({ ...values, gender: value });
    setFetchFilterData(true);
  };
  const fetchUser = () => {
    searchUser();
    // delayFetchUser();
  };

  const setExpandedItems = (index) => {
    console.log(index);
    setExpandedItem(index == expandedItem ? "null" : index);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
      <div>
        <label>Religion</label>
        <div>
          <Select
            color="secondary"
            allowDeselect
            placeholder="Enter Religion"
            rightSection={<span></span>}
            searchable
            creatable
            nothingFound="Sorry! nothing found"
            onCreate={(query) => {
              const item = { value: query, label: query };
              setOption((prev) =>
                prev.map((opt, index) => {
                  if (index === 0) {
                    return {
                      ...opt,
                      options: [...opt.options, item],
                    };
                  } else {
                    return opt;
                  }
                })
              );
              return item;
            }}
            getCreateLabel={(query) => `+Create ${query}`}
            name={option[0].value}
            value={values.religion}
            classes1=""
            onChange={(e) => handleReligionChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option[0] && option[0].options}
          />
        </div>
      </div>

      <div>
        <label>Caste</label>
        <div>
          <Select
            placeholder="Enter Caste"
            rightSection={<span></span>}
            allowDeselect
            searchable
            creatable
            nothingFound="Sorry! nothing found"
            onCreate={(query) => {
              const item = { value: query, label: query };
              setOption((prev) =>
                prev.map((opt, index) => {
                  if (index === 1) {
                    return {
                      ...opt,
                      options: [...opt.options, item],
                    };
                  } else {
                    return opt;
                  }
                })
              );
              return item;
            }}
            getCreateLabel={(query) => `+Create ${query}`}
            name={option[1].value}
            value={values.caste}
            classes1=""
            onChange={(e) => handleCasteChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option[1] && option[1].options}
          />
        </div>
      </div>

      <div>
        <label>Gender</label>
        <div>
          <Select
            placeholder="Enter Gender"
            rightSection={<span></span>}
            searchable
            allowDeselect
            // creatable
            nothingFound="Sorry! nothing found"
            name={option[2].value}
            value={values.gender}
            classes1=""
            onChange={(e) => handleGenderChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[2].options}
          />
        </div>
      </div>

      <div>
        <label>Marital Status</label>
        <div>
          <Select
            placeholder="Select Marital Status"
            rightSection={<span></span>}
            searchable
            allowDeselect
            // creatable
            nothingFound="Sorry! nothing found"
            name={option[3].value}
            value={values.marital_status}
            classes1=""
            onChange={(e) => handlemarital_statusChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[3].options}
          />
        </div>
      </div>

      <div>
        <label>Sector</label>
        <div>
          <Select
            placeholder="Select Sector"
            rightSection={<span></span>}
            allowDeselect
            searchable
            // creatable
            nothingFound="Sorry! nothing found"
            name={option[4].value}
            value={values.sector}
            classes1=""
            onChange={(e) => handleSectorChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[4].options}
          />
        </div>
      </div>

      <div>
        <label>Min Height</label>
        <div>
          <Select
            placeholder="Enter min Height"
            rightSection={<span></span>}
            allowDeselect
            name={option[5].value === "height" ? "height" : "height"}
            value={values.minHeight}
            classes1=""
            onChange={(e) => handleMinHeightChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[5].options}
          />
        </div>
      </div>

      <div>
        <label>Max Height</label>
        <div>
          <Select
            placeholder="Enter max Height"
            rightSection={<span></span>}
            allowDeselect
            name={option[5].value === "height" ? "height" : "height"}
            value={values.maxHeight}
            classes1=""
            onChange={(e) => handleMaxHeightChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[5].options}
          />
        </div>
      </div>
      <div>
        <label> Min Age</label>
        <div>
          <Select
            placeholder="Enter Min Age"
            rightSection={<span></span>}
            allowDeselect
            name={option[6].value === "age" ? "age" : "age"}
            value={values.minAge}
            classes1=""
            onChange={(e) => handleMinAgeChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[6].options}
          />
        </div>
      </div>
      <div>
        <label>Max Age</label>
        <div>
          <Select
            placeholder="Enter Max Age"
            rightSection={<span></span>}
            allowDeselect
            name={option[6].value === "age" ? "age" : "age"}
            value={values.maxAge}
            classes1=""
            onChange={(e) => handleMaxAgeChange(e)}
            classes2="xl:w-[100%] basis-[100%]"
            data={option && option[6].options}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-end col-span-4">
          <button className="px-6 py-2 rounded-md bg-[#EB4566] hover:bg-[#fb5274] text-white" onClick={()=>searchUser()}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
