import React, { useContext } from "react";
import profileAvatar from "../../images/olp_avatar.avif";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createConnectionRequestThunk } from "../../Store/thunk/connectionsThunk";
import { AuthContext } from "../../utils/context/AuthContext";
import ConnectionRequestSection from "../../Section/connectionRequestSection";
import { createConnectionRequest } from "../../utils/api";
import { addToast } from "../../Store/features/toastSlice";
import { addConnectionRequest } from "../../Store/features/connectionSlice";
import { AgeFromDate } from "age-calculator";
import { useState } from "react";
import { changeIsPending } from "../../Store/features/searchUser";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Chip,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { VscDebugDisconnect, VscUnverified } from "react-icons/vsc";
import { HiOutlineViewGrid } from "react-icons/hi";
import { showNotification } from "@mantine/notifications";
import { GoVerified } from "react-icons/go";

function NewProfileCard(props) {
  console.log("object")
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  console.log(user)
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

  const sendConnectionRequest = () => {
    console.log(user.id, props.recommend.id);
   
    createConnectionRequest(props.recommend.id)
      .then((res) => {
        dispatch(addConnectionRequest(res.data));
        showNotification({
          title: "Connection Request sent! 🙏",
        });
        //  dispatch(addToast({kind:'SUCCESS', msg: 'Request Sent Successfully.'}))
        dispatch(changeIsPending({ id: props.recommend.id, type: props.type }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addToast({ kind: "ERROR", msg: "Cannot send request" }));
      });
  };


  const handleView=(id)=>{
    if((user && user.profiles && (user.profiles.length<=20 || user.profiles.includes(id)) ) || (user && !user.profiles)){
      console.log(user.profiles)
      console.log("hiii")
      navigate(`/home/main/profile/other/${id}/about`)
    }
    else{
      console.log("restrict!");
    }
  }
  return (
    <Card withBorder radius={"md"}>
      <Card.Section >
        <Group position="right" mt={"sm"} mx={"sm"}>
          {props.recommend.isVerified ? (
            <Tooltip label="User Verified" withArrow size="sm">
              <ActionIcon variant="transparent">
                <GoVerified size={15} color="var(--secondary)" />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Unverified" withArrow size="sm">
              <ActionIcon variant="transparent">
                <VscUnverified size={15} color="var(--secondary)" />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Image
          width={120}
          height={120}
          mx={"auto"}
          my="md"
          radius={100}
          className={`${user?.viewProfilePaymentStatus?"":""}`}
          src={
            props.recommend.avatarId
              ? `${import.meta.env.VITE_BASE_URL}/user-avatar/${
                  props.recommend.avatarId
                }`
              : profileAvatar
          }
        />
      </Card.Section>
      <Stack justify="center" spacing={0} align="center">
        <Title order={3} transform="capitalize">
          {props.recommend.fullname}
        </Title>
        <Text
          color="dimmed"
          align="center"
          fw={600}
          size={"sm"}
          transform="capitalize"
        >
          {props.recommend.address}
        </Text>
      </Stack>

      <Group position="center" my="sm">
        <Tooltip label="Age" withArrow>
          <Badge>
            {
              new AgeFromDate(
                new Date(
                  props.recommend.year,
                  monthToNum[props.recommend.month],
                  props.recommend.day
                )
              ).age
            }
          </Badge>
        </Tooltip>

        <Tooltip label="Religion" withArrow>
          <Badge>{props.recommend.religion}</Badge>
        </Tooltip>

        <Tooltip label="Caste" withArrow>
          <Badge>{props.recommend.caste}</Badge>
        </Tooltip>
      </Group>

      <Group grow position="center" mb={"sm"}>
        <Button
          onClick={() =>handleView(props.recommend.id)
          }
          leftIcon={<HiOutlineViewGrid size={20} />}
          style={{ backgroundColor: "var(--secondary)" }}
          size="md"
          variant="filled"
        >
          View
        </Button>
        {props.recommend.isConnected ? (
          <Button size="md" variant="outline">
            Connected
          </Button>
        ) : (
          <>
            {props.recommend.isPending ? (
              <Button
                leftIcon={<VscDebugDisconnect size={20} />}
                size="md"
                variant="outline"
              >
                Pending
              </Button>
            ) : (
              <Button
                leftIcon={<VscDebugDisconnect size={20} />}
                size="md"
                variant="outline"
                onClick={() => sendConnectionRequest()}
              >
                Connect
              </Button>
            )}
          </>
        )}
      </Group>
    </Card>
  );
}

export default NewProfileCard;
