import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import Input from "../Profile/Input";
import { useState } from "react";
import { changePassword } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addToast } from "../../Store/features/toastSlice";
import { add } from "date-fns";
import {
  Button,
  Group,
  Paper,
  PasswordInput,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Forms } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "var(--primary)",
  },
}));

function PasswordSetting() {
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (val) =>
        val.length <= 6
          ? "Old Password should include at least 6 characters"
          : null,
      newPassword: (val) =>
        val.length <= 6
          ? "New Password should include at least 6 characters"
          : null,
      confirmPassword: (val) =>
        val.length <= 6
          ? "Confirm Password should include at least 6 characters"
          : null,
    },
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (value) => {
    changePassword(value)
      .then((res) => {
        console.log(res.data);
        showNotification({
          title: "Password updated successfully.",
        });

        form.reset();
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: "failed to update password",
        });
      });
  };

  const { classes } = useStyles();
  const largeDesktop = useMediaQuery("(min-width: 1750px)");
  const mediumDesktop = useMediaQuery("(max-width: 1440px)");

  return (
    <Paper className={classes.formWrapper} mt={"md"} withBorder>
      <div className="flex border-b-2 py-4 pl-6  ">
        <span className="mr-4">
          <RiLockPasswordLine color="var(--secondary)" size={30} />
        </span>
        <Title order={3}>Password Settings</Title>
      </div>

      <div className="flex flex-col my-2 pl-8">
        <Text size={"xl"} my={"sm"} fw={600}>
          Reset Password
        </Text>
        <form className="w-[80%]" onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            error={
              form.errors.oldPassword &&
              "old password must be more than 6 characters."
            }
            size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "md"}
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
            value={form.values.oldPassword}
            onChange={(e) =>
              form.setFieldValue("oldPassword", e.currentTarget.value)
            }
            label="Old Password"
            placeholder="Enter Old Password"
          />
          <PasswordInput
            error={
              form.errors.newPassword &&
              "new password must be more than 6 characters."
            }
            size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "md"}
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
            value={form.values.newPassword}
            onChange={(e) =>
              form.setFieldValue("newPassword", e.currentTarget.value)
            }
            label="New Password"
            placeholder="Enter New Password"
          />
          <PasswordInput
            error={
              form.errors.confirmPassword &&
              "confirm password must be more than 6 characters."
            }
            size={largeDesktop ? "xl" : mediumDesktop ? "sm" : "md"}
            mb={largeDesktop ? "xl" : mediumDesktop ? "md" : "lg"}
            value={form.values.confirmPassword}
            onChange={(e) =>
              form.setFieldValue("confirmPassword", e.currentTarget.value)
            }
            label="Confirm New Password"
            placeholder="Confirm New Password"
          />
          <Group position="right">
            <Button
              type="submit"
              size="md"
              my={"sm"}
              style={{ backgroundColor: "var(--secondary)" }}
            >
              Save
            </Button>
          </Group>
        </form>
      </div>
    </Paper>
  );
}

export default PasswordSetting;
