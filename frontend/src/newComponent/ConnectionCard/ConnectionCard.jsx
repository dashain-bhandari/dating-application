import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeConnectionThunk } from "../../Store/thunk/connectionsThunk";
import { Link, useNavigate } from "react-router-dom";
import profileAvatar from "../../images/olp_avatar.avif";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { AgeFromDate } from "age-calculator";
import { updateSelectedConversation } from "../../Store/features/selectedConversationSlice";
import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { AiOutlineDisconnect, AiOutlineSend } from "react-icons/ai";
import { fetchConversationsThunk } from "../../Store/features/conversationSlice";
import { addToast } from "../../Store/features/toastSlice";

import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns";

const useStyles = createStyles((theme) => ({
  card: {
    "&:hover": {
      background: "#EAF3FF",
    },
  },
  image: {
    [theme.fn.largerThan("sm")]: {
      flexBasis: "12%",
      display: "flex",
      justifyContent: "center",
      alignItems: " center",
    },
  },
  name: {
    [theme.fn.largerThan("sm")]: {
      flexBasis: "30%",
    },
  },
  badges: {
    [theme.fn.largerThan("sm")]: {
      flexBasis: "30%",
    },
  },
  button: {
    [theme.fn.largerThan("sm")]: {
      flexBasis: "40%",
    },
  },
}));

