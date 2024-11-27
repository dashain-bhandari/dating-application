import React, { useEffect, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { axiosInstance } from "../../../http";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchUserThunk } from "../../../Store/thunk/searchUserThunk";
import { getSearchUser } from "../../../utils/api";
import { Box, Group, TextInput } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value=="") {
      return;
    }
    dispatch(fetchSearchUserThunk({ value, page: 0, limit: 20 }));
    // setValue("");
    navigate(`/home/main/search/${value}`);
    // console.log(value);
  };

useEffect(()=>{
if(location.pathname==="/home/main/dashboard")
{console.log("hii")
  setValue("")}
},[location.pathname])

  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <Group grow>
        <TextInput
          color="red"
          radius={40}
          value={value}
          icon={<AiOutlineSearch size={20} />}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by name"
        />
        {/* <button type='submit' className='h-full px-2  border-l-[2px] border-[rgba(0, 0, 0, 0.6)]'><BsSearchHeart size={20} color='var(--primary)'/></button> */}
      </Group>
    </form>
  );
}

export default Search;
