import React from "react";
import { useState, useEffect } from "react";
import profileAvatar from "../../images/olp_avatar.avif";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { deleteNotif } from "../../utils/api";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../Store/features/notificationSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  createStyles,
} from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { BiTimeFive } from "react-icons/bi";
import connectImage from "../../images/connect.png";
import { Loader } from "lucide-react";

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
      flexBasis: "88%",
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

function NotificationCreateConnectionRequest({ notification }) {
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleNotificationDelete = () => {
    setSubmitting(true)
    deleteNotif(notification && notification.id)
      .then((res) => {
        dispatch(deleteNotification(notification.id));
        setSubmitting(false)
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  };

  const handleCallback = () => {
    navigate("/home/main/connection");
  };

  return (
    <Card className={classes.card}>
      <Flex direction={{ base: "row" }} align={"center"}>
        <div className={classes.image}>
          <Image
            width={60}
            height={60}
            radius={100}
            src={
              notification.relatedUser?.avatarId ? (
                `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                  notification.relatedUser?.avatarId
                }`
              ) : (profileAvatar
              )
            }
            alt="Profile"
          />
          {/* <img src="data:image/jpeg;base64,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" alt="Profile"/> */}
          {/* </div> */}
        </div>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
          className={classes.name}
        >
          {/* <h1 className='font-bold text-xl'>{relatedUser}</h1> */}
          {/* <Text fw={600} size={'xl'}>{notification && notification.heading}</Text> */}
          <Stack spacing={5}>
            <Group spacing={"xs"}>
              <Text fw={500} size={"md"}>
                {notification && notification.heading}
              </Text>
              <Image src={connectImage} width={15} />
            </Group>

            <Group spacing={5}>
              <BiTimeFive size={15} />
              <Text fw={600} size={"xs"}>{`${formatDistanceToNow(
                 notification && new Date(notification.createdAt)
                // notification && new Date(new Date(notification.createdAt.slice(0, -5) + "Z").getTime() + (5 * 60 * 60 * 1000+0.5*60*60*1000)).toISOString()

              )} ago`}</Text>
            </Group>
          </Stack>

          <Group position="right" align="center" className={classes.button}>
            <Button
              px={"xl"}
              size="sm"
              variant="filled"
              style={{ backgroundColor: "var(--secondary)" }}
              onClick={() => handleCallback()}
            >
              View
            </Button>
            <Button
              px={"xl"}
              size="sm"
              variant="outline"
              onClick={() => handleNotificationDelete()}
              disabled={submitting}
            >
              {submitting ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
          </Group>
        </Flex>
        {/* <BsThreeDots size={25} /> */}
      </Flex>
    </Card>
  );
}

export default NotificationCreateConnectionRequest;
