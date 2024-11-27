import React, { useContext } from "react";
import { useState, useEffect } from "react";
import profileAvatar from "../../images/olp_avatar.avif";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { deleteNotif } from "../../utils/api";
import { useDispatch } from "react-redux";
import { deleteNotification } from "../../Store/features/notificationSlice";
import { AuthContext } from "../../utils/context/AuthContext";
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
import { BiTimeFive } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

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

function NotificationMissedCallCard({ notification }) {
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const {user, setUser} = useContext(AuthContext);

  const handleNotificationDelete = () => {
    deleteNotif(notification && notification.id)
      .then((res) => {
        setUser({ ...user, lastReadNotification: res.data });
        dispatch(deleteNotification(notification.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCallback = () => {};

  return (
    <Card className={classes.card}>
      <Flex direction={{ base: "row" }} align={"center"}>
        <div className={classes.image}>
          <Image
            radius={100}
            width={60}
            height={60}
            src={
              notification.relatedUser?.avatarId ? (
                `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                  notification.relatedUser.avatarId
                }`
              ) : (
                profileAvatar
              )
            }
            alt="Profile"
          />
        </div>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
          className={classes.name}
        >
          <Stack spacing={5}>
            <Group spacing={"xs"}>
              <Text fw={500} size={"md"}>
                {notification && notification.heading}
              </Text>
              <HiOutlinePhoneMissedCall size={18} color="var(--primary)" />
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
              variant="filled"
              px={"xl"}
              size="sm"
              style={{ backgroundColor: "var(--secondary)" }}
              onClick={() => handleCallback()}
            >
              View
            </Button>
            <Button
              variant="outline"
              px={"xl"}
              size="sm"
              onClick={() => handleNotificationDelete()}
            >
              Delete
            </Button>
          </Group>
        </Flex>
      </Flex>
    </Card>
  );
}

export default NotificationMissedCallCard;
