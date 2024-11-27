import debounce from "debounce-promise";
import React, { useContext, useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { filterSearchUserThunk } from "../../Store/thunk/searchUserThunk";
import { axiosInstance } from "../../http";
import { RiArrowDownSFill } from "react-icons/ri";
import "../../styles/Filter.css";
import InputSelect from "../Profile/Select";
import FilterSelect from "../Profile/FilterSelect";
import { setFilteredResult, setLoading } from "../../Store/features/searchUser";
import { setFilteredRecommedUser } from "../../Store/features/recommendSlice";
import { FiCornerDownLeft } from "react-icons/fi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AuthContext } from "../../utils/context/AuthContext";

function NewFilter({ showFilter, setShowFilter }) {
  const {user} = useContext(AuthContext);
  console.log(user);
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
    //             {
    //         key: '2',
    //         value: 'aget',
    //         label: 'Age',
    //         options: [
    //                {value: '4ft 5in - 134cm', label: '4ft 5in - 134cm'},
    //   {value: '4ft 6in - 137cm', label: '4ft 6in - 137cm'},
    //   {value: '4ft 7in - 139cm', label: '4ft 7in - 139cm'},
    //   {value: '4ft 8in - 142cm', label: '4ft 8in - 142cm'},
    //   {value: '4ft 9in - 144cm', label: '4ft 9in - 144cm'},
    //   {value: '4ft 10in - 147cm', label: '4ft 10in - 147cm'},
    //   {value: '4ft 11in - 149cm', label: '4ft 11in - 149cm'},
    //   {value: '5ft 0in - 152cm', label: '5ft 0in - 152cm'},
    //   {value: '5ft 1in - 154cm', label: '5ft 1in - 154cm'},
    //   {value: '5ft 2in - 157cm', label: '5ft 2in - 157cm'},
    //   {value: '5ft 3in - 159cm', label: '5ft 3in - 159cm'},
    //   {value: '5ft 4in - 162cm', label: '5ft 4in - 162cm'},
    //   {value: '5ft 5in - 164cm', label: '5ft 5in - 164cm'},
    //   {value: '5ft 6in - 167cm', label: '5ft 6in - 167cm'},
    //   {value: '5ft 7in - 169cm', label: '5ft 7in - 169cm'},
    //   {value: '5ft 8in - 172cm', label: '5ft 8in - 172cm'},
    //   {value: '5ft 9in - 174cm', label: '5ft 9in - 174cm'},
    //   {value: '5ft 10in - 177cm', label: '5ft 10in - 177cm'},
    //   {value: '5ft 11in - 179cm', label: '5ft 11in - 179cm'},
    //   {value: '6ft 0in - 182cm', label: '6ft 0in - 182cm'},
    //   {value: '6ft 1in - 184cm', label: '6ft 1in - 184cm'},
    //   {value: '6ft 2in - 187cm', label: '6ft 2in - 187cm'},
    //   {value: '6ft 3in - 189cm', label: '6ft 3in - 189cm'},
    //   {value: '6ft 4in - 192cm', label: '6ft 4in - 192cm'},
    //         ]
    //     },
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

  useEffect(() => {
    if (fetchFilterData) {
      fetchUser();
    }
  }, [values, setValues]);

  const searchUser = async () => {
    //  console.log('filter search user thunk');
    console.log(values);
    dispatch(setLoading(true));
    //  dispatch(filterSearchUserThunk(values.minAge && values.minAge.value, values.maxAge && values.maxAge.value, values.minHeight && values.minHeight.value, values.maxHeight && values.maxHeight.value, values.religion && values.religion.value, values.caste && values.caste.value, values.annualIncome && values.annualIncome.value, values.sector && values.sector.value, values.gender && values.gender.value));
    axiosInstance
      .get(
        `/users/filter?minAge=${values.minAge && values.minAge}&maxAge=${
          values.maxAge && values.maxAge
        }&minHeight=${values.minHeight && values.minHeight}&maxHeight=${
          values.maxHeight && values.maxHeight
        }&marital_status=${
          values.marital_status && values.marital_status
        }&sector=${
          values.sector && values.sector
        }&religion=${values.religion && values.religion}&caste=${
          values.caste && values.caste
        }&annualIncome=${values.annualIncome && values.annualIncome}`
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
                 searchResult.id!=user.id &&
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
            const filteredResponse=res.data?.filter((items)=>{
              return items.id!=user.id
            })
            console.log(filteredResponse)
            dispatch(
              setFilteredRecommedUser([filterRecommendResult, ...filteredResponse])
            );
          } else {
            //added for own profile not showing
            const filteredResponse=res.data?.filter((items)=>{
              console.log(items.id)
              
              return items.id!=user.id
            })
            console.log(filteredResponse)
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
    <div>
      <div
        className={`fixed lg:hidden top-0 left-0 z-30 w-[100vw] h-[100vh] ${
          showFilter ? "block" : "hidden"
        } bg-[rgba(0,0,0,0.2)]`}
        onClick={isMobile ? () => setShowFilter(false) : null}
      ></div>
      <div className={`filter z-50 shadow-md relative`}>
        <div
          className="mt-6 refine-text py-3 flex justify-between pl-6 pr-2"
          onClick={isMobile ? () => setShowFilter((prev) => !prev) : ""}
        >
          <h6 className="text-[20px] py-3 text-[rgba(0,0,0,0.2)]">
            Refine your search
          </h6>
          {isMobile && (
            <span className="cursor-pointer">
              <BsFillArrowLeftSquareFill color={"var(--secondary)"} size={25} />
            </span>
          )}
        </div>
        <div className="refine-body w-full h-[83vh] overflow-y-auto">
          <Accordion
            preExpanded={["6"]}
            allowZeroExpanded
            onChange={(index) => setExpandedItem(index[0])}
            className={`accordion ${showFilter ? "block" : "hidden"}  md:block`}
          >
            <AccordionItem className="accordionItem" uuid={option[0].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[0].key
                      ? "border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-lg text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[0].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[0].value == "age") &&
                  !(option[0].value == "height") ? (
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
                            if (index == 0) {
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
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        searchable
                        creatable
                        nothingFound="Sorry! nothing found"
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setOption((prev) =>
                            prev.map((opt, index) => {
                              if (index == 0) {
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
                        name={option[0].value == "age" ? "minAge" : "minHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleReligionChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option[0] && option[0].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        searchable
                        allowDeselect
                        creatable
                        nothingFound="Sorry! nothing found"
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setOption((prev) =>
                            prev.map((opt, index) => {
                              if (index == 0) {
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
                        name={option[0].value == "age" ? "maxAge" : "maxHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleReligionChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option[0] && option[0].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[1].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[1].key
                      ? "border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[1].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[1].value == "age") &&
                  !(option[1].value == "height") ? (
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
                            if (index == 1) {
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
                  ) : (
                    <div className="flex items-center">
                      <Select
                        searchable
                        allowDeselect
                        creatable
                        nothingFound="Sorry! nothing found"
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setOption((prev) =>
                            prev.map((opt, index) => {
                              if (index == 1) {
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
                        name={option[1].value == "age" ? "minAge" : "minHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleCasteChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option[1] && option[1].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        searchable
                        allowDeselect
                        creatable
                        nothingFound="Sorry! nothing found"
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setOption((prev) =>
                            prev.map((opt, index) => {
                              if (index == 0) {
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
                        name={option[1].value == "age" ? "maxAge" : "maxHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleCasteChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option[1] && option[1].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[2].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[2].key
                      ? "border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[2].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[2].value == "age") &&
                  !(option[2].value == "height") ? (
                    <Select
                      placeholder="Enter Gender"
                      rightSection={<span></span>}
                      searchable
                      allowDeselect
                      //   creatable
                      nothingFound="Sorry! nothing found"
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setOption((prev) =>
                          prev.map((opt, index) => {
                            if (index == 2) {
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
                      name={option[2].value}
                      value={values.gender}
                      classes1=""
                      onChange={(e) => handleGenderChange(e)}
                      classes2="xl:w-[100%] basis-[100%]"
                      data={option && option[2].options}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        name={option[2].value == "age" ? "minAge" : "minHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleGenderChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[2].options}
                      />
                      <span allowDeselect className="mx-2 ">
                        to
                      </span>
                      <Select
                        name={option[2].value == "age" ? "maxAge" : "maxHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleGenderChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[2].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[3].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2  border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[3].key
                      ? "border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[3].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[3].value == "age") &&
                  !(option[3].value == "height") ? (
                    <Select
                      placeholder="Select Marital Status"
                      rightSection={<span></span>}
                      searchable
                      allowDeselect
                      //   creatable
                      nothingFound="Sorry! nothing found"
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setOption((prev) =>
                          prev.map((opt, index) => {
                            if (index == 3) {
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
                      name={option[3].value}
                      value={values.marital_status}
                      classes1=""
                      onChange={(e) => handlemarital_statusChange(e)}
                      classes2="xl:w-[100%] basis-[100%]"
                      data={option && option[3].options}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        name={option[3].value == "age" ? "minAge" : "minHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handlemarital_statusChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[3].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        allowDeselect
                        name={option[3].value == "age" ? "maxAge" : "maxHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handlemarital_statusChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[3].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[4].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[4].key
                      ? "border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[4].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[4].value == "age") &&
                  !(option[4].value == "height") ? (
                    <Select
                      placeholder="Select Sector"
                      rightSection={<span></span>}
                      allowDeselect
                      searchable
                      //   creatable
                      nothingFound="Sorry! nothing found"
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setOption((prev) =>
                          prev.map((opt, index) => {
                            if (index == 4) {
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
                      name={option[4].value}
                      value={values.sector}
                      classes1=""
                      onChange={(e) => handleSectorChange(e)}
                      classes2="xl:w-[100%] basis-[100%]"
                      data={option && option[4].options}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        name={option[4].value == "age" ? "minAge" : "minHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleSectorChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[4].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        allowDeselect
                        name={option[4].value == "age" ? "maxAge" : "maxHeight"}
                        value={values}
                        classes1=""
                        onChange={(e) => handleSectorChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[4].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[5].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4  rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[5].key
                      ? " border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[5].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[5].value == "age") &&
                  !(option[5].value == "height") ? (
                    <Select
                      rightSection={<span></span>}
                      allowDeselect
                      searchable
                      creatable
                      nothingFound="Sorry! nothing found"
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setOption((prev) =>
                          prev.map((opt, index) => {
                            if (index == 5) {
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
                      name={option[5].value}
                      value={values}
                      classes1=""
                      onChange={(e) => handleChange(e)}
                      classes2="xl:w-[100%] basis-[100%]"
                      data={option && option[5].options}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        placeholder="From"
                        rightSection={<span></span>}
                        name={option[5].value == "age" ? "minAge" : "minHeight"}
                        value={values.minHeight}
                        classes1=""
                        onChange={(e) => handleMinHeightChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[5].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        allowDeselect
                        placeholder="to"
                        rightSection={<span></span>}
                        name={option[5].value == "age" ? "maxAge" : "maxHeight"}
                        value={values.maxHeight}
                        classes1=""
                        onChange={(e) => handleMaxHeightChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[5].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className="accordionItem" uuid={option[6].key}>
              <AccordionItemHeading className="accordionItemHeading border-b-2 border-[rgba(0 ,0, 0, 0.8)] rounded-none md:border-none">
                <AccordionItemButton
                  className={`accordionItemButton border-l-4 rounded-tr-xl rounded-br-xl ${
                    expandedItem == option[6].key
                      ? " border-[var(--primary)]"
                      : "border-transparent"
                  } hover:bg-screen w-full  border-[rgba(0, 0, 0)] font-semibold text-sm text-[rgba(0, 0, 0, 0.6)]`}
                >
                  {option[6].label}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion-body">
                <div>
                  {!(option[6].value == "age") &&
                  !(option[6].value == "height") ? (
                    <Select
                      rightSection={<span></span>}
                      allowDeselect
                      searchable
                      creatable
                      nothingFound="Sorry! nothing found"
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setOption((prev) =>
                          prev.map((opt, index) => {
                            if (index == 6) {
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
                      name={option[6].value}
                      value={values.minAge}
                      classes1=""
                      onChange={(e) => handleChange(e)}
                      classes2="xl:w-[100%] basis-[100%]"
                      data={option && option[6].options}
                    />
                  ) : (
                    <div className="flex items-center">
                      <Select
                        allowDeselect
                        placeholder="From"
                        rightSection={<span></span>}
                        name={option[6].value == "age" ? "minAge" : "minHeight"}
                        value={values.minAge}
                        classes1=""
                        onChange={(e) => handleMinAgeChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[6].options}
                      />
                      <span className="mx-2 ">to</span>
                      <Select
                        allowDeselect
                        placeholder="to"
                        rightSection={<span></span>}
                        name={option[6].value == "age" ? "maxAge" : "maxHeight"}
                        value={values.maxAge}
                        classes1=""
                        onChange={(e) => handleMaxAgeChange(e)}
                        classes2="xl:w-[100%] basis-[100%]"
                        data={option && option[6].options}
                      />
                    </div>
                  )}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default NewFilter;
