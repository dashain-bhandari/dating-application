import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
    rem,
    Group,
    Divider,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import React, { useEffect } from "react";
  import { useState } from "react";

  import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
  import { useDispatch } from "react-redux";
  import { axiosInstance } from "../../http";
  import { useNavigate, useLocation, Link } from "react-router-dom";
  import { showNotification } from "@mantine/notifications";
  import authImage from "../../images/4796268.jpg";
  import { useContext } from "react";
  import { AuthContext } from "../../utils/context/AuthContext";

  import { Loader } from "lucide-react";

  import { socket } from "../../utils/context/SocketContext";
  
  const useStyles = createStyles((theme) => ({
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: rem(300),
      height: rem(600),
      maxHeight: rem(650),
      backgroundSize: "cover",
      width: "75%",
      boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
      backgroundImage: "url('../images/4796268.jpg')",
  
      [theme.fn.smallerThan("sm")]: {
        width: "95%",
      },
      [`@media (min-width: 1600px)`]: {
        width: "60%",
      },
    },
  
    wrapperContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "var(--screen)",
    },
    form: {
      height: "100%",
      flexBasis: "50%",
      maxWidth: rem(450),
  
      [`@media (min-width: ${rem(100)})`]: {
        maxWidth: rem(600),
      },
      [theme.fn.smallerThan("lg")]: {
        flexBasis: "100%",
        maxWidth: "100%",
      },
    },
  
    title: {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontFamily: `Montserrat, ${theme.fontFamily}`,
    },
  }));
  
  export default function LoginDashboard() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
  
    const from = location?.state?.from == "buy" ? "/" : "/home/main/dashboard";
    console.log(from);
    const { user, setUser } = useContext(AuthContext);
  
    const form = useForm({
      initialValues: {
        username: "superadmin",
        email: "",
        password: "",
      },
  
      validate: {
        ...(!isLogin
          ? {
            username: (val) =>
              val.length <= 3
                ? "Username must have at least three characters"
                : null,
          }
          : {}),
        email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
        password: (val) =>
          val.length <= 6
            ? "Password should include at least 6 characters"
            : null,
      },
    });
  
    const { classes } = useStyles();
  
    useEffect(() => {
      console.log(user);
    }, [user]);
  
    const handleSubmit = (data) => {
     // setIsLoading(true);
  
    //   const user = !isLogin
    //     ? { email: data.email, username: data.username, password: data.password }
    //     : { email: data.email, password: data.password };
  
    //   console.log(user);
      
    console.log(form)
     if(form.values.email!="ourlifepartner@gmail.com"){
return;
     }else{
      axiosInstance
      .post(
       "authentication/admin",
        form.values
      )
      .then((response) => {
        const user = response.data;
        setUser(user);

        navigate('main/overview')

        console.log(response.data)
       socket.connect()

        setIsLoading(false);
      })
     
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
       
            error?.response?.data?.message?showNotification({title:error?.response?.data?.message}):showNotification({title:"Something went wrong"})
        
        });

      }
    };
  
    return (
      <div className="max-w-screen-2xl mx-auto flex justify-center items-center">
      <div className={classes.wrapperContainer}>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
         
            <Title
              order={2}
              className={classes.title}
              ta="center"
              mt="sm"
              mb={20}
            >
              {`${ "Welcome to admin dashboard!"}`}
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                icon={<AiOutlineMail size={"1rem"} color="var(--primary)" />}
                required
                value={form.values.email}
                onChange={(e) => {
                  // console.log(e.currentTarget.value)
                  form.setFieldValue("email", e.currentTarget.value);
                }}
                label="Email address"
                placeholder="hello@gmail.com"
                size="md"
                error={form.errors.email && "Invalid email"}
              />
  
              <PasswordInput
                label="Password"
                required
                // description="Password must have at least 6 characters"
                icon={<AiOutlineLock size={"1rem"} color="var(--primary)" />}
                placeholder="Your password"
                value={form.values.password}
                onChange={(e) =>
                  form.setFieldValue("password", e.currentTarget.value)
                }
                mt="md"
                size="sm"
                error={form.errors.password && "Invalid Password"}
              />
              {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
             
                <Button
                  type="submit"
                  fullWidth
                  mt="xl"
                  size="md"
                  style={{ backgroundColor: "#D22D3D" }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              
            </form>
          </Paper>
  
          <div className="basis-[50%] hidden lg:block bg-white">
            <img
              className="w-full h-full object-center object-contain "
              src={authImage}
              alt="authImage"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
  