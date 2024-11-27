import { useState, useEffect, useContext } from "react";
// Adjust the import based on your file structure

import notificationSound from "../../assets/audio/nokia.mp3";
import { supabase } from "../../../utils/supabase";


import React from "react";



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
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

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

    const { classes } = useStyles();

    const [pages, setPages] = useState([]);
    const [message, setMessage] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [badge, setBadge] = useState(0);

    const notificationPlay = () => {
        const sound = new Howl({
            src: [notificationSound], // Use the imported sound file
            autoplay: false,
        });
        sound.play();
    };


    supabase
        .channel("custom-all-changes")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "Notification" },
            (payload) => {
                console.log(payload);
                if (Object.values(payload.new).length === 0) {
                    console.log(payload.old);
                    handleInserts();
                } else {
                    const newData = payload.new;
                    const user = '27';
                    if (newData.Users.length !== 0 && newData.Users.includes(user)) {
                        console.log("New message:", payload.new);
                        if (payload.eventType == "INSERT") {
                            setBadge((prev) => prev + 1);
                            notificationPlay();
                        }
                        handleInserts();
                    }
                }
            }
        )
        .subscribe();

    const handleInserts = async () => {
        if ('27') {
            setIsLoading(true);
            let { data: Notification, error } = await supabase
                .from("Notification")
                .select("*")
                .contains("Users", ['27'])
                .order("created_at", { ascending: true });

            setIsLoading(false);

            if (error) {
                console.log(error);
            } else {
                console.log("Message:", Notification);
                setMessage(Notification);

                const unseenNotifications = Notification?.filter(
                    (notification) =>
                        !notification.Seen ||
                        !notification.Seen.includes(String(pages[0].userId))
                ).length;

                setBadge(unseenNotifications);
            }
        }
    };

    useEffect(() => {
        handleInserts();
    }, [pages]);

    useEffect(() => {
        console.log(message)
    }, [message]);



    //pagination

    const [no, setNo] = useState([1]);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstIndex, setFirstIndex] = useState(1);

    const [lastIndex, setLastIndex] = useState(5);

    const prevPage = () => {
        currentPage !== 1 && pageForm !== 1 && setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        currentPage !== no.length && pageForm !== no.length && setCurrentPage(currentPage + 1);
    };


    const [pageForm, setPageForm] = useState(1)

    useEffect(() => {
        setPageForm(currentPage);
    }, [currentPage])

    useEffect(() => {
        if (pageForm <= no.length) {
            console.log(pageForm)
            setCurrentPage(pageForm);
        }
    }, [pageForm])

    useEffect(() => {
        if (message) {
            const noOfRecordsPerPage = 10;
            const noOfPages = Math.ceil(message.length / noOfRecordsPerPage) || 1;

            const newLastIndex = currentPage * noOfRecordsPerPage;
            const newFirstIndex = newLastIndex - noOfRecordsPerPage;
            console.log(newFirstIndex);
            console.log(newLastIndex);
            setLastIndex(newLastIndex);
            setFirstIndex(newFirstIndex);

            const numbers = [];
            for (let i = 1; i <= noOfPages; i++) {
                numbers.push(i);
            }

            setNo(numbers);
        }
    }, [message, currentPage]);

    useEffect(() => {
        console.log(no);
    }, [no]);

    const [records, setRecords] = useState([]);

    useEffect(() => {

        if (message) {
            console.log(firstIndex);
            console.log(lastIndex);
            console.log(message.length);
            console.log(message.slice(firstIndex, lastIndex));
            setRecords(message.slice(firstIndex, lastIndex));
        }

    }, [firstIndex, lastIndex, message]);

    useEffect(() => {
        console.log(records);
    }, [records]);


    return (

        <>
            <div className="w-full px-4 mb-12">
                <div className="mt-4 flex justify-center text-2xl font-bold text-[#D22D3D]">
                    Notifications
                </div>
                {
                    isLoading && (<>
                        <div className="flex w-full justify-center items-center p-8">
                            <ClipLoader

                                color={"#D22D3D"}
                                loading={isLoading}
                                cssOverride={{}}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </>)
                }
                {
                    !isLoading && message && records && records.length > 0 && records.map((item, idx) => (<>
                        <div className="m-4">
                            <Card className={classes.card}>
                                <Flex direction={{ base: "row" }} align={"center"}>

                                    <Flex
                                        direction={{ base: "column", md: "row" }}
                                        justify={"space-between"}
                                        align={"center"}
                                        className={classes.name}
                                    >

                                        <Stack spacing={5}>
                                            <Group spacing={"xs"}>
                                                <Text fw={500} size={"md"}>
                                                    {item?.Message}
                                                </Text>

                                            </Group>

                                            <Group spacing={5}>
                                                <BiTimeFive size={15} />
                                                <Text fw={600} size={"xs"}>{`${formatDistanceToNow(
                                                    // && new Date(notification.createdAt)
                                                    item && new Date(new Date(item?.created_at).getTime()).toISOString()

                                                )} ago`}</Text>
                                            </Group>
                                        </Stack>

                                        <Group position="right" align="center" className={classes.button}>
                                            {/* <Button
                px={"xl"}
                size="sm"
                variant="filled"
                style={{ backgroundColor: "var(--secondary)" }}
                // onClick={() => handleCallback()}
              >
                View
              </Button> */}
                                            <div className={`${item.Type == "Important" && "bg-red-100 rounded-lg text-red-800"} ${item.Type == "Casual" && "bg-blue-100 rounded-lg text-blue-800"} ${item.Type == "Normal" && "bg-green-100 rounded-lg text-green-800"} px-4 py-2`}>{item.Type}</div>
                                            {/* <Button
                px={"xl"}
                size="sm"
                variant="outline"
                // onClick={() => handleNotificationDelete()}
                // disabled={submitting}
              >
                
              </Button> */}
                                        </Group>
                                    </Flex>
                                    {/* <BsThreeDots size={25} /> */}
                                </Flex>
                            </Card>
                        </div>
                    </>))
                }
                {records && no.length > 1 && (
                    <>
                        <nav className="flex justify-end mt-2 mb-4">
                            <ul className="flex flex-row gap-[10px]">
                                <li
                                    className={` px-1 py-1 rounded ${(currentPage === 1 || pageForm == 1) ? "bg-gray-400" : "bg-[#7C4BA1]"
                                        }`}
                                >
                                    <button className="px-2 py-1 rounded " onClick={prevPage}>
                                        <ChevronLeft size={20} color="white" />
                                    </button>
                                </li>
                                {no.length > 1 &&

                                    <>

                                        <div className="flex flex-row gap-1 items-center bg-[#7C4BA1] px-2 py-1 rounded ">
                                            <input type="number"
                                                min="1"
                                                max={no.length} value={pageForm} onChange={(e) => setPageForm(e.target.value)} className="px-1 rounded focus:outline-[#7C4BA1]"></input>
                                            <div className="text-white">of</div>
                                            <div className="text-white">{no.length}</div>
                                        </div>

                                    </>
                                }
                                <li
                                    className={` px-1 py-1 rounded ${(currentPage === no.length || pageForm == no.length) ? "bg-gray-400" : "bg-[#7C4BA1]"
                                        }`}
                                >
                                    <button className="px-2 py-1 rounded " onClick={nextPage}>
                                        <ChevronRight size={20} color="white" />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>


        </>
    );
};

export default Notifications;
