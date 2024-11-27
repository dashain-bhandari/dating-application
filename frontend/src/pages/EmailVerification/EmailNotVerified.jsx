import React, { useContext, useEffect, useState } from "react";
import Input from "../../newComponent/Profile/Input";
import { useNavigate } from "react-router-dom";
import { resendEmail } from "../../utils/api";
import { addToast } from "../../Store/features/toastSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { Badge, Button, Group, Paper, TextInput, Title } from "@mantine/core";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

function EmailNotVerified() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (value) => {
    resendEmail(value)
      .then((res) => {
        showNotification({
          title: "Verificaiton Email sent successfully! ✌️",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Invalid Email! 😭",
        });
      });
  };

  useEffect(() => {
    if (user.emailVerified) {
      navigate("/home/main/dashboard");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-screen">
      {/* <Paper  radius={0} p={30}> */}
      <div className="flex flex-col w-[90%] md:w-[90%] lg:w-[60%] bg-white px-4 py-4 r">
        <div className="w-full flex justify-between">
          <Title order={2}>Verify your account.</Title>
          <Badge
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/home/main/dashboard")}
          >
            Skip
          </Badge>
        </div>
        <p className="font-semibold">
          A link has been sent to your email. Please click the link or paste it
          in browser to verify this it's your email. If you don't see any email
          in your inbox or spam. Resend it.
        </p>

        <form action="" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            error={form.errors.email && "Invalid Email"}
            value={form.values.email}
            onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
            name="email"
            size="md"
            mt={"sm"}
            icon={<AiOutlineMail size={20} color="var(--primary)" />}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
          />

          <Group position="right" my={"md"}>
            <Button
              size="md"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              size="md"
              variant="filled"
              style={{ backgroundColor: "var(--secondary)" }}
              type="submit"
            >
              Resend
            </Button>
          </Group>
        </form>
      </div>
      {/* </Paper> */}
    </div>
  );
}

export default EmailNotVerified;
