import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptConnectionRequestThunk,
  cancelConnectionRequestThunk,
  rejectConnectionRequestThunk,
} from "../../Store/thunk/connectionsThunk";
import { Link, useNavigate } from "react-router-dom";
import profileAvatar from "../../images/olp_avatar.avif";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { AgeFromDate } from "age-calculator";
import { SocketContext } from "../../utils/context/SocketContext";
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
import { createConversationThunk } from "../../Store/features/conversationSlice";
import { resetSelectedConversation } from "../../Store/features/selectedConversationSlice";
import { Icon } from "@iconify/react";
import { addToast } from "../../Store/features/toastSlice";
import { Loader } from "lucide-react";
import { chatContext } from "../../utils/context/ChatContext";
import { fetchConnections } from "../../utils/api";
import { setConnection } from "../../Store/features/connectionSlice";

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
      alignItems: "center",
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
function ConnectionRequestCard(props) {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
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
  useEffect(() => {
    if (!imageUrl) {
      setImageUrl("https://www.caltrain.com/files/images/2021-09/default.jpg");
    }
  }, []);
  console.log(props);

  const recepient =
    props.connectionRequest &&
      props.connectionRequest.sender &&
      props.connectionRequest.sender.id === user.id
      ? props.connectionRequest.receiver
      : props.connectionRequest.sender;

  const createConversation = async () => {
    const formData = new FormData();
    formData.append("userId", recepient && recepient.id);
    formData.append("message", "");
    console.log(recepient);
    try {
      dispatch(resetSelectedConversation());
      dispatch(createConversationThunk(formData));

      setContent("");

      setAttachments([]);
    } catch (err) {
      console.log(err);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { connection, setConnections } = useContext(chatContext);

  const getConnection = async () => {
    try {
      const { data } = await axiosInstance.get(`connection`)
      console.log(data)
      if (data) {
        console.log(data);
        let newA = []
        newA = data.length > 0 ? data.map((item) => (
          user?.id == item?.sender?.id ? item?.receiver?.id : item?.sender?.id
        )) : []
        console.log(newA)
        setConnections(newA)
      }
    } catch (error) {
      console.log(error.message);// setConnected(false);
    }

  }
  const handleRequestAccept = async () => {
    try {
      setSubmitting(true)
      dispatch(
        acceptConnectionRequestThunk(props && props.connectionRequest.id, socket)
      );

      //getConnection();
      console.log(submitting)
      

      await createConversation();
      setSubmitting(false);
    } catch (error) {

      console.log(error.message);
      setSubmitting(false);

    }
  };

  const handleRequestReject = () => {
    dispatch(rejectConnectionRequestThunk(props && props.connectionRequest.id));
  };

  const handleRequestCancel = () => {
    try {

      dispatch(cancelConnectionRequestThunk(props && props.connectionRequest.id));


    } catch (error) {

      console.log(error.message)
    }
  }

  // || user.profiles?.includes(recepient?.id)

  const onViewProfile = async () => {
    console.log("hii")
    if (!user.subscription || user?.subscription?.status == "expired") {
      if (!user.profiles || user.profiles?.length < 2 || user.profiles?.includes(recepient?.id)) {
        navigate(
          `/home/main/profile/other/${recepient && recepient?.id}/about`
        )
      }
      else {
        console.log("hii")
        dispatch(addToast({ kind: "ERROR", msg: "View limit exceeded on free version." }))
      }
    }
    else {
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
    //     : imageUrl
    // }
    //         alt="Profile"
    //       />
    //     </div>
    //     <Stack spacing={0} className={classes.name}>
    //       <Title order={3} size={"h4"} transform="capitalize">
    //         {recepient && recepient.profile.fullname}
    //       </Title>
    //       <Text size={"lg"} color="dimmed">
    //         {recepient && recepient.profile.address}
    //       </Text>
    //     </Stack>

    //     <Stack spacing={0} align="center" className={classes.badges}>
    //       <Group position="center" my="sm">
    //         <Tooltip label="Age" withArrow>
    //           <Badge size="lg">
    //             {
    //               new AgeFromDate(
    //                 new Date(
    //                   recepient.profile.year,
    //                   monthToNum[recepient.profile.month],
    //                   recepient.profile.day
    //                 )
    //               ).age
    //             }
    //           </Badge>
    //         </Tooltip>

    //         <Tooltip label="Religion" withArrow>
    //           <Badge size="lg">{recepient.profile.religion}</Badge>
    //         </Tooltip>

    //         <Tooltip label="Caste" withArrow>
    //           <Badge size="lg">{recepient.profile.caste}</Badge>
    //         </Tooltip>
    //       </Group>

    //       <Tooltip label="Profession" withArrow>
    //         <Badge size="lg">
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
    //         onClick={
    //           props.type == "invite"
    //             ? () => handleRequestAccept()
    //             : () => navigate(`/home/main/profile/${recepient.id}`)
    //         }
    //       >
    //         {props.type == "invite" ? "Accept" : "View Profile"}
    //       </Button>

    //       <Button
    //         leftIcon={<AiOutlineSend size={20} />}
    //         size="sm"
    //         variant="outline"
    //         onClick={
    //           props.type == "invite"
    //             ? () => handleRequestReject()
    //             : () => handleRequestCancel()
    //         }
    //       >
    //         {props.type == "invite" ? "Ignore" : "Cancel"}
    //       </Button>
    //     </Group>
    //   </Flex>
    // </Card>
    <div className="">
      <div className="bg-white hover:!bg-[#EAF3FF] p-4 rounded-2xl w-full ">
        <div className="flex flex-col xl:flex-row items-center justify-center text-[#555555] w-full xl:justify-between gap-10 py-4">
          <div className="w-40 h-36 rounded-2xl overflow-hidden flex-shrink-0">
            <img
              src={
                recepient && recepient.avatarId
                  ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${recepient.avatarId
                  }`
                  : imageUrl
              }
              alt="profile image"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-base capitalize font-bold text-[#555555]">
              {recepient && recepient.profile.fullname}
            </h1>
            <ul className="flex flex-wrap gap-x-4 text-[#6F6F6F]">
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-semibold"> City: </span>
                {recepient && recepient.profile.address}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-semibold">Age:</span>
                30
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-semibold">Height:</span>
                {recepient && recepient.profile.height}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-semibold">Religion:</span>
                {recepient && recepient.profile.religion}
              </li>
              <li className="flex gap-1 items-center">
                <Icon icon="radix-icons:dot-filled" className="text-2xl" />
                <span className="font-semibold">Request on:</span>
                {props.connectionRequest && new Date(new Date(props.connectionRequest.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(0, 10)},
                {`   ${props.connectionRequest && new Date(new Date(props.connectionRequest.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000)).toISOString().slice(11, 16)}`}

              </li>
            </ul>
            <button
              className="px-6 py-2 w-fit rounded-full border !border-gray-400 text-gray-400 hover:text-gray-500"
              onClick={() =>
                // navigate(
                //   `/home/main/profile/${recepient && recepient?.id}`
                // )

                onViewProfile()
              }
            >
              View Profile
            </button>
          </div>
          <div className="flex xl:flex-col justify-center items-center gap-2 md:gap-4 text-xs md:text-sm">
            <button
              className="md:px-6 py-2 px-4 rounded-3xl border-[1px] bg-green-500 text-white hover:bg-green-600"
              onClick={() => handleRequestAccept()}
              disabled={submitting}>
              {submitting ? <Loader className="animate-spin" /> : "Accept"}
            </button>
            <button
              className="sm:px-6 px-4 py-2 rounded-3xl border-[1px] border-red-400 hover:border-red-600"
              onClick={() => handleRequestCancel()}
              disabled={submitting}
            >
              {"Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionRequestCard;