function ConnectionCard(props) {
  console.log(props)
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [monthToNum, setMonthtoNum] = useState({
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  });

  const { conversations } = useSelector((state) => state.conversation);

  useEffect(() => {
    if (!imageUrl) {
      setImageUrl("https://www.caltrain.com/files/images/2021-09/default.jpg");
    }
    dispatch(fetchConversationsThunk());
  }, []);

  const recepient =
    props?.connection?.sender?.id === user?.id
      ? props?.connection?.receiver
      : props?.connection?.sender;

  const handleConnectionDisconnect = () => {
    dispatch(removeConnectionThunk(props?.connection?.id));
  };

  const handleSendMessage = () => {
    console.log(conversations);
    const requiredUser =
      props?.connection?.sender?.id == user?.id
        ? props?.connection?.receiver
        : props?.connection?.sender;
    console.log(requiredUser?.id);

    const requiredConversationId = conversations.find((cov) => {
      console.log(cov);
      return (
        cov?.creator?.id == requiredUser?.id || cov?.recepient?.id == requiredUser?.id
      );
    });
    console.log(requiredUser);
    console.log(recepient);

    console.log(requiredConversationId);

    if (requiredConversationId) {
      dispatch(
        updateSelectedConversation({
          conversation: requiredConversationId
            ? requiredConversationId
            : requiredUser,
          type: requiredConversationId ? "conversation" : "createConversation",
        })
      );
      requiredConversationId
        ? navigate(`/home/main/chat/conversation/${requiredConversationId?.id}`)
        : navigate(`/home/main/chat/conversation/`);
    } else {
      dispatch(
        updateSelectedConversation({
          conversation: requiredConversationId
            ? requiredConversationId
            : requiredUser,
          type: requiredConversationId ? "conversation" : "createConversation",
        })
      );
      requiredConversationId
        ? navigate(`/home/main/chat/conversation/${requiredConversationId?.id}`)
        : navigate(`/home/main/chat/conversation/`);
    }
  };

  const onViewProfile=async()=>{
    console.log("hii")
        if(!user.subscription || user?.subscription?.status=="expired"){
    if(!user?.profiles || user.profiles?.length<2  || user.profiles?.includes(recepient?.id)){
      navigate(
        `/home/main/profile/other/${recepient && recepient?.id}/about`
      )
    }
    else{
      console.log("hii")
      dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }))
    }
        }
        else{
          navigate(
            `/home/main/profile/other/${recepient && recepient?.id}/about`
          )
        }
    
      }


  return (
    // <Card className={classes.card}>
    //   <Flex
    //     direction={{ base: "column", md: "row" }}
    //     justify={"space-between"}
    //     align={"center"}
    //   >
    //     <div className={classes.image}>
    //       <Image
    //         width={60}
    //         height={60}
    //         radius={100}
    // src={
    //   recepient && recepient.avatarId
    //     ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
    //         recepient.avatarId
    //       }`
    //     : profileAvatar
    // }
    //         alt="Profile"
    //       />
    //     </div>
    //     <Stack spacing={0} className={classes.name}>
    //       <Title order={3} size={"h4"} transform="capitalize">
    //         {recepient && recepient.profile && recepient.profile.fullname}
    //       </Title>
    //       <Text size={"md"} color="dimmed">
    //         {recepient && recepient.profile && recepient.profile.address}
    //       </Text>
    //     </Stack>

    //     <Stack spacing={0} align="center" className={classes.badges}>
    //       <Group position="center" my="sm">
    //         <Tooltip label="Age" withArrow>
    //           <Badge size="md">
    //             {
    //               new AgeFromDate(
    //                 new Date(
    //                   recepient.profile && recepient.profile.year,
    //                   monthToNum[recepient.profile && recepient.profile.month],
    //                   recepient.profile && recepient.profile.day
    //                 )
    //               ).age
    //             }
    //           </Badge>
    //         </Tooltip>

    //         <Tooltip label="Religion" withArrow>
    //           <Badge size="md">
    //             {recepient && recepient.profile && recepient.profile.religion}
    //           </Badge>
    //         </Tooltip>

    //         <Tooltip label="Caste" withArrow>
    //           <Badge size="md">
    //             {recepient && recepient.profile && recepient.profile.caste}
    //           </Badge>
    //         </Tooltip>
    //       </Group>

    //       <Tooltip label="Profession" withArrow>
    //         <Badge size="md">
    //           {recepient &&
    //             recepient.education &&
    //             recepient.education.occupation}
    //         </Badge>
    //       </Tooltip>
    //     </Stack>

    //     <Group position="right" align="center" className={classes.button}>
    //       <Button
    //         leftIcon={<AiOutlineDisconnect size={20} />}
    //         style={{ backgroundColor: "var(--secondary)" }}
    //         size="sm"
    //         variant="filled"
    //         onClick={() => handleConnectionDisconnect()}
    //       >
    //         Disconnect
    //       </Button>

    //       <Button
    //         leftIcon={<AiOutlineSend size={20} />}
    //         size="sm"
    //         variant="outline"
    //         onClick={() => handleSendMessage()}
    //       >
    //         Send Message
    //       </Button>
    //     </Group>
    //   </Flex>
    // </Card>
    <div className="">
      <div className="bg-white p-4 rounded-2xl w-full">
        <div className="flex flex-col items-center justify-center md:flex-row text-[#555555] w-full md:justify-between gap-10 py-4">
          <div className="w-40 h-36 rounded-2xl overflow-hidden flex-shrink-0">
            <img
              src={
                recepient && recepient.avatarId
                  ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                      recepient.avatarId
                    }`
                  : profileAvatar
              }
              alt="profile image"
              className="w-full h-full object-cover  "
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-base text-[#555555] font-bold capitalize">
              {recepient && recepient.profile && recepient.profile?.fullname}
            </h1>
            <ul className="flex flex-wrap gap-x-4 text-[#6F6F6F">
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-bold">City:</span>{" "}
                {recepient && recepient.profile && recepient.profile?.address}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-bold"> Age: </span>30
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-bold"> Height:</span>{" "}
                {recepient && recepient.profile && recepient.height}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-bold"> Religion:</span>{" "}
                {recepient && recepient.profile && recepient.profile.religion}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-bold"> Request on:</span> 
                {/* {props.connection.createdAt} */}
                {/* {`${formatDistanceToNow(
                // notification && new Date(notification.createdAt)
           props.connection &&   new Date(new Date(props.connection.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString()

              )} ago`} */}
              { props.connection &&  new Date(new Date(props.connection?.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(0,10)}, 
              {`   ${props.connection &&  new Date(new Date(props.connection?.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(11,16)}`}
             
              </li>
            </ul>
            <button className="px-6 py-2 w-fit rounded-full border !border-gray-400 text-gray-400 hover:text-gray-500"
             onClick={() =>
              // navigate(`/home/main/profile/${recepient?.id}`)
              onViewProfile()
            }
           
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
