import React from "react";
import { AiFillAccountBook, AiOutlineDelete } from "react-icons/ai";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useState } from "react";
import { deleteAccount } from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Store/features/authSlice";
import { addToast } from "../../Store/features/toastSlice";
import { Button, Paper, Text, Title, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--primary)",
  },
}));
function AccountSetting() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Account",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete Account? This action is destructive
          and will permanently delete account and all related data.
        </Text>
      ),
      labels: { confirm: "Delete Account", cancel: "No don't delete it" },
      confirmProps: { color: "red", variant: "outline" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleSubmit(),
    });

  const handlelogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/authentication/log-out-after-delete`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(logOutUser());
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          const response = error.response;
          const { message } = response.data;
          console.log(message);
          switch (response.status) {
            case 401:
              dispatch(
                addToast({ msg: "Logged Out successfully", kind: "SUCCESS" })
              );
              dispatch(logOutUser());
              break;
            case 400:
            case 500:
              console.log(message);
              dispatch(addToast({ kind: "ERROR", msg: message }));
              break;
            default:
              dispatch(
                addToast({
                  kind: "ERROR",
                  msg: "Oops, Something went wrong",
                })
              );
              break;
          }
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteAccount()
      .then((res) => {
        handlelogout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  return (
    <Paper mb={"xl"} className={classes.formWrapper} mt={"md"} withBorder>
      <div className="flex border-b-2 py-4 px-4">
        <span className="mr-4">
          <AiFillAccountBook color="var(--secondary)" size={30} />
        </span>
        <Title order={3}>Account Settings</Title>
      </div>

      <div className="flex flex-col mb-4 ml-4 px-2 py-2">
        <Text size={"xl"} my={"sm"} fw="600">
          Delete Account
        </Text>
        <div className="w-full px-2 ">
          <Button
            style={{ backgroundColor: "var(--secondary)" }}
            size={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
            leftIcon={<AiOutlineDelete size={20} />}
            onClick={openDeleteModal}
          >
            Delete
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default AccountSetting;
